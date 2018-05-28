<template>
<div id="index" :style="{height:clientHeight}">
  <div class="header">
    <h2>汇率计算</h2>
  </div>
  <div class="list-wrap">
    <ul>
         <li class="item" :class="{'exchange_item': index === 0}" v-for="(item,index) in indexList" :key="index">
            <div class="left_box" @click="showTab(index)">
                <img :src="flagList[item.name]" alt="cny">
                <span>{{item.name}}</span>
            </div>
            <div class="center_box" v-if="index === 0">
                <p>{{toThousands(inputMoney)||'0'}}</p>
            </div>
            <div class="center_box" v-else-if="index === 1">
                <p>{{money2||'0'}}</p>
            </div>
             <div class="center_box" v-else-if="index === 2">
                <p>{{money3||'0'}}</p>
            </div>
            <div class="right_box">{{item.code}}</div>
        </li>
    </ul>
  </div>
<key-board @input-money="changeValue($event,'inputMoney')" ></key-board>
  <tab-exchange 
    v-show="tabShow" 
    :chooseItem="chooseItem"
    @show-modal="changeValue($event,'tabShow')"
    @new-item="changeItem($event,'chooseItem')"
    >
    </tab-exchange>
  
</div>  
</template>

<script>

import pro from '../assets/common'
import tabExchange from './tab_exchange'
import keyBoard from './key_board'
const local = pro.local;
const configList = {
        CNY: require('../assets/images/cny.png'),
        USD: require('../assets/images/usd.png'),
        EUR: require('../assets/images/eur.png'),
        JPY: require('../assets/images/jpy.png'),
        HKD: require('../assets/images/cny.png'),
        KRW: require('../assets/images/krw.png'),
        GBP: require('../assets/images/gdp.png'),
        TWD: require('../assets/images/cny.png'),
        AUD: require('../assets/images/aud.png'),
    }
export default {
  name: 'index',
  components: {
    tabExchange,
    keyBoard
  },
  data () {
    return {
        tabShow: false,
        inputMoney: '1',
        chooseItem: {},
        chooseIndex: '',
        currentItem1: {},
        currentList: [],
        currentItem2: {},
        currentItem3: {},
        flagList: configList,
        initItem: ['CNY', 'USD', 'EUR'],
    }  
  },
  computed: {
     clientHeight() {
        return document.documentElement.clientHeight + 'px';
    }, 
    rate1 () {
        
        return this.currentItem1&&this.currentItem2.name&&this.currentItem1[this.currentItem2.name.toLowerCase()]
    },
    rate2 () {
        return this.currentItem1&&this.currentItem2.name&&this.currentItem1[this.currentItem3.name.toLowerCase()]
    },
    money2 () {
        if(!this.inputMoney) return;
        let money = this.inputMoney * this.rate1;
        let changeMoney = this.keepDigits(money);
        return this.toThousands(changeMoney)
    },
    money3 () {
        if(!this.inputMoney) return;
        let money = this.inputMoney * this.rate2;
        let changeMoney = this.keepDigits(money);       
        return this.toThousands(changeMoney);
    },
    indexList () {
        return [this.currentItem1, this.currentItem2, this.currentItem3]
    }
  },
  methods: {  
    goTo (id) {
        this.$router.push({path:id})
    },
    changeValue (msg, key) {
      this[key] = msg
      
    },
    changeItem (msg,key) {
        const list = ['currentItem1', 'currentItem2', 'currentItem3']
        this[list[this.chooseIndex]] = msg;
        this.changeValue(msg, key)
    },
    showTab (index) {
        const list = ['currentItem1', 'currentItem2', 'currentItem3']
        this.chooseIndex = index
        this.tabShow = true
        this.chooseItem = this[list[index]];
    },
    toThousands (num,nums = 4){
        let res=num&&num.toString().replace(/\d+/, function(n){ // 先提取整数部分
            return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
                return $1+",";
            });
        })
        return res
    },
    keepDigits (num,digits = 4) {
        let length = num.toString().split('.')[1]&&num.toString().split('.')[1].length;
        if(length<=digits){
            return num
        }else{
            num = typeof num === 'string'?parseFloat(num):num;
            return num&&num.toFixed(digits)
        }   
    },
    getList () {
        this.$axios.post('GetExchangeRate', {
        })
        .then((res) => {
            //console.log(res.data)
            if (res.data.success == 'true') {
                this.currentList = res.data.data
                return res.data.data
            }

        })
        .catch(function (error) {
            console.log(456)
            //console.log(error);
        })
        .then((abc)=>{
            console.log(abc)

            this.initItem.forEach((element,i) => {
                this['currentItem'+(i+1)] =  abc.find(item => {
                    return item.name === element
                })
            })   
                
        });

    }
    

  },
  created () {
      this.getList()
   
      
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/css/common.scss";
$bgGray: #dfe4e6;
$bgWhite: #ffffff;
$fontBlack: #333;
#index{
    width: 7.5rem;
    background-color: #ebf0f2
}
.header{
  h2{
    @include font(0.36rem,0.88rem,#fff);
    background-color: #333340;
  }
}
.list-wrap{
  width: 7.5rem;
  padding-top: 0.2rem;
  background-color: $bgGray;
  ul{
    background-color: $bgWhite;
    
    
  }
  .item{
    display: flex;
    align-content: center;
    justify-content: space-between;
    @include font(0.26rem,1.6rem,$fontBlack); 
    padding: 0 0.3rem;
    border-bottom: 1px solid $bgGray;
  }
  .left_box{
        flex: 0 0 1.6rem;
        text-align: left;
      img{
          display: inline-block;
          vertical-align: middle;
          width: 0.4rem;
          height: 0.3rem;
        
      }
      span{
          position: relative;
          vertical-align: middle;
          
          &::after{
              content: '';
              display: inline-block;
              width: 0;
              height: 0;
              margin-left: 0.1rem;
              border: 0.12rem solid transparent;
              border-top: 0.12rem solid #c6c6cc;
              vertical-align: middle;
              
          }
      }
  }
  .center_box{
      p{
        display: inline-block;
        vertical-align: middle;
        width: 2.5rem;
        height: 1rem;
        background-color: #fafafa;
        border-radius: 0.08rem;
        @include font(0.28rem,1rem,#333);
        
      }
        
  }
  .right_box{
      flex: 0 0 2rem;
      text-align: right;
      color: #666;
  }
  .exchange_item{
      .center_box p{
          background-color: #4595e6;
          color: #fff;
      }                 
        
  }
  }
.key_wrap {
    width: 7.5rem;
    position: fixed;
    bottom: 0;
}
.key_board {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap; 
    background-color: #fff;
    .left{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
        width: 5.63rem;
        
        .small_item,.big_item{
            box-sizing: border-box;
            width: 1.86rem;
            height: 1.2rem;
            border: 1px solid #dfe4e6;
            border-top: 0;
            border-left: 0;
            @include font(0.36rem,1.2rem,#333);
        }
        .big_item{
            width: 3.62rem
        }
        
    }
    li{
        width: 1.87rem;   
        height: 2.4rem;     
        box-sizing: border-box;
        //border: 1px solid #dfe4e6;
    }
    .clear{
        height: 2.4rem;
        @include font(0.36rem,2.4rem,#333);
        border-bottom: 1px solid #dfe4e6;
    }
    .clear_back{
         height: 2.4rem;
        @include font(0.36rem,2.4rem,#333);
        border-bottom: 1px solid #dfe4e6;
        background: url('../assets/images/clear_back.png') center center no-repeat;
        background-size: 0.4rem 0.26rem;
    }

}  

 
//   @for $i from 1 through 6 {
//       $background: ('huangjin', 'baiyin', 'xiaomai', 'yumi', 'TIA', 'other');
//       li:nth-child(#{$i}) {
//         $test: nth($background,$i);
//         background: url('../assets/img/#{$test}.jpg') center center no-repeat;
      
//       }
//     }

</style>

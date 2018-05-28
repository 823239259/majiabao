<template>
<transition name="vux-pop-in">
<div id="tab_exchange" :style="{height:clientHeight}">
    <!-- <transition name="vux-pop-in"> -->
         <div class="list_wrap" key="list_wrap">
        <ul>
      <li class="item" :class="index==0?'checkedItem':''" v-for="(item,index) in itemList" :key="item.code" @click="chooseNewItem(item)">
          <div class="left_box">
              <img :src="flagList[item.name]" alt="cny">
              <span>{{item.name}}</span>
          </div>
          <div class="right_box">{{item.code}}</div>
      </li>
    </ul>
    <div class="go_back" @click="close">返回</div>
    </div>
    
   
  <!-- </transition>   -->
  
</div>  
</transition>
</template>

<script>

import pro from '../assets/common'
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
  name: 'tab_exchange',
  components: {
    
  },
  props: ['chooseItem'],
  data () {
    return {
        currentList: [],
        flagList: configList,

    }  
  },
  computed: {
     clientHeight() {
        return document.documentElement.clientHeight + 'px';
    }, 
    itemList () {
        return this.currentList.reduce((arr,item) =>{
            if(item.name === this.chooseItem.name){
                arr.unshift(item)
            }else{
                arr.push(item)
            }
            return arr
        },[])
    }
  },
  methods: {  
    goTo (id) {
        this.$router.push({path:id})
    },
    close() {
        this.$emit('show-modal', false)
    },
    chooseNewItem (item) {
       this.$emit('new-item', item)
       this.$emit('show-modal', false)
    },
    getList () {
        this.$axios.post('GetExchangeRate', {
        })
        .then((res) => {
            console.log(res.data)
            if (res.data.success == 'true') {
                this.currentList = res.data.data
            }

        })
        .catch(function (error) {
            console.log(456)
            //console.log(error);
        });
    },
    
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
#tab_exchange{
    position: absolute;
    top: 0;
    width: 7.5rem;
    background-color: rgba(51, 51, 64, 0.6);
}
.list_wrap{
    position: absolute;
    bottom: 0;
    width: 7.5rem;
    
    background-color: #ebf0f2;
}
  ul{
    background-color: $bgWhite;
    height: 8.4rem;
    overflow: scroll;
    
    
  }
  .item{
    display: flex;
    align-content: center;
    justify-content: space-between;
    @include font(0.26rem,1rem,$fontBlack); 
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
      }
  }
  .right_box{
      flex: 0 0 2rem;
      text-align: right;
      color: #666;
  }
  .checkedItem{
    background-color: #f5fafc;              
        
  }
  .go_back{
      justify-content: center;
      @include font(0.36rem ,1rem,#e64552);
      border-top: 0.2rem solid #e6eaf2; 
      background-color: $bgWhite;
  }


.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-in-enter,.vux-pop-in-leave-to{
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.vux-pop-in-leave,.vux-pop-in-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

</style>

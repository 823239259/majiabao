<template>
  <div class="key_wrap">
      <ul class="key_board">
          <li class="left">       
            <div class="small_item" @click="addNum('7')">7</div>
            <div class="small_item" @click="addNum('8')">8</div>
             <div class="small_item" @click="addNum('9')">9</div>
             <div class="small_item" @click="addNum('4')">4</div>
             <div class="small_item" @click="addNum('5')">5</div>
            <div class="small_item" @click="addNum('6')">6</div>
          </li>
         
          <li class="clear" @click="clear">AC</li>
          <li class="left">       
            <div class="small_item" @click="addNum('1')">1</div>
            <div class="small_item" @click="addNum('2')">2</div>
             <div class="small_item" @click="addNum('3')">3</div>
             <div class="big_item" @click="addNum('0')">0</div>
             <div class="small_item" @click="addNum('.')">.</div>
          </li>
          <li class="clear_back" @click="backLength"></li>
      </ul>
  </div>
</template>

<script>

import pro from '../assets/common'

const local = pro.local;
export default {
  name: 'key_board',
  data () {
    return {
        tabShow: false,
        currentMoney: '1',
    }  
  },
  computed: {
     clientHeight() {
        return document.documentElement.clientHeight + 'px';
    }, 
  },
  methods: {  
    toThousands (num,nums = 2) {
        //if (typeof num === 'string') num = parseFloat(num);
        return num.toFixed(nums).replace(/\d(?=(?:\d{3})+\b)/g,'$&,'); // 这里看你是不是要小数
    },
    addNum (strNum) {
        if(this.currentMoney.length === 13) return;
        this.currentMoney += strNum
        //console.log(this.currentMoney)
        this.$emit('input-money',this.currentMoney)
    },
    clear () {
        this.currentMoney = '';
        this.$emit('input-money',this.currentMoney)
    },
    backLength () {
        this.currentMoney = this.currentMoney.slice(0,-1)
        this.$emit('input-money',this.currentMoney)
    }

  },
}
</script>
<style lang="scss" scoped>
@import "../assets/css/common.scss";
$bgGray: #dfe4e6;
$bgWhite: #ffffff;
$fontBlack: #333;

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


</style>

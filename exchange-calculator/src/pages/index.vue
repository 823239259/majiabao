<template>
<div id="index" :style="{height:clientHeight}">
  <div class="header">
    <h2>汇率计算</h2>
  </div>
  <div class="list-wrap">
    <ul>
      <li class="item exchange_item">
          <div class="left_box">
              <img src="../assets/images/cny.png" alt="cny">
              <span>CNY</span>
          </div>
          <div class="center_box">
              <input type="number">
          </div>
          <div class="right_box">￥ (人民币)</div>
      </li>
      <li class="item">
          <div class="left_box">
              <img src="../assets/images/usd.png" alt="usd">
              <span>USD</span>
          </div>
          <div class="center_box">
              <input type="number" disabled>
          </div>
          <div class="right_box">$ (美元)</div>
      </li>
      <li class="item">
          <div class="left_box">
              <img src="../assets/images/eur.png" alt="cny">
              <span>EUR</span>
          </div>
          <div class="center_box">
              <input type="number" disabled>
          </div>
          <div class="right_box">€ (欧元)</div>
      </li>
    </ul>
  </div>
  <div class="key_wrap">
      <ul class="key_board">
          <li class="left">       
            <div class="small_item">7</div>
            <div class="small_item">8</div>
             <div class="small_item">9</div>
             <div class="small_item">4</div>
             <div class="small_item">5</div>
            <div class="small_item">6</div>
          </li>
         
          <li class="clear">AC</li>
          <li class="left">       
            <div class="small_item">1</div>
            <div class="small_item">2</div>
             <div class="small_item">3</div>
             <div class="big_item">0</div>
             <div class="small_item">.</div>
          </li>
          <li class="clear_back"></li>
          
      </ul>
  </div>
  
</div>  
</template>

<script>

import pro from '../assets/common'
const local = pro.local;
export default {
  name: 'index',
  components: {
    
  },
  data () {
    return {
    }  
  },
  computed: {
     clientHeight() {
        return document.documentElement.clientHeight + 'px';
    }, 
  },
  methods: {  
    goTo (id) {
        this.$router.push({path:id})
      }
  },
}
</script>
<style lang="scss" scoped>
@import "../assets/css/common.scss";
$bgGray: #dfe4e6;
$bgWhite: #ffffff;
$fontBlack: #333;
#index{
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
      input{
        width: 2.5rem;
        height: 1rem;
        background-color: #fafafa;
        border-radius: 0.08rem;
        @include font(0.28rem,1rem,#333,left);
        text-indent: 0.15rem
      }
        
  }
  .right_box{
      flex: 0 0 2rem;
      text-align: right;
      color: #666;
  }
  .exchange_item{
      .center_box input{
          background-color: #4595e6;
          color: #fff;
      }                 
        
  }
  }
.key_wrap {
    position: absolute;
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

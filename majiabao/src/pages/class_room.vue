<template>
  <div>
    <mt-header fixed title="学堂"></mt-header>
    <div class="swipe-wrap">
      <mt-swipe :auto="0">
        <mt-swipe-item>
          <img src="../assets/img/classRoom-banner01.jpg" alt="banner1">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/img/classRoom-banner02.jpg" alt="banner2">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- tab位置 -->
    <div class="tab-wrap">
      <ul class="flexList">
        <li v-for="item in tabList" @click="goto(item.path)">
          <img class="img" :src="item.img" :alt="item.name">
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <!-- 问题 -->
    <div class="question-wrap">
      <div class="item" v-for="item in itemList">
        <h2>{{item.question}}</h2>
        <p>{{item.answer}}</p>
      </div>      
    </div>   
    <!-- 选项卡 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="index">
        <span class="icon icon1" slot="icon"></span>
        首页
      </mt-tab-item>
      <mt-tab-item id="quotation">
        <span class="icon icon2" slot="icon"></span>        
        行情
      </mt-tab-item>
      <mt-tab-item id="classroom">
        <span class="icon icon3 icon-checked" slot="icon"></span>
        学堂
      </mt-tab-item>
      <mt-tab-item id="information">
        <span class="icon icon4" slot="icon"></span>
        资讯
      </mt-tab-item>
      <mt-tab-item id="my">
        <span class="icon icon5" slot="icon"></span>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'class_room',
  data () {
    return {
      selected: 'classroom',
      tabList: [
        {
          name: '行情相关',
          img: require('../assets/img/hangqing.png'),
          path: '/help/information'
        },
        {
          name: '期货入门',
          img: require('../assets/img/qihuo.png'),
          path: '/help/quotation'
        },
        {
          name: '短信提醒',
          img: require('../assets/img/duanxin.png'),
          path: '/help/message'
        }
      ],
      itemList:[
        {
        question: '什么是最小变动价位?',
        answer: '期货合约的单位价格涨跌变动的最小值。',       
        },
        {
        question: '什么是最后交易日?',
        answer: '某一期货合约在合约交割月份中进行交易的最后一个交易日。',       
        },
        {
        question: '为何要追加保证金?',
        answer: '当交易者的必须保证金少于一定数量时（这个数量由交易所和经纪公司根据市场行情确定），按照需要补足的保证金进行缴纳。交易者也可以自行增加保证金获得更大开仓手数。',       
        },
        {
        question: '是什么套利交易?',
        answer: '同时买进或卖出两种相关商品，并希望在日后对冲交易部位时有所获利。套利交易关心的是合约之间的相互价格关系，而不是绝对价格水平。',       
        },
      ],
    }  
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },
    goto (id = `/information_item`) {
      //this.$router.push({path: `/contract-item/${id}`})
      this.$router.push({path: id})
    }, 
  },
  watch: {
    selected (value, oldvalue) {
      this.$router.push({path: `/${value}`})
      console.log(value)
    }
  }        
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.swipe-wrap{
  width: 7.5rem;
  height: 2.4rem;
  padding-top: 0.88rem;
  box-sizing: content-box;
}
.flexList{
  width: 7.5rem;
  padding: 0.24rem 0;
  li:nth-child(2){
    position: relative;
    &::before,&::after{
      content: '';
      position: absolute;
      width: 1px;
      height: 0.9rem;    
      background-color: #e9e9e9;
    }
    &::before{
      left: -0.7rem;
    }
    &::after{
      right: -0.7rem;
      top: 0
    }
  }
  img{
    width: 0.4rem;
    height: 0.4rem;
    margin: 0 auto
  }
  p{
    @include font(0.28rem, 0.44rem, #333);
    padding-top: 0.1rem
  }
}
.question-wrap{
  width: 7.5rem;
  padding-top: 0.1rem ;
  padding-bottom: 55px;
  background-color: #f8f9fc;
  .item{
    background-color: #fff; 
    h2,p{
      @include font(0.28rem, 0.8rem, #8b8b8b,left);
      padding-left: 0.25rem;
      border-bottom: #e9e9e9 1px solid;
    }
    p{
      @include font(0.28rem, 0.6rem, #333,left);
      color:#333 ;
      padding: 0.2rem 0 0 0.25rem;
    }
  }
}
.icon{
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('../assets/img/icon_colour.png') top center no-repeat;
  background-size: cover;
}
.icon-checked{
  background-image: url('../assets/img/icon_check.png')
}
@for $i from 1 through 5 {
  $background-position-y: (0,-0.7rem,-1.4rem,-2.1rem,-2.8rem);
  .icon#{$i}{
    background-position-y:nth($background-position-y,$i) 
  }
} 

</style>

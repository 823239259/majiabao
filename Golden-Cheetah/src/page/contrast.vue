<template>
  <div id="home">
    <TopTitle title="对比" >
      <span slot="my_right" class="header_icon customer_icon"></span>
    </TopTitle>

    <div class="contrast-container">
      <p class="title">{{msg}}</p>
      <div class="gains">
        <ul class="gains-num">
          <li class="now-price">1243.45</li>
          <li class="gains-per">0.23%</li>
          <li class="gains-specific-num">+2.2</li>
        </ul>
        <span class="gains-last">21637</span>
        <p class="more-data" @click="goto('/contrast_more_data')">更多数据>></p>

        <!--分时图-->
        <div class="Time-sharing-plan"></div>
        <p class="reminder">提示：可同时叠加三个品种进行对比</p>

        <!--选择器-->
        <div class="chose-img">
          选择图片部分
        </div>

        <!--已选择的品种-->
        <div class="selected">
          <p class="selected-class">已选择品种</p>
          <div class="chose-box">
            <img src="" alt="">
            <span>最新价：</span>
          </div>
        </div>

        <p class="cheetah-reminder">
          小豹提示：点击查看更多跳转到【合约介绍】页面
        </p>
        <p class="show-more" @click="goto('/agreement')">查看更多>></p>
      </div>


    </div>

    <bottomTab :tabSelect="tabSelected"></bottomTab>
  </div>
</template>

<script>
  import bottomTab from '../components/bottom_tab'
  import TopTitle from '../components/top_Title'
  export default {
    data() {
      return {
        tabSelected: 'contrast',
        msg:'最新金价',
        // selectedArr:[
        //   {selectImg:require(''),newPrice:'1123.15'},
        //   {selectImg:require(''),newPrice:'152.34'},
        //   {selectImg:require(''),newPrice:'152.34'},
        // ]
      }
    },
    methods:{
      goto(path) {
        this.$router.push({
          path: path
        });
      },
    },
    components: {
      bottomTab,
      TopTitle,
      // ContrastMore
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";
  #home {
    width: 7.5rem;
    /*min-height:7rem;*/
    background-color: $bodyBg;
    padding-top: 0.96rem;
    padding-bottom: 1.22rem;
    //overflow: hidden;
    /*height: 130vh;*/
  }
  .contrast-container{
    width:6.9rem;
    height: 100vh;
    margin: 0 auto;
  }
  .title{
    color:#fff;
    font-size: .28rem;
  }
  .gains{
    height: 1rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    margin-top: .2rem;
    line-height: 1rem;
  }
  .gains-num li{
    /*color: #ff4a80;*/
    float: left;
    margin-left: .3rem;
    color: #ff4a80;
  }
  .now-price{
    font-size: 0.48rem;
  }
  .gains-per{
    font-size: 0.3rem;
  }
  .gains-specific-num{
    font-size: 0.3rem;
  }
  .gains-last{
    float: right;
    font-size: 0.3rem;
    color:#fff;
    margin-right: .38rem;
  }
  .more-data{
    clear: both;
    float:right;
    font-size: .25rem;
    color: #fff;
  }
  .Time-sharing-plan{
    width: 6.9rem;
    height: 3rem;
    margin-top: .36rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    clear: both;
  }
  .reminder{
    /*margin-top: .2rem;*/
    color: #bfc0c1;
    font-size: 0.26rem;

  }
  .chose-img{
    width: 6.9rem;
    height: 1.6rem;
    background-color: #373a41;
    border-radius: .2rem;
    color: #fff;
    text-align: center;
    line-height: 1.6rem;
  }
  .selected-class{
    font-size: .32rem;
    color: #bfc0c1;
  }
  .chose-box{
    width: 6.9rem;
    height: 1rem;
    background-color: #373a41;
    border-radius: .2rem;
  }
  .chose-box span{
    color: #bfc0c1;
    font-size: .3rem;
    float: right;
  }
  .cheetah-reminder{
    color: #bfc0c1;
    font-size: .26rem;
  }
  .show-more{
    font-size: .26rem;
    color: #fff;
    float: right;
  }
</style>

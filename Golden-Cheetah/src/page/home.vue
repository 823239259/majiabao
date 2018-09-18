<template>
  <div id="home">
    <!--头部组件-->
    <TopTitle title="首页" >
      <span slot="my_right" class="header_icon customer_icon"></span>
    </TopTitle>
    <!--最新金价和时间-->
    <div class="home-container">
      <p class="new-price">最新金价</p>
      <p class="now-date">2018-9-18 10:38:40</p>
    </div>
    <!--内容大盒子-->
    <div class="home-box">
      <!--涨幅数据-->
      <div class="or-data-box">
        <ul>
          <li>-2.2</li>
          <li>1243.45</li>
          <li>0.23%</li>
        </ul>
      </div>
      <!--k线图-->
      <div class="k-chart">
        <div class="line"></div>
        <ul class="chart-chose">
          <li v-for="(cc,index) in chartArr" :key="index">{{cc.name}}</li>
          <li>更多 <img :src="moreIcon" style="width: .26rem"></li>
        </ul>
      </div>
      <!--轮播vant组件-->
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(ss,index) in swipeArr" :key="index">
          <img :src="ss.swipeImg" alt="">
        </van-swipe-item>
      </van-swipe>

      <!--数据，对比，交流，回测-->
      <div class="func-chose">
        <div class="func-chose-box" v-for="(ff,index) in funcChoseArr" :key="index">
          <p class="img-box"><img :src="ff.funcIcon" style="width: .4rem"></p>
          <p>{{ff.funcName}}</p>
        </div>
      </div>
      <!--买盘卖盘-->
      <div class="deal">

      </div>
      <p class="show-more">查看更多详细数据>></p>
      <div class="chose-tab">
        <van-tabs v-model="active" class="tab-sm-box">
          <van-tab title="标签 1">内容 1</van-tab>
          <van-tab title="标签 2">内容 2</van-tab>
          <van-tab title="标签 3">内容 3</van-tab>
          <van-tab title="标签 4">内容 4</van-tab>
        </van-tabs>
      </div>
    </div>
    <!--底部tab-->
    <bottomTab :tabSelect="tabSelected"></bottomTab>
  </div>
</template>

<script>
  import bottomTab from '../components/bottom_tab'
  import TopTitle from '../components/top_Title'
  export default {
    data() {
      return {
        tabSelected: 'home',
        active:2,
        chartArr:[
          {name:'分时图'},
          {name:'闪电图'},
          {name:'1分线'},
          {name:'5分线'}
        ],
        moreIcon:require('../assets/images/icons/jiahao.png'),
        swipeArr:[
          {swipeImg:require('../assets/banner/banner1.png')},
          {swipeImg:require('../assets/banner/banner2.png')},
          {swipeImg:require('../assets/banner/banner3.png')}
        ],
        funcChoseArr:[
          {
            funcIcon:require('../assets/images/golden_cheetah/more_icon_chose.png'),
            funcName:'数据'
          },
          {
            funcIcon:require('../assets/images/golden_cheetah/vs_icon_chose.png'),
            funcName:'对比'
          },
          {
            funcIcon:require('../assets/images/golden_cheetah/chart_icon_chose.png'),
            funcName:'交流'
          },{
            funcIcon:require('../assets/images/golden_cheetah/huice_icon_chose.png'),
            funcName:'回测'
          }
        ]
      }
    },
    components: {
      bottomTab,
      TopTitle,
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
    padding-bottom: 1.26rem;
    //overflow: hidden;
    /*height: 130vh;*/
  }
  .home-container{
    width: 6.9rem;
    margin: 0 auto;
    margin-top: .3rem;
  }
  .new-price{
    float: left;
    font-size: .28rem;
    color: #ffffff;
  }
  .now-date{
    float: right;
    font-size: .22rem;
    color: #bfc0c1;
  }
  .home-box{
    width: 6.9rem;
    margin: 0 auto;
  }
  .or-data-box{
    height: 1rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    clear:left;
    margin-top: .39rem;
    line-height: 1rem;
    color: #64ff68;
    font-size: .3rem;
  }
  .or-data-box>ul>li:first-child{
    float: left;
    margin-left: .3rem;
  }
  .or-data-box>ul>li:last-child{
    float: right;
    margin-right: .3rem;
  }.or-data-box>ul>li:nth-child(2){
    float: left;
    margin-left: 1.87rem;
    font-size: .48rem;
  }
  .k-chart{
    height: 3rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    margin-top: .3rem;
    position: relative;
  }
  .line{
    width: 6.4rem;
    border-top:0.02rem solid #ff4a80;
    border-bottom: 0.02rem solid #64ff68;
    height: 1.8rem;
    position: absolute;
    top:.3rem;
    left: .25rem;
  }
  .chart-chose{
    position: absolute;
    bottom: .29rem;
    left: .25rem;
    font-size: .26rem;
    color: #fff;
  }
  .chart-chose>li{
    float: left;
  }
  .chart-chose>li:not(:last-child){
    margin-right: .65rem;
  }
  .func-chose{
    width: 6.22rem;
    margin: 0 auto;
    /*border:1px solid red;*/
    margin-top: .3rem;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .func-chose-box{
    width: 0.8rem;
    height: 1.24rem;
    /*border: 1px solid blue;*/
  }

  //循环出来的背景展现不同的颜色
  .func-chose-box:nth-child(1) .img-box{
    background-color: #ff8bba;
  }
  .func-chose-box:nth-child(2) .img-box{
    background-color: #8c70f6;
  }
  .func-chose-box:nth-child(3) .img-box{
    background-color: #11d3d2;;
  }
  .func-chose-box:nth-child(4) .img-box{
    background-color: #ffc65e;
  }

  .func-chose-box>p:first-child{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    position: relative;
  }
  .func-chose-box>p>img{
    position: absolute;
    top: .2rem;
    left: .2rem;
  }
  .func-chose-box>p:last-child{
    width: .8rem;
    text-align: center;
    color: #8d8e8f;
    font-size: 0.26rem;
    margin-top: .19rem;
  }
  /*买盘卖盘*/
  .deal{
    height: 2rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    margin-top: .3rem;
  }
  .show-more{
    color: #fff;
    font-size: .26rem;
    text-align: right;
    margin-top: .3rem;
  }
  .chose-tab{
    margin-top: .3rem;
  }
  .tab-sm-box{
    color:#fff;
  }
</style>

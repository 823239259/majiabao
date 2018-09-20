<template>
  <div id="home">
    <!--头部组件-->
    <TopTitle title="首页" >
      <span slot="my_right" class="header_icon customer_icon"></span>
    </TopTitle>
    <!--最新金价和时间-->
    <div class="home-container">
      <p class="new-price">最新金价</p>
      <p class="now-date">{{date}}</p>
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
          <img :src="ss.swipeImg">
        </van-swipe-item>
      </van-swipe>

      <!--数据，对比，交流，回测-->
      <div class="func-chose">
        <div class="func-chose-box" v-for="(ff,index) in funcChoseArr" :key="index">
          <p class="img-box">
            <img :src="ff.funcIcon" style="width: .4rem" @click="itemClick(ff)">
          </p>
          <p>{{ff.funcName}}</p>
        </div>
      </div>
      <!--买盘卖盘-->
      <div class="deal">

      </div>
      <!--开盘价/昨结价/买卖价/最高，低价-->
      <div class="position-info">
        <table class="info-box">
          <tr>
            <td>开盘价</td>
            <td>昨结价</td>
            <td>最高价</td>
          </tr>
          <tr>
            <td>开盘价</td>
            <td>昨结价</td>
            <td>最高价</td>
          </tr>
          <tr>
            <td>开盘价</td>
            <td>昨结价</td>
            <td>最高价</td>
          </tr>
          <tr>
            <td>开盘价</td>
            <td>昨结价</td>
            <td>最高价</td>
          </tr>
        </table>
      </div>
      <p class="show-more" @click="goto('/contrast_more_data')">查看更多详细数据>></p>
    </div>
    <div class="chose-tab">
      <van-tabs v-model="active" :color="'#3180ff'" class="tab-sm-box" swipe-threshold:5>
        <van-tab title="新闻">
          <div class="news" @click="goto('/new_son')" v-for="(news,index) in newsArr" :key="index">
            <p>{{news.newTitle}}</p>
            <p><img :src="news.newImg" style="width: 1rem"></p>
            <p>{{news.NDate}}</p>
          </div>
        </van-tab>
        <!--情绪-->
        <van-tab title="情绪">
          <div class="emotion"></div>
        </van-tab>
        <!--发言-->
        <van-tab title="发言">
          <div class="input-box">
            <input type="text" class="speak-input">
            <img :src="enterIcon" alt="">
          </div>
          <!--用户说的话-->
          <div class="speak" v-for="(speak,index) in speakArr" :key="index">
            <div class="header-img">
              <img :src="speak.HeadPortrait" >
            </div>
            <ul class="speak-msg">
              <li class="user-name">{{speak.name}}</li>
              <li class="user-speak">{{speak.speakMsg}}</li>
              <li class="user-date">{{speak.speakDate}}</li>
            </ul>
          </div>
        </van-tab>

        <van-tab title="十档">
          <div class="ten-d-box">
            <p class="buy-5">买五档</p>
            <p class="sell-5">卖五档</p>
            <div class="buy-box">
              <p class="buy-items" v-for="(buyItem,index) in buyItems" :key="index">
                <span>{{buyItem.buyName}}</span>
                <span>{{buyItem.buyPrice}}</span>
                <span>{{buyItem.buyNum}}</span>
              </p>
            </div>
            <div class="sell-box">
              <p class="sell-items" v-for="(sellItem,index) in sellItems" :key="index">
                <span>{{sellItem.sellName}}</span>
                <span>{{sellItem.sellPrice}}</span>
                <span>{{sellItem.sellNum}}</span>
              </p>
            </div>
          </div>
        </van-tab>
        <van-tab title="公告">
          <div class="notice" v-for="(notice,index) in noticeArr" :key="index">
            <p>{{notice.NoticeTitle}}</p>
            <p>{{notice.NoticeDate}}</p>
          </div>
        </van-tab>
        <van-tab title="简介">
          <div class="intro">
            <ul>
              <li v-for="(intro,index) in introArr" :key="index">
                <p class="inner-text">{{intro}}</p>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!--底部tab-->
    <bottomTab :tabSelect="tabSelected"></bottomTab>
  </div>
</template>

<script>
  // websocket
  // let socket = new websocket.onopen()

  import bottomTab from '../components/bottom_tab'
  import TopTitle from '../components/top_Title'
  export default {
    data() {
      return {
        tabSelected: 'home',
        active:2,
        date:new Date(),
        // 分时图
        chartArr:[
          {name:'分时图'},
          {name:'闪电图'},
          {name:'1分线'},
          {name:'5分线'}
        ],
        // 更多图标
        moreIcon:require('../assets/images/icons/jiahao.png'),
        // 轮播
        swipeArr:[
          {swipeImg:require('../assets/banner/banner1.png')},
          {swipeImg:require('../assets/banner/banner2.png')},
          {swipeImg:require('../assets/banner/banner3.png')}
        ],
        // 数据,对比,交流,回测
        funcChoseArr:[
          {
            funcIcon:require('../assets/images/golden_cheetah/more_icon_chose.png'),
            funcName:'数据',
            path:'/contrast_more_data'
          },
          {
            funcIcon:require('../assets/images/golden_cheetah/vs_icon_chose.png'),
            funcName:'对比',
            path:'/contrast'
          },
          {
            funcIcon:require('../assets/images/golden_cheetah/chart_icon_chose.png'),
            funcName:'交流',
            path:'/chat-room'

          },{
            funcIcon:require('../assets/images/golden_cheetah/huice_icon_chose.png'),
            funcName:'回测',
            path:'/back-test'
          }
        ],
        // 新闻里面的内容
        newsArr:[
          {newTitle:'中国智慧',NDate:'2018-9-19 11:19:40',newImg:require('../assets/images/golden_cheetah/newsIcon.png')},
          {newTitle:'中国智慧',NDate:'2018-9-19 11:19:40',newImg:require('../assets/images/golden_cheetah/newsIcon.png')},
          {newTitle:'中国智慧',NDate:'2018-9-19 11:19:40',newImg:require('../assets/images/golden_cheetah/newsIcon.png')},
        ],
        // 首页发言确认发送img
        enterIcon:require('../assets/images/golden_cheetah/enter_icon.png'),
        // 用户说的话
        speakArr:[
          {
            HeadPortrait:require('../assets/images/golden_cheetah/person01.png'),
            name:'长者',
            speakMsg:'我和大佬谈笑风声',
            speakDate:'2018-9-17 16:08'
          },
          {
            HeadPortrait:require('../assets/images/golden_cheetah/person02.png'),
            name:'长者',
            speakMsg:'我和大佬谈笑风声',
            speakDate:'2018-9-17 15:08'
          },
        ],
        // 公告里面展示的内容
        noticeArr:[
          {NoticeTitle:'中国智慧',NoticeDate:'2018-09-20 16:52:38'},
          {NoticeTitle:'中国智慧',NoticeDate:'2018-09-20 16:52:38'},
          {NoticeTitle:'中国智慧',NoticeDate:'2018-09-20 16:52:38'},
        ],
        // 简介里面的内容
        introArr:[
            '交易品种','CMX黄金','交易代码','GC',
            '市场代码','NYMEX0','交易所简称','纽约商品交易所',
            '交易单位','100金衡盎司','最后交易日说明','交易于交割月最后第三个交易日',
            '最小变动价位','每金衡盎司0.10美元','交易所简称','交易在本日历月'
        ],
        // 买五档里的内容
        buyItems:[
          {buyName:'买一',buyPrice:31201,buyNum:16},
          {buyName:'买二',buyPrice:31201,buyNum:16},
          {buyName:'买三',buyPrice:31201,buyNum:16},
          {buyName:'买四',buyPrice:31201,buyNum:16},
          {buyName:'买五',buyPrice:31201,buyNum:16}
        ],
        // 卖五档里面的内容
        sellItems:[
          {sellName:'卖一',sellPrice:31201,sellNum:16},
          {sellName:'卖二',sellPrice:31201,sellNum:16},
          {sellName:'卖三',sellPrice:31201,sellNum:16},
          {sellName:'卖四',sellPrice:31201,sellNum:16},
          {sellName:'卖五',sellPrice:31201,sellNum:16},
        ]
      }
    },
    methods:{
      goto(path) {
        this.$router.push({
          path: path
        });
      },
      // 数据,对比,交流,回测 跳转路由方法
      itemClick (ff) {
        if(ff.path) {
          this.$router.push({path: ff.path})
        }
        if(ff.method){
          this[ff.method]()
        }
      },
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
    padding-bottom: 5rem;
    /*overflow: hidden;*/
    /*height: 150vh;*/
  }
  /*主页第二大盒子*/
  .home-container{
    width: 6.9rem;
    margin: 0 auto;
    margin-top: .3rem;
  }

  /*今日价格 时间*/
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
  }
  .or-data-box>ul>li:nth-child(2){
    float: left;
    margin-left: 1.87rem;
    font-size: .48rem;
  }

  /*k线图 各种图*/
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

  /*<!--数据，对比，交流，回测-->*/
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
    width: 7.5rem;
  }
  .tab-sm-box{
    color:#fff;
    background-color: #373a41;
  }

  /*新闻*/
  .news{
    width: 6.9rem;
    height: 1.6rem;
    margin: .3rem auto;
    background-color: #373a41;
    border-radius: .2rem;
  }
  .news>p:first-child{
    font-size: .36rem;
    margin-top: .3rem;
    margin-left: .3rem;
    float: left;
  }
  .news>p:nth-child(2){
    margin-top: .3rem;
    margin-right: .3rem;
    font-size: 0.36rem;
    color: #fff;
    float: right;
  }
  .news>p:last-child{
    clear: both;
    float: left;
    margin-left: .3rem;
    margin-top: -0.2rem;
  }

  /*<!--开盘价/昨结价/买卖价/最高，低价-->*/
  .position-info{
    height: 2.3rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    margin-top: .3rem;
    color: #fff;
  }
  .info-box{
    width: 6.3rem;
    height: 1.7rem;
    margin: 0 auto;
    text-align: center;
  }

  /*情绪*/
  .emotion{
    width: 6.9rem;
    height: 4.2rem;
    margin: .3rem auto;
    background-color: #373a41;
    border-radius: .2rem;
  }

  /*发言*/
  .input-box{
    width: 6.9rem;
    height: .98rem;
    margin: .3rem auto;
    background-color: #4c5059;
    border-radius: 0.2rem;
  }
  .speak-input{
    width: 5.5rem;
    height: 0.7rem;
    background-color: #303238;
    border-radius: 0.35rem;
    opacity: 0.8;
    margin-top: .14rem;
    margin-left: .31rem;
    color: #fff;
  }
  .input-box>img{
    width: 0.5rem;
    height: 0.5rem;
    margin-left: .29rem;
    margin-top: .14rem;
  }
  /*用户发言中说的话*/
  .speak{
    width: 6.9rem;
    height: 1.8rem;
    margin: 0 auto;
    background-color:#373a41;
    margin-top: .3rem;
    border-radius: .2rem;
    position: relative;
  }
  .header-img img{
    position: absolute;
    width: .8rem;
    left: .29rem;
    top: .29rem;
  }
  .speak-msg{
    position: absolute;
    top:.34rem;
    left:1.29rem;
  }
  .speak-msg li{
    margin-bottom: .2rem;
  }
  .user-name{
    font-size: .32rem;
  }
  .user-speak{
    font-size: .28rem;
  }
  .user-date{
    font-size: .24rem;
  }

  /*十档里面的内容*/
  .ten-d-box{
    width: 6.9rem;
    margin: .3rem auto;
  }
  .buy-5{
    font-size: 0.32rem;
    color: #bfc0c1;
    float: left;
  }
  .sell-5{
    font-size: 0.32rem;
    color: #bfc0c1;
    float: right;
  }
  .buy-box{
    clear: both;
    width: 3.3rem;
    height: 2.4rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    float: left;
    margin-top: .3rem;
  }
  .sell-box{
    width: 3.3rem;
    height: 2.4rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    float: right;
    margin-top: .3rem;
  }
  /*买五档里面的内容*/
  .buy-items{
    margin: .18rem 0 .18rem .3rem;
    color: #fff;
  }
  .buy-items>span{
    margin-right: .53rem;
  }
  .buy-items>span:first-child{
    font-size: .26rem;
    color: #ff3363;
    font-weight: bold;
  }
  .buy-items>span:nth-child(2){
    font-size: .26rem;
    color: #fff;
  }
  .buy-items>span:last-child{
    font-size: .26rem;
  }
  /*卖五档里的内容*/
  .sell-items{
    margin: .18rem 0 .18rem .3rem;
    color: #fff;
  }
  .sell-items>span{
    margin-right: .53rem;
  }
  .sell-items>span:first-child{
    font-size: .26rem;
    color: #ff3363;
    font-weight: bold;
  }
  .sell-items>span:nth-child(2){
    font-size: .26rem;
    color: #fff;
  }
  .sell-items>span:last-child{
    font-size: .26rem;
  }

  /*首页公告内容*/
  .notice{
    width: 6.9rem;
    height: 1.4rem;
    margin: .3rem auto;
    background-color: #373a41;
    border-radius: 0.2rem;
    font-family: PingFang-SC-Bold;
  }
  .notice>p:first-child{
    float: left;
    margin-top: .3rem;
    margin-left: .3rem;
    margin-bottom: .29rem;
    font-size: 0.36rem;
    color:#fff;
  }
  .notice>p:last-child{
    clear: both;
    margin-left: .3rem;
    font-family: PingFang-SC-Regular;
    font-size: .22rem;
  }

  /*首页中简介内容*/
  .intro{
    width: 7.5rem;
    background-color: #303238;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .intro>ul{
    width: 7.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .intro>ul>li{
    position: relative;
    width: 1.87rem;
    height: 1rem;
    border-right:0.01rem solid #4c5059;
    border-bottom:0.01rem solid #4c5059;
    /*line-height: 1rem;*/
    text-align: center;

  }
  /*单行多行对齐*/
  .inner-text{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%,-50%);
  }



</style>

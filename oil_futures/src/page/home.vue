<template>
  <div id="home">
    <mt-header fixed title="首页">
      <mt-button slot="left" @click="showTab('tabShow')">
        <span class="header_icon" :class="tabShow?'tab_open_icon':'tab_close_icon'"></span>
      </mt-button>
      <mt-button slot="right">
          <span class="search_icon header_icon" @click="goto('/home_search')"></span>
          <span class="customer_icon header_icon" @click="callCustomer" ></span>
      </mt-button>
    </mt-header>
    <template v-for="(v, index) in parameters">
    	<div class="show_wrap" v-if="v.CommodityNo == currentNo">
        <h2>当前原油最新价</h2>
        <div class="box">
            <div class="box_item left" :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</div>
            <div class="box_item right">
            	<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
	    				<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
            </div>
        </div>
        <div class="box">
            <div class="box_item">
                <p>挂单量</p>
                <p class="numbers">{{v.LastQuotation.Position}}</p>
            </div>
             <div class="box_item box_border">
                <p>成交量</p>
                <p class="numbers">{{v.LastQuotation.TotalVolume}}</p>
            </div>
             <div class="box_item">
                <p>平均价</p>
                <p class="numbers">{{(v.LastQuotation.HighPrice+v.LastQuotation.LowPrice)/2 | fixNumTwo}}</p>
            </div>
        </div>
    </div>
    </template>
    
    <div class="list_wrap">
        <ul class="home_list">
            <li :class="['item',{'item2':index<=3&&index%2 !== 0},{'item2':index>=4&&index%2 == 0}]"  v-for="(item, index) in homeList" :key="item.name" @click="goto(item.path)">{{item.name}}</li>
        </ul>
    </div>
    <div class="charts_container">
      <klineOne></klineOne>
    </div>
    <div class="hot_wrap">
        <h2>近期热门</h2>
        <ul class="hot_list">
            <li class="item" :class="{'item3':index==2}" v-for="(item, index) in newsList" @click="goto(item.path)"  :key="item.name">
                <div class="img">
                    <img :src="item.img" alt="">
                </div>
                <p :class="{'order1':index%2 == 0}">{{item.title}}</p>
            </li>
        </ul>
        <div class="more_title" @click="goto('/message')">查看更多实时资讯▼</div>
    </div>
    
    <div class="swipe-wrap">
      <mt-swipe :auto="0">
        <mt-swipe-item>
          <img src="../assets/images/home/banner01.jpg" alt="banner1">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/images/home/banner02.jpg" alt="banner2">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/images/home/banner03.jpg" alt="banner3">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <bottomTab :tabSelect="tabSelected" v-show="tabShow"></bottomTab>
    <tips-float ></tips-float>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <bottom  :tabSelect="tabSelected"/>
  </div>
  
</template>

<script>
  import { mapMutations,mapActions } from 'vuex'
  import bottomTab from '../components/bottom_tab'
  import bottom from '../components/bottoms_tab'
  import klineOne from './quote/klineOne'
  import scrollMsg from '../components/scrollMsg'
  import Cube from '../components/Cube'
  import tipsFloat from '../components/tipsFloat'
  import pro from '../assets/js/common'
  
  const local = pro.local;
  
  
  
  export default {
    name: "home",
    components: {
      bottomTab,
      scrollMsg,
      tipsFloat,
      bottom,
      klineOne
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
      	currentNo:'CL',
        tabSelected: 'home',
        isLogin: false,
        isShow: false,
        tabShow: true,
        idList: [],
        homeList: [{
            name: "关于我们",
            path: "/about_us"
          },
          {
            name: "行情",
            path: "/quote"
          },
          {
            name: "消息中心",
            path: "/list/messages"
          },
          {
            name: "工具",
            path: "/discover"
          },
          {
            name: "账号",
            path: "/my"
          },
          {
            name: "活动中心",
            path: "/activity_list"
          },
          {
            name: "信息",
            path: "/message"
          },
          {
            name: "新人学堂",
            path: "/list/class"
          },
        ],
        newsList: [{
            img: require('../assets/images/home/img01.jpg'),
            title: '#中央财政出台保费补贴政策:下决心把种业搞上去',
            path: 'news_details/1'
          },
          {
            img: require('../assets/images/home/img02.jpg'),
            title: '#工信部：将推动区块链产业健康有序发展',
            path: 'news_details/2'
          },
          {
            img: require('../assets/images/home/img03.jpg'),
            title: 'SEC高管称以太币不是证券、不受监管 数字货币集体上涨',
            path: 'news_details/3'
          },
          {
            img: require('../assets/images/home/img04.jpg'),
            title: '方星海：金融开放还要加力度，资本市场要创新满足新经济',
            path: 'news_details/4'
          }
        ],
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
    	parameters(){
				return this.$store.state.market.Parameters;
			}, 
    	quoteSocket(){
				return this.$store.state.quoteSocket;
			},
      
    },
    methods: {
      ...mapMutations({
        setAccountInfo: 'ACCOUNT_INFO',
        clearUserInfo: 'INFO_CLEAR',
      }),
//			...mapActions([
//				'initQuoteClient'
//			]),
      goLast() {
        this.$router.push(this.lastPath);
      },
      goto(path) {
        this.$router.push({
          path: path
        });
      },
      showTab (...key) {
        if(key.length === 1) {
          this[key[0]] = !this[key[0]]
        }else{
          this[key[1]] = key[0]
        }
        
      },
      
    },
    activated() {
    	this.$store.state.market.Parameters = [];
      this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + "NYMEX" + '","CommodityNo":"' + "CL" + '","ContractNo":"' + "1808" +'"}}');
      this.$store.state.isshow.iskline = true
     // this.$store.state.isshow.isklineshow = true
      
    },
    mounted(){
//  	this.initQuoteClient();
    },
   	filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			}
    },
    beforeRouteLeave (to, from, next) {
      // ...
      this.$store.state.isshow.iskline = false
      this.$store.state.isshow.isklineshow = false
      next()
    }
  };
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";
  #home {
    width: 7.5rem;
    padding:  1.1rem 0;
    //background-color: $bg;
  }
.show_wrap{
    width: 6.9rem;
    margin: 0 auto;
    border: 1px solid #344a65;
    @include font($fs26,0.6rem,#707070);
    border-radius: 0.1rem;
    margin-top: 0.3rem;
    // box-shadow: 0 0 3px #d2dae7;
    h2{
      color: #fff;
    }
    .box{
         @include flex(space-around);
         padding: 0 0.3rem;
         border-top: 1px solid #344a65;
         .box_item{
             flex: 1;
             .numbers{
                color: #fff;
                font-weight: bold;
             }
             
         }
         .box_border{
            border-left: 1px solid #344a65;
            border-right: 1px solid #344a65;
            
         }
         .left{
             @include font($fs40,0.8rem,#ff3363,left);
         }
         .right{
             @include font($fs26,0.8rem,#ff3363,right);
         }
         

    }
    .box:last-child{
        padding: 0;
    }
}
  .swipe-wrap{
    width: 7.5rem;
    height: 2.4rem;
    padding-top: 0.3rem;
    box-sizing: content-box;
  }
  .home_list{
    @include flex(space-around);
    padding: 0.3rem 0.7rem 0;
    flex-wrap: wrap;
    .item{
      flex: 0 0 1.6rem;
      @include font($fs24,0.8rem,#fff);
      background-color: #127c8d;
      border-radius: 0.1rem;
      margin-bottom: 0.3rem;
    }
    .item2{
        flex: 0 0 1rem;
        background-color: #0d61ab;
    }
    

  }
  .hot_wrap{
      h2{
         @include font($fs28,0.6rem,#ffd15d,left);
         padding: 0 0.3rem;
          border-bottom: 1px solid #344a65;
      }
      .item{
          @include flex(space-around);

           padding: 0 0.3rem;
           border-bottom: 1px solid #344a65;
          .img{
              flex: 0 0 1.5rem;
              border-radius: 0.1rem;
              
          }
          p{
              flex: 1;
              @include font($fs32,0.48rem,#fff,left);
              padding: 0.4rem 0;
              margin-left: 0.48rem;
          }
          .order1{
             order: -1;
             margin-left: 0;
             padding-right: 0.1rem;
          }
          
      }
      .item3{
          flex-direction: column;
          padding-bottom: 0.3rem; 
      }
  }

  .message_box{
    position: fixed;
    bottom: 1.38rem;
    right: 0.3rem;
    width: 0.8rem;
    height: 0.64rem;
    background: url('../assets/images/home/msg_icon.png') center no-repeat;
    background-size: 100%;
  }
  .charts_container{
			// background-color: white;
			width: 7.5rem;
			height: 6.4rem;
    }
.more_title{
  width: 7.5rem;
	height: 1rem;
  // background-color: #ffffff;
  @include font(0.26rem,1rem,#8f94a7);
  border-bottom: 1px solid #344a65;
}    
</style>
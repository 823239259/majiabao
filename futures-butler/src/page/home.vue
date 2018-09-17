<template>
  <div id="home" :style="{height:clientHeight}">
    <mt-header fixed title="首页">
      <span class="header_icon kefu_icon" slot="right" @click="callCustomer"></span>
    </mt-header>
    <div class="swipe-wrap">
      <mt-swipe :auto="0">
        <mt-swipe-item>
          <router-link to="/recommend/recommend">
            <img src="../assets/images/home/banner01.jpg" alt="banner1">
          </router-link>
          
        </mt-swipe-item>
        <mt-swipe-item>
          <router-link to="/discover7x24">
            <img src="../assets/images/home/banner02.jpg" alt="banner2">
          </router-link>
        </mt-swipe-item>
        <mt-swipe-item>
          <router-link to="/quote">
            <img src="../assets/images/home/banner03.jpg" alt="banner3">
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <scroll-msg></scroll-msg>
    <div class="butler_wrap">
      <ul class="butler_list">
        <li class="item" v-for="(item, index) in butlerList" :key="index" @click="goto(item.path)">
          <span class="circle">{{item.title}}</span>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="cube_wrap">
      <div class="left">
        <Cube :cubeList = 'cubeList' type='3'></Cube>
        <CubeSmall :cubeList = 'cubeList3' type='2'></CubeSmall>
      </div>
      <div class="right"> 
         <CubeSmall :cubeList = 'cubeList1' type='1'></CubeSmall>
        <CubeSmall :cubeList = 'cubeList2' type='3'></CubeSmall>
      </div>
     
    </div>
    <div class="message_box" @click="goto('/community')"></div>    
    <bottomTab :tabSelect="tabSelected"></bottomTab>
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import { mapMutations,mapActions } from 'vuex'
  import bottomTab from '../components/bottom_tab'
  import scrollMsg from '../components/scrollMsg'
  import Cube from '../components/Cube'
  import CubeSmall from '../components/Cube1'
  import pro from '../assets/js/common'
  
  const local = pro.local;
  
  
  
  export default {
    name: "home",
    components: {
      bottomTab,
      scrollMsg,
      Cube,
      CubeSmall
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
        tabSelected: 'home',
        isLogin: false,
        isShow: false,
        idList: [],
        butlerList: [{
            name: "新手指南",
            title: '期',
            path: "/novice_guide"
          },
          {
            name: "管家福利",
            title: '货',
            path: "/butler_welfare"
          },
          {
            name: "管家社区",
            title: '管',
            path: "/community"
          },
          {
            name: "风险提示",
            title: '家',
            path: "/guide_details/0"
          },
        ],
        userInfo: {},
        lastPath: '/',
        userList: [],
        cubeList: ['推荐','原油','股指','贵金属'],
        cubeList1: [
          {
            name: '管家签到',
            path: 'welfare_details/1'
          },
          {
            name: '大讲堂',
            path: 'welfare_details/2'
          },
          {
            name: '管家签到',
            path: 'welfare_details/1'
          },
          {
            name: '大讲堂',
            path: 'welfare_details/2'
          }
        ],
        cubeList2: [
           {
            name: '推荐有奖',
            path: 'welfare_details/4'
          },
          {
            name: '回答有礼',
            path: 'welfare_details/3'
          },
         {
            name: '推荐有奖',
            path: 'welfare_details/4'
          },
          {
            name: '回答有礼',
            path: 'welfare_details/3'
          },
        ],  
        cubeList3: [
           {
            name: '原油策略',
            path: `quoteDetails_celue?commodityNo=CL&mainContract=1810&exchangeNo=NYMEX&contrast=BRN,GC,DX,NG`
          },
         {
            name: '原油策略',
            path: `quoteDetails_celue?commodityNo=CL&mainContract=1810&exchangeNo=NYMEX&contrast=BRN,GC,DX,NG`
          },
           {
            name: '原油策略',
            path: `quoteDetails_celue?commodityNo=CL&mainContract=1810&exchangeNo=NYMEX&contrast=BRN,GC,DX,NG`
          },
           {
            name: '原油策略',
            path: `quoteDetails_celue?commodityNo=CL&mainContract=1810&exchangeNo=NYMEX&contrast=BRN,GC,DX,NG`
          },
        ],
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      quoteSocket () {
        return this.$store.state.quoteSocket;
      },
      celuePath () {
        return `/quoteDetails?commodityNo=CL&mainContract=1810&exchangeNo=NYMEX&contrast=BRN,GC,DX,NG`
      }
      
    },
    methods: {
      ...mapMutations({
        setAccountInfo: 'ACCOUNT_INFO',
        clearUserInfo: 'INFO_CLEAR',
      }),
			...mapActions([
				'initQuoteClient'
			]),
      goLast() {
        this.$router.push(this.lastPath);
      },
      goto(path) {
        this.$router.push({
          path: path
        });
      },
      subscribe(){
        this.$store.state.market.markettemp.forEach(element => {
          if (element.CommodityNo== 'CL') {
              this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + element.ExchangeNo + '","CommodityNo":"' + element.CommodityNo + '","ContractNo":"' + element.MainContract +'"}}');
          }
        });
			},
    },
    activated() {
    },
    mounted(){
      this.initQuoteClient();
      setTimeout(() => {
        this.subscribe()
      }, 1000);
      
      
    }
  };
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";
  #home {
    width: 7.5rem;
    padding-top: 0.96rem;
    //background-color: $bg;
    
  }
  .swipe-wrap{
    width: 7.5rem;
    height: 2.4rem;
    
    box-sizing: content-box;
  }
  .butler_list{
    @include flex(space-around);
    padding: 0.24rem 0 0 0;
    border-bottom: 0.16rem solid #e5f9f6;
    .item{
      flex: 1;
      text-align: center;
      p{
        @include font($fs24,0.56rem,$blackNormal);
      }
    }
    .circle{
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        @include font($fs32,0.8rem,$white);
        
    }
    @for $i from 1 through 4 {
      $background_color: (#f79646, #d99694, #93cddd, #9bbb59);
      .item:nth-child(#{$i}) {
        .circle {
          $bg: nth($background_color, $i);
          background-color: $bg;
          
        }
      }
    }

  }
  .cube_wrap{
    padding: 0.5rem 0;
    @include flex();
    .left{
      flex: 1
    }
    .right{
      flex: 1
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
</style>
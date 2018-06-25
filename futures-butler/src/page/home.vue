<template>
  <div id="home" :style="{height:clientHeight}">
    <mt-header fixed title="首页"></mt-header>
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
    <scroll-msg></scroll-msg>
    <div class="butler_wrap">
      <ul class="butler_list">
        <li class="item" v-for="(item, index) in butlerList" :key="item.name" @click="goto(item.path)">
          <span class="circle">{{item.title}}</span>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div class="cube_wrap">
      <Cube :cubeList = 'cubeList'></Cube>
    </div>
    <div class="message_box"></div>    






   
    <bottomTab :tabSelect="tabSelected"></bottomTab>
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
    <!-- <tips-float :isBack="false"></tips-float> -->
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import bottomTab from '../components/bottom_tab'
  import tipsFloat from '../components/tipsFloat'
  import scrollMsg from '../components/scrollMsg'
  import Cube from '../components/Cube'
  import pro from '../assets/js/common'
  
  const local = pro.local;
  
  
  
  export default {
    name: "home",
    components: {
      bottomTab,
      tipsFloat,
      scrollMsg,
      Cube
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
            path: "/butler_community"
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
        cubeList: ['推荐','股指','贵金属','原油'],
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      
    },
    methods: {
      ...mapMutations({
        setAccountInfo: 'ACCOUNT_INFO',
        clearUserInfo: 'INFO_CLEAR',
      }),
      goLast() {
        this.$router.push(this.lastPath);
      },
      goto(path) {
        this.$router.push({
          path: path
        });
      },
    },
    activated() {
  
      this.userInfo = local.get('user')
      this.userList = local.get('userList') || []
      this.idList = local.get('idList') || []
      if (this.userInfo) {
        this.getUserInfo()
      }
  
    },
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
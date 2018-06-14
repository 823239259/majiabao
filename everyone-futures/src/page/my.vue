<template>
  <div id="home" :style="{height:clientHeight}">
    <mt-header fixed title="个人中心">
      <mt-button slot="left" @click="callCustomer">电话客服</mt-button>
      <mt-button slot="right" @click="goto('/service_online')">在线客服</mt-button>
    </mt-header>
    <div class="user_info">
      <div v-if="!isLogin">
        <img :src="accountInfo.wxHeadimgurl||require('../assets/images/account/no_login_icon.png')" alt="用户头像">
        <div class="btn_box">
          <button @click="goto('/login')">&lt&lt&lt 去登录</button>
          <button @click="goto('/register')">去注册 &gt&gt&gt</button>
        </div>
      </div>
      <div v-else>
        <img :src="accountInfo.wxHeadimgurl||require('../assets/images/account/login_icon.png')" alt="用户头像">
        <p class="login">{{accountInfo.wxNickname||mobileHidden(accountInfo.mobile)}}</p>
      </div>
  
    </div>
    <!-- 列表 -->
    <div class="list_wrap">
      <ul class="list">
        <li class="item" v-for="(item, index) in list" :key="item.path" @click="goto(item.path)">
          <span class="icon"></span> {{item.name}}
          <span class="right_icon"></span>
        </li>
        <li class="item" @click="deleteStore"><span class="icon"></span> 删除缓存<span class="right_icon"></span></li>
        <li class="item" @click="shareSystem"><span class="icon"></span> 分享应用<span class="right_icon"></span></li>
      </ul>
    </div>
    <!-- login_out -->
    <!-- <div class="btn_wrap">
              <button v-if="isLogin" @click="loginOut" class="btn">退出登录</button>
          </div> -->
    <bottomTab :tabSelect="tabSelected"></bottomTab>
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
    <!-- <tips-float :isBack="false"></tips-float> -->
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  import bottomTab from '../components/bottom_tab'
  import tipsFloat from '../components/tipsFloat'
  import pro from '../assets/js/common'
  const local = pro.local;
  
  
  
  export default {
    name: "my",
    components: {
      bottomTab,
      tipsFloat
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
        tabSelected: 'my',
        isLogin: false,
        isShow: false,
        idList: [],
        list: [{
            name: "新闻公告",
            path: "/news_info"
          },
          {
            name: "期货知识",
            path: "/help_info"
          },
          {
            name: "意见反馈",
            path: "/feedback"
          },
          {
            name: "用户协议",
            path: "/userRegistrationProtocol"
          },
        ],
        userInfo: {},
        lastPath: '/',
        userList: [],
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      allMoney() {
        if (this.accountInfo.balance && this.accountInfo.freeze) {
          return (this.accountInfo.balance * 1 + this.accountInfo.freeze * 1).toString();
        }
      },
      accountInfo() {
        return this.$store.state.accountInfo;
      },
      isNew() {
        return this.$store.state.newsList.some(item => item.isRead == false)
      }
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
      changeValue(msg, key) {
        //console.log(msg)
        this[key] = msg
      },
      mobileHidden(phoneNumber) {
        return pro.mobileHidden(phoneNumber)
      },
      buwei(numString) {
        if (numString === undefined || null) {
          return numString
        } else if (numString && numString.toString().indexOf('.') > -1) {
          return numString
        } else {
          return numString + '.00'
        }
      },
      loginOut() {
        this.userInfo = {}
        this.clearUserInfo()
        this.isLogin = false
        this.$toast({
          message: "成功退出登录",
          duration: 1000
        })
        local.remove('user')
  
      },
      //获取用户信息
      getUserInfo() {
        const headers = {
          token: this.userInfo.token,
          secret: this.userInfo.secret
        }
        pro.fetch("post", "/account/getBasicMsg", "", headers).then((res) => {
          //console.log(res);
          if (res.code == '1') {
            this.setAccountInfo(res.data);
            this.isLogin = true;
          }
  
        }).catch((err) => {
          var data = err.data;
          if (data == undefined) {
            this.$toast({
              message: "网络不给力，请稍后再试",
              duration: 1000
            });
          } else {
            if (data.code == -9999) {
              this.$toast({
                message: "认证失败，请重新登录",
                duration: 1000
              });
              //this.$router.push({path:"/login"});
            } else {
              this.$toast({
                message: data.message,
                duration: 1000
              });
            }
          }
        })
      },
  
      deleteStore() {
        
        this.$messagebox({
          title: '提示',
          message: '是否确认删除缓存?',
          showCancelButton: true
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
    background-color: $bg;
    overflow: hidden;
  }
  
  .icon {
    display: inline-block;
    width: 0.4rem;
    height: 0.36rem;
  }
  
  .kefu_phone {
    background: url("../assets/images/account/kefu_icon_ihone.png") center no-repeat;
    background-size: cover;
  }
  
  .kefu_icon {
    background: url("../assets/images/account/kefu_icon.png") center no-repeat;
    background-size: cover;
  }
  
  .user_info {
    width: 6.9rem;
    margin: 2.26rem auto 0.24rem;
    background-color: $bgWhite;
    box-shadow: 0 0 10px 2px #ccc;
    overflow: hidden;
    img {
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      margin: 0.2rem auto;
      border-radius: 50%;
    }
    p {
      @include font($fs32,
      0.44rem,
      #333);
      padding-bottom: 0.2rem;
    }
    .login {
      position: relative;
      padding-bottom: 0.2rem;
    }
    .btn_box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: -0.6rem;
      padding-bottom: 0.24rem;
      button {
        width: 2rem;
        height: 0.8rem;
        background-color: inherit;
        border-radius: 0.1rem;
        border: solid 0.02rem #1482f0;
        @include font($fs28,
        0.8rem,
        #1482f0)
      }
    }
  }
  
  .list_wrap {
    width: 6.9rem;
    margin: 0 auto;
    background-color: $bg;
    .item {
      position: relative;
      padding-left: 0.3rem;
      background-color: $bgWhite;
      @include font($fs28,
      0.96rem,
      $blcakThin,
      left);
      border-bottom: 1px solid #e6e6e6;
      margin-top: 0.16rem;
      box-shadow: 0 0 5px 1px #ccc;
    }
    .icon {
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.1rem;
      margin-top: -2px;
      vertical-align: middle;
    }
    .right_icon {
      position: absolute;
      right: 0.3rem;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 0.14rem;
      height: 0.22rem;
      background: url("../assets/images/account/right_jiantou.png") center no-repeat;
      background-size: cover;
      vertical-align: middle;
      text-align: right;
    }
    @for $i from 1 through 6 {
      $background_img: ( //"self_choose_icon",
      "gonggao", "zishi", "yijian", 'xieyi', "shanchu",'fenxiang');
      .item:nth-child(#{$i}) {
        .icon {
          $img: nth($background_img, $i);
          background: url("../assets/images/account/#{$img}.png") center no-repeat;
          background-size: 100%;
        }
      }
    }
  }
  
  .btn_wrap {
    width: 7.5rem;
    text-align: center;
    background-color: $bgGray;
    .btn {
      width: 7rem;
      margin: 0.6rem 0;
      @include font($fs36,
      0.88rem,
      $bg);
      background-color: $redDeep;
      border-radius: 0.44rem;
    }
  }
</style>
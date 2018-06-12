<template>
    <div id="home" :style="{height:clientHeight}">
        <mt-header fixed title="个人中心">           
            <mt-button slot="left"  @click="goLast">
              <span class="icon kefu_phone"></span>
            </mt-button>
            <mt-button slot="right" @click="goto('/information')">
                <span class="icon kefu_icon"></span>
            </mt-button>
        </mt-header>
        <div class="user_info">
            <img :src="accountInfo.wxHeadimgurl||require('../assets/images/account/no_login_icon.png')" alt="用户头像">
            <div class="btn_box" v-if="!isLogin" @click="goto('/login')">
              <button>&lt&lt&lt 去登录</button>
              <button>去注册 &gt&gt&gt</button>
            </div>
             <!-- <p class="login" @click="changeValue(true,'isShow')" v-else>{{accountInfo.wxNickname||mobileHidden(accountInfo.mobile)}}</p> -->
            <p class="login"  v-else>18200295560</p>
        </div>
        <!-- 列表 -->
        <div class="list_wrap">
            <ul class="list">
                <li class="item" v-for="(item, index) in list" :key="item.path" @click="goto(item.path)">
                    <span class="icon"></span>
                    {{item.name}}
                    <span class="right_icon"></span>
                </li>
            </ul>
        </div>
        <!-- login_out -->
        <!-- <div class="btn_wrap">
            <button v-if="isLogin" @click="loginOut" class="btn">退出登录</button>
        </div> -->
        <bottomTab :tabSelect="tabSelected"></bottomTab>
    </div>
</template>

<script>

import {mapMutations} from 'vuex'
import bottomTab from '../components/bottom_tab'
import pro from '../assets/js/common'
const local = pro.local;



export default {
  name: "my",
  components: {
    bottomTab
  },
  data() {
    return {
      tabSelected: 'my',
      isLogin: false,
      isShow: false,
      idList: [],
      list: [
        {
          name: "新闻公告",
          path: "/my_match"
        },
        {
          name: "期货知识",
          path: "/self_setting"
        },
        {
          name: "意见反馈",
          path: "/customer_server"
        },
        {
          name: "删除缓存",
          path: "/help_docs"
        },
        {
          name: "分享应用",
          path: "/news_info"
        }
      ],
      userInfo: {},
      lastPath: '/',
      userList: []
    };
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
    allMoney () {
      if(this.accountInfo.balance &&this.accountInfo.freeze) {
       return (this.accountInfo.balance*1 + this.accountInfo.freeze*1).toString();
      }
    },
    accountInfo () {
      return this.$store.state.accountInfo;
    },
    isNew () {
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
      this.$router.push({ path: path });
    },
    changeValue (msg, key) {
      //console.log(msg)
      this[key] = msg
    },
    mobileHidden (phoneNumber) {
        return pro.mobileHidden(phoneNumber)
    },
    buwei (numString) {     
      if(numString === undefined||null) {
          return  numString
      }else if(numString&&numString.toString().indexOf('.')>-1){
         return  numString
      }else{  
         return  numString + '.00'
      }
    },
    loginOut () {
      this.userInfo = {}
      this.clearUserInfo()
      this.isLogin = false
      this.$toast({message:"成功退出登录",duration: 1000})
      local.remove('user')

    },
    //获取用户信息
		getUserInfo () {     
		  const headers = {
					token : this.userInfo.token,
					secret : this.userInfo.secret
				}
				pro.fetch("post","/account/getBasicMsg","",headers).then((res)=>{
            //console.log(res);
            if(res.code == '1'){
              this.setAccountInfo(res.data);
              this.isLogin = true; 
            }
                     
        }).catch((err)=>{
					var data = err.data;
					if(data == undefined){
						this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
					}else{
						if(data.code == -9999){
							this.$toast({message:"认证失败，请重新登录",duration: 1000});
							//this.$router.push({path:"/login"});
						}
						else{
							this.$toast({message:data.message,duration: 1000});
						}
					}
				})
    },  
    //获取新闻列表
     getNewList() {
                const data = {
                    pageNo: 1,
                    pageSize: 20
                }
                pro.fetch("post", "/others/getNoticeList", data, "").then((res) => {
                    //console.log(res)
                   if(res.success == true){
						if(res.code == 1){
                            /* 
                                本地存储新闻内容 
                                 1.给返回的list 添加一个isread属性
                                 2. 点击事件 改变所点击那个item的isread 
                                    2.1 改变isread 
                                    2.2 存储 item 的id
                                 3. 重新渲染 对比本地存储的id,改变isread
                                    3.1 二次循环 改变对应id 的 isread属性
                                    3.2 赋值给渲染的 属性   
                            */
                            //console.log(res)
                            if(res.data.list) {
                                const newList  = res.data.list.reduce((arr,item) => {
                                  //是否在idList中                                
                                  item.isRead = this.idList.includes(item.id);
                                  //考虑置顶
                                  if(item.isTop == 1) {
                                    arr.unshift(item)
                                  }else{
                                    arr.push(item)
                                  }
                                  return arr
                              },[]);
                              this.$store.state.newsList = newList
                              }
                        }
                    }
    
                }).catch((err) => {
                    var data = err.data;
                    console.log(err)
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
                            this.$router.push({
                                path: "/login"
                            });
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 1000
                            });
                        }
                    }
                })
            },    

  },  
  activated () {   
    
    this.userInfo = local.get('user')
    this.userList = local.get('userList')||[]
    this.idList = local.get('idList')||[]
    this.getNewList() //为了得到新闻中心信息是否更新
    if(this.userInfo){
      this.getUserInfo()  
    }
    
  },
  beforeRouteEnter: (to, from, next) => {
    //console.log(from)
    next(vm => {
      // 通过 `vm` 访问组件实例
      //console.log(from.path)
      const lastPathArr = ['/home', '/quote', '/match', '/discover', '/trade']
      if(lastPathArr.includes(from.path)){        
        vm.lastPath = from.path
      }
  })
    // ...
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
#home {
  width: 7.5rem;
  background-color: $bgPink;
}
.icon {
  display: inline-block;
  width: 0.4rem;
  height: 0.36rem;
 
}
.kefu_phone{
   background: url("../assets/images/account/kefu_icon_ihone.png") center no-repeat;
  background-size: cover;
}
.kefu_icon{
  background: url("../assets/images/account/kefu_icon.png") center no-repeat;
  background-size: cover;
}
.user_info {
  width: 7.5rem;
  padding: 0.96rem 0 0 0;
  background-color: $headColr;
  border: #dbdee1 1px solid;
  img {
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0.2rem auto;
    border-radius: 50%;
  }
  p {
    @include font($fs32,0.44rem,#333);
    padding-bottom: 0.2rem;
  }
  .login {
    position: relative;
    padding-bottom: 0.2rem;
    
  }
  .btn_box{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: -0.6rem;
    padding-bottom: 0.24rem;
    button{
      width: 2rem;
      height: 0.8rem;
     background-color: inherit;
      border-radius: 0.1rem;
      border: solid 0.02rem #1482f0;
      @include font($fs28,0.8rem,#1482f0)
    }
  }
}

.list_wrap {
  width: 7.5rem;
  background-color: $bgRed;
  .item {
    position: relative;
    padding-left: 0.3rem;
    @include font($fs28,0.96rem,$blcakThin,left);
    border-bottom: 1px solid #e6e6e6;
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
  @for $i from 1 through 5 {
    $background_img: (
      //"self_choose_icon",
      "gonggao",
      "zishi",
      "yijian",
      "shanchu",
      'fenxiang'
    );
    .item:nth-child(#{$i}) {
      .icon {
        $img: nth($background_img, $i);
        background: url("../assets/images/account/#{$img}.png") center
          no-repeat;
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
    @include font($fs36,0.88rem,$bg);
    background-color: $redDeep;
    border-radius: 0.44rem;
  }
}
</style>
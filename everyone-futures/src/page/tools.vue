<template>
    <div id="tools" :style="{height:clientHeight}">
        <mt-header fixed title="工具箱"></mt-header>
        <div class="tools_wrap">
            <div class="tools_item">
              <h3>币种计算</h3>
              <span class="icon icon1"></span>
              <p>汇率计算</p>
            </div>
             <div class="tools_item">
              <h3 class="pink">规则查询</h3>
               <span class="icon icon2"></span>
              <p>期货合约查询</p>
            </div>
             <div class="tools_item">
              <h3>价格计算</h3>
               <span class="icon icon3"></span>
              <p>期货价格计算</p>
            </div>
        </div>
        <bottomTab :tabSelect="tabSelected"></bottomTab>
    </div>
</template>

<script>

import {mapMutations} from 'vuex'
import bottomTab from '../components/bottom_tab'
import pro from '../assets/js/common'
const local = pro.local;
export default {
  name: "tools",
  components: {
    bottomTab
  },
  data() {
    return {
      tabSelected: 'tools',
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
#tools {
  width: 7.5rem;
  background-color: $bgPink;
}

.tools_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.96rem;
  .tools_item{
    flex: 1;
    height: 11.4rem;
    h3{
      @include font($fs36,2.36rem,#b41b02);
      font-weight: bold;
    }
    .pink{
      color: #f89a8a;
    }
    .icon{
      display: block;
      margin: 1rem auto 0;
      width: 0.88rem;
      height: 0.88rem;
      background-color: #b41b02;
    }
    p{
      @include font($fs28,1.14rem,#333);
    }

  }
  @for $i from 1 through 3 {
    $background_img: (
      "jisuanqi",
      "heyuechaxun",
      "jiagejisuan",
    );
    .tools_item:nth-child(#{$i}) {
        $img: nth($background_img, $i);
        background: url("../assets/images/tools/#{$img}_bg.jpg") center no-repeat;
        background-size: cover;
        .icon{
          background: url("../assets/images/tools/#{$img}_icon.png") center no-repeat;
          background-size: cover;
        }
      
    }
  }
}
</style>
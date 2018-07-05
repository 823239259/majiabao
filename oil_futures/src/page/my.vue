<template>
  <div id="home" :style="{height:clientHeight}">
    <mt-header fixed title="我的">
			<mt-button slot="left" @click="showTab('tabShow')">
				<span class="tab_icon header_icon"></span>
			</mt-button>
			<mt-button slot="right">
				<span class="search_icon header_icon" @click="goto('/home_search')"></span>
			</mt-button>
		</mt-header>
    <div class="user_info">
     
        <!-- <img :src="accountInfo.wxHeadimgurl||require('../assets/images/account/user_header.png')" alt="用户头像"> -->
        <div class="btn_box">
          <div class="box">
              <button @click="goto('/login')" v-if="!isLogin">登录</button>
              <div v-else>
                <p class="login">已登录</p>
                 <p class="login" @click="changeName(accountInfo.mobile)">{{nameList[accountInfo.mobile]||mobileHidden(accountInfo.mobile)}}</p>
              </div>
          </div>
          <template v-for="(v, index) in parameters">
          	 <div class="box" v-if="v.CommodityNo == currentNo">
	              <button @click="goto('/register')" v-if="!isLogin">注册</button>
	              <div v-else>
	                <p>{{v.CommodityName}}</p>
	                <p :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</p>
	                <p class="green">
	                	<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
	    							<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
	                </p>
	              </div>
	          </div>
          </template>
          
        </div>
    </div>
    <cloud :cloudList='list'></cloud>
    <bottomTab :tabSelect="tabSelected" v-show="tabShow" @show-tab="showTab($event,'tabShow')"></bottomTab>
    <tipsFloat></tipsFloat>
    
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  import bottomTab from '../components/bottom_tab'
  import cloud from '../components/cloud'
  import tipsFloat from '../components/tipsFloat'
  import pro from '../assets/js/common'

  const local = pro.local;
  
  
  
  export default {
    name: "my",
    components: {
      bottomTab,
      cloud,
      tipsFloat
      
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
      	currentNo:'CL',
        tabSelected: 'my',
        isLogin: false,
        isShow: false,
        tabShow: false,
        idList: [],
        list: [
          {
            name: '消息中心',
            path: "/list/messages"
          },
          {
            name: '近期热门',
            path: '/news_details/1'
          },
          {
            name: '活动中心',
            path: "/activity_list"
          },
          {
            name: '在线客服',
            path: '/service_online'
          },
          {
            name: '删除缓存',
            method: 'deleteStore'
          },
          {
            name: '关于我们',
            path: "/about_us"
          },
          {
            name: '电话客服',
            method: 'callCustomer'
          },
          {
            name: '新人学堂',
            path: '/list/class'
          },
          {
            name: '规则检索',
            path: '/contract_search'
          },
          {
            name: '数据工具',
            path: '/tools_item/5'
          },
          {
            name: '意见反馈',
            path: '/tell_us'
          },
          {
            name: '日历工具',
            path: '/message'
          },
          {
            name: '换算工具',
            path: '/futures_calc'
          },
          {
            name: '币种换算',
            path: '/exchange_calc'
          },
          {
            name: '其他行情',
            path: '/tools_item/1'
          },
          {
            name: '发现工具',
            path: '/discover'
          },
          {
            name: '视频教学',
            path: '/class_room'
          },
          {
            name: '更多内容',
            method: 'moreContent'
          }
        ],
        userInfo: {},
        lastPath: '/',
        userList: [],
        serversList: [{
          name: '收藏',
          img: require('../assets/images/account/heart_icon.png'),
          method: 'toCollection'
        },
        {
          name: '客服',
          img: require('../assets/images/account/customer_icon.png'),
          method: 'callCostumer'
        },
        
        ],
        nameList: {},
        listIndex: 0
  
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
        this.$messagebox.confirm('是否确认删除缓存?',{
          title: '提示',

        }).then(action => {
          
           this.$toast({
                message: '缓存删除成功',
                duration: 1000
              })
        }).catch(action => {
           
        })
      },
      itemClick (item) {
				if(item.path) {
					this.$router.push({path: item.path})
				}
				if(item.method){
					console.log(item.method)
					this[item.method]()
				}
      },
      callCostumer () {

        //第二项如果是对象就是配置项,否者是第三项才是配置选项
        this.$messagebox.confirm('17313119220',{
          title: '客服热线',
          confirmButtonText: '呼叫'

        }).then(action => {
          
            window.location.href = 'tel://' + 17313119220;
        }).catch(action => {
           
        })
      },
      
      changeName (mobile) {
          if (!mobile) return;
            this.$messagebox.prompt('您的昵称',{
                inputPlaceholder: '请输入您的昵称',
                inputErrorMessage: '昵称1-8个字',
                inputValidator (value) {
                   if (value === null) {  
                        return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验  
                    }  
                   return (value.length < 8 || value.length > 1)
                }
            }).then(({value,action}) => {
                //console.log(11)
                this.$toast({message: '修改成功',duration: 1000})
                this.setName(mobile,value)
                
            }).catch(({value,action}) => {
                //console.log(123)
            })
      },
      setName (mobile, name) {
          this.$set(this.nameList, mobile, name)
          //this.nameList[mobile] = name;
          local.set('nameList',this.nameList)
          
      },
      toCollection () {
          if(!this.isLogin) return this.$toast({message: '请先登录才能使用收藏功能',duration: 1000});
          this.goto('/my_collection')
      },
      //运动函数
      moveCircle () {
        // itemList.forEach(item => {
            
           
            setInterval(()=>{
              if (this.listIndex == 4) {
                this.listIndex = 0
              }else{
                this.listIndex++;
              }
              
            },2000)
        // });
        
        
     },
  
    },
    activated() {
    	this.$store.state.market.Parameters = [];
    	this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + "NYMEX" + '","CommodityNo":"' + "CL" + '","ContractNo":"' + "1808" +'"}}');
      this.userInfo = local.get('user')
      this.userList = local.get('userList') || []
      this.idList = local.get('idList') || []
      this.nameList = local.get('nameList')|| {}
      if (this.userInfo) {
        this.getUserInfo()
      }
      this.moveCircle()
  
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
  };
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";
  @keyframes big {
    0%   {transform: rotate(0)}
    100% {transform: rotate(360deg)}
  }

  #home {
    width: 7.5rem;
    background-color: $white;
    padding-top: 0.96rem;
    overflow: hidden;
  }
  
  .icon {
    display: inline-block;
    width: 0.4rem;
    height: 0.36rem;
  }
  .user_info {
    margin: 0 auto 0.24rem;
    background-color: $bgWhite;
    border-bottom: #e5f9f6 0.16rem solid;
    overflow: hidden;
    img {
      display: block;
      width: 1rem;
      height: 1rem;
      margin: 0.2rem auto;
      border-radius: 50%;
      
    }
    p {
      @include font($fs32,0.44rem,#fff);
    }
    .login {
      position: relative;
      padding-bottom: 0.2rem;

    }
    .btn_box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 6.9rem;
      margin: 0.3rem auto;
      border-radius: 0.1rem;
      .box{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        text-align: center;
        background-color: #20202d;
        height: 2.4rem;
       p{
       	&.red{
						color: #ff3363;
					}
					&.green{
						color: #11d974;
					}
       }
        
      }
      .box:nth-child(1){
        background-color: #2c2e3d;
      }
      button {
        width: 1.6rem;
        height: 0.8rem;
        background-color: inherit;
        border-radius: 0.1rem;
        border: solid 0.02rem #fff;
        @include font($fs28,0.8rem, #fff);
        
      }
      .green{
         span{
        	&.red{
						color: #ff3363;
					}
					&.green{
						color: #11d974;
					}
        }
      }
      .center{
          @include font($fs32,0.4rem,#333);
          padding: 0 .8rem;
          .name{
            @include font($fs28,0.4rem,#283835);
          }
      }
    }
  }
  .servers_box{
    width: 7.5rem;
    @include flex();
    border-bottom: #e5f9f6 0.16rem solid;
    .servers_item{
      flex: 1;
      img{
        display: block;
        margin: 0.1rem auto;
        width: 0.4rem;
        height: 0.4rem;
      }
      .img{
        width: 0.32rem;
        height: 0.4rem;
      }
      p{
        @include font($fs24,0.4rem,$blackNormal)
      }
    }
  }
  .list_wrap {
    width: 7.5rem;
    .list{
      position: relative;
      width: 7.5rem;
      height: 7rem;
      .item{
        position: absolute;
        width: 1.65rem;
        height: 1.65rem;
        box-shadow: 0 0 10px #ccc;
        @include font($fs36,1.65rem,$white);
        border-radius: 50%; 
        // animation:big 2s infinite;
      }
      .animate1 {
        animation:big 2s;
      }
      @for $i from 1 through 5 {
      $bgcolor: (#e46c0b, #94cdde, #e18683, #9bbb58, #03a2dc); 
      .item:nth-child(#{$i}) {
          $color: nth($bgcolor, $i);
          background-color: $color;
          //animation:big 2s infinite #{$i * 2}s;
        
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
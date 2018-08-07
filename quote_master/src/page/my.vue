<template>
  <div id="home">
    <mt-header fixed title="个人中心"></mt-header>
    <div class="swipe-wrap">
      <mt-swipe :auto="0">
        <mt-swipe-item>
          <img src="../assets/images/my/banner01.png" alt="banner1">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/images/my/banner02.png" alt="banner2">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/images/my/banner03.png" alt="banner3">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <scroll-msg></scroll-msg>
    <div class="recommend_wrap">
      <h2 class="title">今日品种推荐</h2>
      <ul class="recommend_list">
        <li :class="['item',item.className]" v-for="(item, index) in recommendList" :key="index" @click="alert">{{item.name}}</li>
      </ul>
    </div>
    <div class="yesterday_wrap">
      <h2 class="title">昨日趋势</h2>
      <div class="box">
        <div class="box_content">
          <p class="green"><span>{{upFloat}}</span>%</p>
          <p class="text">品种上涨</p>
        </div>
        <div class="box_content">
          <p class="red"><span>{{downFloat}}</span>%</p>
          <p class="text">品种下跌</p>
        </div>
      </div>
    </div>
    <div class="user_wrap">
      <div class="box">
         <ul class="user_list">
            <li class="item draggle" v-for="(item, index) in serversList" :key="index">
              <img :id="'draggle'+index" class="icon" :src="item.img" title="img"/>
              <p>{{item.name}}</p>
            </li>
          </ul>
      </div>
      <div class="traggle_content">将图标拖动至此处区域可打开该功能</div>
    </div>
    <div class="login_wrap">
      <template v-if="isLogin">
          <div class="flex_item">
            <img class="img" src="../assets/images/my/header_icon.png" alt="header_icon">
          </div>
          <div class="flex_item text">18200295560</div>
      </template>
      <template v-else>
        <button>登录</button>
        <button>注册</button>
      </template>
    </div>
    <bottomTab :tabSelect="tabSelected"></bottomTab>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  import bottomTab from '../components/bottom_tab'
  import scrollMsg from '../components/scrollMsg'
  import pro from '../assets/js/common'

  const local = pro.local;
  const recommendList = [
          {
            className: 'oil_bg',
            name: '国际原油'
          },
           {
            className: 'gold_bg',
            name: '美黄金'
          },
           {
            className: 'silver_bg',
            name: '美白银'
          },
           {
            className: 'gas_bg',
            name: '天然气'
          },
           {
            className: 'copper_bg',
            name: '美铜'
          },
           {
            className: 'hezhi_bg',
            name: '恒指期货'
          },
           {
            className: 'A50_bg',
            name: '富时A50'
          },
          {
            className: 'dezhi_bg',
            name: '德指'
          },
           {
            className: 'minidaoqiong_bg',
            name: '迷你道琼'
          }
        ]
  export default {
    name: "my",
    components: {
      bottomTab,
      scrollMsg
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
      	currentNo:'CL',
        tabSelected: 'my',
        isLogin: false,
        isShow: false,
        tabShow: true,
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
          // {
          //   name: '在线客服',
          //   path: '/service_online'
          // },
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
          name: '出口价格',
          img: require('../assets/images/my/chukou_icon.png'),
        },
        {
          name: '拨打热线',
          img: require('../assets/images/my/rexian_icon.png'),
        },
        {
          name: '在线咨询',
          img: require('../assets/images/my/zixun_icon.png'),
        },
        {
          name: '金融数据',
          img: require('../assets/images/my/jinrong_icon.png'),
        },
        {
          name: '投资教育',
          img: require('../assets/images/my/jiaoyu_icon.png'),
        },
        {
          name: 'BUG反馈',
          img: require('../assets/images/my/bug_icon.png'),
        },
        {
          name: '收藏中心',
          img: require('../assets/images/my/shouchang_icon.png'),
        },
        {
          name: '热门时事',
          img: require('../assets/images/my/remen_icon.png'),
        },
        {
          name: '我们是谁',
          img: require('../assets/images/my/woshi_icon.png'),
        },
        {
          name: '推荐应用',
          img: require('../assets/images/my/tuijian_icon.png'),
        },
        {
          name: '清理垃圾',
          img: require('../assets/images/my/qingli_icon.png'),
        },
        
        ],
        nameList: {},
        listIndex: 0,
        recommendList: [],
        upFloat: 0,
  
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
      downFloat(){
        return 100 - this.upFloat
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
      getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      },
      alert () {
          this.$messagebox.alert('提示',{
              title: '提示',
              message: '推荐品种不作为投资建议',
              confirmButtonText: '了解了'
          })
      },
      getRandom (min,max) {
        let val = max - min;
        return Math.floor(Math.random()*min+val)
      },
      draggle () {
          var block = document.getElementById("draggle0");
          var myWidth = block.clientWidth;
          console.log(block);
          
          var oW,oH;
          var IsClone = true;
          // 绑定touchstart事件
          block.addEventListener("touchstart", function(e) {
              console.log(e);
              var touches = e.touches[0];
              oW = touches.clientX - block.offsetLeft; //点击点到左边的距离
              oH = touches.clientY - block.offsetTop;  //点击点到顶部的距离
               console.log(oW);
               console.log(oH);
              
              //阻止页面的滑动默认事件
              window.addEventListener("touchmove",defaultEvent,{ passive: false });
          },false)
        
          block.addEventListener("touchmove", function(e) {
            console.log(111);
              if (IsClone) {
                 //复制一个对象
                var abc = block.cloneNode();
                block.style.position = 'absolute'
                document.getElementsByClassName("draggle")[0].insertBefore(abc,block);
                IsClone = false
              }
              var touches = e.touches[0];
              var oLeft = touches.clientX - oW;
              var oTop = touches.clientY - oH;
              if(oLeft < 0) {
                oLeft = 0;
              }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
                oLeft = (document.documentElement.clientWidth - block.offsetWidth);
              }
              console.log(oLeft,'当前x');
              console.log(oTop,'当前y');
              block.style.left = oLeft + "px";
              block.style.top = oTop + "px";
          },false);
          
          block.addEventListener("touchend",function(e) {
            var content = document.getElementsByClassName('traggle_content')[0]
            var contentWidth = content.clientWidth;
            var contentBorder = content.clientLeft;
            var contentLeft = content.offsetLeft;

            var Cleft = contentBorder + contentLeft;
            var Cright = Cleft + contentWidth;

            var target = e.changedTouches[0]

            var oLeft = target.clientX - oW;
            var oTop = target.clientY - oH;

            console.log(oLeft);
            console.log(oTop);
            
            if((oLeft>=Cleft&&oLeft<=Cright - myWidth)){
              console.log(1)
            }

            console.log()
            window.removeEventListener("touchmove",defaultEvent,{ passive: false });
          },false);
          function defaultEvent(e) {
            e.preventDefault();
          }
      }
    },
    created() {
      this.recommendList = this.getRandomArrayElements(recommendList,4)
      this.upFloat = this.getRandom(30,70)
      
    },
    mounted() {
      this.draggle()
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
    background-color: $masterBg;
    padding-top: 0.96rem;
    padding-bottom: 1.12rem; 
    //overflow: hidden;
  }
  
  .icon {
    display: inline-block;
    width: 0.4rem;
    height: 0.36rem;
  }
  .swipe-wrap{
    width: 7.5rem;
    height: 2.4rem;
    padding-top: 0.3rem;
    box-sizing: content-box;
  }
  .quote_wrap{
    width: 7.5rem;
    padding: 0 0.3rem;
    @include flex(space-between);
    @include font($fs30,0.6rem,#9597a3,left);
    background-color: #383b4e;
    .left_box{
      flex: 3
    }
    .numbers{
      flex: 1;
    }
  }
  .recommend_wrap{
    border-bottom: 0.2rem solid #383b4e;
    .title{
      padding: 0 0.3rem;
      @include font($fs32,1rem,#fff,left);
      border-bottom: 1px solid #383b4e;

    }
    .recommend_list{
      padding: 0.3rem;
      @include flex(space-between);
      @include font($fs26,1rem,#fff);

    }
    .item{
      flex: 1;
      width: 1.5rem;
      height: 1rem;
    }
    
    @for $i from 1 through 9 {
      $list: ("oil_bg",'gold_bg', 'silver_bg', 'gas_bg', 'copper_bg', 'hezhi_bg', 'A50_bg','dezhi_bg','minidaoqiong_bg');
      $item: nth($list,$i);
      .#{$item}{
        background: url('../assets/images/my/#{$item}.png') center no-repeat;
        background-size: 1.5rem 1rem;
      }
    }
  }
  .yesterday_wrap{
    .title{
      padding: 0 0.3rem;
      @include font($fs32,1rem,#fff,left);
      border-bottom: 1px solid #383b4e;
    }
    .box{
      margin: 0.3rem;
      padding: 0.3rem;
      @include flex(space-between);
      background-color: #35384b;
    }
    .box_content{
      border: 0.3rem solid #4c4f60;
      width: 3rem;
      height: 2rem;
      @include font($fs26,0.36rem,#686b7a);
      .green,.red{
        @include font($fs30,0.8rem,#fff);
        span{
          font-size: 0.6rem;
          font-weight: bold;
        }
      }
    }
  }
  .user_wrap{
    width: 7.5rem;
    border-bottom: 0.2rem solid #383b4e;
    .box{
      overflow-x: scroll;
    }
    .user_list{
      width: 15rem;
      padding: 0.3rem;
      border-bottom: 1px solid #383b4e;
      @include flex(space-between);
      @include font($fs24,0.4rem,#9597a3);
      
      .item{
        width: 1rem;
        .icon{
          width: 1rem;
          height: 1rem;
        }
        p{
          padding-top: 0.1rem
        }
        
      }
    }
    .traggle_content{
      margin: 0.3rem;
      height: 2.4rem;
      border: 0.3rem solid #4c4f60;
      @include font($fs26,2rem,#686b7a)
    }
  }
  .login_wrap{
    @include flex(space-between);
    padding:0.3rem;
    border-bottom: 1px solid #383b4e;
    .flex_item{
      flex: 1;
      
    }
    .text{
      @include font($fs30,1rem,#fff,right)
    }
    .img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    button {
      width: 1.6rem;
      height: 0.8rem;
      background-color: inherit;
      border-radius: 0.1rem;
      border: solid 0.02rem #fff;
      @include font($fs28,0.8rem, #fff);
      
    }
    
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
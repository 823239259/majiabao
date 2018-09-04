<template>
  <div id="home">
    <TopTitle title="我的" >
        <span slot="my_right" class="header_icon customer_icon" @click="callCostumer" ></span>
    </TopTitle>
    <loginDisplay></loginDisplay>
    <div class="blockColor"></div>
    <myList :list = "serversList"></myList>
    <bottomTab :tabSelect="tabSelected"></bottomTab>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  import bottomTab from '../components/bottom_tab'
  import TopTitle from '../components/top_Title'
  import scrollMsg from '../components/scrollMsg'
  import loginDisplay from './account/components/login_Display'
  import myList from './account/components/my_List'
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
      scrollMsg,
      TopTitle,
      loginDisplay,
      myList
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
        tabSelected: 'my',
        serversList: [
          {
          name: '大师汇率',
          img: require('../assets/images/icons/exchange_icon.png'),
          path: '/exchange_calc'
        },
        {
          name: '分享大师',
          img: require('../assets/images/icons/share_icon.png'),
          method: 'shareSystem'
        },
        {
          name: '意见反馈',
          img: require('../assets/images/icons/feedback_icon.png'),
          path:"/tell_us",
        },
        {
          name: '大师活动',
          img: require('../assets/images/icons/activity_icon.png'),
          path:"/activity_list",
        },
        {
          name: '关于我们',
          img: require('../assets/images/icons/about_icon.png'),
          path: '/about_us'
        }
        ],
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      accountInfo() {
        return this.$store.state.accountInfo;
      },
    },
    methods: {
      //获取用户信息
      deleteStore() {
        this.$messagebox.confirm('是否删除缓存?',{
          title: '提示',
        }).then(action => {
          
           this.$toast({
                message: '缓存删除成功',
                duration: 1000
              })
        }).catch(action => {
           
        })
      },
      callCostumer () {
        //第二项如果是对象就是配置项,否者是第三项才是配置选项
        this.$messagebox.confirm('028-61357158',{
          title: '联系客服',
          confirmButtonText: '呼叫'
        }).then(action => {
            window.location.href = 'tel://' + '028-61357158';
        }).catch(action => {
           
        })
      },
    },
    activated() {
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
    background-color: #fff;
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
.blockColor{
  width: 7.5rem;
  height: 0.16rem;
  background-color: #f4f5f6;
}  
</style>
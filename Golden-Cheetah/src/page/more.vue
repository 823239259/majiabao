<template>
<div id="home">
  <TopTitle title="更多" />
  <div class="more_box">
    <h2>账号</h2>
    <loginDisplay></loginDisplay>
  </div>
  <div class="more_box">
    <h2>小工具</h2>
    <myList :list="serversList"></myList>
  </div>
  <div class="more_box">
    <h2>持仓数据</h2>
    <myList :list="dataList"></myList>
  </div>
  <div class="more_box">
    <h2>更多贵金属行情</h2>
    <Cube :cubeList="cubeList"></Cube>
  </div>

  <bottomTab :tabSelect="tabSelected"></bottomTab>

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
import Cube from '../components/Cube'
import pro from '../assets/js/common'

const local = pro.local;
const recommendList = [{
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
  name: "more",
  components: {
    bottomTab,
    scrollMsg,
    TopTitle,
    loginDisplay,
    myList,
    Cube
  },
  mixins: [pro.mixinsToCustomer],
  data() {
    return {
      tabSelected: 'more',
      serversList: [{
          name: '客服',
          img: require('../assets/images/golden_cheetah/customer_icon.png'),
          method: 'callCustomer'
        },
        {
          name: '关于猎豹',
          img: require('../assets/images/golden_cheetah/about_icon.png'),
          path: "/about_us",
        },
        {
          name: '推荐应用',
          img: require('../assets/images/golden_cheetah/tell_icon.png'),
          method: 'shareSystem'
        },
        {
          name: '修改密码',
          img: require('../assets/images/golden_cheetah/reset_password_icon.png'),
          path: "/resetPassword",
        },
        {
          name: '切换账号',
          img: require('../assets/images/golden_cheetah/change_accout_icon.png'),
          path: '/login'
        }
      ],
      dataList: [
        {
          name: 'ETF持仓',
          img: require('../assets/images/golden_cheetah/ETF_icon.png'),
          path: "/about_us",
        },
        {
          name: 'CFTC持仓',
          img: require('../assets/images/golden_cheetah/CFTC_icon.png'),
          path: "/about_us",
        },
      ],
      cubeList: ['现货黄金','现货白银','现货铂金','现货钯金','台湾黄金','香港黄金'],
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
      this.$messagebox.confirm('是否删除缓存?', {
        title: '提示',
      }).then(action => {

        this.$toast({
          message: '缓存删除成功',
          duration: 1000
        })
      }).catch(action => {

      })
    },
    callCostumer() {
      //第二项如果是对象就是配置项,否者是第三项才是配置选项
      this.$messagebox.confirm('028-61357158', {
        title: '联系客服',
        confirmButtonText: '呼叫'
      }).then(action => {
        window.location.href = 'tel://' + '028-61357158';
      }).catch(action => {

      })
    },
  },
  activated() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
@keyframes big {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
}

#home {
  width: 7.5rem;
  background-color: $bodyBg;
  padding-top: 0.96rem;
  padding-bottom: 1.12rem;
  //overflow: hidden;
}

.icon {
  display: inline-block;
  width: 0.4rem;
  height: 0.36rem;
}

.swipe-wrap {
  width: 7.5rem;
  height: 2.4rem;
  padding-top: 0.3rem;
  box-sizing: content-box;
}

.blockColor {
  width: 7.5rem;
  height: 0.16rem;
  background-color: #f4f5f6;
}

.more_box {
  width: 7.5rem;
  padding: 0 0.3rem;
  h2 {
    @include font($fs32, 0.72rem, #bfc0c1, left)
  }
}
</style>
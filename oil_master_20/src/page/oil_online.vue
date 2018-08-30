<template>
  <div id="oil_online">
    <TopTitle title="原油直播" />
    <div class="blockColor"></div>
    <myList :list = "teachersList"></myList>
    <bottomTab :tabSelect="tabSelected"></bottomTab>
    <footer class="note">更多原油分析大咖招募中，敬请期待</footer>
  </div>
</template>

<script>
  import bottomTab from '../components/bottom_tab'
  import TopTitle from '../components/top_Title'
  import myList from './oil_online/components/oil_List'
  import pro from '../assets/js/common'
  const local = pro.local;
  
  export default {
    name: "oil_online",
    components: {
      bottomTab,
      TopTitle,
      myList
    },
    data() {
      return {
        tabSelected: 'oil_online',
        teachersList: [
          {
          name: '大川',
          title: '资深国际原油分析师',
          img: require('../assets/images/oil_master/dashan_icon.png'),
          path: '/oil_online_details/大山'
        },
        {
          name: '老王',
          title: '资深布伦特原油分析师',
          img: require('../assets/images/oil_master/laowang_icon.png'),
          path: '/oil_online_details/老王'
        },
        {
          name: '小静老师',
          title: '资深小原油分析师',
          img: require('../assets/images/oil_master/xiaojin_icon.png'),
          path: '/oil_online_details/小静'
        },
        {
          name: '孙教授',
          title: '原油资深分析大咖',
          img: require('../assets/images/oil_master/sunjiaoshou_icon.png'),
          path: '/oil_online_details/孙教授'
        },
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

  #oil_online {
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
.note{
  position: absolute;
  bottom: 3.6rem;
  width: 100%;
  @include font($fs28, 0.36rem, $btn_border_color);
  
}
</style>
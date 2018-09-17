<template>
  <div id="butler_welfare" :style="{height:clientHeight}">
    <mt-header fixed title="活动中心" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
        <div class="box" v-for="item in imgList" @click="goto(item.id)">
            <div class="title">
              <p><span class="spacial">#比赛</span> {{item.title}}</p>
              <span>{{item.time}}</span>
            </div>
            <img :src="item.img" alt="01">
        </div>
        
    </div>
    
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  const local = pro.local;
  
  export default {
    name: "butler_welfare",
    components: {
     
    },
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        imgList: [
          {
            title: '2018原油模拟大盘赛',
            time:'2018-6-15',
            img: require('../../assets/images/home/img03.jpg'),
            id: 1
          },
          { 
            title: '首届原油模拟盘比赛',
            time:'2018-6-15',
            img: require('../../assets/images/home/activity02_banner.jpg'),
            id: 2
          }
        ]
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      
    },
    methods: {
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      goto(path) {
        this.$router.push({
          path: `/activity_details/${path}`
        });
      },
    },
    activated() {
  
      
  
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #butler_welfare {
    width: 7.5rem;
    padding-top: 0.96rem;
    background-color: #fff;
  }
  .box{
    padding: 0  0.3rem 0.3rem;
    margin-bottom: 0.16rem; 
    border-bottom: 1px solid #d2dae7;
  }
  .title{
    @include flex(space-between);
    @include font($fs28,0.88rem,#333333,left);
    span{
      color: #9094a8
    }
    .spacial{
      color: #5534ff
    }
  }


</style>
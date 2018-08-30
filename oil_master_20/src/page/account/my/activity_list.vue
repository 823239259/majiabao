<template>
  <div id="activity_list" :style="{height:clientHeight}">
    <TopTitle title="大师活动" type="back" />
    <div class="wrap">
        <div class="box" v-for="(item,index) in imgList" :key="index" @click="goto(item.id)">
            <div class="title">
              <!-- <p><span class="spacial">#比赛</span> {{item.title}}</p> -->
              <span>{{item.time}}</span>
            </div>
            <img :src="item.img" alt="01">
        </div>
        
    </div>
    
  </div>
</template>

<script>
  import pro from '../../../assets/js/common'
  import TopTitle from '../../../components/top_Title'
  const local = pro.local;
  
  export default {
    name: "activity_list",
    components: {
      TopTitle
    },
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        imgList: [
          {
            // title: '2018原油模拟大盘赛',
            // time:'2018-6-15',
            img: require('../../../assets/images/oil_master/activity01_banner.jpg'),
            id: 0
          },
          { 
            // title: '首届原油模拟盘比赛',
            // time:'2018-6-15',
            img: require('../../../assets/images/oil_master/activity02_banner.jpg'),
            id: 1
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
  @import "../../../assets/css/common.scss";
  #activity_list {
    width: 7.5rem;
    padding-top: 0.96rem;
    //background-color: $bgButler;
  }
  .box{
    // padding: 0  0.3rem 0.3rem;
    margin-bottom: 0.16rem; 
    // border-bottom: 1px solid #d2dae7;
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
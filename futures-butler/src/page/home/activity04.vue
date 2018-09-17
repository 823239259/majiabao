<template>
  <!-- <div id="welfare_details" :style="{height:clientHeight}"> -->
  <div>
    <header class="top">
      <h2 class="title">推荐新人有奖，大礼等你来拿</h2>
      <p class="text">活动开始时间 <span class="yellow">2018-10-01</span></p>
    </header>
    <div class="wrap">
      <div class="top_banner"></div>
      <div class="title_box">
        <h3 class="title1">奖励</h3>
      </div>
      <div class="activity_box">
          <p class="text">邀请一个新注册用户即可获得由管家助手发出的大礼包</p>
          <div class="logo_box">
            <img src="../../assets/images/home/logo_yellow.png" alt="logo">
            <span>管家助手大礼包</span>
          </div>
          <p class="text">（领取说明：领奖时请携带邀请截图与注册ID，需一致）</p>
      </div>
      <p class="note">最终活动解释权归期货管家所有</p>
    </div>
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  import AlertMessage from '../../components/AlertMessage'
  const local = pro.local;
  

  export default {
    name: "activity02",
    components: {
      AlertMessage
    },
    mixins: [pro.mixinsToCustomer],
    props: ['id'],
    data() {
      return {
        user: {},
        isLogin: false,
        isShow: false,
        text:'',
        type: 1,
        idList: [],
        weekList:[],
        today: new Date(),
        signInfo:{
          signDay: 0,
          signList: []
        },
        list,
        informationList
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
          path: path
        });
      },
      join () {
        this.$toast({
          message: '报名开始日期为10月20日中午',
          duration: 1000,
        })
      }
     
     
    },
    created() {
      
    },
    activated() {
      this.signInfo = pro.local.get('signInfo')||this.signInfo
      this.user = pro.local.get('user')
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #activity02{
    background-color: #fff;
  }
  .top{
    
    background-color: #fff;
    .title{
      @include font($fs32,0.8rem,#333,left);
      font-weight: bold;
      padding: 0 0.3rem;
      border-bottom: 1px solid #bbf6ec;
    }
  .text{
    @include font($fs28,0.8rem,#333,left);
    border-bottom: 1px solid #bbf6ec;
    padding: 0 0.3rem;
    .yellow{
      color: #de8c22
    }
  }
  }
 
  .wrap{
    margin: 0 0.3rem;
    background-color: #fff;
    .top_banner{
      width: 100%;
      height: 2.4rem;
      background: url('../../assets/images/home/activity03_banner.jpg') center no-repeat;
      background-size: cover;
    }
  }
  .title_box{
    position: relative;
    text-align: center;
    margin: 0.4rem;
    &::before,&::after{
       content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 2.24rem;
      height: 1px;
      background-color: #f69c00;
    }
    &::before{
      left: 0;
    }
    &::after{
      right: 0;
    }
    .title1{
        position: relative;
        display: inline-block;
        padding: 0 0.48rem;
        font-size: 0.32rem;
        line-height: 0.46rem;
        color: #f69c00;
        text-align: center;
        &::before,&::after{
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 0.3rem;
          height: 0.3rem;
          background-color: #f69c00;
          // border-radius: 50%;
        }
        &::before{
          left: 0;
        }
        &::after{
          right: 0;
        }
    }
  }
  .activity_box{
    width: 6.1rem;
    margin: 0 auto;
    border-radius: 0.2rem;
    border: solid 1px #f69c00;
    padding: 0.24rem;
    .text{
      @include font($fs28,0.48rem,#f69c00,left);
    }
    .logo_box{
      text-align: center;
      padding: 0.24rem 0;
      img{
        display: block;
        margin: 0 auto;
        width: 0.8rem;
        height: 0.8rem
      }
      span{
        @include font($fs24,0.48rem,#283835);
      }
    }
  }
.note{
  @include font($fs24,0.36rem,#788b87);
  padding: 0.4rem 0;
}

 
  

</style>
<template>
  <!-- <div id="welfare_details" :style="{height:clientHeight}"> -->
  <div>
    <header class="top">
      <h2 class="title">推荐新人有奖，大礼等你来拿</h2>
      <p class="text">活动开始时间 <span class="yellow">2018-10-01</span></p>
    </header>
    <div class="wrap">
      <div class="jpg"></div>
    </div>  
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  import AlertMessage from '../../components/AlertMessage'
  const local = pro.local;
  
  const list = [
    {
      title: '【管家讲堂简介】',
      content: '期货管家是一款为客户潜心打造的期货学习服务与互动交流平台，其汇聚了国内一流的投研团队及实战精英，向客户提供宏观经济及期货品种分析、投资策略及操作技巧解读，同时不定期举办各类活动、讲座和致力于打造具有期货管家特色的服务品牌。管家大讲堂系列培训活动是期货管家的预计上线经典栏目之一，因其授课方式灵活、交流氛围活跃，自版本上线以来，一直备受用户期待，所以此次举办管家大讲堂第一期，希望能为用户带来更好的学习环境。'
    },
    {
      title: '【本期课题】',
      content: '《期货入门学习》'
    },
    {
      title: '【内容】',
      content: '1.七月期货行情查看与回顾<br/>2.八月期货行情展望及学习计划'
    },
    {
      title: '【讲师介绍】',
      content: '管家小助手<br/>由期货管家于第一个版本上线日期收养认领的官方小助手一枚，听说是个妹子？'
    },
    {
      title: '【培训时间】',
      content: '10月20日(星期四) 中午 12:00-18:00'
    },
    {
      title: '【培训地点】',
      content: '期货管家-管家社区：活动开始时社区将调整为讲堂模式（讲课期间用户禁言，课后可向小助手提问或者自由交流）。'
    },
    {
      title: '【报名及咨询】',
      content: '电话：17313119220 小助手'
    },
    {
      title: '【管家币特权】',
      content: '用户可使用15个管家币咨询小助手领取课堂干货。'
    },
  ]
  const informationList = [
    {
      title: '开始时间：',
      content: '2018/10/20 12:00'
    },
    {
      title: '结束时间：',
      content: '2018/10/20 18:00'
    },{
      title: '地点：',
      content: '管家社区'
    },
    {
      title: '性质：',
      content: '免费'
    },
    {
      title: '讲师：',
      content: '管家小助手'
    }
  ]

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
    .jpg{
      width: 6.9rem;
      height: 13.53rem;
      background: url('../../assets/images/home/activity03_jpg.jpg');
      background-size: cover;
    }
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
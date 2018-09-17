<template>
  <!-- <div id="welfare_details" :style="{height:clientHeight}"> -->
  <div id="activity02">
     <div class="activity_wrap">
       <div class="title_box">
         <div class="left_box">
           <img src="../../assets/images/home/logo_icon.png" alt="icon">
           <div class="left_content">
             <p class="rol_display">管家大讲堂</p>
            </div>
         </div>
         <div class="right_box">
           <p v-for="(item, index) in informationList" :key="index"><span class="huise">{{item.title}}</span>{{item.content}}</p>
         </div>

       </div>
       <div class="btn_group">
         <button @click="join">我要参加</button>
         <button @click="shareSystem">分享活动</button>
       </div>
       <div class="btn_group">
         <button class="go" @click="goto('/butler_community')">进入讲堂</button>
       </div>
       <div class="activity_content">
         <h2 class="content_header">活动详情</h2>
         <ul class="list">
           <li class="item" v-for="(item, index) in list" :key="index">
             <h2>{{item.title}}</h2>
             <p :class="['item_content',{'spacial_item':item.content.length<30}]" v-html="item.content"></p>
           </li>
         </ul>
       </div>
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
      content: '10月01日(星期四) 中午 12:00-18:00'
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
      content: '2018/10/01 12:00'
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
          message: '报名开始日期为10月01日中午',
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
  .title_box{
    @include flex();
    border-top: solid 1px #bbf6ec;
    border-bottom: solid 1px #bbf6ec;
    
  }
  .left_box{
    flex: 1;
    
    text-align: center;
    img {
      width: 0.8rem;
      margin-bottom: -0.4rem;
      z-index: 10;
      position: relative;
      
    }
    .left_content{
      position: relative;
      width: 1.6rem;
      height: 2.4rem;
      margin: 0 auto;
      background-color: #e5f9f6;
      border-radius: 0.1rem;
      border: solid 1px #bbf6ec;
      @include font($fs28,0.3rem,#333);
     
    }
    .rol_display{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 0.5rem;

    }
  }
  .right_box{
    flex: 2;
    border-left: solid 1px #bbf6ec;
    p{
      width: 5.1rem;
      height: 0.8rem;
      padding: 0 0.3rem;
      background-color: #ffffff;
      @include font($fs28,0.8rem,#333,left);
      border-bottom: solid 1px #bbf6ec;
    }
    p:last-child{
      border-bottom: none;
    }
    .huise{
      color: #788b87
    }
  }
  .btn_group{
    @include flex(space-around);
    padding: 0.2rem 0;
    border-top: 0.16rem solid #bbf6ec;
    button{
      width: 2.4rem;
      height: 0.8rem;
      background-color: #169781;
      border-radius: 0.1rem;
      @include font($fs28,0.8rem,#fff);
    }
    .go{
      width: 6.14rem;
	    height: 0.8rem;
      color: #169781;
      background-color: #fff;
      border: solid 1px #169781;
      box-shadow: 0rem 0.05rem 1px 0rem 
		rgba(1, 1, 1, 0.2);
    }
  }
.activity_content{
  //padding-top: 0.16rem;
  border-top: 0.16rem solid #bbf6ec;
  .content_header{
    padding: 0 0.3rem;
    @include font($fs28,0.8rem,#333,left);
    text-indent: 0.48rem;
    border-bottom: solid 1px #bbf6ec;
    background: url('../../assets/images/home/activity02_header_icon.png') 0.3rem center no-repeat;
    background-size: 0.24rem 0.24rem;
  }
  .item{
    h2{
      @include font($fs28,0.8rem,#788b87,left);
      padding: 0 0.3rem;
      border-bottom: solid 1px #bbf6ec;
      
    }
    .item_content{
      @include font($fs28,0.56rem,#333,left);
      padding: 0 0.3rem;
      border-bottom: solid 1px #bbf6ec;
    }
    .spacial_item{
      line-height: 0.8rem;
    }

  }
}











</style>
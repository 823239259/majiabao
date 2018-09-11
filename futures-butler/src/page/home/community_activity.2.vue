<template>
  <div id="welfare_details" :style="{height:clientHeight}">
    <mt-header fixed :title="title" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        <mt-button slot="right" @click="askServer" v-if="id == 1">
          <span class="icon wenhao"></span>
        </mt-button>
        <mt-button slot="right" @click="shareSystem" v-if="id == (4||3)">
          <span class="icon share_icon"></span>
        </mt-button>
    </mt-header>
    <div class="wrap">
        <component ref="activity" :is="activityName" :id="id"></component>
    </div>
    
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  import activity02 from './activity02'
  import activity01 from './activity01'
  import activity03 from './activity03'
  import activity04 from './activity04'
  const local = pro.local;
  
  export default {
    name: "welfare_details",
    components: {
      activity02,
      activity01,
      activity03,
      activity04
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
        imgList: [{
            img: require('../../assets/images/home/activity01_banner.jpg'),
            id: 1,
            text: '管家币可用作后期管家推出活动模拟金使用'
        },
        {
            img: require('../../assets/images/home/activity02_banner.jpg'),
            id: 2,
            text: '管家大赛可配合管家币提高中奖几率'
        }]
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      activityName () {
        const activityList = ['activity01', 'activity02', "activity03", 'activity04']
        return activityList[this.id - 1]
      },
      title () {
        const titleList = ['管家福利', '期货讲堂', '问答有礼', '推荐有奖'];
        return  titleList[this.id - 1]
      }
      
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
      askServer () {
        this.$refs.activity.askServer()
      },
 
    },
    created() {
      //this.setWeekList()
    },
    activated() {
      this.signInfo = pro.local.get('signInfo')||this.signInfo
      this.user = pro.local.get('user')
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #welfare_details {
    width: 7.5rem;
    padding-top: 0.96rem;
    background-color: $bgButler;
  }
  .icon{
    display: inline-block;
    width: 0.5rem;
	  height: 0.5rem;
  }
  .wenhao{
    background: url('../../assets/images/home/wenhao.png') center no-repeat;
    background-size: 0.16rem 0.27rem;
  }
  .share_icon{
     background: url('../../assets/images/home/share_icon.png') center no-repeat;
     background-size: 0.4rem 0.4rem;
  }
  .box{
    
    margin-bottom: 0.16rem; 
  }
  p{
    padding: 0 0.3rem;
    @include font($fs28,0.8rem,$blackNormal,left);
    background-color: $white;

  }

.calendar_list_wrap{
  width: 6.9rem;
  margin: 0 auto;
  border-radius: 0.1rem;
  box-shadow: 1px 1px 10px #ccc;
}
.calendar_list{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .item{
    flex: 1;
    text-align: center;
    padding: 0.24rem 0;
    border: solid 1px #bbf6ec;
    margin-left: 0.03rem;
  }
  .item:first-child{
    margin-left: 0;
  }
  .item.active{
    background-color: $bgButler;
  }
  .weekday{
    @include font($fs24,0.32rem,#788b87);
    padding-bottom: 0.1rem;
  }
  .date{
    @include font($fs28,0.32rem,#283835);
  }
}
.Sign_in_wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.24rem;
  .left_box,.right_box{
    text-align: left;
  }
  .left_box{
    flex: 2;
    @include font(0.28rem,0.32rem,#283835,left);
    .number{
      @include font(0.68rem,1rem,#169781,left);
    }
    .color1{
      color: #de8c22;
      padding: 0 0.1rem;
    }
  }
  .right_box{
    flex: 1;
    button{
      width: 2.4rem;
      height: 0.8rem;
      background-color: #169781;
      border-radius: 0.1rem;
      @include font(0.28rem,0.8rem,#ffffff);
    }
  }
}
</style>
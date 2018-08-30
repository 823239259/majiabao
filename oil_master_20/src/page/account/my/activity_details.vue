<template>
  <!-- <div id="welfare_details" :style="{height:clientHeight}"> -->
  <div id="activity_details" >
    <TopTitle title="活动说明" type="back" />
    <div class="wrap">
        <img :src="imgList[id]" alt="">
        <div class="item_box" v-for="(item, index) in currentActivity" :key="index">
          <h3>{{item.title}}</h3>
          <p>{{item.content}}</p>
        </div>
    </div>
    <footer class="note">以上活动最终解释权归原油大师所有</footer>
  </div>
</template>

<script>
import pro from "../../../assets/js/common";
import TopTitle from '../../../components/top_Title'
const local = pro.local;

export default {
  name: "activity_details",
  components: {
    TopTitle
  },
  props: ["id"],

  data() {
    return {
      isLogin: false,
      isShow: false,
      idList: [],
      imgList: [require("../../../assets/images/oil_master/activity01_banner.jpg"), require("../../../assets/images/oil_master/activity02_banner.jpg")],
      activity01: [
        {
          title: '【活动说明】',
          content: '第一期大师原油行情分享活动为大家带来精彩的分享送大礼的福利，用户通过 我的-分享页面成功分享原油大师既有机会参加分享抽奖活动'
        },
        {
          title: '【活动时间】',
          content: '2018.09.18至09.19'
        },
         {
          title: '【参与方式】',
          content: '活动期间分享原油大师即可参与抽奖'
        }
      ],
      activity02: [
        {
          title: '【活动说明】',
          content: '用户注册连续登录二周后可联系客服领取神秘大礼以及第一期大师分享活动抽奖资格+1'
        },
        {
          title: '【领取方式】',
          content: '登录日期满足要求后联系客服领取'
        },
      ]
    };
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
    currentActivity() {
      const arr = ['activity01', 'activity02']
      return this[arr[this.id]]
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
    alert () {
      this.$toast({
        message: '活动暂未开始敬请期待'
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
#activity_details {
  //position: relative;
  width: 7.5rem;
  padding-top: 0.96rem;
}
.wrap{
  img{
    width: 7.5rem
  }
}
.item_box {
  h3{
    @include font($fs28, 0.8rem, $blackNormal, left);
    background-color: #f6f6f6;
    padding: 0 0.3rem;
    border-bottom: solid 1px #e8e8e8;
  }
  p{
    @include font($fs28, 0.48rem, $blackNormal, left);
    padding: 0.3rem;
    border-bottom: solid 1px #e8e8e8;
  }
}

.note{
  position: absolute;
  bottom: 0.8rem;
  width: 100%;
  @include font($fs28, 0.36rem, #858585);
  
}











</style>
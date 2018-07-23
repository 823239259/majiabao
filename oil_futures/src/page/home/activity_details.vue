<template>
  <!-- <div id="welfare_details" :style="{height:clientHeight}"> -->
  <div id="welfare_details" >
    <mt-header fixed title="活动详情" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap" v-if="id==1">
        <div class="box" >
            <img :src="currentItem.img" alt="01">
            <div class="time" v-html="currentItem.time"></div>
            <div class="box_box">
                <h2>大赛规则</h2>
                <p class="text1">2018年3月26日原油期货即将登录上海期货交易所国际能源中心，作为助推人民币国际化的“大器”产品，意义重大，为深入开展原油期货投资者教育，吸引与激励投资者踊跃参与原油期货交易，提升原油期货市场份额，推动原油产业客户银期三方存管，整合能化产业客户，打通跨境原油产品套利渠道，我们推出“原油杯”原油期货模拟盘交易大赛。</p>
            </div>
            <div class="box_box">
                <h2>比赛规则</h2>
                <p class="text1">1、比赛期间参赛选手账户当日结算后权益低于10万元，视为自动放弃比赛，比赛成绩不再列入排名统计，选手可再次报名重新参赛。<br>2、比赛期间参赛选手可以在本人同一交易帐户中进行其他商品期货品种的交易，计算原油期货交易的每日收益时，将其他品种的交易损益从每日《交易结算单》的客户权益中作相应增减计算。<br>3、比赛期间参赛选手交易帐户没有交易记录者比赛成绩无效，参赛期间有强制平仓记录的选手不计入比赛排名、比赛成绩自动失效。<br>4、获奖选手收益率必须是正数；如出现收益率为零或负数，则比赛成绩无效。<br>5、在下一交易日9点前公布排名前20名的参赛选手上一交易日日终排名情况。<br>6、本次大赛为模拟盘竞赛，参赛选手自行交易，自负盈亏，一切交易均遵守《期货交易管理条例》和交易所的交易规则。参赛选手须允许以分段资金账号或参赛编号的方式将参赛交易成绩数据在网上或相关媒体公布,并同意主办方对参赛选手的交易情况以参赛编号的方式在相关媒体上进行点评。<br>7、各项大奖决出后，各类奖项的产生过程将由公司相关部门全程见证，大赛主办单位将通过电话和电子邮件通知获奖者，通过上述两种方式未能通知到的获奖者，请在公布成绩后的一周内与大赛主办单位联系确认，过期作弃权处理。<br>8、奖项计算规则：<br>参赛选手可查询本人帐户每日《交易结算单》及投资者保证金监控中心相关数据对照计算。（以下计算中客户权益仅含原油期货交易品种）<br>(1)最佳收益额奖：比赛全程的原油品种最终收益金额前三名：<br>累计收益金额=原油品种累计交易盈利<br>(2）最佳盈利率奖：比赛全程的原油品种最终累计收益率前三名：<br>累计收益率=原油品种累计盈利/累计成交额*100%<br>9、各奖项奖金由公司代扣代缴所得税后以现金形式发放于参赛选手实名开立光大银行卡帐户中。<br>10、免责条款：本次大赛主办方将本着勤勉尽职的态度竭力保证大赛的顺利进行，但对于不可抗力的因素或非主办方所能控制的情况所导致的风险、系统故障或由于网络问题导致的系统故障等原因对参赛选手资金量及排名产生的影响不做担保。参赛选手必须保护好自己的相关密码，如因为密码丢失或被破解所导致的帐户被窃而造成损失的，大赛举办方不负任何责任。<br>11、本次大赛的解释权归原油行情大师所有。</p>
            </div>
            <div class="box_box">
                <h2>奖项设置</h2>
                <p class="text1">一、最佳收益额奖<br>冠军：奖励现金人民币500元；<br>亚军：奖励现金人民币300元；<br>季军：奖励现金人民币200元；<br>倘若收益率相同，则按并列名次获奖。<br>二、最佳盈利率奖<br>冠军：奖励现金人民币500元；<br>亚军：奖励现金人民币300元；<br>季军：奖励现金人民币200元；<br>倘若收益率相同，则按并列名次获奖。<br>三、奖项说明：<br>1、所获奖金均由公司代扣代缴所得税；<br>2、所有奖励均于颁奖典礼上统一颁发。<br></p>
            </div>
            <div class="box_box">
                <h2 class="spacial">报名开户流程</h2>
                <p class="text1">一、报名办法：电话热线报名<br><br><br>二、开户流程：请咨询客服</p>
                <button class="btn" @click="alert">参与活动</button>
            </div>
            
        </div>
        
    </div>
    <div v-else>
      <p class="none">活动时间于2018年4月28日结束感谢你的支持</p>
    </div>
    
  </div>
</template>

<script>
import pro from "../../assets/js/common";

const local = pro.local;

export default {
  name: "welfare_details",
  components: {},
  props: ["id"],
  data() {
    return {
      isLogin: false,
      isShow: false,
      idList: [],
      imgList: [
        {
          img: require("../../assets/images/home/banner01.jpg"),
          id: 1,
          time:
            "报名时间：2018年08月08日—2018年11月25日<br>比赛时间：2018年09月28日—2018年11月26日",
          text: "管家币可用作后期管家推出活动模拟金使用"
        },
        {
          img: require("../../assets/images/home/activity_banner01.jpg"),
          id: 2,
          text: "管家大赛可配合管家币提高中奖几率"
        }
      ]
    };
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
    currentItem() {
      return this.imgList.find(item => {
        return item.id == this.id;
      });
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
@import "../../assets/css/common.scss";
#welfare_details {
  width: 7.5rem;
  padding-top: 0.96rem;
  background-color: #21c3b1;
}
.box {
  margin-bottom: 0.16rem;
}
p {
  padding: 0 0.3rem;
  @include font($fs28, 0.8rem, $blackNormal, left);
  background-color: $white;
}
.time {
  position: relative;
  top: -0.4rem;
  display: table-cell;
  vertical-align: middle;
  width: 7.5rem;
  height: 0.8rem;
  background: transparent url("../../assets/images/home/time_bg.png") center
    no-repeat;
  background-size: 5.6rem 0.8rem;
  @include font(0.22rem, 0.32rem, #773600);
}
.box_box {
  padding-bottom: 0.3rem;
  text-align: center;
  h2 {
    width: 1.8rem;
    margin: 0 auto 0.3rem;
    border: dashed 0.02rem #ffffff;
    @include font($fs32, 0.6rem, #fff);
  }
  .text1 {
    width: 6.9rem;
    // height: 4.3rem;
    padding: 0.4rem;
    margin: 0 auto;
    background-color: #fffeff;
    border: solid 0.1rem #5de1d2;
    @include font($fs30, 0.46rem, #2d2f3e, left);
  }
  .spacial{
    width: 7.5rem;
    @include font($fs32, 0.8rem, #fff);
    background-color: #5de1d2;
    border: none;
  }
  .btn{
    width: 6.9rem;
    height: 1rem;
    margin-top: 0.3rem;
    background-color: #ffaa23;
    border-radius: 0.1rem;
    border: solid 0.1rem #5de1d2;
    @include font($fs36,1rem,#773600)
  }
}
.none{
  @include font(0.6rem,1.5rem,#333)
}
</style>
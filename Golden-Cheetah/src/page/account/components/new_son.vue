<template>
  <div id="news-details">
    <mt-header fixed title="新闻详情">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="details-container">
      <p class="news-title">{{newsTitle}}</p>
      <div class="title-box">
        <span>{{newDetailsDate}}</span>
        <span>来自{{comeFrom}}</span>
      </div>
      <p class="details-msg">{{detailsMsg}}</p>
      <img :src="newDetailsImg" alt="">
    </div>
  </div>
</template>

<script>
  import topTitle from "../../../components/topTitle.vue"
  export default {
    data() {
      return {
        newsTitle:'财经消息',
        newDetailsDate:'2018-9-19 11:19:40',
        comeFrom:'互联网',
        detailsMsg:'根据3月公布的收购计划，Cigna采取股票和现金结合的收购方式，Express Scripts的股东将得到每股48.75美元现金以及合并后公司0.2434股股票。以此估算Cigna的每股收购价为96.03美元',
        newDetailsImg:require('../../../assets/images/golden_cheetah/new_details_img.png')
      }
    },
    components:{topTitle},
    methods: {
      goBack() {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/common.scss";
  #news-details{
    width: 7.5rem;
    background-color: $bodyBg;
    padding-top: 0.96rem;
    padding-bottom: 1.12rem;
    height: 100vh;
  }
  .details-container{
    width: 6.9rem;
    margin: 0 auto;
  }
  .news-title{
    font-size: 0.32rem;
    color: #fde24b;
    margin-top: .3rem;
  }
  .title-box{
    font-size: 0.22rem;
    color: #bfc0c1;
    margin-top: .2rem;
  }
  .title-box>span{
    margin-right: .3rem;
  }
  .details-msg{
    font-size: .3rem;
    color: #fff;
    margin-top: .3rem;
    margin-bottom: .3rem;
    line-height: .6rem;
  }
  .details-container>img{
    width: 6.9rem;
    height: 2.4rem;
  }
</style>

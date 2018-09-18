<template>
  <div id="more-data">
    <mt-header fixed title="详细数据">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="data-container">
      <div class="data-box" v-for="(dd,index) in moreDataArr" :key="index">
        <ul class="particular-data">
          <li class="title-name">{{dd.name}}</li>
          <li class="data-num">{{dd.nowPrice}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import topTitle from "../../../components/topTitle.vue"
  export default {
    data() {
      return {
        moreDataArr:[
          {name:'合约',nowPrice:'美黄金'},
          {name:'期数',nowPrice:'CL1808'},
          {name:'最新价',nowPrice:1241.05},
          {name:'涨跌额',nowPrice:3.2},
          {name:'涨跌幅',nowPrice:'0.26%'},
          {name:'当前手数',nowPrice:10},
          {name:'买价',nowPrice:1233.2},
          {name:'卖价',nowPrice:1233.2},
          {name:'买量',nowPrice:23},
          {name:'成交量',nowPrice:3223},
          {name:'持仓量',nowPrice:3223},
          {name:'卖量',nowPrice:35},
          {name:'开盘价',nowPrice:1233.2},
          {name:'昨结价',nowPrice:1233.2},
          {name:'最高价',nowPrice:1233.2},
          {name:'最低价',nowPrice:1233.2},
          {name:'平均价',nowPrice:1233.2},
          {name:'更多数据',nowPrice:'正在计算'},
        ]
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
  #more-data{
    width: 7.5rem;
    background-color: $bodyBg;
    padding-top: 0.96rem;
    padding-bottom: 1.12rem;
    height: 100vh;
  }
  .data-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 6.9rem;
    margin: 0 auto;
    margin-top: .61rem;
  }
  .data-box{
    width: 2.1rem;
    height: 1.4rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    margin-bottom: .3rem;
  }
  .particular-data{
    color:#fff;
    text-align: left;
    margin:.3rem 0 .27rem .3rem;
  }
  .title-name{
    margin-bottom: .27rem;
    font-size: .28rem;
    color: #bfc0c1;
  }
  .data-num{
    font-size: .32rem;
    color: #fff;
  }
</style>

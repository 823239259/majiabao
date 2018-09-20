<template>
  <div id="home">
    <TopTitle title="回测" >
      <span slot="my_right" class="header_icon customer_icon"></span>
    </TopTitle>
    <div class="hui-ce-container">
      <!--选择合约-->
      <p class="chose-title">选择的合约标的</p>
      <div class="chose-box">
        <p class="have-chose">美黄金</p>
      </div>
      <p class="chose-title">选择回测的时间</p>
      <div class="chose-box">

      </div>
      <p class="chose-title">选择回测的K线</p>
      <div class="chose-box">

      </div>
      <p class="chose-title">选择使用的策略</p>
      <div class="strategy">

      </div>
    </div>
    <bottomTab :tabSelect="tabSelected"></bottomTab>
  </div>
</template>

<script>
  import bottomTab from '../components/bottom_tab'
  import TopTitle from '../components/top_Title'
  export default {
    data() {
      return {
        tabSelected: 'back-test',
      }
    },
    components: {
      bottomTab,
      TopTitle,
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";
  #home {
    width: 7.5rem;
    /*min-height:7rem;*/
    background-color: $bodyBg;
    padding-top: 0.96rem;
    padding-bottom: 3.2rem;
    overflow: hidden;
    /*height: 100vh;*/
  }
  .hui-ce-container{
    width: 6.9rem;
    margin: 0 auto;
    color: #bfc0c1;
  }
  .chose-title{
    font-size: 0.32rem;
    margin-top: .3rem;
  }
  .chose-box{
    height: 1rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    margin-top: .3rem;
  }
  .have-chose{
    color: #fff;
    font-size: .3rem;
    line-height: 1rem;
    margin-left: .3rem;
  }
  /*使用的策略*/
  .strategy{
    height: 1.6rem;
    background-color: #373a41;
    border-radius: 0.2rem;
    margin-top: .3rem;
  }
</style>

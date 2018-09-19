<template>
  <div id="home">
    <TopTitle title="回测" >
      <span slot="my_right" class="header_icon customer_icon"></span>
    </TopTitle>
    <bottomTab :tabSelect="tabSelected"></bottomTab>
  </div>
</template>

<script>
  import bottomTab from '../components/bottom_tab'
  import TopTitle from '../components/top_Title'
  export default {
    data() {
      return {
        msg: '回测',
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
</style>

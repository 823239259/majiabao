<template>
  <div>
    <mt-header fixed title="新闻公告">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      <img src="../../assets/img/nomore.png" alt="nomore">
      <p>暂无更多</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about_us',
  data () {
    return {
    }  
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/css/common.scss";
.wrap{
  position: absolute;
  width: 7.5rem;
  height: 1rem;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  img{
    display: block;
    width: 0.56rem;
    margin: 0 auto;
  }
  p{
    @include font(0.32rem, 0.48rem, #333);
    padding-top: 0.23rem;
  } 
}
</style>

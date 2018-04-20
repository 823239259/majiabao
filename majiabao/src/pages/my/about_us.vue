<template>
  <div>
    <mt-header fixed title="关于我们">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      <h2>《期货行情通》</h2>
      <div class="text">
        <img src="../../assets/img/about_logo.png" alt="about_logo">
        <p>专业的期货投资运营团队</p>
        <p>V1.0.0</p>
      </div>
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
  width: 7.5rem;
  padding-top: 0.88rem;
  h2{
    @include font(0.32rem, 0.48rem, #333);
    padding: 1.6rem 0 3.5rem;
  }
  img{
    display: block;
    width: 1.6rem;
    margin: 0 auto;
  }
  p{
    @include font(0.32rem, 0.48rem, #333);
     padding-top: 0.3rem;
  } 
}
</style>

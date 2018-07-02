<template>
  <div id="about_us" :style="{height:clientHeight}">
    <mt-header fixed title="关于我们">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      <div class="text">
        <img src="../../../assets/images/account/about_us.png" alt="about_logo">
        <h2>期货管家</h2>
        <p>您的私人期货管家</p>
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
  computed: {
    clientHeight () {
          return document.documentElement.clientHeight + 'px';
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
@import "../../../assets/css/common.scss";
#about_us{
  width: 7.5rem;
  padding-top: 0.96rem;
  background-color: $bgButler

}
.wrap{
  width: 7.5rem;
  padding: 1.2rem 0 0 0 ;
  background-color: $white;
  h2{
    @include font(0.4rem, 0.4rem, #788b87);
    font-weight: bold;
    padding: 0.2rem 0;
  }
  img{
    display: block;
    width: 1.6rem;
    margin: 0 auto;
  }
  p{
    @include font(0.32rem, 0.48rem, #788b87);
     
  } 
}
</style>

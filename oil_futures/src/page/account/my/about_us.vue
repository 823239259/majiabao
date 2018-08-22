<template>
  <div id="about_us" :style="{height:clientHeight}">
    <mt-header fixed title="关于我们">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      <div>
        <img class="gif" src="../../../assets/images/account/tell_us.gif" alt="about_us">
      </div>
      <div class="text">
        <img src="../../../assets/images/account/about_us.png" alt="about_logo">
        <h2>原油行情宝</h2>
        <p>浏览原油行情，从此不再难</p>
        <p class="bottom">V1.0</p>
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
  //background-color: $bgButler

}
.wrap{
  width: 7.5rem;
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
  .gif{
    width: 7.5rem;
    height: 6.4rem;

  } 
  .bottom{
    padding-top: 1rem;
  }
  .text{
    position: absolute;
    bottom: 0.3rem;
    width: 7.5rem;
  }
}
</style>

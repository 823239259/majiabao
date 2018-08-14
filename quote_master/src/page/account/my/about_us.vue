<template>
  <div id="about_us" :style="{height:clientHeight}">
    <mt-header fixed title="我们是谁">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      
      <div class="text">
        <img src="../../../assets/images/account/about_us.png" alt="about_logo">
        <p class="bottom">V1.1</p>
        <div class="text_content">
          我们致力于通过我们的产品来实现行情浏览和阅读的最高标准。<br/>我们的优质品牌产品和服务，使人心情愉悦、神采焕发、享受更加美好的生活。在全球 多个国家内有 无数个期货行情大师的使用者，这让我们拥有难得的机会能与消费者一起，让可持续生
活成为常态。<br/>每一天，我们都用优质的产品和服务来实现让可持续生活成为常态的目标、努力打造更美好的未来。<br/>
        </div>
      </div>
      <div>
        <img class="gif" src="../../../assets/images/account/tell_us.gif" alt="about_us">
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
  padding-top: 0.3rem;
  background-color: #2a2f42;
  h2{
    @include font(0.4rem, 0.4rem, #788b87);
    font-weight: bold;
    padding: 0.2rem 0;
  }
  img{
    display: block;
    width: 1.2rem;
    margin: 0 auto;
  }
  p{
    @include font(0.32rem, 0.48rem, #ff6080);
     
  }
  .text_content{
    margin: 0.3rem;
    padding: 0.3rem;
    @include font(0.3rem, 0.48rem, #fff,left);
    background-color: #35384b;
  }
  // .bottom{
  //   padding-top: 1rem;
  // }
  .gif{
    // width: 7.5rem;
    // height: 6.4rem;
    margin: 0.3rem;
    width: 6.9rem;

  } 
  
  .text{
    width: 7.5rem;
    
  }
}
</style>

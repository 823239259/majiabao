<template>
  <div id="about_us" :style="{height:clientHeight}">
    <TopTitle title="关于我们" type="back" />
    <div class="wrap">
      <div class="text">
        <img src="../../../assets/images/icons/about_us.png" alt="about_logo">
        <h2>《原油大师》</h2>
        <p>更好的原油策略选择</p>
        <p class="bottom">V1.0.0</p>
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from '../../../components/top_Title'
export default {
  name: 'about_us',
  components:{
    TopTitle
  },
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
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
  width: 7.5rem;
  padding-top: 0.3rem;
  background-color: #fff;

  h2{
    @include font(0.4rem, 0.4rem, #222);
    font-weight: bold;
    padding: 0.2rem 0;
  }
  img{
    display: block;
    width: 1.2rem;
    margin: 0 auto;
  }
  p{
    @include font(0.32rem, 0.48rem, #858585);
     
  }
  
  .text{
    width: 7.5rem;
    
  }
}
</style>

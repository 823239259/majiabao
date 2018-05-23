<template>
  <div>
    <mt-header fixed title="个人中心"></mt-header>
    <div class="swipe-wrap">
      <img src="../assets/img/my_banner.png" alt="my_banner">
    </div>
    <div class="list-wrap">
      <ul class="tab-list">
        <li class="tab-item" @click="goto('/basic')">
          基础知识<span class="youjiantou"></span>
        </li>
        <li class="tab-item" @click="goto('/news')">
          新闻公告<span class="youjiantou"></span>
        </li>
        <li class="tab-item" @click="goto('/tell_us')">
          意见反馈<span class="youjiantou"></span>
        </li>
        <li class="tab-item" @click="goto('/about_us')">
          关于我们<span class="youjiantou"></span>
        </li>
      </ul>
    </div>
    <!-- 选项卡 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="index">
        <span class="icon icon1 icon-checked" slot="icon"></span>
        首页
      </mt-tab-item>
      <mt-tab-item id="quotation">
        <span class="icon icon2" slot="icon"></span>        
        行情
      </mt-tab-item>
      <mt-tab-item id="classroom">
        <span class="icon icon3" slot="icon"></span>
        学堂
      </mt-tab-item>
      <mt-tab-item id="information">
        <span class="icon icon4" slot="icon"></span>
        资讯
      </mt-tab-item>
      <mt-tab-item id="my">
        <span class="icon icon5 icon-checked" slot="icon"></span>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'my',
  data () {
    return {
      selected: 'my',
    }  
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },
    goto (id = `/information_item`) {
      //this.$router.push({path: `/contract-item/${id}`})
      this.$router.push({path: id})
    }
    
  },
  watch: {
    selected (value, oldvalue) {
      this.$router.push({path: `/${value}`})
      console.log(value)
    }
  }
  
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.swipe-wrap{
  width: 7.5rem;
  height: 2.4rem;
  margin-top: 0.88rem;
  box-sizing: content-box;
}
.list_wrap{
  width: 7.5rem;
}
.tab-list{
  background-color: #f8f9fc;
  .tab-item{
    position: relative;
    text-indent: 0.9rem;
    @include font(0.32rem,0.8rem,#333,left);
    background: #fff url('../assets/img/jichu.png') 0.25rem center no-repeat;
    background-size: 0.4rem 0.4rem;
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 0.1rem;
    .youjiantou{
      position: absolute;
      right: 0.28rem;
      top: 50%;
      display: inline-block;
      width: 0.17rem;
      height: 0.34rem;
      background: url('../assets/img/youjiantou.png') center center no-repeat;
      background-size: cover;
      transform: translateY(-50%)
    }
  }
 ;
  li:nth-child(2){
    background-image: url('../assets/img/xinwen.png') 
  }
  li:nth-child(3){
    background-image: url('../assets/img/yijian.png') 
  }
  li:nth-child(4){
    background-image: url('../assets/img/about_us.png') 
  }
  
}


.icon{
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('../assets/img/icon_colour.png') top center no-repeat;
  background-size: cover;
}
@for $i from 1 through 5 {
  $background-position-y: (0,-0.7rem,-1.4rem,-2.1rem,-2.8rem);
  .icon#{$i}{
    background-position-y:nth($background-position-y,$i) 
  }
}
.icon-checked{
  background-image: url('../assets/img/icon_check.png');
  background-position-y: -2.82rem
} 

</style>

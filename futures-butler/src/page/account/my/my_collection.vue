<template>
  <div id="my_collection" :style="{height:clientHeight}">
    <mt-header fixed title="关于我们">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
        <ul class="collection" v-if="showNone">
          <li class="item" v-for="(item,index) in 3">
              <div class="box left">天然气</div>
              <div class="box center">价格：2.923</div>
              <div class="box right">跌涨：<span :class="index%2===0?'red':'green'">-0.54%</span></div>
          </li>
        </ul>
        <div class="none_collection" v-else>
            <img src="../../../assets/images/account/none_collection.png" alt="无收藏">
            <p>暂无收藏</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about_us',
  data () {
    return {
       showNone: false
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
#my_collection{
  width: 7.5rem;
  padding-top: 0.96rem;
  background-color: $bgButler

}
.wrap{
  width: 7.5rem;
 
  .item{
    @include flex();
    background-color: $white;
    margin-bottom: 0.1rem;
    .box{
      flex: 1;
      @include font(0.32rem, 1.2rem, #333);
    }
    .center,.right{
      color: #788b87;
      font-size: 0.28rem;
    }
    .red{
       color:#f4663a
    }
    .green{
      color:#19d961
    }

  }

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
.none_collection{
  width: 7.5rem;
  text-align: center;
  padding-top: 5rem;
  img{
    width: 0.6rem;
    height: 0.6rem;

  }
  p{
    @include font($fs24,0.32rem,#169781)
  }
}
</style>

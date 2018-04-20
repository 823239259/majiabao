<template>
  <div>
    <mt-header fixed title="行情"></mt-header>
    <div class="list-wrap">
       <div class="list-box">
          <h3>商品期货</h3>
          <ul class="quotation-list">
            <li class="title-item">
              <span class="name">名称</span>
              <span class="price">价格</span>
              <span class="volume">成交量</span>
              <span class="price-float">涨跌幅</span>
            </li>
            <li class="item" v-for="(value,index) in testarr">
              <div class="name-box">
                <span class="name">{{value.CommodityName}}</span>
                <span class="name-code">{{value.CommodityNo}} {{value.ContractNo}}</span>
              </div>          
              <span class="price" :class="value.LastQuotation.ChangeRate>0?'red':'green'">{{value.LastQuotation.LastPrice}}</span>
              <span class="volume">{{value.LastQuotation.TotalVolume}}</span>
              <span class="price-float" :class="value.LastQuotation.ChangeRate>0?'red':'green'">{{value.LastQuotation.ChangeRate.toFixed(2)}}%</span>
            </li>
          </ul>
        </div>
        <div class="list-box">
          <h3>股指期货</h3>
          <ul class="quotation-list">
            <li class="title-item">
              <span class="name">名称</span>
              <span class="price">价格</span>
              <span class="volume">成交量</span>
              <span class="price-float">涨跌幅</span>
            </li>
            <li class="item" v-for="(value,index) in stockList">
              <div class="name-box">
                <span class="name">{{value.CommodityName}}</span>
                <span class="name-code">{{value.CommodityNo}} {{value.ContractNo}}</span>
              </div>          
              <span class="price" :class="value.LastQuotation.ChangeRate>0?'red':'green'">{{value.LastQuotation.LastPrice}}</span>
              <span class="volume">{{value.LastQuotation.TotalVolume}}</span>
              <span class="price-float" :class="value.LastQuotation.ChangeRate>0?'red':'green'">{{value.LastQuotation.ChangeRate.toFixed(2)}}%</span>
            </li>
          </ul>
        </div>
    </div>
   
    
    <!-- 选项卡 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="index">
        <span class="icon icon1" slot="icon"></span>
        首页
      </mt-tab-item>
      <mt-tab-item id="quotation">
        <span class="icon icon2 icon-checked" slot="icon"></span>        
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
        <span class="icon icon5" slot="icon"></span>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      selected: 'quotation',
    }  
  },
  computed:{
    test () {
      return this.$store.state.testNum
    },
    quotationList () {
      return this.$store.state.market.templateList
    },
    testarr () {
      console.log(this.$store.state.market.testArr.length)
       return this.$store.state.market.testArr.slice(0, 7)
    },
    stockList () {
      return this.$store.state.market.testArr.slice(7)
    }
    
  },
  methods: {
    ...mapActions([
				'initQuoteClient',
		]),
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },
    goto (id) {
      //this.$router.push({path: `/contract-item/${id}`})
      this.$router.push({path: `/information_item`})
    }
    
  },
  watch: {
    selected (value, oldvalue) {
      this.$router.push({path: `/${value}`})
      console.log(value)
    }
  },
   created () {
    if(!this.$store.state.quoteStatus) {
      this.initQuoteClient();
      console.log(this.quotationList)
    }    
  }

  
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.list-wrap{
  width: 7.5rem;
  padding: 0.88rem 0 56px;
}
.list-box{
  h3{
    position: relative;
    @include font(0.28rem, 0.8rem, #333, left);
    text-indent: 0.48rem;
    &:before{
      content: '';
      position: absolute;
      left: 0.3rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0.08rem;
      height: 0.32rem;
      background-color: #4e8bee;
    }
  }
}
.title-item{
  background-color: #f8f9fc;
  text-align: left;
  border-top: #e9e9e9 1px  solid;
  border-bottom: #e9e9e9 1px  solid;
  span{
    display: inline-block;
    @include font(0.28rem, 0.64rem, #5d718c); 
    width: 1.1rem
  }
  .name{
    width: 3.62rem;
    text-indent: 0.25rem;
    text-align: left;

  }
}
.item{
  text-align: left;
  border-bottom: #e9e9e9 1px  solid;
  .name-box,span{
    display: inline-block;
    width: 1.1rem;
    @include font(0.28rem, 0.96rem, #333); 
  }
  .name-box{
    width: 3.62rem;
    text-indent: 0.25rem;
    text-align: left;
    font-size: 0;
    line-height: 0;
    vertical-align: middle;    
    .name{
      width: inherit;
      @include font(0.32rem, 0.32rem, #333,left); 
      text-indent: 0;
    }
    .name-code{
      width: inherit;
      @include font(0.24rem, 0.42rem, #8b8b8b,left);
    }
  }
  .red{
    color: #fd4331 
  }
  .green{
    color: #05aa3b
  }
}

.icon{
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('../assets/img/icon_colour.png') top center no-repeat;
  background-size: cover;
}
.icon-checked{
  background-image: url('../assets/img/icon_check.png');

}
@for $i from 1 through 5 {
  $background-position-y: (0,-0.72rem,-1.4rem,-2.1rem,-2.8rem);

  .icon#{$i}{
    background-position-y:nth($background-position-y,$i);
    @media screen and (min-width: 320px) and (max-width: 320px) {
    $background-position-y: (0,-0.72rem,-1.39rem,-2.09rem,-2.8rem);
    background-position-y:nth($background-position-y,$i) 
  }
  }
} 

</style>

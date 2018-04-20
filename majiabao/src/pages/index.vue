<template>
  <div>
    <mt-header fixed title="首页"></mt-header>
    <div class="swipe-wrap">
      <mt-swipe :auto="0">
        <mt-swipe-item>
          <img src="../assets/img/banner1.jpg" alt="banner1">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/img/banner2.jpg" alt="banner2">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="recommended-quotations">
      <h2>推荐行情<span @click="goto('/quotation')">更多</span></h2>
      <ul class="quotations-list">
        <li v-for="item in itemList">
          <div class="top-show">
            <p :class="item.LastQuotation.ChangeRate>0?'red':'green'">{{item.LastQuotation.LastPrice}}</p>
            <p :class="item.LastQuotation.ChangeRate>0?'red':'green'">{{item.LastQuotation.ChangeRate.toFixed(2)}}%</p>
          </div>         
          <div class="bottom-show">
            {{item.CommodityName}}
          </div>
        </li>
      </ul>
    </div>
    <div class="information-wrap">
      <h2>最新资讯<span @click="goto('/information')">更多</span></h2>
      <ul class="new-list">
        <li v-for="item in newsList" @click="goto(item.id)"> 
          <h2 class="title">{{ item.title }}</h2>
          <p class="time"><span>{{ item.day }}</span><span>{{ item.time }}</span></p>
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
      selected: 'index',
      showList: ['GC','CL'],
      newsList: [
        {
          title: '国务院：深化多层次资本市场改革',
          day: '2018.03.27',
          time: '15:07:35'
        },
        {
          title: '量化投资策略的价值凸显',
          day: '2018.03.27',
          time: '15:06:35'
        },
        {
          title: '期指进一步松绑风声再起 业界期待最终实现正常化',
          day: '2018.03.27',
          time: '15:05:35'
        },
      ],
    }  
  },
  computed: {
    itemList () {
      
      let arr = this.$store.state.market.testArr;
      let arr1 = [];
      let length1 = this.showList.length;
      console.log(arr.length);
      if(arr.length === 21){
        for (const v of arr) {
          console.log(1)
          if(!length1) return arr1;
          if(this.showList.includes(v.CommodityNo)){
            arr1.push(v);
            length1--;
          }
        }
        //  return this.$store.state.market.testArr.filter(v => {
        //   console.log(1)
        //   return this.showList.includes(v.CommodityNo)
        // })
        
      }
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
  },
  created () {
    var timeer
    console.time(timeer)
    if(!this.$store.state.quoteStatus) {
      this.initQuoteClient();    

    }   
    console.timeEnd(timeer) 
  }
  
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.swipe-wrap{
  width: 7.5rem;
  height: 2.4rem;
  padding-top: 0.88rem;
  box-sizing: content-box;
}
.recommended-quotations,.information-wrap{
  width: 7.5rem;
  h2{
    height: 0.8rem;
    @include font(0.28rem, 0.8rem, #333, left);
    margin-left: 0.25rem;
    border-bottom: #e9e9e9 1px solid;
    span {
      float: right;
      color: #4e8bee;
      padding-right: 0.25rem
    }
  }
  @at-root .quotations-list{
    box-sizing: content-box;
    width: 7rem;
    height: 2.06rem;
    margin: 0 auto;
    padding: 0.24rem 0;
    border-bottom: #e9e9e9 1px solid;
    li{
      display: inline-block;
      width: 50%;      
      .top-show{
        padding: 0.24rem 0;
        border: #e9e9e9 1px solid;
        p{
          @include font(0.28rem, 0.36rem, #333);
        }
        .red{
           color: red
        }
        .green{
          color: green
        }
      }
      .bottom-show{
        border: #e9e9e9 1px solid;
        border-top: none;
        @include font(0.28rem, 0.8rem);  
      }
    } 
  }
}
.information-wrap{
  .title{
    border-bottom: none;
    margin-left: 0;
  }
  .new-list{
    li{
      height: 1.32rem;
      border-bottom: #e9e9e9 1px solid;
      margin-left: 0.25rem
    }
    .time{
      text-align: left;
      span:nth-child(1){
        padding-right: 0.24rem
      }
    } 
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
  background-image: url('../assets/img/icon_check.png')
}
@for $i from 1 through 5 {
  $background-position-y: (0,-0.7rem,-1.4rem,-2.1rem,-2.8rem);
  .icon#{$i}{
    background-position-y:nth($background-position-y,$i) 
  }
} 

</style>

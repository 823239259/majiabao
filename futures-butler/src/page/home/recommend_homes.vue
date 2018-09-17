<template>
  <div id="recommend">
    <mt-header fixed title="推荐" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      <h2 class="my-title">推荐行情</h2>
        <div class="my-swiper">
          <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide class="my-item" v-for="(item, index) in myParameters" :key="index" >
                <h4 class="title">{{item.CommodityNo}}{{item.MainContract}}</h4>
                <p class="name">{{item.CommodityName}}</p>
                <p class="price">{{item.LastQuotation.LastPrice}}</p>
                <div class="rate-box">
                  <span :class="{green: item.LastQuotation.ChangeRate < 0, red: item.LastQuotation.ChangeRate > 0}">{{item.LastQuotation.ChangeValue|fixNum(item.DotSize)}}</span>
                  <span :class="{green: item.LastQuotation.ChangeRate < 0, red: item.LastQuotation.ChangeRate > 0}">{{item.LastQuotation.ChangeRate|fixNum}}%</span>
                </div>
                
              </swiper-slide>
        </swiper>
      </div>
    </div>
    <div>
      <h2 class="my-title">推荐数据</h2>
      <img  class="imgs" src="../../assets/images/home/tuijian_banner.jpg" alt="推荐图片" @click="goto('/tools_item/5')">
    </div>
    
    
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  
  const local = pro.local;
  export default {
    name: "recommend",
    props: ['id'],
    components: {
     
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        list: [],
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
            slidesPerView: 'auto',
            initialSlide: 1,
            //slidesOffsetAfter: 100,
            centeredSlides: true,
            preventClicks : true,
            spaceBetween: 15,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
                click: () => {
                  // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
                    const item = this.list[this.swiper.activeIndex];
                    this.goto(item.path)
                }
            }


        }
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      myParameters () {
        return this.$store.state.market.Parameters;
      },
      quoteSocket () {
        return this.$store.state.quoteSocket;
      },
      
    },
    methods: {
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      goto(path) {
        this.$router.push({
          path
        });
      },
      colorForChangeRate (price) {
        return price>0
      },
      subscribe(){
        this.$store.state.market.Parameters = [];
        const mySubscribe = ['CL', 'BRN', 'GC', 'SI', 'HG', 'QM'];
        this.$store.state.market.markettemp.forEach(element => {
          if (mySubscribe.includes(element.CommodityNo)) {
              this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + element.ExchangeNo + '","CommodityNo":"' + element.CommodityNo + '","ContractNo":"' + element.MainContract +'"}}');
          }
        });
			},
       
    },
    filters: {
      fixNum: function(num, dotSize = 2){
				if(dotSize >= 4) dotSize = 4;
				return num.toFixed(dotSize);
			}
    },
    mounted() {
      
    },
    activated() {
      this.subscribe()
  
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #recommend {
    width: 7.5rem;
    padding-top: 0.96rem;
    //background-color: $bg;
  }
  .my-title{
    @include font($fs28,0.8rem,#283835,left);
    padding: 0 0.3rem;
    border-bottom:  1px solid #bbf6ec;
  }
  .my-swiper{
        padding: 0.4rem 0;
        border-bottom: 0.16rem solid #bbf6ec;
        // width: 100%;
        // height: 2.4rem;
    }
    .swiper-container{
        height: inherit;
    }
    .my-item{
        width: 3.3rem;
        height: 2.4rem;
        background-color: #fff;
        border-radius: 0.1rem;
        border: solid 1px #169781;
        box-shadow: 0 0 5px #169781;
        @include font($fs28,2rem,#fff);
        .title{
          @include font($fs24,0.64rem,#14caab);
        }
        .name{
          @include font($fs30,0.3rem,#283835);
        }
        .price{
          @include font($fs40,0.8rem,#283835);
        }
        .rate-box{
          @include font($fs24,0.24rem,#283835);
        }
        .rate{
          
        }
        .green{
          color: #19d961
        }
        .red{
          color: #F4663A
        }

    }
    .imgs{
      display: block;
      width: 7.5rem;
      height: 2.4rem;

    }



</style>
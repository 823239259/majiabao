<template>
  <div id="my_collection" :style="{height:clientHeight}">
    <mt-header fixed title="我的收藏">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
        <ul class="collection" v-if="showNone"  v-for="(v,index) in parameters">
          <li class="item">
              <div class="box left">{{v.CommodityName}}</div>
              <div class="box center">价格：{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</div>
              <div class="box right">跌涨：<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span></div>
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
	import pro from '../../../assets/js/common.js'
	export default {
	  name: 'about_us',
	  data () {
	    return {
	       showNone: true,
	       selectionList:''
	    }  
	  },
	  computed: {
	    clientHeight () {
	          return document.documentElement.clientHeight + 'px';
	     },
	     userInfo(){
				return localStorage.user ? JSON.parse(localStorage.user) : ""
			},
			parameters(){
				return this.$store.state.market.Parameters;
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
	  },
	  methods: {
	    goBack () {       
	      window.history.length > 1
	        ? this.$router.go(-1)
	        : this.$router.push('/')
	    
	    },  
	   //获取自选列表
			getSelection:function(){
				
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						this.selectionList = res.data;
						if(!this.selectionList) return this.showNone = false;
						this.selectionList.forEach((o, i) => {
							this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
						});
					}
				}).catch((err) => {
					//Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
	  },
	  activated:function(){
	  	this.getSelection()
	  },
	  filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			}
		},
	  
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

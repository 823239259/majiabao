<template>
	<div id="type">
		<mt-header :title="type" fixed>
		 	<router-link to="/quote" slot="left">
		 	   	<mt-button icon="back" ></mt-button>
		 	</router-link>
		</mt-header>
		<div class="container">
			<ul v-for="(v,index) in parameters" @click="toQuoteDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)">
				<li>
					<i :style="{backgroundColor:nameColor[index]}" class="name">{{v.CommodityNo}}</i>
				</li>
				<li>
					<p class="p_black">{{v.CommodityName}}</p>
					<p class="p_gray">价格：<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span></p>
				</li>
				<li>
					<p class="p_gray">涨跌：<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span></p>
				</li>
				<li>
					<i class="shouc">收藏</i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	export default{
		name:"",
		data(){
			return{
				type:'',
				nameColor:["#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#9bbb58"]
			}
		},
		computed:{
			parameters(){
				return this.$store.state.market.Parameters;
			},
			commodityOrder(){
				if(this.$store.state.market.commodityOrder){
					return this.$store.state.market.commodityOrder;
				}
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			}
		},
		methods:{
			subscribe(){
				this.commodityOrder.forEach((o, i) => {
					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
				});
			},
			toQuoteDetails: function(commodityNo, mainContract, exchangeNo, contrast){
				this.$router.push({path: '/quoteDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
			}
		},
		mounted: function(){
		},
		activated:function(){
			this.type = this.$route.query.type;
			//订阅
			this.subscribe();
		},
		created () {
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#type{
		width: 7.5rem;
	}
	.container{
		margin-top: 1rem;
		ul{
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 0 0.3rem;
			align-items: center;
			height: 1.36rem;
			.p_black{
				color: #283835;
				font-size: 0.32rem;
			}
			.green{
				color: #19d961;
			}
			.red{
				color: #f4663a;;
			}
			.p_gray{
				color: #788b87;
				font-size: 0.28rem;
			}
			.shouc{
				text-align: center;
				display: block;
				width: 0.8rem;
				height: 0.4rem;
				line-height: 0.4rem;
				font-size: 0.28rem;
				color: white;
				background-color: #f44234;
			}
			.name{
				display: block;
				width: 0.9rem;
				height: 0.7rem;
				font-size: 0.28rem;
				line-height: 0.7rem;
				text-align: center;
				color: white;
				border-radius: 50%;
			}
		}
	}
</style>
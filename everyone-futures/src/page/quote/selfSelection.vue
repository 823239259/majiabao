<template>
	<div id="selfSelection">
		<div class="title">
			自选
		</div>
		<div class="container">
			<div class="details animated fadeInRight" v-for="(v,index) in parameters" @click="toQuoteDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)" >
				<p>{{v.CommodityName}}</p>
				<p :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</p>
				<p :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</p>
			</div>
			<div class="deep"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"selfSelection",	
		data(){
			return{
				
			}
		},
		computed:{
			parameters(){
				return this.$store.state.market.Parameters;
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
		},
		methods:{
			toQuoteDetails: function(commodityNo, mainContract, exchangeNo, contrast){
				this.$router.push({path: '/quoteDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
			}
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


<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#commodity{
		width: 7.5rem;
		background-color: #d3e9ff;
	}
	.title{
		width: 100%;
		height: 0.8rem;
		padding: 0 0.3rem;
		font-size: 0.28rem;
		line-height: 0.8rem;
		background-color: #b3daff;
	}
	.container{
		width: 100%;
		.details{
			padding: 0.2rem;
			float: left;
			width: 2.1rem;
			height: 1.8rem;
			background-color: #edf6ff;
			border-radius: 0.1rem;
			margin: 0.3rem 0 0 0.3rem;
			p{
				line-height: 0.4rem;
				text-align:center; 
				&:nth-child(1){
					font-size: 0.28rem;
					color: #222222;
					
				}
				&:nth-child(2){
					font-size: 0.36rem;
				}
				&:nth-child(3){
					font-size: 0.28rem;
				}
				&.red{
					color: #fa7f69;
				}
				&.green{
					color: #1bd00d;
				}
			}
		}
		.deep{
			float: left;
			width:100%;
			height: 0.3rem;
		}
	}
	
</style>
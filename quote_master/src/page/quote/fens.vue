<template>
	<div id="echarts">
		<div id="fens"></div>
	</div>
</template>

<script>
	export default{
		name: 'echarts',
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			commodityOrder(){
				return this.$store.state.market.commodityOrder;
			},
			currentdetail(){
				return this.$store.state.market.currentdetail;
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
		},
		watch: {
			currentdetail: function(n, o){
				if(n != undefined && n != null && n != ''){
					this.$store.state.isshow.isfens = true;
					this.commodityOrder.forEach((v, k) => {
						let data = {
							Method: "QryHistory",
							Parameters:{
								ExchangeNo: this.orderTemplist[v.commodityNo].ExchangeNo,
								CommodityNo: v.commodityNo,
								ContractNo: this.orderTemplist[v.commodityNo].MainContract,
								HisQuoteType: 0,
								BeginTime: "",
								EndTime: "",
								Count: 0
							}
						};
						this.quoteSocket.send(JSON.stringify(data));
					});
				}
			}
		},
		mounted: function(){
			if(this.currentdetail.commodityNo != undefined){
				this.$store.state.isshow.isfens = true;
				let data = {
					Method: "QryHistory",
					Parameters:{
						ExchangeNo: this.currentdetail.exchangeNo,
						CommodityNo: this.currentdetail.commodityNo,
						ContractNo: this.currentdetail.contractNo,
						HisQuoteType: 0,
						BeginTime: "",
						EndTime: "",
						Count: 0
					}
				};
				this.quoteSocket.send(JSON.stringify(data));
			}
//			this.commodityOrder.forEach((v, k) => {
//				if(v.commodityNo != this.currentdetail.CommodityNo){
//					let data = {
//						Method: "QryHistory",
//						Parameters:{
//							ExchangeNo: this.orderTemplist[v.commodityNo].ExchangeNo,
//							CommodityNo: v.commodityNo,
//							ContractNo: this.orderTemplist[v.commodityNo].MainContract,
//							HisQuoteType: 0,
//							BeginTime: "",
//							EndTime: "",
//							Count: 0
//						}
//					};
//					this.quoteSocket.send(JSON.stringify(data));
//				}
//			});
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#fens{
		width: 100%;
		height: 3.7rem;
	}
</style>
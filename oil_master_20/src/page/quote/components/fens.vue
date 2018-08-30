<template>
	<div id="echarts">
		<div id="fens"></div>
		<div id="volume"></div>
	</div>
</template>

<script>
	export default{
		name: 'echarts',
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			currentdetail(){
				return this.$store.state.market.currentdetail;
			},
		},
		watch: {
			
		},
		mounted: function(){
			if(this.currentdetail.CommodityNo != undefined){
				this.$store.state.isshow.isfens = true;
				let data = {
					Method: "QryHistory",
					Parameters:{
						ExchangeNo: this.currentdetail.ExchangeNo,
						CommodityNo: this.currentdetail.CommodityNo,
						ContractNo: this.currentdetail.MainContract,
						HisQuoteType: 0,
						BeginTime: "",
						EndTime: "",
						Count: 0
					}
				};
				this.quoteSocket.send(JSON.stringify(data));
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#fens, #volume{
		width: 100%;
		margin: 0 auto;
	}
	#fens{
		width: 7.5rem;
		height: 3.7rem;
	}
	#volume{
		width: 7.5rem;
		height: 1.7rem;
	}
</style>
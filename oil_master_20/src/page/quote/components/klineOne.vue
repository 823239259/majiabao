<template>
	<div id="echarts">
		<div id="kline"></div>
		<div id="kline_volume"></div>
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
			}
		},
		mounted: function(){
			this.$store.state.isshow.iskline = true;
			this.$store.state.market.selectTime = 1;
			var data = {
				Method: "QryHistory",
				Parameters:{
					ExchangeNo: this.currentdetail.ExchangeNo,
					CommodityNo: this.currentdetail.CommodityNo,
					ContractNo: this.currentdetail.MainContract,
					HisQuoteType: 1,
					BeginTime: "",
					EndTime: "",
					Count: 0
				}
			};
			this.quoteSocket.send(JSON.stringify(data));
		},
		activated() {
			this.$store.state.isshow.iskline = true;
			this.$store.state.market.selectTime = 1;
			var data = {
				Method: "QryHistory",
				Parameters:{
					ExchangeNo: this.currentdetail.ExchangeNo,
					CommodityNo: this.currentdetail.CommodityNo,
					ContractNo: this.currentdetail.MainContract,
					HisQuoteType: 1,
					BeginTime: "",
					EndTime: "",
					Count: 0
				}
			};
			this.quoteSocket.send(JSON.stringify(data));
		},
		
		
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#fens, #volume{
		width: 100%;
		margin: 0 auto;
	}
	#kline{
		height: 4.66rem;
	}
	#kline_volume{
		height: 1.62rem;
	}
	
</style>
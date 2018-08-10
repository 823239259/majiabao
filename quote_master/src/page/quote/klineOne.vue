<template>
	<div id="echarts">
		<div id="kline"></div>
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
			
		},
		activated:function(){
			
		},
		created(){
			this.$store.state.isshow.iskline = true;
			this.$store.state.market.selectTime = 1;
			var data = {
				Method: "QryHistory",
				Parameters:{
					ExchangeNo: this.currentdetail.exchangeNo,
					CommodityNo: this.currentdetail.commodityNo,
					ContractNo: this.currentdetail.contractNo,
					HisQuoteType: 1,
					BeginTime: "",
					EndTime: "",
					Count: 0
				}
			};
			this.quoteSocket.send(JSON.stringify(data));
		},
		watch:{}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#fens, #volume{
		width: 100%;
		margin: 0 auto;
	}
	#echarts{
		height: 5.4rem;
	}
	#kline{
		height: 3.7rem;
	}
</style>
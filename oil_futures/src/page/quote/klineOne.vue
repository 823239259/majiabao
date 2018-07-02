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
			let h = this.$parent.chartsHight;
			$("#kline").css('height', h/10*6.9 + 'rem');
			$("#kline_volume").css('height', h/10*3 + 'rem');
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
		activated:function(){
			
		},
		watch:{
			currentdetail:function(n,o){
				let h = this.$parent.chartsHight;
				$("#kline").css('height', h/10*6.9 + 'rem');
				$("#kline_volume").css('height', h/10*3 + 'rem');
				this.$store.state.isshow.iskline = true;
				this.$store.state.market.selectTime = 1;
				var data = {
					Method: "QryHistory",
					Parameters:{
						ExchangeNo: n.ExchangeNo,
						CommodityNo: n.CommodityNo,
						ContractNo: n.MainContract,
						HisQuoteType: 1,
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
	@import "../../assets/css/common.scss";
	#fens, #volume{
		width: 100%;
		margin: 0 auto;
	}
</style>
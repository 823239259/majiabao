<template>
	<div id="echarts">
		<!-- <div id="kline" :data-she= "$attrs.she"></div> -->

		<!-- <div id="kline1" :data-she= "$attrs.she" v-if="klineOneId==='kline1'"></div> -->
		<div id="kline" :data-she= "$attrs.she"></div>
		<!-- <div id="kline2" :data-she= "$attrs.she"></div> -->
		<div id="kline_volume"></div>
	</div>
</template>

<script>
	export default{
		name: 'klineOne',
		props: ['test'],
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			currentdetail(){
				return this.$store.state.market.currentdetail;
			},
			klineOneId () {
				return this.$store.state.market.klineOneId
			}
		},
		watch: {
			currentdetail (n,o) {
				console.log(n)
			}
		},
		mounted(){
			console.log(this.test);
			console.log('mounted');
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
		// activated() {
		// 	console.log(this.test);
		// 	console.log('activated');
		// 	this.$store.state.isshow.iskline = true;
		// 	this.$store.state.market.selectTime = 1;
		// 	var data = {
		// 		Method: "QryHistory",
		// 		Parameters:{
		// 			ExchangeNo: this.currentdetail.ExchangeNo,
		// 			CommodityNo: this.currentdetail.CommodityNo,
		// 			ContractNo: this.currentdetail.MainContract,
		// 			HisQuoteType: 1,
		// 			BeginTime: "",
		// 			EndTime: "",
		// 			Count: 0
		// 		}
		// 	};
		// 	this.quoteSocket.send(JSON.stringify(data));
		// },
		
		
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#fens, #volume{
		width: 100%;
		margin: 0 auto;
	}
	#kline,#kline2{
		height: 4.66rem;
	}
	#kline_volume{
		height: 1.62rem;
	}
	
</style>
<template>
	<div id="quote">
		<mt-header fixed title="k线数据">
			<mt-button slot="left" @click="goto('/search')">
				<span class="header_icon search_icon_k" ></span>
			</mt-button>
			<mt-button slot="right" @click="setSort(mode)">
				<span class="header_icon paixu_icon_k" ></span>
			</mt-button>
		</mt-header>
		<div id="container">
			<div class="tab">
				<span v-for="(k,index) in tabList" :class="{current: currentChartsNum == index}" @click="changeCommodityNo(index)">{{k}}</span>
			</div>
			<div class="tips">
				<p @click="changeTip">使用说明</p>
				<transition  name="fade">
					<div class="tipsList" v-show="showTip">
						<ul>
							<li>1.点击上方分类按钮可查看不同类的期货行情</li>
							<li>2.点击任意行情，可查看该行情的简要数据图</li>
							<li>3.点击“更详细数据”可查看该品种的详细行情</li>
						</ul>
					</div>
				</transition >
			</div>
			<div class="CommodityList">
				<div class="listName">
					<span v-for="k in CommodityList">{{k}}</span>
				</div>
				<div class="listScoll">
					<div  v-for="(v, index) in parameters" :key="index">
						<div class="listName"   :class="{checked : currentCheck == index}" @click="showKline(index,v.CommodityNo)" >
							<span>{{v.CommodityName}}</span>
							<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span>
							<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
							<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
							<i :class="{icon_buy: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, icon_sell: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice ? "买" : "卖"}}</i>
						</div>	
						<transition  name="fade">
							<div v-if="currentCheck == index">
								<div class="KLinePic" >
									<components :is="currentChartsView"></components>
								</div>
								<div class="toDetails" @click="toDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)">
									<span>开盘价:{{v.LastQuotation.OpenPrice}}</span>
									<span>查看更多数据></span>
								</div>
							</div>
								
							
						</transition >
					</div>
				</div>
			</div>
		</div>
		
		
		<bottomTab :tabSelect="tabSelected"></bottomTab>
	</div>

</template>

<script>
	import pro from '../assets/js/common.js'
	import { mapMutations, mapActions } from 'vuex'
	import bottomTab from '../components/bottom_tab'
	import tipsFloat from '../components/tipsFloat'
	import firstGuide from "./quote/firstGuide.vue"
	import { Toast } from 'mint-ui';
	import klineOne from './quote/klineOne.vue'
	export default {
		name: "",
		data() {
			return {
				tabSelected: 'kline',
				tabList:['商','股',"汇",'LIME','率','BIT'],
				currentChartsNum:0,
				showTip:false,
				CommodityList:['期货名称','最新价','涨跌幅','涨跌额','买/卖'],
				marketList:[],//全部列表分类
				currentCheck:0,
				currentChartsView:'klineOne',
				chartsHight:5.4,
				currentNo:'',
				mode: true,
				myParameters: ''
				
			}
		},
		components: {
			bottomTab,
			tipsFloat,
			firstGuide,
			klineOne
		},
		computed: {
			parameters(){
				return this.$store.state.market.Parameters;
			},
			// myParameters () {
			// 	let myParameters = this.parameters.slice();
			// 	return myParameters
			// 	// return myParameters.sort(item =>{
			// 	// 	if(item.LastQuotation.LastPrice > item.LastQuotation.PreSettlePrice) return true
			// 	// })
			// },
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			jsonData(){
				return this.$store.state.market.jsonData;
			},
			jsonDataKline(){
				return this.$store.state.market.jsonDataKline;
			},
			go () {
				return this.$store.state.go;
			}
		},
		methods: {
			...mapActions([
				'initQuoteClient'
			]),
			goto(path) {
				this.$router.push({
				path: path
				});
			},
			toDetails: function(commodityNo, mainContract, exchangeNo, contrast){
				this.$router.push({path: '/klineDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
			},
			changeCommodityNo:function(index){
				this.currentCheck = 0;
				this.currentChartsNum = index;
			},
			changeTip:function(){
				this.showTip =!this.showTip;
			},
			getTradeWsUrl: function(){   //获取交易ws地址
				var data = {
					quoteVersion: this.$store.state.market.quoteConfig.version,
					tradeVersion: this.$store.state.market.tradeConfig.version
				};
				pro.fetch('post', '/others/getSocket', data, '').then((res) => {
					if(res.success == true && res.code == '1'){
						this.$store.state.market.tradeConfig.url_real = res.data.tradeUrl;
					}
				}).catch((err) => {
					var data = err.data;
					if(data) Toast({message: data.message, position: 'bottom', duration: 2000});
				});
			},
			getCommodityInfo: function(){//获取全部分类
				pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.marketList = res.data;
						if(this.quoteStatus == true) return;
						this.$store.state.market.commodityOrder = res.data[0].list;
						this.currentNo = res.data[0].list[0].commodityNo;
						this.$store.state.market.currentNo = this.currentNo;
						//初始化行情
						if(this.$store.state.market.commodityOrder && this.$store.state.account.quoteStatus == false){
							this.initQuoteClient();
							this.operateData();
						}
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			showKline:function(index,commodity){
				console.log({index,commodity});
				
				this.$store.state.isshow.isklineshow = false;
				this.currentCheck = index;
				this.currentNo = commodity;
				this.$store.state.market.currentNo = commodity;
			},
			operateData: function(val){
				//允许画图
				this.$store.state.isshow.isfensInit = false;
				//渲染画图
			},
			setSort (mode) {
				console.log(1123);

				if (mode) {
					this.$store.state.market.Parameters = this.$store.state.market.Parameters.reduce((arr,item) =>{
						if (item.LastQuotation.LastPrice > item.LastQuotation.PreSettlePrice){
							arr.unshift(item)
						}else{
							arr.push(item)
						}
						return arr
					},[])
				}else{
					this.$store.state.market.Parameters = this.$store.state.market.Parameters.reduce((arr,item) =>{
						if (item.LastQuotation.LastPrice < item.LastQuotation.PreSettlePrice){
							arr.unshift(item)
						}else{
							arr.push(item)
						}
						return arr
					},[])
				}
				this.mode = !this.mode;

				this.showKline(0,this.$store.state.market.Parameters[0].CommodityNo)
				//this.myParameters = myParameters
			}
		},
		mounted: function() {
		},
		activated: function() {
			this.operateData()
			if (this.go) {
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.market.Parameters = [];
				this.$store.state.market.commodityOrder = [];
				this.$store.state.market.commodityOrder = this.marketList[0].list;
				this.marketList[0].list.forEach((o, i) => {
					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
				});
			}
				


			this.$store.state.isshow.isfensshow = false;
			this.$store.state.isshow.isklineshow = false;
			this.$store.state.isshow.islightshow = false;

			// this.$store.state.isshow.isfensshow = false;
			// this.$store.state.isshow.isklineshow = false;
			// this.$store.state.isshow.islightshow = false;
			// this.$store.state.isshow.isfensInit = false;
		},
		created() {
			//获取所有合约
			this.getCommodityInfo();
			//获取交易ws地址
			this.getTradeWsUrl();
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			},
		
		},
		watch: {
			currentChartsNum:function(n,o){
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.market.Parameters = [];
				this.$store.state.market.commodityOrder = [];
				this.$store.state.market.commodityOrder = this.marketList[n].list;
				this.marketList[n].list.forEach((o, i) => {
					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
				});
			},
			currentNo:function(n,o){
				console.log({n})
				if(n!=o){
					this.parameters.forEach((t, i) => {
						if(t.CommodityNo == n){
							console.log(n)
							this.$store.state.isshow.isfensshow = false;
							this.$store.state.isshow.isklineshow = false;
							this.$store.state.isshow.islightshow = false;
							this.$store.state.isshow.isfensInit = false;
							this.$store.state.market.currentdetail = t;
							return;
						}
					});
				}
			},
			parameters: function(n, o){
				if(n && n.length == 1){
					this.parameters.forEach((o, i) => {
						if(o.CommodityNo == this.currentNo){
							this.$store.state.market.currentdetail = o;
							return;
						}
					});
				}
			},
		},

		beforeRouteLeave (to, from, next) {
			console.log(to)
			const goList = ['my', 'search'];
			if (goList.includes(to.name)) {
				// this.$store.state.isshow.isfensshow = false;
				// this.$store.state.isshow.isklineshow = false;
				// this.$store.state.isshow.islightshow = false;
				// this.$store.state.isshow.isfensInit = false;
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
				this.$store.state.isshow.isfensInit = false;
			 	this.$store.state.go = true
			}
			
			next()
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	.fade-enter-active, .fade-leave-active {
		 transition: opacity 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		 opacity: 0;
	}
	#container{
		width: 7.5rem;
		margin-top: 0.96rem;
		background-color: #fff;
	}
	.tab{
		width: 7.5rem;
		height: 1.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		span{
			width: 1rem;
			height: 0.6rem;
			line-height: 0.6rem;
			text-align: center;
			background-color: #eaeaea;
			color: #2b344a;
			font-size: 0.28rem;
			border-right: 1px solid #fff;
			&.current{
				color: #fff;
				background-color: #497df5;
			}
		}
	}
	.tips{
		background-color: #eaeaea;
		p{
			height: 0.6rem;
			line-height: 0.6rem;
			text-align: center;
			color: #2b344a;
			font-size: 0.24rem;
		}
		li{
			text-align: left;
			text-indent: 1.5rem;
			color: white;
			line-height:0.4rem;
			font-size: 0.24rem;
		}
	}
	.CommodityList{
		.listScoll{
			overflow-y: scroll;
			height: 8.45rem;
			.checked{
				background-color: #f7f7f7;
			}
		}
		.listName{
				height: 1rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #f7f7ff;
				span{
					font-size: 0.28rem;
					color: #2b344a;
					&:nth-child(1){
						margin-left: 0.3rem;
						margin-right: 0.9rem;
						
					}
					&:nth-child(5){
						/*margin-right: 0.3rem;*/
					}
				}
				i{
					display: inline-block;
					width: 1rem;
					height: 1rem;
					color: white;
					font-size: 0.3rem;
					line-height: 1rem;
					text-align: center;
				}
				.icon_buy{
					background-color: #ff576e;
				}
				.icon_sell{
					background-color: #14da8b;
				}
			}
			.toDetails{
				height: 0.8rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 0.3rem;
				border-bottom: 1px solid #f7f7ff;
				span{
					color: #2b344a;
				}
			}
		
	}
	.KLinePic{
		height: 6.5rem;
		width: 100%;
		background-color: white;
	}
	// .header_icon{

	// }
</style>
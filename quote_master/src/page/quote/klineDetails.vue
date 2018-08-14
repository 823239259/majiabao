<template>
	<div id="klineDetails">
		<template v-for="(v, index) in parameters">
			<div v-if="v.CommodityNo == currentNo">
				<mt-header fixed title="k线数据详情">
					<mt-button slot="left">
						<span class="header_icon"></span>
					</mt-button>
					<mt-button slot="right">
					</mt-button>
				</mt-header>
				<div id="container">
					<div class="klinePic">
						<div class="chartsList">
							<span v-for="(key,index) in chartsList" :class="{current:currentChartsNum == index}" @click="menuEvent(index)">{{key}}</span>
						</div>
						<div class="charts_container">
							<components :is="currentChartsView" v-if="chartsShow"></components>
						</div>
					</div>
					<div class="commodityName">
						<ul>
							<li>{{v.CommodityName}}</li>
							<li>
								<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span>
								<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
								<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
							</li>
						</ul>
					</div>
					<div class="strategy">
						<div class="name">
							策略选择
						</div>
						<div class="strategyContainer">
							<div class="strategyContainer1">
								请将策略拖动至阴影区域K线图将实时直观展示买卖点
							</div>
						</div>
						<div class="strategyList">
							<div class="list" v-for="(key,val,index) in strategyList">
								<div class="top">
									<p>{{val}}</p>
								</div>
								<div class="bottom"></div>
							</div>
						</div>
					</div>
					<div class="black"></div>
					<div class="infoDetails">
						<div class="name">数据盘口</div>
						<div class="infos">
							<ul>
								<li>
									<span>现手</span>
									<span>{{v.LastQuotation.LastVolume}}</span>
								</li>
								<li>
									<span>买价</span>
									<span>{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>卖价</span>
									<span>{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>平均价</span>
									<span>{{v.AveragePrice ? v.AveragePrice : 0}}</span>
								</li>
							</ul>
						</div>
						<div class="infos">
							<ul>
								<li>
									<span>买量</span>
									<span>{{v.LastQuotation.BidQty1}}</span>
								</li>
								<li>
									<span>卖量</span>
									<span>{{v.LastQuotation.AskQty1}}</span>
								</li>
								<li>
									<span>成交量</span>
									<span>{{v.LastQuotation.TotalVolume}}</span>
								</li>
								<li>
									<span>持仓量</span>
									<span>{{v.LastQuotation.Position}}</span>
								</li>
							</ul>
						</div>
						<div class="infos">
							<ul>
								<li>
									<span>开盘</span>
									<span class="default" :class="{red: v.LastQuotation.OpenPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.OpenPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.OpenPrice | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>昨结</span>
									<span>{{v.LastQuotation.PreSettlePrice | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>最高价</span>
									<span class="default" :class="{red: v.LastQuotation.HighPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.HighPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.HighPrice | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>最低价</span>
									<span class="default" :class="{red: v.LastQuotation.LowPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LowPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LowPrice | fixNum(v.DotSize)}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="black"></div>
					<div class="name">买家趋势</div>
					<div class="buySell">

					</div>
					<div class="black"></div>
					<div class="name">对比合约</div>
					<div class="currentCommodityNo">
						<span>当前合约</span>
						<span>最新价</span>
						<span>涨跌幅</span>
					</div>
					<div class="currentCommodityNoInfo">
						<span>{{v.CommodityName}}</span>
						<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span>
						<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
					</div>
					<div class="currentCommodityNo">
						<span>对比合约</span>
						<span>最新价</span>
						<span>涨跌幅</span>
					</div>
					<div class="currentCommodityNoInfo">
						<span>美黄金</span>
						<span>16.2</span>
						<span>123.3</span>
					</div>
					<div class="name">您认为后续走势？</div>
					<div class="buySellBar">

					</div>
					<div class="black"></div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { mapMutations, mapActions } from 'vuex'
	import { Toast, MessageBox, Indicator } from 'mint-ui';
	import klineOne from './klineOne.vue'
	import klineThirty from './klineThirty.vue'
	import klineDay from './klineDay.vue'
	import klineFive from './klineFive.vue'
	import klineOneHour from './klineOneHour.vue'
	import fens from './fens.vue'
	export default {
		name: "klineDetails",
		mixins: [pro.mixinsToCustomer],
		data() {
			return {
				title: "",
				currentNo: '',
				total: '',
				total1: "",
				userInfo: localStorage.user ? JSON.parse(localStorage.user) : '',
				bottomList1: [{
						name: '101',
						method: 'dianzan'
					},
					{
						name: '工具箱',
						path: '/tools'
					},
					{
						name: '推荐给朋友',
						method: 'shareSystem'
					},

				],
				chartsList: ['1分k线', '5分k线', '30分k线', '1小时k线', '日K'],
				currentChartsNum: 0,
				currentChartsView: 'klineOne',
				chartsShow: false,
				chartsHight: 5.4,
				strategyList: {'海龟交易策略':'haigui','布林通道':'Bollingerbandit','移动平均':'SMA','DualThrust':'DualThrust','金特肯纳':'Jintena','RBreaker':'RBreaker'},
				ContractNo: '',
				dian: '',
				chooseKline: '分时',
				id1: {
					id1: 'kline',
					id2: 'kline_volume'
				},
				strategyData1: [],
				strategyK: "",
			}
		},
		components: {
			klineOne,
			klineFive,
			klineThirty,
			klineDay,
			klineOneHour
		},
		computed: {
			parameters() {
				this.$store.state.market.Parameters.forEach((a, i) => {
					if(a.CommodityNo == this.currentNo) {
						this.$store.state.market.currentdetail = a;
						this.ContractNo = a.MainContract
						this.total = Number(a.LastQuotation.BidQty1) + Number(a.LastQuotation.BidQty2) + Number(a.LastQuotation.BidQty3) + Number(a.LastQuotation.BidQty4) + Number(a.LastQuotation.BidQty5)
						this.total1 = Number(a.LastQuotation.AskQty1) + Number(a.LastQuotation.AskQty2) + Number(a.LastQuotation.AskQty3) + Number(a.LastQuotation.AskQty4) + Number(a.LastQuotation.AskQty5)
					}
				})
				return this.$store.state.market.Parameters;
			},
			orderTemplist() {
				return this.$store.state.market.orderTemplist;
			},
			tradeName() {
				return this.$store.state.tradeName;
			},
			quoteSocket() {
				return this.$store.state.quoteSocket;
			},
			jsonDataKline() {
				return this.$store.state.market.jsonDataKline;
			},
			physhonUrl() {
				return this.$store.state.market.physhon.url
			}
		},
		methods: {
			...mapMutations([
				'setfensoption', 'drawfens', 'setklineoption', 'drawkline'
			]),
			baifenbi(a, b) {
				a = Number(a)
				b = Number(b)
				//console.log(a,b)
				if(a == 0 && b == 0) return 0;
				return((a / (a + b)) * 100).toFixed(2) + '%'
			},
			toBackProbe: function(val, k) {
				MessageBox.confirm("是否使用策略进行回测？").then(action => {
					this.$store.state.isshow.isfensshow = false;
					this.$store.state.isshow.isklineshow = false;
					this.$store.state.isshow.islightshow = false;
					this.$router.push({
						path: "/backProbe",
						query: {
							strategyName: val,
							strategyK: k,
							CommodityNoK: this.currentNo,
							ContractNo: this.ContractNo
						}
					});
				});
			},
			operateData: function() {
				//允许画图
				this.$store.state.isshow.isfensInit = false;
					this.$store.state.isshow.iskline = false;
				//渲染画图
				this.chartsShow = true;
				this.currentChartsNum = 0;
				this.currentChartsView = 'klineOne';
//				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
//				this.$store.state.isshow.islightshow = false;
			},
			//选择画图类型
			menuEvent: function(index) {
				//允许画图
				this.$store.state.isshow.isfensInit = false;
				this.currentChartsNum = index;
				switch(index) {
					case 0:
						this.currentChartsView = 'klineOne';
						this.chooseKline = '1min';
						break;
					case 1:
						this.currentChartsView = 'klineFive';
						this.chooseKline = '5min';
						break;
					case 2:
						this.currentChartsView = 'klineThirty';
						this.chooseKline = '30min';
						break;
					case 3:
						this.currentChartsView = 'klineOneHour';
						this.chooseKline = '1hour';
						break;
					case 4:
						this.currentChartsView = 'klineDay';
						this.chooseKline = '1day';
						break;
				}
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
//				this.parameters.forEach((o, i) => {
//					o.check = 0;
//				});
			},
			routerback: function() {
				this.$router.go(-1);
				this.chartsShow = false;
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
			},
			addOptional: function() {
				var stateLogin = localStorage.user ? JSON.parse(localStorage.user) : '';
				if(stateLogin == '') {
					Toast({
						message: '请先登录平台账号',
						position: 'bottom',
						duration: 1500
					});
				} else {
					var headers = {
						token: stateLogin.token,
						secret: stateLogin.secret
					}
					if(this.optionalIconShow == true) { //删除自选
						var _datas = {
							id: this.optionalId
						};
						this.$messageBox.confirm("确定删除自选？", "提示").then(action => {
							pro.fetch('post', '/quoteTrader/userRemoveCommodity', _datas, headers).then((res) => {
								if(res.success == true && res.code == 1) {
									Toast({
										message: '自选删除成功',
										position: 'bottom',
										duration: 1000
									});
									this.optionalName = '添加自选';
									this.optionalIconShow = false;
								}
							}).catch((err) => {
								Toast({
									message: err.data.message,
									position: 'bottom',
									duration: 1000
								});
							});
						}).catch(err => {});
					} else { //添加自选
						var datas = {
							'exchangeNo': this.orderTemplist[this.currentNo].ExchangeNo,
							'commodityNo': this.currentNo,
							'contractNo': this.orderTemplist[this.currentNo].MainContract,
						}
						pro.fetch('post', '/quoteTrader/userAddCommodity', datas, headers).then((res) => {
							if(res.success == true && res.code == 1) {
								this.optionalIconShow = true;
								this.optionalName = '已添加自选';
								Toast({
									message: '自选添加成功',
									position: 'bottom',
									duration: 1500
								});
								this.optionalId = res.data.id;
							}
						}).catch((err) => {
							Toast({
								message: err.data.message,
								position: 'bottom',
								duration: 1500
							});
						});
					}
				}
			},
			//选择回测类型
			choseStrategy: function(e, id) {
				if(this.chooseKline == 'shandian' || this.chooseKline == "分时") {
					Toast({
						message: '只能在K线图选择策略',
						position: 'bottom',
						duration: 1500
					});
				} else if(id == 'haigui') {
					Toast({
						message: '尽情期待',
						position: 'bottom',
						duration: 1500
					});
				} else {
					$(".celue_pie p").removeClass('current');
					$(e.target).addClass('current');
					this.strategyK = id;
					clearInterval(this.timeing);
					this.strategyData1 = [];
					this.setklineoption(this.strategyData1),
						this.$store.state.market.strategyData = this.strategyData1;
					this.drawkline(this.id1);
					Indicator.open({
						spinnerType: 'fading-circle'
					});
					//第一步回测拿到打点数据
					this.setklineoption("")
					this.$store.state.market.strategyData = "";
					this.drawkline(this.id1);
					this.backProbeAjax();
				}
			},
			//回测
			backProbeAjax: function(k) {
				this.strategyData1 = [];
				var timeData = this.jsonDataKline.Parameters.Data;
				var ContractNo = this.jsonDataKline.Parameters.ContractNo;
				var TimeStart = timeData[0][0];
				var CommodityNo = this.jsonDataKline.Parameters.CommodityNo;
				this.CommodityNoK = CommodityNo;
				var TimeEnd = timeData[timeData.length - 1][0];
				let obj = {
					"strategy": this.strategyK,
					"commodity": CommodityNo,
					"frequency": this.chooseKline,
					"timeStart": TimeStart,
					"timeEnd": TimeEnd,
					"initialAccount": 1000000,
					"commodityNumber": ContractNo
				}
				$.ajax({
					type: "POST",
					url: this.physhonUrl + "/back_test",
					async: true,
					data: JSON.stringify(obj),
					timeout: 5000,
					dataType: "json",
					success: function(res) {
						var tradeInfo = res.tradeInfo;
						for(var i of tradeInfo) {
							var strategyObj = {};
							if(res.backtestIndex.frequency == "1day") {
								strategyObj.coord = [i[1].substring(0, 10), i[4]];
							} else {
								strategyObj.coord = [i[1], i[4]];
							}
							strategyObj.symbolSize = [7, 14];
							switch(i[3]) {
								case "BP":
									strategyObj.name = "开空";
									strategyObj.symbol = "image://static/lib/images/BP.png";
									break;
								case "BK":
									strategyObj.name = "开多";
									strategyObj.symbol = "image://static/lib/images/BK.png";
									break;
								case "SP":
									strategyObj.name = "平空";
									strategyObj.symbol = "image://static/lib/images/SP.png";
									break;
								case "SK":
									strategyObj.name = "平多";
									strategyObj.symbol = "image://static/lib/images/SK.png";
									break;
								case "SF":
									strategyObj.name = "反卖";
									strategyObj.symbol = "image://static/lib/images/BF.png";
									break;
								case "BF":
									strategyObj.name = "反买";
									strategyObj.symbol = "image://static/lib/images/SF.png";
									break;
							}
							this.strategyData1.push(strategyObj);
						}
						this.strategyData1 = this.strategyData1.slice(-10);
						this.setklineoption(this.strategyData1);
						this.$store.state.market.strategyData = this.strategyData1;
						this.drawkline(this.id1);
						Indicator.close();
					}.bind(this),
					error: function(err) {
						//						console.log("err====="+JSON.stringify(err));
						Indicator.close();
						if(err.statusText == "timeout") {
							this.$toast({
								message: "连接超时，请重新选择类型或策略！",
								duration: 1000
							})
						} else {
							this.$toast({
								message: "网络不给力，请稍后再试!",
								duration: 1000
							});
						}
					}.bind(this)
				});
			},
		},
		mounted: function() {
			//重组数据
			this.operateData();
		},
		activated: function() {
			this.currentNo = this.$route.query.commodityNo;
		},
		filters: {
			changName: function(e) {
				return e
			},
			fixNumTwo: function(num) {
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize) {
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			}
		},
		watch: {
			parameters: function(n, o) {
				if(n && n.length == 1) {
					this.parameters.forEach((o, i) => {
						if(o.CommodityNo == this.currentNo) {
							this.$store.state.market.currentdetail = o;
							this.$store.state.market.currentNo = o.CommodityNo;
							return;
						}
					});
				}
			},
			chooseKline: function(n, o) {
				if(n == "分时" && this.strategyK != '') {
					Toast({
						message: "请在k线图查看策略",
						position: 'bottom',
						duration: 1500
					})
				} else if(n == "shandian" && this.strategyK != '') {
					Toast({
						message: "请在k线图查看策略",
						position: 'bottom',
						duration: 1500
					})
				} else if(this.strategyK != '') {
					Indicator.open({
						spinnerType: 'fading-circle'
					});
					this.backProbeAjax();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#klineDetails {
		width: 7.5rem;
	}
	
	#container {
		width: 7.5rem;
		margin-top: 0.96rem;
		background-color: #2a2f42;
	}
	
	.klinePic {
		width: 100%;
		height: 7.5rem;
		.chartsList {
			padding: 0 0.3rem;
			height: 1rem;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				font-size: 0.28rem;
				color: #9597a3;
				&.current {
					color: white;
					text-decoration: underline;
				}
			}
		}
		.charts_container {
			background-color: white;
			width: 7.5rem;
			height: 6.5rem;
		}
	}
	
	.commodityName {
		font-size: 0.3rem;
		padding: 0 0.3rem;
		color: #9597a3;
		ul {
			display: flex;
			height: 1rem;
			;
			justify-content: space-between;
			align-items: center;
			span {
				margin-left: 0.3rem;
			}
		}
	}
	
	.strategy {
		.strategyContainer {
			width: 6.9rem;
			height: 2.6rem;
			margin: auto;
			margin-top: 0.3rem;
			margin-bottom: 0.3rem;
			padding: 0.3rem;
			background-color: #35384b;
		}
		.strategyContainer1 {
			width: 6.3rem;
			height: 2rem;
			background-color: #2a2f42;
			color: white;
		}
		.strategyList {
			width: 7.5rem;
			height: 2.4rem;
			display: flex;
			padding: 0 0.3rem;
			justify-content: space-between;
			.list {
				width: 0.7rem;
				height: 2.1rem;
				position: relative;
				.top {
					z-index: 10;
					position: absolute;
					left: 0;
					width: 0.7rem;
					height: 1.9rem;
					background-color: #ff9207;
					border-radius: 0.35rem 0.35rem 0.1rem 0.1rem;
					p{
						display: inline-block;
						width: 0.1rem;
						height: 1.9rem;
					}

				}
				.bottom {
					position: absolute;
					top: 1.8rem;
					left: 0;
					width: 0.7rem;
					height: 0.2rem;
					border-radius: 0.1rem 0.1rem 0.1rem 0.1rem;
					background-color: #6064e1;
				}
			}
		}
	}
	
	.name {
		height: 1rem;
		padding: 0 0.3rem;
		color: white;
		font-size: 0.32rem;
		line-height: 1rem;
		font-weight: 600;
		border: 1px solid #383b4e;
	}
	
	.black {
		height: 0.3rem;
		background-color: #383b4e;
	}
	
	.infoDetails {
		width: 100%;
		height: 3.4rem;
		.infos {
			color: #9597a3;
			font-size: 0.2rem;
			padding: 0 0.3rem;
			ul {
				height: 0.8rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				li {
					display: flex;
					flex-direction: column;
					align-content: center;
					text-align: center;
					span {
						&:nth-child(2) {
							color: white;
						}
					}
				}
			}
		}
	}
	
	.buySell {
		width: 100%;
		height: 3.62rem;
	}
	
	.currentCommodityNo {
		padding: 0 0.3rem;
		height: 0.8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #9597a3;
		font-size: 0.28rem;
		span {
			&:nth-child(1) {
				flex: 4;
			}
			&:nth-child(2) {
				flex: 1;
			}
			&:nth-child(3) {
				flex: 1;
			}
		}
	}
	
	.currentCommodityNoInfo {
		padding: 0 0.3rem;
		height: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
		font-size: 0.3rem;
		span {
			&:nth-child(1) {
				flex: 4;
			}
			&:nth-child(2) {
				flex: 1;
			}
			&:nth-child(3) {
				flex: 1;
			}
		}
	}
	
	.buySellBar {
		width: 100%;
		height: 2.8rem;
	}
</style>
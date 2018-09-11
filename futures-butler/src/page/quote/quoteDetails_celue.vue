<template>
<div id="quoteDetails">
	<template v-for="(v, index) in parameters">
			<div v-if="v.CommodityNo == currentNo">
				<header>
					<ul>
						<li @click="routerback"><i></i></li>
						<li>
							<h1>{{tradeName[currentNo]}}</h1>
							<span >{{v.CommodityNo}}</span>
						</li>
						<li><i></i></li>
					</ul>
				</header>
				<div class="my_title">
					<p class="titles">{{tradeName[currentNo]}} <span class="note">{{v.CommodityNo}}{{v.MainContract}}</span></p>
				</div>
				<div class="money">
					<div class="money_width">
						<p>{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</p>
						<p>
							<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
							<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
						</p>
					</div>
					<div class="money_width1">
						<ul>
							<li>卖价</li>
							<li :class="{red: v.LastQuotation.AskPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</li>
						</ul>
						<ul>
							<li>买价</li>
							<li :class="{red: v.LastQuotation.BidPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</li>
						</ul>
						<ul>
							<li>持仓</li>
							<li>{{v.LastQuotation.Position}}</li>
						</ul>
					</div>
					<div class="money_width1">
						<ul>
							<li>卖量</li>
							<li>{{v.LastQuotation.AskQty1}}</li>
						</ul>
						<ul>
							<li>买量</li>
							<li>{{v.LastQuotation.BidQty1}}</li>
						</ul>
						<ul>
							<li>成交</li>
							<li>{{v.LastQuotation.TotalVolume}}</li>
						</ul>
					</div>
				</div>
				<div class="color_green"></div>
				<div class="charts">
					<div class="charts_title">
						<template v-for="(key,index) in chartsList">
							<span :class="{current: currentChartsNum == index}" @tap="menuEvent(index)">{{key}}</span>
</template>
					</div>
					<div class="charts_container">
						<components :is="currentChartsView" v-if="chartsShow"></components>
					</div>
				</div>
				<div class="color_green"></div>
				<!-- <div class="guanjia_title">
					<i></i>
					<p>管家今日提示</p>
				</div>
				<div class="guanjia">
					<ul>
						<li>今开</li>
						<li>{{v.LastQuotation.OpenPrice | fixNum(v.DotSize)}}</li>
					</ul>
					<ul>
						<li>昨结</li>
						<li>{{v.LastQuotation.PreSettlePrice | fixNum(v.DotSize)}}</li>
					</ul>
					<ul>
						<li>今最高价</li>
						<li :class="{red: v.LastQuotation.HighPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.HighPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.HighPrice | fixNum(v.DotSize)}}</li>
					</ul>
					<ul>
						<li >今最低价</li>
						<li :class="{red: v.LastQuotation.LowPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LowPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LowPrice | fixNum(v.DotSize)}}</li>
					</ul>
				</div> -->
				<div class="btn_group">
					<button class="btn" @click="choseStrategy('SMA')">管家策略打点</button>
					<button class="btn" @click="submit">管家策略回测</button>
				</div>
			</div>
		</template>
		
		
	</div>
</template>

<script>
import pro from '../../assets/js/common.js'
import {
	mapMutations,
	mapActions
} from 'vuex'
import {
	Toast,
	MessageBox,
	Indicator
} from 'mint-ui';
import light from './light.vue'
import klineOne from './klineOne.vue'
import klineFive from './klineFive.vue'
import klineThirty from './klineThirty.vue'
import klineDay from './klineDay.vue'
import klineOneHour from './klineOneHour.vue'
export default {
	name: "quoteDetails",
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
			chartsList: ['闪电图', '1分', '5分', '30分', '1小时', '日K'],
			currentChartsNum: 1,
			currentChartsView: 'klineOne',
			chartsShow: false,
			chartsHight: 5.4,
			strategyList: '',
			ContractNo: '',
			dian: '',
			userInfo: localStorage.user ? JSON.parse(localStorage.user) : '',
			isClick: false,
			changeContrast: ["对比合约", "可用策略"],
			currentContrast: 0,
			showContrast: true,
			backProbe: false,
			strategyName: "",
			strategyList: "",
			chooseKline: "1min",
			strategyData: [],
			id1: {
				id1: 'kline',
				id2: 'kline_volume'
			},
			currentss: -1,
			intervalTime: '60000',
			CommodityNoK: '',
			strategyData1: [],
			strategyK: "",
			timeing: "",
			obj: ['2小时', '4小时', '12小时'],
			type: '1分K',
			ContractNo: "",
			money: '1000000',
			currentIndex: 0,
			strategyChecked: 'SMA',
		}
	},
	components: {
		light,
		klineOne,
		klineFive,
		klineThirty,
		klineDay,
		klineOneHour
	},
	computed: {
		parameters() {
			this.$store.state.market.Parameters.forEach((a, i) => {
				if (a.CommodityNo == this.currentNo) {
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
		operateData: function(val) {
			//允许画图
			this.$store.state.isshow.isfensInit = false;
			//渲染画图
			this.chartsShow = true;
			this.currentChartsNum = 1;
			this.currentChartsView = 'klineOne';
			//重组数据
			let arr = [];
			let obj;
			if (val) {
				obj = val;
			} else {
				obj = this.$route.query;
			}
			arr.push(obj);
			this.currentNo = obj.commodityNo; //当前合约
			this.$store.state.market.currentNo = obj.commodityNo;
			//对比合约
			let contrast = obj.contrast;
			if (contrast == '' || contrast == undefined) {
				this.noContrast = true;
			} else {
				this.noContrast = false;
				contrast = contrast.split(',');
				contrast.forEach((o, i) => {
					if (o == obj.commodityNo) return;
					if (o != '') {
						let a = {
							commodityNo: o,
							exchangeNo: this.orderTemplist[o].ExchangeNo,
							mainContract: this.orderTemplist[o].MainContract
						}
						arr.push(a);
					}
				});
			}
		},
		//选择画图类型
		menuEvent: function(index) {
			//允许画图
			this.$store.state.isshow.isfensInit = false;
			this.currentChartsNum = index;
			switch (index) {
				case 0:
					this.currentChartsView = 'light';
					this.chooseKline = "闪电";
					this.$store.state.market.contrastData = [];
					break;
					// case 1:
					// 	this.currentChartsView = 'fens';
					// 	this.chooseKline = "分时";
					// 	break;
				case 1:
					this.currentChartsView = 'klineOne';
					this.$store.state.market.contrastData = [];
					this.chooseKline = "1min";
					this.intervalTime = 60000;
					break;
				case 2:
					this.currentChartsView = 'klineFive';
					this.$store.state.market.contrastData = [];
					this.chooseKline = "5min";
					this.intervalTime = 300000;
					break;
					// case 3:
					// 	this.currentChartsView = 'klineFifteen';
					// 	this.$store.state.market.contrastData = [];
					// 	this.chooseKline = "15min";
					// 	this.intervalTime = 900000;
					// 	break;
				case 3:
					this.currentChartsView = 'klineThirty';
					this.$store.state.market.contrastData = [];
					this.chooseKline = "30min";
					this.intervalTime = 1800000;
					break;
				case 4:
					this.currentChartsView = 'klineOneHour';
					this.$store.state.market.contrastData = [];
					this.chooseKline = "1hour";
					this.intervalTime = 3600000;
					break;
				case 5:
					this.currentChartsView = 'klineDay';
					this.$store.state.market.contrastData = [];
					this.chooseKline = "1day";
					this.intervalTime = 86400000;
					break;
			}
			this.$store.state.isshow.isfensshow = false;
			this.$store.state.isshow.isklineshow = false;
			this.$store.state.isshow.islightshow = false;
			this.parameters.forEach((o, i) => {
				o.check = 0;
			});
		},
		routerback: function() {
			this.$router.go(-1);
			this.chartsShow = false;
			this.$store.state.isshow.isfensshow = false;
			this.$store.state.isshow.isklineshow = false;
			this.$store.state.isshow.islightshow = false;
		},
		choseStrategy: function(k) {
			if (this.chooseKline == "闪电") {
				this.$toast({
					message: "闪电图不能查看策略",
					duration: 1000
				});
			} else if (this.chooseKline == "分时") {
				this.$toast({
					message: "分时图不能查看策略",
					duration: 1000
				});
			} else {
				// this.currentss = index;
				this.currentss = 1;
				this.strategyK = k;
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
				//第二步实时
				this.backProbeInterval();
			}
		},
		//获取可用策略信息
		getStrategy: function() {
			pro.fetch("post", "/others/getStrategys", "", "").then((res) => {
				if (res.code == 1 && res.success == true) {
					this.strategyList = res.data;
					if (this.strategyList == "" || this.strategyList == null) {
						this.showNoneStrategy = true;
					} else {
						this.showNoneStrategy = false;
					}
				}
			}).catch((err) => {

			})
		},
		//回测
		backProbeAjax: function(k) {
			this.strategyData1 = [];
			var timeData = this.jsonDataKline.Parameters.Data;
			this.ContractNo = this.jsonDataKline.Parameters.ContractNo;
			var TimeStart = timeData[0][0];
			var CommodityNo = this.jsonDataKline.Parameters.CommodityNo;
			this.CommodityNoK = CommodityNo;
			var TimeEnd = timeData[timeData.length - 1][0];
			// let obj = {
			// 	"strategy":this.strategyK,
			// 	"commodity":CommodityNo,
			// 	"frequency":this.chooseKline,
			// 	"timeStart":TimeStart,
			// 	"timeEnd":TimeEnd,
			// 	"initialAccount":1000000,
			// 	"commodityNumber":this.ContractNo
			// }
			let obj = {
				"strategy": this.strategyK,
				"commodity": CommodityNo,
				"frequency": this.chooseKline,
				"timeStart": TimeStart,
				"timeEnd": TimeEnd,
				"initialAccount": 1000000,
				"commodityNumber": this.ContractNo
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
					for (var i of tradeInfo) {
						var strategyObj = {};
						if (res.backtestIndex.frequency == "1day") {
							strategyObj.coord = [i[1].substring(0, 10), i[4]];
						} else {
							strategyObj.coord = [i[1], i[4]];
						}
						strategyObj.symbolSize = [7, 14];
						switch (i[3]) {
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
					this.setklineoption(this.strategyData1);
					this.$store.state.market.strategyData = this.strategyData1;
					this.drawkline(this.id1);
					Indicator.close();
				}.bind(this),
				error: function(err) {
					console.log("err=====" + JSON.stringify(err));
					Indicator.close();
					if (err.statusText == "timeout") {
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
		backProbeInterval: function(k) {
			this.timeing = setInterval(() => {
				var infoArr = []; //最后30个总数据
				var closeArr = []; //收盘价30个
				var highArr = []; //最高价30个
				var lowArr = []; //最低价30个
				var volumeArr = []; //成交量30个
				var position = '' //持仓
				var accountMoney = '' //资金量
				var openArr = []; //开盘价30个
				infoArr = this.$store.state.market.jsonDataKline.Parameters.Data.slice(-30);
				var position = infoArr[infoArr.length - 1][5];
				var lastTrade = infoArr[infoArr.length - 1][1];
				var lastTradeTime = infoArr[0][0].substring(11, 16);
				//					console.log(JSON.stringify(infoArr));
				for (var i of infoArr) {
					closeArr.push(i[1]);
					openArr.push(i[2]);
					lowArr.push(i[3]);
					highArr.push(i[4]);
					volumeArr.push(i[6])
				}
				let obj1 = {
					"close": closeArr,
					"open": openArr,
					"high": highArr,
					"low": lowArr,
					"volume": volumeArr,
					"position": position,
					"lastTrade": lastTrade,
					"strategy": this.strategyK
					//						"account":1000000
				}
				$.ajax({
					type: "POST",
					url: this.physhonUrl + "/calc_strategy_signal",
					async: true,
					data: JSON.stringify(obj1),
					dataType: "json",
					success: function(res) {
						var strategy_signal_obj = {};
						//							strategyObj.coord = [i[1].substring(11,16),i[4]];
						var strategy_signal_time = pro.getDate("h:m", Date.parse(new Date()));
						strategy_signal_obj.coord = [strategy_signal_time, res.last_trade];
						strategy_signal_obj.symbolSize = [7, 14];
						switch (res.action) {
							case null:
								strategy_signal_obj.coord = [];
								strategy_signal_obj.symbolSize = [];
								break;
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
						this.strategyData1.push(strategy_signal_obj);
						this.strategyData1 = this.strategyData1.slice(-40);
						this.$store.state.market.strategyData = this.strategyData1;
						this.drawkline(this.id1);
					}.bind(this),
					error: function(err) {
						Indicator.close();
						this.$toast({
							message: "网络不给力，请稍后再试",
							duration: 1000
						});
					}.bind(this)
				})
			}, this.intervalTime);
		},
		submit() {
			if (this.money == '' || this.money == null) {
				this.$toast({
					message: "初始资金不能为空",
					duration: 1000
				});
			} else if (this.money < 1000000) {
				this.$toast({
					message: "初始资金不能低于1000000",
					duration: 1000
				});
			} else {
				// this.showConatiner = false;
				// this.showSubmit = true;
				this.startTime = new Date();
				this.endTime = new Date(this.startTime.getTime() - (3 * 24 * 60 * 60) * 1000);
				let timeStart = pro.getDate(this.endTime.getTime(), 'y-m-d h:i:s')
				let timeEnd = pro.getDate(this.startTime.getTime(), 'y-m-d h:i:s')
				console.log(this.parameters)
				let obj = {
					"strategy": this.strategyChecked,
					"commodity": this.currentNo,
					//"frequency": this.getFrequency(this.type),
					"frequency": '1min',
					"timeStart": timeStart,
					"timeEnd": timeEnd,
					"initialAccount": Number(this.money),
					"commodityNumber": this.parameters[this.currentIndex].MainContract
				}
				this.$indicator.open({
					text: '回测中...',
					spinnerType: 'fading-circle'
				});
				$.ajax({
					type: "POST",
					url: this.physhonUrl + "/back_test",
					async: true,
					data: JSON.stringify(obj),
					dataType: "json",
					success: function(res) {
						if (res.tradeInfo.length == 0) {
							this.$indicator.close()
							this.$toast({
								message: "无回测数据，请重新选择",
								duration: 1000
							});
							this.$router.back(-1);
						} else {
							this.$indicator.close()
							//const strategyName = this.strategyList.find(item => item.type == this.strategyChecked).name;
							const strategyName = '移动平均策略';
							this.$router.push({
								path: "/backPresentation",
								query: {
									strategyName
								}
							});
							this.$store._modules.root.state.account.backtestIndexArr = res;
						}
					}.bind(this),
					error: function(err) {
						this.$indicator.close()
						this.$toast({
							message: "网络不给力，请稍后再试",
							duration: 1000
						});
					}.bind(this)
				})
			}
		},

	},
	mounted: function() {
		this.getStrategy()
	},
	activated: function() {
		this.currentNo = this.$route.query.commodityNo;
		this.$store.state.isshow.isfensshow = false;
		this.$store.state.isshow.islightshow = false;
		this.$store.state.isshow.isklineshow = false;
		//重组数据
		this.operateData();
	},
	filters: {
		changName: function(e) {
			return e
		},
		fixNumTwo: function(num) {
			return num.toFixed(2);
		},
		fixNum: function(num, dotsize) {
			if (dotsize >= 4) dotsize = 4;
			return num.toFixed(dotsize);
		}
	},
	watch: {
		parameters: function(n, o) {
			if (n && n.length == 1) {
				this.parameters.forEach((o, i) => {
					if (o.CommodityNo == this.currentNo) {
						this.$store.state.market.currentdetail = o;
						this.$store.state.market.currentNo = o.CommodityNo;
						return;
					}
				});
			}
		},
		chooseKline(e) {
			clearInterval(this.timeing);
			if (e == "分时" && this.strategyK != '') {
				this.$toast({
					message: "分时图不能查看策略",
					duration: 1000
				});
			} else if (e == "闪电" && this.strategyK != '') {
				this.$toast({
					message: "闪电图不能查看策略",
					duration: 1000
				});
			} else if (this.strategyK != '') {
				Indicator.open({
					spinnerType: 'fading-circle'
				});
				//第一步回测拿到打点数据
				this.backProbeAjax();
				//第二步实时
				this.backProbeInterval();
			}
		}
	},
	beforeRouteLeave(to, from, next) {
        const { isshow } = this.$store.state;
        this.$store.state.isshow.isklineshow = false
        isshow.isklineshow = false;
        //清楚打点影响
        this.$store.state.market.strategyData = [];
        clearInterval(this.timeing);
        next()
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/common.scss";
#quoteDetails {
	width: 7.5rem;
	background-color: #e5f9f6;
}

header {
	background-color: #169781;
	width: 100%;
	height: 0.88rem;
	ul {
		padding: 0 0.3rem;
		flex-direction: row;
		display: flex;
		justify-content: space-between;
		align-items: center;
		li {
			height: 0.88rem;
			&:nth-child(1) {
				line-height: 0.88rem;
				flex: 1;
				i {
					display: inline-block;
					width: 0.24rem;
					height: 0.3rem;
					background: url(../../assets/images/quote/back_icon.png) no-repeat 0 100%;
					background-size: 0.24rem 0.3rem;
				}
			}
			&:nth-child(2) {
				flex: 6;
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				h1 {
					font-size: 0.32rem;
					color: white;
				}
				span {
					font-size: 0.24rem;
					color: #6fdcc9;
				}
			}
			&:nth-child(3) {
				flex: 1;
				line-height: 0.88rem;
				text-align: right;
				i {
					display: inline-block;
					width: 0.32rem;
					height: 0.3rem;
				}
			}
		}
	}
}

.charts {
	width: 7.5rem;
	.charts_title {
		width: 100%;
		height: 0.8rem;
		padding: 0 0.3rem;
		line-height: 0.8rem;
		span {
			font-size: 0.28rem;
			margin-right: 0.3rem;
			&.current {
				color: #1482f0;
			}
		}
	}
	.charts_container {
		background-color: white;
		width: 7.5rem;
		height: 5.7rem;
	}
}

.money {
	width: 7.5rem;
	height: 1.92rem;
	display: flex;
	justify-content: space-between;
	border: 1px solid #bbf6ec;
	.money_width {
		background-color: white;
		width: 2.5rem;
		height: 1.92rem;
		border-right: 0.01rem solid #BBF6EC;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		p {
			&:nth-child(1) {
				font-size: 0.36rem;
				color: #283835;
			}
			&:nth-child(2) {
				font-size: 0.28rem;
				span {
					&:nth-child(1) {
						margin-right: 0.05rem;
					}
					&.red {
						color: #F4663A;
					}
					&.green {
						color: #19d961;
					}
				}
			}
		}
	}
	.money_width1 {
		background-color: white;
		width: 2.5rem;
		height: 1.92rem;
		ul {
			width: 100%;
			height: 0.64rem;
			display: flex;
			justify-content: space-around;
			align-items: center;
			li {
				color: black;
				font-size: 0.28rem;
				&:nth-child(1) {
					color: #788b87;
				}
				&.red {
					color: #F4663A;
				}
				&.green {
					color: #19d961;
				}
			}
		}
	}
}

.color_green {
	width: 7.5rem;
	height: 0.3rem;
	background-color: #e5f9f6;
	border-top: #bbf6ec;
}

.charts {
	width: 7.5rem;
	.charts_title {
		background-color: white;
		border-bottom: 0.01rem solid #BBF6EC;
		width: 100%;
		height: 0.8rem;
		padding: 0 0.3rem;
		line-height: 0.8rem;
		span {
			font-size: 0.28rem;
			margin-right: 0.3rem;
			&.current {
				color: #169781;
			}
		}
	}
	.charts_container {
		background-color: white;
		width: 7.5rem;
		height: 5.7rem;
	}
}

.guanjia_title {
	padding-left: 0.3rem;
	background-color: white;
	height: 0.8rem;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	i {
		display: block;
		width: 0.4rem;
		height: 0.4rem;
		background: url(../../assets/images/quote/guanjia.png) no-repeat;
		background-size: 0.4rem 0.4rem;
		margin-right: 0.3rem;
	}
	p {
		font-size: 0.28rem;
		color: black;
	}
}

.guanjia {
	background-color: white;
	width: 100%;
	height: 1rem;
	padding: 0 0.3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	ul {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		li {
			&.red {
				color: #F4663A;
			}
			&.green {
				color: #19d961;
			}
			&:first-child {
				color: #788b87;
				padding-bottom: 0.05rem;
			}
		}
	}
}

.my_title {
	@include font($fs32, 1rem, #169781, left);
	padding: 0 0.3rem;
	.note {
		color: #788b87
	}
}

.btn_group {
	width: 100%;
	text-align: center;
	.btn {
		width: 6.9rem;
		height: 1rem;
		margin-bottom: 0.24rem;
		background-color: #169781;
		border-radius: 0.2rem;
		@include font($fs32, 1rem, #fff)
	}
}
</style>
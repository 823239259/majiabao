<template>
	<div id="klineDetails">
		<template v-for="(v, index) in parameters">
			<div v-if="v.CommodityNo == currentNo">
				<header>
					<ul>
						<li @click="routerback"><i></i></li>
						<li>
							<h1>闪电数据详情</h1>
						</li>
						<li @click="addOptional"><i></i></li>
					</ul>
				</header>
				<div id="container">
					<div class="klinePic">
						<div class="charts_container">
							<components :is="currentChartsView"></components>
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
					<div class="black"></div>
					<div class="name">五档行情</div>
					<div class="fiveQuote">
						<ul class="fiveQuotedetails">
							<li>
								<span class="red">买一</span>
								<span>{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</span>
							</li>
							<li>
								<span class="red">买二</span>
								<span>{{v.LastQuotation.BidPrice2 | fixNum(v.DotSize)}}</span>
							</li>
							<li>
								<span class="red">买三</span>
								<span>{{v.LastQuotation.BidPrice3 | fixNum(v.DotSize)}}</span>
							</li>
							<li>
								<span class="red">买四</span>
								<span>{{v.LastQuotation.BidPrice4 | fixNum(v.DotSize)}}</span>
							</li>
							<li>
								<span class="red">买五</span>
								<span>{{v.LastQuotation.BidPrice5 | fixNum(v.DotSize)}}</span>
							</li>
						</ul>
						<ul class="fiveQuotedetails">
							<li>
								<span class="green">卖一</span>
								<span>{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</span>
							</li>
							<li>
								<span class="green">卖二</span>
								<span>{{v.LastQuotation.AskPrice2 | fixNum(v.DotSize)}}</span>
							</li>
							<li>
								<span class="green">卖三</span>
								<span>{{v.LastQuotation.AskPrice3 | fixNum(v.DotSize)}}</span>
							</li>
							<li>
								<span class="green">卖四</span>
								<span>{{v.LastQuotation.AskPrice4 | fixNum(v.DotSize)}}</span>
							</li>
							<li>
								<span class="green">卖五</span>
								<span>{{v.LastQuotation.AskPrice5 | fixNum(v.DotSize)}}</span>
							</li>
						</ul>
						<div id="rangbuy">
							<ul class="bugsell">
								<li class="red">买</li>
								<li class="red">{{baifenbi(total,total1)}}</li>
							</ul>
							<mt-range v-model="total" :barHeight="20" :min="0" :max="Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.BidQty2)+Number(v.LastQuotation.BidQty3)+Number(v.LastQuotation.BidQty4)+Number(v.LastQuotation.BidQty5)+Number(v.LastQuotation.AskQty1)+Number(v.LastQuotation.AskQty2)+Number(v.LastQuotation.AskQty3)+Number(v.LastQuotation.AskQty4)+Number(v.LastQuotation.AskQty5)" :step="1"></mt-range>
						</div>
						<div id="rangsell">
							<ul class="bugsell">
								<li class="green">卖</li>
								<li class="green">{{baifenbi(total1,total)}}</li>
							</ul>
							<mt-range v-model="total1" :barHeight="20" :min="0" :max="Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.BidQty2)+Number(v.LastQuotation.BidQty3)+Number(v.LastQuotation.BidQty4)+Number(v.LastQuotation.BidQty5)+Number(v.LastQuotation.AskQty1)+Number(v.LastQuotation.AskQty2)+Number(v.LastQuotation.AskQty3)+Number(v.LastQuotation.AskQty4)+Number(v.LastQuotation.AskQty5)" :step="1"></mt-range>
						</div>
					</div>
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
						 <div id="pie1"></div> 
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
						<mt-range v-model="rangleft" :barHeight="20" :min="0" :max="100" :step="1"></mt-range>
						<ul class="duoKong">
							<li>
								<span class="red">{{rangleft}}%</span>
								<span class="green">{{100-rangleft}}%</span>
							</li>
							<li>
								<span @click="chooseDuo('add')">我看多</span>
								<span @click="chooseDuo('del')">我看空</span>
							</li>
						</ul>
					</div>
					<div class="black"></div>
					<talkArea />
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { mapMutations, mapActions } from 'vuex'
	import { Toast, MessageBox, Indicator } from 'mint-ui';
	import light from './light.vue'
	import talkArea from '../../components/talkArea'
	let echarts = require('echarts/lib/echarts');
  	// 引入饼图组件
  	require('echarts/lib/chart/pie');
  	// 引入提示框和图例组件
  	require('echarts/lib/component/title');
  	require('echarts/lib/component/tooltip');
  	require('echarts/lib/component/legend');
  	require("echarts/lib/component/legendScroll");

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
				currentChartsView: 'light',
				chartsHight: 5.4,
				ContractNo: '',
				dian: '',
				id1: {
					id1: 'kline',
					id2: 'kline_volume'
				},
				strategyData1: [],
				strategyK: "",
				rangleft:50,
			}
		},
		components: {
			light,
			talkArea
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
			chooseDuo:function(type){
				type == "add" ? this.rangleft++ : this.rangleft-- ;
			},
			drawPie:function(){
				let mycharts = echarts.init(document.getElementById('pie1'));
				var option = {
					legend: {
				        orient: 'vertical',
				        x: 'left',
				        data:['买','卖']
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['50%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '30',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {value:this.total, name:'卖', itemStyle:{normal:{color:'#14da8b'}}},
				                {value:this.total1, name:'买', itemStyle:{normal:{color:'#ff576e'}}},
				            ],
				            
				        }
				    ]
				}
				mycharts.setOption(option);
			},
			baifenbi(a, b) {
				a = Number(a)
				b = Number(b)
				//console.log(a,b)
				if(a == 0 && b == 0) return 0;
				return((a / (a + b)) * 100).toFixed(2) + '%'
			},
			operateData: function() {
				//允许画图
//				this.$store.state.isshow.isfensInit = false;
//				this.$store.state.isshow.isfensshow = false;
//				this.$store.state.isshow.isfens = false;
			},
			routerback: function() {
				this.$router.go(-1);
				this.$store.state.isshow.isfensshow = false;
			},
			addOptional: function() {
				this.shareSystem();
			},
		},
		mounted: function() {
			this.drawPie();
		},
		activated: function() {
			this.currentNo = this.$route.query.commodityNo;
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
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			}
		},
		watch: {
			total:function(){
				this.drawPie();
			},
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
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#klineDetails {
		width: 7.5rem;
	}
	header{
		background-color: #2a2f42;
		width: 100%;
		height: 0.88rem;
		ul{
			padding: 0 0.3rem;
			flex-direction: row;
			display: flex;
			justify-content: space-between;
			align-items: center;
			li{
				height: 0.88rem;
				&:nth-child(1){
					line-height: 0.88rem;
					flex: 1;
					i{
						display:inline-block;
						width: 0.24rem;
						height: 0.3rem;
						background: url(../../assets/images/quote/back_icon.png) no-repeat 0 100%;
						background-size: 0.24rem 0.3rem;
					}
				}
				&:nth-child(2){
					flex: 6;
					display: inline-flex;
					justify-content: center;
					align-items: center;
					h1{
						padding-right: 0.3rem;
						font-size: 0.36rem;
						color: white;
					}
				}
				&:nth-child(3){
					flex: 1;
					line-height: 0.88rem;
					text-align: right;
					i{
						display: inline-block;
						width: 0.32rem;
						height: 0.3rem;
						background: url(../../assets/images/quote/icon_share.png) no-repeat 0 100%;
						background-size: 0.32rem 0.3rem;
					}
				}
			}
		}
	}
	#container {
		width: 7.5rem;
		margin-top: 0.96rem;
		background-color: #2a2f42;
	}
	
	.klinePic {
		width: 100%;
		height: 4rem;
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
			height: 4rem;
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
	.fiveQuote{
		width: 100%;
		height: 4.6rem;
		.fiveQuotedetails{
			display: flex;
			height: 0.8rem;
			justify-content: space-between;
			align-items: center;
			padding:  0 0.3rem;
			li{
				display: flex;
				flex-direction: column;
				align-items:center;
				span{
					font-size: 0.2rem;
					color: white;
				}
			}
		}
		#rangbuy,#rangsell{
			width: 100%;
			height: 1.4rem;
			background-color: #383b4e;
			.bugsell{
				display: flex;
				justify-content: space-between;
				height: 0.5rem;
				align-items: center;
				padding: 0 0.3rem;
				li{
					margin-top:0.1rem; 
					&:nth-child(2){
						width: 1rem;
						height: 0.5rem;
						text-align: center;
						line-height: 0.5rem;
						background-color: #2a2f42;
					}
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
	#pie1{
		width: 7.5rem;
		height: 3rem;
		background-color: white;
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
		.duoKong{
			width: 100%;
			height: 1.8rem;
			li{
				&:nth-child(1){
					display: flex;
					justify-content: space-between;
					padding: 0 0.3rem;
					span{
						font-size: 0.26rem;
					}
				}
				&:nth-child(2){
					display: flex;
					justify-content: center;
					span{
						width:1.6rem;
						height:1rem; 
						border-radius: 0.2rem;
						font-size: 0.36rem;
						color: white;
						text-align: center;
						line-height: 1rem; 
						&:nth-child(1){
							background-color: #FF576E;
						}
						&:nth-child(2){
							background-color: #14da8b;
							margin-left: 0.3rem;
						}
					}
				}
			}
		}
	}
</style>
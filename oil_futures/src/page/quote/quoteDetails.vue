<template>
	<div id="quoteDetails">
		<template v-for="(v, index) in parameters">
			<div v-if="v.CommodityNo == currentNo">
				<header>
					<ul>
						<li @click="routerback"><i></i></li>
						<li>
							<h1>行情数据</h1>
						</li>
						<li><i class="addOption"></i></li>
					</ul>
				</header>
				<div class="money">
					<div class="moneyDetails">
						<p>{{v.CommodityName+v.CommodityNo+v.MainContract}}</p>
						<ul>
							<li  :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</li>
							<li>
								<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
								<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
							</li>
						</ul>
						<ul>
							<li>
								<span>挂单量</span>
								<span>{{v.LastQuotation.Position}}</span>
							</li>
							<li>
								<span>成交量</span>
								<span>{{v.LastQuotation.TotalVolume}}</span>
							</li>
							<li>
								<span>平均价</span>
								<span>{{(v.LastQuotation.HighPrice+v.LastQuotation.LowPrice)/2 | fixNumTwo}}</span>
							</li>
							<li>
								<span v-if="v.LastQuotation.OpenPrice - v.LastQuotation.PreSettlePrice > 0" style="font-size: 0.32rem;color: #11d974;">低开</span>
								<span v-else style="font-size: 0.32rem;color: #ff3363;">高开</span>
							</li>
						</ul>
					</div>
				</div>
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
				<div class="celue">
					<div class="celue_title">
						-策略打点-
					</div>
					<div class="celue_tips">
						<span>新功能：</span>请在K线图模式下，选择下列策略进行实时买卖点提示！实时提示交易，小白也能轻松做交易。
					</div>
					<div class="celue_pie">
						<ul>
							<li><p>海龟交易</br>策略</p></li>
						</ul>
						<ul>
							<li><p>布林通道</br>策略</p></li>
							<li><p>移动平均</br>策略</p></li>
						</ul>
						<ul>
							<li><p>DualThrust</br>策略</p></li>
							<li><p>金特肯纳</br>策略</p></li>
							<li><p>RBreaker</br>策略</p></li>
						</ul>
					</div>
				</div>
				<div class="bugOne">
					<ul class="left">
						<li>
							<span>买一</span>
							<span>卖一</span>
						</li>
						<li>
							<mt-range v-model="v.LastQuotation.BidQty1" :barHeight="10" :min="0" :max="Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.AskQty1)" :step="1"></mt-range>
						</li>
						<li>
							<span>{{baifenbi(v.LastQuotation.BidQty1,v.LastQuotation.AskQty1)}}</span>
							<span>{{baifenbi(v.LastQuotation.AskQty1,v.LastQuotation.BidQty1)}}</span>
						</li>
					</ul>
					<ul class="right">
						<li style="font-size: 0.28rem;color: #ff3363;border-bottom: 0.01rem solid #ff3363;font-weight: 600;" v-if="v.LastQuotation.BidQty1- v.LastQuotation.AskQty1 > 0">
							买单多
						</li>
						<li style="font-size: 0.28rem;color: #11d974;border-bottom: 0.01rem solid #11d974;font-weight: 600;" v-else>
							卖单多
						</li>
					</ul>
				</div>
				<div class="buyFive">
					<div class="left">
						<ul>
							<li>
								<span>买一：</span>
								<span :class="{red: v.LastQuotation.BidPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.BidQty1}}</span>
								<span>{{v.LastQuotation.BidQty1}}</span>
							</li>
							<li>
								<span>买二：</span>
								<span :class="{red: v.LastQuotation.BidPrice2 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice2 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice2 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.BidQty2}}</span>
								<span>{{Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.BidQty2)}}</span>
							</li>
							<li>
								<span>买三：</span>
								<span :class="{red: v.LastQuotation.BidPrice3 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice3 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice3 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.BidQty3}}</span>
								<span>{{Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.BidQty2)+Number(v.LastQuotation.BidQty3)}}</span>
							</li>
							<li>
								<span>买四：</span>
								<span :class="{red: v.LastQuotation.BidPrice4 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice4 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice4 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.BidQty4}}</span>
								<span>{{Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.BidQty2)+Number(v.LastQuotation.BidQty3)+Number(v.LastQuotation.BidQty4)}}</span>
							</li>
							<li>
								<span>买五：</span>
								<span :class="{red: v.LastQuotation.BidPrice5 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.BidPrice5 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.BidPrice5 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.BidQty5}}</span>
								<span>{{(Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.BidQty2)+Number(v.LastQuotation.BidQty3)+Number(v.LastQuotation.BidQty4)+Number(v.LastQuotation.BidQty5))}}</span>
							</li>
						</ul>
					</div>
					<div class="left">
						<ul>
							<li>
								<span>卖一：</span>
								<span :class="{red: v.LastQuotation.AskPrice1 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice1 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.AskQty1}}</span>
								<span>{{v.LastQuotation.AskQty1}}</span>
							</li>
							<li>
								<span>卖二：</span>
								<span :class="{red: v.LastQuotation.AskPrice2 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice2 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice2 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.AskQty2}}</span>
								<span>{{Number(v.LastQuotation.AskQty1)+Number(v.LastQuotation.AskQty2)}}</span>
							</li>
							<li>
								<span>卖三：</span>
								<span :class="{red: v.LastQuotation.AskPrice3 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice3 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice3 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.AskQty3}}</span>
								<span>{{Number(v.LastQuotation.AskQty1)+Number(v.LastQuotation.AskQty2)+Number(v.LastQuotation.AskQty3)}}</span>
							</li>
							<li>
								<span>卖四：</span>
								<span :class="{red: v.LastQuotation.AskPrice4 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice4 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice4 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.AskQty4}}</span>
								<span>{{Number(v.LastQuotation.AskQty1)+Number(v.LastQuotation.AskQty2)+Number(v.LastQuotation.AskQty3)+Number(v.LastQuotation.AskQty4)}}</span>
							</li>
							<li>
								<span>卖五：</span>
								<span :class="{red: v.LastQuotation.AskPrice5 > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.AskPrice5 < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.AskPrice5 | fixNum(v.DotSize)}}</span>
								<span>{{v.LastQuotation.AskQty5}}</span>
								<span>{{Number(v.LastQuotation.AskQty1)+Number(v.LastQuotation.AskQty2)+Number(v.LastQuotation.AskQty3)+Number(v.LastQuotation.AskQty4)+Number(v.LastQuotation.AskQty5)}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="duibi">
					<div class="duibi_title">
						- 合约对比 -
					</div>
					<div class="duibi_details">
						<div class="duibi_left">
							<p>当前合约</p>
							<p>{{v.CommodityName}}</p>
							<p :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</p>
							<p>
								<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
								<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
							</p>
						</div>
						<div class="duibi_right">
							<p>对比合约</p>
							<ul>
								<li>
									<span>美黄金</span><span>1246.0</span><span>-12/0.12%</span>
								</li>
								<li>
									<span>美元指数</span><span>94.06</span><span>0.05/0.02%</span>
								</li>
								<li>
								<span>富时A50</span><span>10995.0</span><span>-12/0.12%</span></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</template>
		
		
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	
	import { Toast ,MessageBox} from 'mint-ui';
	import light from './light.vue'
	import klineOne from './klineOne.vue'
	import klineFive from './klineFive.vue'
	import klineThirty from './klineThirty.vue'
	import klineDay from './klineDay.vue'
	import klineOneHour from './klineOneHour.vue'
	export default{
		name:"quoteDetails",
		mixins: [pro.mixinsToCustomer],
		data(){
			return{
				title:"",
				currentNo:'',
				total:'',
				total1:"",
				userInfo: localStorage.user ? JSON.parse(localStorage.user) : '',
				bottomList1: [
					{
						name:'101',
						method:'dianzan'
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
				chartsList: ['闪电图','1分','5分','30分','1小时','日K'],
				currentChartsNum: 1,
				currentChartsView: 'klineOne',
				chartsShow: false,
				chartsHight: 5.4,
				strategyList:'',
				ContractNo:'',
				dian:''
			}
		},
		components: {
			light,klineOne,klineFive,klineThirty,klineDay,klineOneHour
		},
		computed:{
			parameters(){
				this.$store.state.market.Parameters.forEach((a,i)=>{
					if(a.CommodityNo == this.currentNo){
						this.$store.state.market.currentdetail = a;
						this.ContractNo = a.MainContract
						this.total = Number(a.LastQuotation.BidQty1)+Number(a.LastQuotation.BidQty2)+Number(a.LastQuotation.BidQty3)+Number(a.LastQuotation.BidQty4)+Number(a.LastQuotation.BidQty5)
						this.total1 = Number(a.LastQuotation.AskQty1)+Number(a.LastQuotation.AskQty2)+Number(a.LastQuotation.AskQty3)+Number(a.LastQuotation.AskQty4)+Number(a.LastQuotation.AskQty5)
					}
				})
				return this.$store.state.market.Parameters;
			},
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			tradeName(){
				return this.$store.state.tradeName;
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
		},
		methods:{
			baifenbi (a,b) {
				a = Number(a)
				b = Number(b)
				//console.log(a,b)
				if( a==0&&b==0) return 0;
				return ((a/(a+b))*100).toFixed(2) + '%'
			},
			toBackProbe:function(val,k){
				MessageBox.confirm("是否使用策略进行回测？").then(action => {
					this.$store.state.isshow.isfensshow = false;
					this.$store.state.isshow.isklineshow = false;
					this.$store.state.isshow.islightshow = false;
					this.$router.push({path:"/backProbe",query:{strategyName:val,strategyK:k,CommodityNoK:this.currentNo,ContractNo:this.ContractNo}});
				});
			},
			operateData: function(val){
				//允许画图
				this.$store.state.isshow.isfensInit = false;
				//渲染画图
				this.chartsShow = true;
				this.currentChartsNum = 1;
				this.currentChartsView = 'klineOne';
				//重组数据
				let arr = [];
				let obj;
				if(val){
					obj = val;
				}else{
					obj = this.$route.query;
				}
				arr.push(obj);
				this.currentNo = obj.commodityNo;    //当前合约
				this.$store.state.market.currentNo = obj.commodityNo;
				//对比合约
				let contrast = obj.contrast;
				if(contrast == '' || contrast == undefined){
					this.noContrast = true;
				}else{
					this.noContrast = false;
					contrast = contrast.split(',');
					contrast.forEach((o, i) => {
						if(o == obj.commodityNo) return;
						if(o != ''){
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
			menuEvent: function(index){
				//允许画图
				this.$store.state.isshow.isfensInit = false;
				this.currentChartsNum = index;
				switch(index){
					case 0:
						this.currentChartsView = 'light';
						break;
					case 1:
						this.currentChartsView = 'klineOne';
						this.$store.state.market.contd
						break;
					case 2:
						this.currentChartsView = 'klineFive';
						break;
					case 3:
						this.currentChartsView = 'klineThirty';
						break;
					case 4:
						this.currentChartsView = 'klineOneHour';
						break;
					case 5:
						this.currentChartsView = 'klineDay';
						break;
				}
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
				this.parameters.forEach((o, i) => {
					o.check = 0;
				});
			},
			routerback:function(){
				this.$router.go(-1);
				this.chartsShow = false;
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
			},
		},
		mounted:function(){
		},
		activated:function(){
			this.currentNo = this.$route.query.commodityNo;
			this.$store.state.isshow.isfensshow = false;
			this.$store.state.isshow.islightshow = false;
			this.$store.state.isshow.isklineshow = false;
			//重组数据
			this.operateData();
		},
		filters:{
			changName:function(e){
				return e
			},
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			}
		},
		watch:{
			parameters: function(n, o){
				if(n && n.length == 1){
					this.parameters.forEach((o, i) => {
						if(o.CommodityNo == this.currentNo){
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
	
	#quoteDetails{
		width: 7.5rem;
	}
	header{
		width: 100%;
		height: 0.88rem;
		border-bottom: 0.01rem solid #d2dae7;
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
					flex-direction: column;
					justify-content: center;
					align-items: center;
					h1{
						font-size: 0.32rem;
						color: #181722;
					}
					span{
						font-size: 0.24rem;
						color: #181722;
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
					}
				}
			}
			.addOption{
				display:inline-block;
				width: 0.32rem;
				height: 0.3rem;
				background: url(../../assets/images/quote/star.png) no-repeat 0 100%;
				background-size: 0.32rem 0.3rem;
			}
		}
	}
	.charts{
		width: 7.5rem;
		.charts_title{
			width: 100%;
			height: 0.8rem;
			padding: 0 0.3rem;
			line-height: 0.8rem;
			span{
				font-size: 0.28rem;
				margin-right: 0.3rem;
				&.current{
					color: #1482f0;
				}
			}
		}
		.charts_container{
			background-color: white;
			width: 7.5rem;
			height: 5.7rem;
		}
	}
	.money{
		width: 100%;
		background-color: #f7f9fc;
		padding: 0.3rem;
		.moneyDetails{
			background-color: white;
			width: 6.9rem;
			height: 2.4rem;
			margin: auto;
			border-radius: 0.1rem;
			p{
				line-height: 0.6rem;
				height: 0.6rem;
				text-align: center;
				color: #8f94a7;
				font-size: 0.26rem;
			}
			ul{
				justify-content: space-between;
				align-items: center;
				display: flex;
				&:nth-child(2){
					height: 0.8rem;
					li{
						span{
							&.red{
							color: #ff3363;
								}
							&.green{
								color: #11d974;
							}
						}
						&.red{
							color: #ff3363;
							}
						&.green{
							color: #11d974;
						}
					}
				}
				&:nth-child(3){
					height: 1rem;
					li{
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 25%;
						height: 100%;
						border: 0.01rem solid #d2dae7;
					}
				}
			}
		}
	}
	.charts{
		width: 7.5rem;
		.charts_title{
			background-color: white;
			border-bottom: 0.01rem solid #BBF6EC;
			width: 100%;
			height: 0.8rem;
			padding: 0 0.3rem;
			line-height: 0.8rem;
			span{
				font-size: 0.28rem;
				margin-right: 0.3rem;
				&.current{
					color: #169781;
				}
			}
		}
		.charts_container{
			background-color: white;
			width: 7.5rem;
			height: 5.7rem;
		}
	}
	.celue{
		.celue_title{
			width: 100%;
			height: 0.8rem;
			text-align: center;
			line-height: 0.8rem;
			color: #2d2f3e;
			font-size: 0.28rem;
		}
		.celue_tips{
			width: 100%;
			height: 1rem;
			line-height: 0.5rem;
			background-color: #f7f9fc;
			padding: 0 0.3rem;
		}
		.celue_pie{
			ul{
				
				display: flex;
				justify-content: center;
				align-items: center;
				li{
					margin:0 0.2rem;
					p{
						padding: 0.5rem 0.2rem;
						text-align: center;
						width: 1.6rem;
						height: 1.6rem;
						border-radius: 1.6rem;
						background-color: #8f94a7;
						color: white;
						font-size: 0.28rem;
					}
				}
				.current{
					background-color: #5534ff;
				}
			}
		}
		
	}
	.bugOne{
		margin-top: 0.3rem;
		width: 7.5rem;
		height: 2.4rem;
		.left{
			background-color: #2c2e3d;
			width: 50%;
			height: 2.4rem;
			float: left;
			display: flex;
			align-items: center;
			li{
				color: #8f94a7;
				justify-content: space-around;
				flex-direction: column;
				display:flex; 
				height:2.4rem; 
				&:nth-child(2){
					transform: rotate(90deg);
					margin-top: 1.2rem;
				}
				&:nth-child(3){
					span{
						&:nth-child(1){
							color: #ff3363;
						}
						&:nth-child(2){
							color: #11d974;
						}
					}
				}
			}
		}
		.right{
			background-color: #20202D;
			width: 50%;
			height: 2.4rem;
			float: left;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.buyFive{
		margin-bottom: 1rem;
		width: 100%;
		height: 3.2rem;
		.left{
			float: left;
			width: 50%;
			height: 100%;
			background-color: #fff5f3;
			padding:0 0.3rem;
			li{
				display: flex;
				justify-content: space-between;
				height: 0.64rem;
				line-height: 0.64rem;
				border-bottom: 0.01rem solid #dbdee1;
				span{
					&:nth-child(2){
						color: #e44f34;
					}
				}
			}
			&:nth-child(2){
				background-color: #ebfff9;
				li{
					span{
						&:nth-child(2){
							color: #16b887;
						}
					}
				}
			}
			
		}
	}
	.duibi{
		.duibi_title{
			text-align: center;
			width: 7.5rem;
			height: 0.8rem;
			background-color: #ffffff;
			font-size: 0.28rem;
			line-height: 0.8rem;
			color: #2d2f3e;
		}
		.duibi_details{
			width: 100%;
			padding: 0.3rem;
			background-color: #f7f9fc;
			display: flex;
		}
		.duibi_left{
			background-color: white;
			width: 2.3rem;
			height: 2.4rem;
			p{
				text-align: center;
				line-height: 0.6rem;
				&:nth-child(1){
					font-size: 0.3rem;
					color: #8f94a7;
				}
				&:nth-child(2){
					font-size: 0.26rem;
				}
				&:nth-child(3){
					font-size: 0.26rem;
					&.red{
						color: #ff3363;
						}
					&.green{
						color: #11d974;
					}
				}
				&:nth-child(4){
					font-size: 0.26rem;
					span{
						&.red{
							color: #ff3363;
							}
						&.green{
							color: #11d974;
						}
					}
				}
			}
		}
		.duibi_right{
			background-color: white;
			width: 4.6rem;
			height: 2.4rem;
			p{
				text-align: center;
				line-height: 0.6rem;
				font-size: 0.3rem;
				color: #8f94a7;
			}
			ul{
				width: 100%;
				li{
					width: 100%;
					padding-left: 0.5rem;
					line-height: 0.6rem;
					span{
						&:nth-child(1){
						color: black;
						}
						&:nth-child(2){
							color:#ff3363 ;
						}
						&:nth-child(3){
							color: #ff3363;
						}
					}
				}
			}
		}
	}
	
</style>
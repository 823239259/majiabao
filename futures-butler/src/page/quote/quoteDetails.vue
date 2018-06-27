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
				<div class="guanjia_title">
					<i></i>
					<p>管家今日提示</p>
				</div>
				<div class="guanjia">
					<ul>
						<li>今开</li>
						<li>{{v.LastQuotation.OpenPrice | fixNum(v.DotSize)}}</li>
					</ul>
					<ul>
						<li>作结</li>
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
//			this.currentNo = this.$route.query.commodityNo;
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
		background-color: #e5f9f6;
	}
	header{
		background-color: #169781;
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
					flex-direction: column;
					justify-content: center;
					align-items: center;
					h1{
						font-size: 0.32rem;
						color: white;
					}
					span{
						font-size: 0.24rem;
						color: #6fdcc9;
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
		width: 7.5rem;
		height: 1.92rem;
		display: flex;
		justify-content: space-between;
		
		.money_width{
			background-color: white;
			width: 2.5rem;
			height: 1.92rem;
			border-right: 0.01rem solid #BBF6EC;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			p{
				
				&:nth-child(1){
					font-size: 0.36rem;
					color: #283835;
				}
				&:nth-child(2){
					font-size: 0.28rem;
					span{
						&:nth-child(1){
							margin-right: 0.05rem;
						}
						&.red{
							color: #F4663A;
						}
						&.green{
							color: #19d961;
						}
					}
				}
			}
		}
		.money_width1{
			background-color: white;
			width: 2.5rem;
			height: 1.92rem;
			ul{
				width: 100%;
				height: 0.64rem;
				display: flex;
				justify-content: space-around;
				align-items: center;
				li{
					color:black;
					font-size:0.28rem;  
					&:nth-child(1){
						color: #788b87;
					}
					&.red{
						color: #F4663A;
					}
					&.green{
						color: #19d961;
					}
				}
			}
		}
	}
	.color_green{
		width: 7.5rem;
		height: 0.3rem;
		background-color: #e5f9f6;
		border-top: #bbf6ec;
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
	.guanjia_title{
		padding-left: 0.3rem;
		background-color: white;
		height: 0.8rem;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		i{
			display: block;
			width: 0.4rem;
			height: 0.4rem;
			background: url(../../assets/images/quote/guanjia.png) no-repeat;
			background-size: 0.4rem 0.4rem;
			margin-right: 0.3rem;
		}
		p{
			font-size: 0.28rem;
			color: black;
		}
	}
	.guanjia{
		background-color: white;
		width: 100%;
		height: 1rem;
		padding: 0 0.3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		ul{
			width: 100%;
			display:flex; 
			flex-direction: column;
			justify-content: center;
			align-items: center;
			li{
				&.red{
					color: #F4663A;
				}
				&.green{
					color: #19d961;
				}
				&:first-child{
					color: #788b87;
					padding-bottom: 0.05rem;
				}
			}
		}
	}
</style>
<template>
	<div id="quoteDetails">
		<template v-for="(v, index) in parameters">
			<div v-if="v.CommodityNo == currentNo">
				<header>
					<ul>
						<li @click="routerback"><i></i></li>
						<li>
							<h1>{{tradeName[currentNo]}}</h1>
							<span @click="alertRule">规则</span>
						</li>
						<li @click="addOptional"><i></i></li>
					</ul>
				</header>
				<div class="nameTitle">
					<span>{{tradeName[currentNo]}}</span>
					<span class="price" :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span>
				</div>
				<div class="strategy">
					<template>
						<div class="strategy_1">
							<span v-for="(val,k) in strategyList" @click="toBackProbe(val,k)">{{val}}</span>
						</div>
					</template>
					
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
				<div class="money">
					<div class="moneyDet">
						<p>现手</p>
						<p>{{v.LastQuotation.LastVolume}}</p>
					</div>
					<div class="moneyDet">
						<p>成交量</p>
						<p>{{v.LastQuotation.TotalVolume}}</p>
					</div>
					<div class="moneyDet">
						<p>持仓量</p>
						<p>{{v.LastQuotation.Position}}</p>
					</div>
					<div class="moneyDet">
						<p>昨结</p>
						<p>{{v.LastQuotation.PreSettlePrice | fixNum(v.DotSize)}}</p>
					</div>
					<div class="moneyDet">
						<p>涨跌情况</p>
						<p class="change" :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}"><em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}&nbsp;&nbsp;<em v-show="v.LastQuotation.ChangeRate > 0">+</em>{{v.LastQuotation.ChangeRate | fixNumTwo}}%</p>
					</div>
					<div class="moneyDet">
						<p>开盘价</p>
						<p class="default" :class="{red: v.LastQuotation.OpenPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.OpenPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.OpenPrice | fixNum(v.DotSize)}}</p>
					</div>
					<div class="moneyDet">
						<p>最高价</p>
						<p class="default" :class="{red: v.LastQuotation.HighPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.HighPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.HighPrice | fixNum(v.DotSize)}}</p>
					</div>
					<div class="moneyDet">
						<p>最低价</p>
						<p class="default" :class="{red: v.LastQuotation.LowPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LowPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LowPrice | fixNum(v.DotSize)}}</p>
					</div>
				</div>
				<div class="bugOne">
					<ul>
						<li>
							<span>买一</span>
							<span>卖一</span>
						</li>
						<li>
							<mt-range v-model="v.LastQuotation.BidQty1" :barHeight="20" :min="0" :max="Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.AskQty1)" :step="1"></mt-range>
						</li>
						<li>
							<span>{{baifenbi(v.LastQuotation.BidQty1,v.LastQuotation.AskQty1)}}</span>
							<span class="black">{{Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.AskQty1)}}</span>
							<span>{{baifenbi(v.LastQuotation.AskQty1,v.LastQuotation.BidQty1)}}</span>
						</li>
					</ul>
				</div>
				<div class="bugOne">
					<ul>
						<li>
							<span>买</span>
							<span>卖</span>
						</li>
						<li>
							<mt-range v-model="total" :barHeight="20" :min="0" :max="Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.BidQty2)+Number(v.LastQuotation.BidQty3)+Number(v.LastQuotation.BidQty4)+Number(v.LastQuotation.BidQty5)+Number(v.LastQuotation.AskQty1)+Number(v.LastQuotation.AskQty2)+Number(v.LastQuotation.AskQty3)+Number(v.LastQuotation.AskQty4)+Number(v.LastQuotation.AskQty5)" :step="1"></mt-range>
						</li>
						<li>
							<span>{{baifenbi(total,total1)}}</span>
							<span class="black">{{total+total1}}</span>
							<span>{{baifenbi(total1,total)}}</span>
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
			</div>
		</template>
		<tips-float :isBack="true"></tips-float>
		<div class="bottomTab">
			<ul class="bottomTab_list">
				<li v-for="item in bottomList1" @click="itemClick(item)" :class="{current:dian}"><i :class="{dianzan1 : dian  , dianzan : !dian}"></i>{{item.name}}</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import tipsFloat from '../../components/tipsFloat'
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
			tipsFloat,light,klineOne,klineFive,klineThirty,klineDay,klineOneHour
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
				//清空对比合约数据
				this.$store.state.market.contrastData = [];
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
//				this.$store.state.market.Parameters = [];
//				this.$store.state.market.tradeParameters = [];
//				this.$store.state.market.commodityOrder = [];
//				this.$store.state.market.commodityOrder = arr;
//				arr.forEach((o, i) => {
//					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.mainContract +'"}}');
//				});
				this.isClick = true;
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
				this.$router.push({path:"/quote"});
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
			},
			itemClick (item) {
				if(item.path) {
					this.$router.push({path: item.path})
				}
				if(item.method){
					this[item.method]()
				}
			},
			baifenbi (a,b) {
				a = Number(a)
				b = Number(b)
				//console.log(a,b)
				if( a==0&&b==0) return 0;
				return ((a/(a+b))*100).toFixed(2) + '%'
			},
			addOptional: function(){
				var stateLogin = localStorage.user ? JSON.parse(localStorage.user) : '';
				if(stateLogin == ''){
					Toast({message: '请先登录平台账号', position: 'bottom', duration: 1500});
				}else{
					var headers = {
						token: stateLogin.token,
						secret: stateLogin.secret
					}
					if(this.optionalIconShow == true){   //删除自选
						var _datas = {id: this.optionalId};
						this.$messageBox.confirm("确定删除自选？","提示").then(action=>{
							pro.fetch('post', '/quoteTrader/userRemoveCommodity', _datas, headers).then((res) => {
								if(res.success == true && res.code == 1){
									Toast({message: '自选删除成功', position: 'bottom', duration: 1000});
									this.optionalName = '添加自选';
									this.optionalIconShow = false;
								}
							}).catch((err) => {
								Toast({message: err.data.message, position: 'bottom', duration: 1000});
							});
						}).catch(err=>{});
					}else{   //添加自选
						var datas = {
							'exchangeNo': this.orderTemplist[this.currentNo].ExchangeNo,
							'commodityNo': this.currentNo,
							'contractNo': this.orderTemplist[this.currentNo].MainContract,
						}
						pro.fetch('post', '/quoteTrader/userAddCommodity', datas, headers).then((res) => {
							if(res.success == true && res.code == 1){
								this.optionalIconShow = true;
								this.optionalName = '已添加自选';
								Toast({message: '自选添加成功', position: 'bottom', duration: 1500});
								this.optionalId = res.data.id;
							}
						}).catch((err) => {
							Toast({message: err.data.message, position: 'bottom', duration: 1500});
						});
					}
				}
			},
			alertRule () {
				this.$toast({message: '规则补充中', position: 'bottom', duration: 1500});
			},
			getSelection () {
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						this.selectionList = res.data;
					}
				}).catch((err) => {
					//Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			}	,
			//获取可用策略信息
			getStrategy:function(){
				pro.fetch("post","/others/getStrategys","","").then((res)=>{
					if(res.code == 1 && res.success == true){
						this.strategyList = res.data;
					}
				}).catch((err)=>{
					
				})
			},
			dianzan:function(){
				if(localStorage.user){
					if(this.dian == true){
					Toast({message: "您已点赞", position: 'bottom', duration: 1500});
					}else{
						var a = {dianzan:true}
						localStorage.dianzan = JSON.stringify(a);
						this.dian = true;
						Toast({message: "点赞成功", position: 'bottom', duration: 1500});
						
						this.bottomList1= [
							{
								name:'102',
								method:'dianzan'
							},
							{
								name: '工具箱',
								path: '/tools'
							},
							{
								name: '推荐给朋友',
								method: 'shareSystem'
							}
						]
					}
				}else{
					Toast({message: "请先登录", position: 'bottom', duration: 1500});
				}
				
			}
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
			//获取策略
			this.getStrategy();
			this.dian = localStorage.dianzan ? JSON.parse(localStorage.dianzan).dianzan : false;
			if(this.dian){
				this.bottomList1= [
					{
						name:'102',
						method:'dianzan'
					},
					{
						name: '工具箱',
						path: '/tools'
					},
					{
						name: '推荐给朋友',
						method: 'shareSystem'
					}
				]
			}
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
		background-color: #D3E9FF;
		#range1{
		    background-color: none;
		}
	}
	header{
		background-color: #b3daff;
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
						color: #222222;
					}
					span{
						width: 0.8rem;
						height: 0.4rem;
						line-height: 0.4rem;
						background-color: #1482f0;
						border-radius: 0.06rem;
						font-size: 0.24rem;
						color: white;
						text-align: center;
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
						background: url(../../assets/images/quote/star.png) no-repeat 0 100%;
						background-size: 0.32rem 0.3rem;
					}
				}
			}
		}
	}
	.strategy{
		background-color: #cae5ff;
		width: 7.5rem;
		height: 0.8rem;
		padding: 0 0.3rem;
		overflow-x: scroll;
		.strategy_1{
			text-align: center;
			line-height: 0.8rem;
			width: 14.6rem;
			span{
				display: block;
				float: left;
				height: 0.8rem;
				width: 2rem;
				font-size: 0.28rem;
				
			}
		}
	}
	.nameTitle{
		border-top: 0.01rem solid white;
		background-color: #b3daff;
		height: 1rem;
		padding: 0 0.3rem;
		width: 7.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		span{
			font-size: 0.36rem;
			color: black;
				&.red{
					font-size:0.32rem ;
					color: #e44f34;
				}
				&.green{font-size:0.32rem ;
					color: #16b887;
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
		margin: 0.3rem;
		width: 6.9rem;
		height: 2.4rem;
		background-color: #edf6ff;
		display: flex;
		flex-wrap: wrap;
		.moneyDet{
			width: 25%;
			height: 50%;
			text-align: center;
			&:nth-child(2){
				border-right: 0.01rem solid #dbdee1;
				border-left: 0.01rem solid #dbdee1;
			}
			&:nth-child(6){
				border-right: 0.01rem solid #dbdee1;
				border-left: 0.01rem solid #dbdee1;
			}
			&:nth-child(3){
				border-right: 0.01rem solid #dbdee1;
			}
			&:nth-child(7){
				border-right: 0.01rem solid #dbdee1;
			}
			p{
				line-height: 0.5rem;
				color: #aaaaaa;
				&.red{
					color: #e44f34;
				}
				&.green{
					color: #16b887;
				}
			}
		}
	}
	.bugOne{
		width: 6.9rem;
		height: 1.54rem;
		background-color: #edf6ff;
		margin: 0 0.3rem 0.3rem 0.3rem;
		padding: 0.3rem;
		ul{
			li{
				width: 100%;
				float: left;
				span{
					text-align: left;
					width: 33%;
					float: left;
					color: #e44f34;
					font-size: 0.24rem;
					&:last-child{
						color: #16b887;
						float: right;
						text-align: right;
					}
					&.black{
						float: left;
						color: #222222;
						text-align: center;
					}
				}
			}
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
	.bottomTab{
		position: fixed;
		bottom: 0;
		width: 7.5rem;
		height: 0.98rem;
		background-color: #b3daff;
		z-index: 100;

	}
	.bottomTab_list{
		display: flex;
		justify-content: center;
		align-items: center;
		@include font($fs30,0.98rem,#222);
		li{
			flex: 1;
		}
		li:nth-child(3){
			color: #fff;
			background-color: #1482f0;
		}
		li:nth-child(1){
			display: flex;
			justify-content: center;
			align-items: center;
			&.current{
				color: #1482f0;
			}
			.dianzan{
				display: block;
				width: 0.4rem;
				height: 0.38rem;
				background: url(../../assets/images/account/dianzhan_icon.png) no-repeat ;
				background-size: 0.4rem 0.38rem;
				margin-right: 0.1rem;
			}
			.dianzan1{
				display: block;
				width: 0.4rem;
				height: 0.38rem;
				background: url(../../assets/images/account/dianzhan1.png) no-repeat ;
				background-size: 0.4rem 0.38rem;
				margin-right: 0.1rem;
			}
		}
		
	}
</style>
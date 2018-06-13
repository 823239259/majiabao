<template>
	<div id="quoteDetails">
		<template v-for="(v, index) in parameters">
			<div v-if="v.CommodityNo == currentNo">
				<header>
					<ul>
						<li @click="routerback"><i></i></li>
						<li>
							<h1>{{tradeName[currentNo]}}</h1>
							<span>规则</span>
						</li>
						<li @click="addOptional"><i></i></li>
					</ul>
				</header>
				<div class="money">
					<div class="moneyDet">
						<p>最新价</p>
						<p class="price" :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</p>
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
							<span>{{((Number(v.LastQuotation.BidQty1)/(Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.AskQty1)))*100).toFixed(2)+"%"}}</span>
							<span class="black">{{Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.AskQty1)}}</span>
							<span>{{((Number(v.LastQuotation.AskQty1)/(Number(v.LastQuotation.BidQty1)+Number(v.LastQuotation.AskQty1)))*100).toFixed(2)+"%"}}</span>
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
							<span>{{((total/(total+total1))*100).toFixed(2)+"%"}}</span>
							<span class="black">{{total+total1}}</span>
							<span>{{((total1/(total+total1))*100).toFixed(2)+"%"}}</span>
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
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	export default{
		name:"quoteDetails",
		data(){
			return{
				title:"",
				currentNo:'',
				total:'',
				total1:"",
				userInfo: localStorage.user ? JSON.parse(localStorage.user) : '',
			}
		},
		computed:{
			parameters(){
				this.$store.state.market.Parameters.forEach((a,i)=>{
					if(a.CommodityNo == this.currentNo){
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
			}
		},
		methods:{
			routerback:function(){
				this.$router.push({path:"/quote"});
			},
			addOptional: function(){
				let stateLogin = localStorage.user ? JSON.parse(localStorage.user) : '';
				if(stateLogin == ''){
					Toast({message: '请先登录平台账号', position: 'bottom', duration: 1500});
				}else{
					var headers = {
						token: this.userInfo.token,
						secret: this.userInfo.secret
					}
					if(this.optionalIconShow == true){   //删除自选
						var _datas = {id: this.optionalId};
						MessageBox.confirm("确定删除自选？","提示").then(action=>{
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
		},
		mounted:function(){
		},
		activated:function(){
			this.currentNo = this.$route.query.commodityNo;
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
			parameters:function(n,o){
//				console.log(n)
			}
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
	
</style>
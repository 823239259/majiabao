<template>
	<div id="quote">
		<mt-header fixed title="行情">
	      	<mt-button slot="left" @click="showTab('tabShow')">
	       	 	<span class="tab_icon header_icon"></span>
	    	</mt-button>
	     	<mt-button slot="right">
	          	<span class="search_icon header_icon" @click="goto('/home_search')"></span>
	          	<span class="customer_icon header_icon" @click="callCustomer" ></span>
	      	</mt-button>
	    </mt-header>
	    <bottomTab :tabSelect="tabSelected" v-show="tabShow" @show-tab="showTab($event,'tabShow')"></bottomTab>
	    <div class="checkType">
	    	<div class="empty"></div>
	    	<div class="check">
	    		<span v-for="(k,index) in tabList" :class="{current:currentNum == index}" @click="checkType(index)">{{k.id}}</span>
	    	</div>
	    	<div>
	    		<span class="selef" @click="toSelef">自选</span>
	    	</div>
	    </div>
	    <div class="tips">↓点击选择行情，查看详细数据↓</div>
	    <div class="details">
	    	<div class="quoteBlock" v-for="(v,index) in parameters"  @click="toQuoteDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)">
	    		<p>{{v.CommodityNo+v.MainContract}}</p>
	    		<p>{{v.CommodityName}}</p>
	    		<p :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</p>
	    		<p>
	    			<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
	    			<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
	    		</p>
	    		<i :class="{icon_buy:v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice,icon_sell:v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}"></i>
	    	</div>
	    </div>
	    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
		<tipsFloat></tipsFloat>
	</div>
	
</template>

<script>
	import pro from '../assets/js/common.js'
	import { mapMutations,mapActions } from 'vuex'
	import bottomTab from '../components/bottom_tab'
	import tipsFloat from '../components/tipsFloat'
	import { Toast } from 'mint-ui';
	export default{
		name:"",
		data(){
			return{
				tabShow: false,
				tabSelected: 'quote',
				tabList:[
					{
						id:'商品'
						},
					{
						id:'股指'
					},
					{
						id:'其他'
					}
				],
				currentNum:0,
				currentType:[],
				allType:[],
				selectionList:[]
			}
		},
		components:{bottomTab,tipsFloat},
		mixins: [pro.mixinsToCustomer],
		computed:{
			parameters(){
				return this.$store.state.market.Parameters;
			},
			commodityOrder(){
				if(this.$store.state.market.commodityOrder){
					return this.$store.state.market.commodityOrder;
				}
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			userInfo(){
				return localStorage.user ? JSON.parse(localStorage.user) : ""
			},
		},
		methods:{
			...mapActions([
				'initQuoteClient'
			]),
			goto(path) {
		        this.$router.push({
		          	path: path
		        });
		     },
			showTab(...key) {
		        if(key.length === 1) {
		          this[key[0]] = !this[key[0]]
		        }else{
		          this[key[1]] = key[0]
		        }
		        
		    },
		    checkType(index){
		    	this.currentNum = index;
		    	this.currentType = this.allType[index].list;
		    	this.$store.state.market.commodityOrder = this.currentType ;
		    },
			//获取分类
			getCommodityInfo: function(){
				pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data!=undefined || res.data!=null){
							this.allType = res.data;
							this.currentType = res.data[0].list;
							this.$store.state.market.commodityOrder = this.currentType;
						}
					}
				}).catch((err) => {
//					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			//获取自选
			getSelection:function(){
				var headers = {
					token: this.userInfo.token,
					secret: this.userInfo.secret
				}
				pro.fetch('post', '/quoteTrader/userGetCommodityList', '', headers).then((res) => {
					if(res.success == true && res.code == 1){
						this.selectionList = res.data;
					}
				}).catch((err) => {
					if(err.data.code = "-9999"){
//						Toast({message:"请先登录", position: 'bottom', duration: 2000});
					}
				});
			},
			//自选列表
			toSelef(){
				this.currentType = this.selectionList;
				this.$store.state.market.commodityOrder = this.selectionList;
			},
			toQuoteDetails: function(commodityNo, mainContract, exchangeNo, contrast){
				this.$router.push({path: '/quoteDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
			},
		},
		mounted: function(){
			this.initQuoteClient();
		},
		activated:function(){
			this.getSelection();
			this.getCommodityInfo();
		},
		created () {
		},
		filters:{
			fixNumTwo: function(num){
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize){
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			}
		},
		watch:{
			currentType:function(n,o){
				if( n != o){
					this.$store.state.market.Parameters = [];
					this.$store.state.market.commodityOrder = n;
					this.commodityOrder.forEach((o, i) => {
						this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
					});
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#quote{
		width: 7.5rem;
	}
	.empty{
		width: 0.6rem;
		height: 0.6rem;
	}
	.checkType{
		width: 7.5rem;
		height: 1.2rem;
		margin-top: 0.98rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.3rem;
		.check{
			margin: auto;
			span{
				display: block;
				width: 0.6rem;
				height: 0.6rem;
				background-color: #8f94a7;
				font-size: 0.22rem;
				border-radius: 0.3rem;
				float: left;
				line-height: 0.6rem;
				text-align: center;
				color: white;
				&:nth-child(2){
					margin:0 0.3rem;
				}
			}
			.current{
				background-color: #181722;
			}
		}
		.selef{
			display: block;
			width: 0.6rem;
			height: 0.6rem;
			background-color: #5534ff;
			color: white;
			border-radius: 0.3rem;
			text-align: center;
			line-height: 0.6rem;
		}
	}
	.tips{
		text-align: center;
		height: 0.6rem;
		line-height: 0.6rem;
		color: #8f94a7;
		font-size: 0.24rem;
	}
	.details{
		display: flex;
		justify-content: space-between;
		padding: 0 0.3rem;
		flex-wrap: wrap;
		.quoteBlock{
			width: 3.3rem;
			height: 2.4rem;
			margin-top: 0.3rem;
			box-shadow: 0rem 0.05rem 0.05rem 0rem rgba(0, 0, 0, 0.1);
			border-radius: 0.1rem;
			position: relative;
			p{
				line-height: 0.6rem;
				&:nth-child(1){
					font-size: 0.26rem;
					color: #8f94a7;
					text-indent: 0.3rem;
				}	
				&:nth-child(2){
					font-size: 0.3rem;
					color: #181722;
					text-align: center;
				}
				&:nth-child(3){
					font-size: 0.4rem;
					text-align: center;
					&.red{
						color: #ff3363;
						}
					&.green{
						color: #11d974;
					}
				}
				&:nth-child(4){
					text-align: center;
					span{
						font-size: 0.24rem;
						&.red{
							color: #ff3363;
							}
						&.green{
							color: #11d974;
						}
					}
				}
			}
			.icon_buy{
				display: block;
				width: 0.8rem;
				height: 0.8rem;
				position: absolute;
				top: 0;
				right: 0;
				background: url(../assets/images/quote/quote_bug.png) no-repeat;
				background-size: 0.8rem 0.8rem;
			}
			.icon_sell{
				display: block;
				width: 0.8rem;
				height: 0.8rem;
				position: absolute;
				top: 0;
				right: 0;
				background: url(../assets/images/quote/quote_sell.png) no-repeat;
				background-size: 0.8rem 0.8rem;
			}
		}
	}
</style>
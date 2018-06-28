<template>
	<div id="type">
		<mt-header :title="type" fixed>
		 	<router-link to="/quote" slot="left">
		 	   	<mt-button icon="back" ></mt-button>
		 	</router-link>
		</mt-header>
		<div class="container">
			<ul v-for="(v,index) in parameters" >
				<li @click="toQuoteDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)">
					<i :style="{backgroundColor:nameColor[index]}" class="name">{{v.CommodityNo}}</i>
				</li>
				<li @click="toQuoteDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)">
					<p class="p_black">{{v.CommodityName}}</p>
					<p class="p_gray">价格：<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span></p>
				</li>
				<li @click="toQuoteDetails(v.CommodityNo, v.MainContract, v.ExchangeNo, v.contrast)">
					<p class="p_gray">涨跌：<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span></p>
				</li>
				<li>
					<i class="shouc" @click="addoption(v.CommodityNo,v.ExchangeNo,v.MainContract)">收藏</i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	
	export default{
		name:"",
		data(){
			return{
				shouc1:true,
				type:'',
				selectionList:'',
				nameColor:["#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#9bbb58"]
			}
		},
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
			orderTemplist(){
				return this.$store.state.market.orderTemplist;
			},
			userInfo(){
				return localStorage.user ? JSON.parse(localStorage.user) : ""
			},
		},
		methods:{
			subscribe(){
				this.$store.state.market.Parameters = [];
				this.commodityOrder.forEach((o, i) => {
					this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
				});
			},
			toQuoteDetails: function(commodityNo, mainContract, exchangeNo, contrast){
				this.$router.push({path: '/quoteDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
			},
			addoption:function(commodityNo,exchangeNo,contrastNo){
				var stateLogin = localStorage.user ? JSON.parse(localStorage.user) : '';
				if(stateLogin == ''){
					Toast({message: '请先登录平台账号', position: 'bottom', duration: 1500});
				}else{
					var headers = {
						token: stateLogin.token,
						secret: stateLogin.secret
					}
					var datas = {
						'exchangeNo': exchangeNo,
						'commodityNo': commodityNo,
						'contractNo': contrastNo,
					}
					pro.fetch('post', '/quoteTrader/userAddCommodity', datas, headers).then((res) => {
						if(res.success == true && res.code == 1){
							this.shouc1 = false;
							Toast({message: '收藏成功', position: 'bottom', duration: 1500});
						}
					}).catch((err) => {
						Toast({message: err.data.message, position: 'bottom', duration: 1500});
					});
				}
			},
			//获取自选列表
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
					//Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
		},
		mounted: function(){
		},
		activated:function(){
			this.type = this.$route.query.type;
			//订阅
			this.subscribe();
			this.getSelection();
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
		}
	}
</script>


<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#type{
		width: 7.5rem;
	}
	.container{
		margin-top: 1rem;
		ul{
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 0 0.3rem;
			align-items: center;
			height: 1.36rem;
			.p_black{
				color: #283835;
				font-size: 0.32rem;
			}
			.green{
				color: #19d961;
			}
			.red{
				color: #f4663a;;
			}
			.p_gray{
				color: #788b87;
				font-size: 0.28rem;
			}
			.shouc{
				text-align: center;
				display: block;
				width: 0.8rem;
				height: 0.4rem;
				line-height: 0.4rem;
				font-size: 0.28rem;
				color: white;
				background-color: #f44234;
				border-radius: 0.1rem;
			}
			.shou_1{
				text-align: center;
				display: block;
				width: 0.8rem;
				height: 0.4rem;
				line-height: 0.4rem;
				font-size: 0.28rem;
				color: white;
				background-color: #cccccc;
				border-radius: 0.1rem;
			}
			.name{
				display: block;
				width: 0.9rem;
				height: 0.7rem;
				font-size: 0.28rem;
				line-height: 0.7rem;
				text-align: center;
				color: white;
				border-radius: 50%;
			}
		}
	}
</style>
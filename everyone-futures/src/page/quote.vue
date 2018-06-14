<template>
	<div id="quote">
		<div v-show="isShowGuide">
			<mt-header title="行情" fixed>
			 	<router-link to="/news_info" slot="left">
			 	   	<mt-button style="background-color: #1482f0;color: white;height: 0.4rem;width: 0.88rem;font-size: 0.24rem;">公告</mt-button>
			 	</router-link>
			 	<mt-button  @click="shareSystem" slot="right" style="background-color: #1482f0;color: white;height: 0.4rem;width: 0.88rem;font-size: 0.24rem">分享</mt-button>
			</mt-header>
			<div class="tablist">
				<span v-for="(k,index) in tabList" :class="{current:currentNM == index}" @click="changeTab(index)">{{k.id}}</span>
				<mt-button type="primary" style="height: 0.56rem;line-height: 0.24rem;font-size: 0.24rem;margin-top: 0.12rem;background-color: #1482f0;">专业帮助</mt-button>
			</div>
			<components :is="currentView"></components>
			<bottomTab :tabSelect="tabSelected"></bottomTab>
			<tips-float></tips-float>   
		</div>
		<firstGuide v-show="!isShowGuide"></firstGuide>
	</div>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	import { Toast, Indicator } from 'mint-ui';
	import guzhi from "./quote/guzhi.vue"
	import bottomTab from '../components/bottom_tab'
	import tipsFloat from '../components/tipsFloat'
	import commodity from "./quote/commodity.vue"
	import selfSelection from "./quote/selfSelection.vue"
	import firstGuide from "./quote/firstGuide.vue"
	import pro from '../assets/js/common.js'
	export default{
		name:"",
		components:{guzhi,commodity,selfSelection,bottomTab,tipsFloat,firstGuide},
		mixins: [pro.mixinsToCustomer],
		data(){
			return{
				tabList:[
					{
						id:'自选'
						},
					{
						id:'商品期货'
					},
					{
						id:'股指期货'
					}
				],
				currentNM:1,
				currentView:commodity,
				guzhiList:[],
				cmList:[],
				selectionList:[],
				tabSelected:'quote'
			}
		},
		computed:{
			parameters(){
				return this.$store.state.market.Parameters;
			},
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			quoteStatus(){
				return this.$store.state.account.quoteStatus;
			},
			userInfo(){
				return localStorage.user ? JSON.parse(localStorage.user) : ""
			},
			isShowGuide(){
				return this.$store.state.account.isShowGuide
			}
		},
		methods:{
			...mapActions([
				'initQuoteClient'
			]),
			changeTab:function(index){
				this.currentNM = index;
				
				switch (index){
					case 0:
						this.currentView = selfSelection;
						this.$store.state.market.Parameters = [];
						this.$store.state.market.commodityOrder = this.selectionList;
						this.selectionList.forEach((o, i) => {
							this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
						});
						break;
					case 1:
						this.currentView = commodity;
						this.$store.state.market.Parameters = [];
						this.$store.state.market.commodityOrder = this.cmList;
						this.cmList.forEach((o, i) => {
							this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
						});
						break;
					case 2:
						this.currentView = guzhi;
						this.$store.state.market.Parameters = [];
						this.$store.state.market.commodityOrder = this.guzhiList;
						this.guzhiList.forEach((o, i) => {
							this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo +'"}}');
						});
						break;
					default:
						break;
				}
			},
			//获取股指期货
			getCommodityInfo: function(){
				pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.guzhiList = res.data[0].list;
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			//获取全部合约
			getCommodityAll:function(){
				this.$store.state.market.Parameters = [];
				this.$store.state.market.commodityOrder = [];
				//获取所有市场合约
				pro.fetch('post', '/quoteTrader/getCommodityInfoNoType', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.cmList = res.data;
						this.$store.state.market.commodityOrder = this.cmList;
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
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
					Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			}
		},
		mounted: function(){
			this.initQuoteClient();
			//获取所有合约
			this.getCommodityAll();
			//获取股指期货
			this.getCommodityInfo();
		},
		activated:function(){
			
			//获取自选列表
			this.getSelection();
		}
	}
</script>


<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#quote{
		width: 7.5rem;
		overflow: hidden;
	}
	.tablist{
		margin-top: 2.08rem;
		padding: 0 0.3rem ;
		width:100%;
		height:0.8rem;
		background-color: #cae5ff;
		display: flex;
		justify-content: space-between;
		span{
			line-height: 0.8rem;
			font-size: 0.28rem;
			margin-right: 0.3rem;
			&.current{
				color: #1482f0;
				border-bottom: 0.04rem solid #1482f0;
			}
		}
	}
</style>
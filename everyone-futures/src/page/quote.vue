<template>
	<div id="quote">
		<mt-header title="行情"  style="background-color: #b3daff;height: 0.88rem;line-height: 0.88rem;">
		 	<router-link to="/" slot="left">
		 	   	<mt-button style="background-color: #1482f0;color: white;height: 0.4rem;width: 0.88rem;font-size: 0.24rem;">公告</mt-button>
		 	</router-link>
		 	<mt-button  slot="right" style="background-color: #1482f0;color: white;height: 0.4rem;width: 0.88rem;font-size: 0.24rem">分享</mt-button>
		</mt-header>
		<div class="tablist">
			<span v-for="(k,index) in tabList" :class="{current:currentNM == index}" @click="changeTab(index)">{{k.id}}</span>
			<mt-button type="primary" style="height: 0.56rem;line-height: 0.24rem;font-size: 0.24rem;margin-top: 0.12rem;background-color: #1482f0;">专业帮助</mt-button>
		</div>
		<components :is="currentView"></components>
	</div>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	import { Toast, Indicator } from 'mint-ui';
	import guzhi from "./quote/guzhi.vue"
	import commodity from "./quote/commodity.vue"
	import pro from '../assets/js/common.js'
	export default{
		name:"",
		components:{guzhi,commodity},
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
				cmList:[]
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
		},
		methods:{
			...mapActions([
				'initQuoteClient'
			]),
			changeTab:function(index){
				this.currentNM = index;
				
				switch (index){
					case 0:
						this.currentView = commodity;
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
			}
		},
		mounted: function(){
			this.initQuoteClient();
			//获取所有合约
			this.getCommodityAll();
			//获取股指期货
			this.getCommodityInfo();
		}
	}
</script>


<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#quote{
		width: 7.5rem;
	}
	.tablist{
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
<template>
<div id="quote">
	<TopTitle title="原油行情">
		<span slot="my_right" class="header_icon reload_icon"></span>
	</TopTitle>
	<div class="btn_box">
		<button class="btn" v-for="(item, index) in oilList" :key="index">{{item}}</button>
	</div>
	<div class="blockColor"></div>
	<div class="chart_wrap">
		<ul class="charts_title">
			<li :class="{current: currentChartsNum == index}" v-for="(key,index) in chartsList" @tap="menuEvent(index)" :key="index">{{key}}</li>
		</ul>
		<div class="charts_container">
			<components :is="currentChartsView" v-if="showChart"></components>
		</div>
	</div>
	<dishInfo></dishInfo>
	<div class="blockColor"></div>
	<div class="contrast_wrap">
		<div class="box">
			<p class="left">对比合约</p>
			<p class="right">
				<button>点击添加行情</button>
			</p>
		</div>
	</div>
	<div class="strategy_wrap">
		<h2>原油攻略</h2>
		<div class="btn_box">
			<button class="btn" v-for="(item, index) in strategyList" :key="index">{{item.name}}</button>
		</div>
	</div>
	<bottomTab :tabSelect="tabSelected"></bottomTab>
</div>
</template>

<script>
import TopTitle from '../components/top_Title'
import dishInfo from './quote/components/dish_info'
import bottomTab from '../components/bottom_tab'
import klineOne from './quote/components/klineOne.vue'
import klineFive from './quote/components/klineFive.vue'
import klineDay from './quote/components/klineDay.vue'
import fens from './quote/components/fens.vue'
import light from './quote/components/light.vue'
import firstGuide from "./quote/firstGuide.vue"
import pro from '../assets/js/common.js'

import {
	mapMutations,
	mapActions
} from 'vuex'
import {
	Toast
} from 'mint-ui';

export default {
	name: "quote",
	components: {
		TopTitle,
		bottomTab,
		dishInfo,
		firstGuide,
		klineOne
	},
	data() {
		return {
			tabSelected: 'quote',
			oilList: ['国际原油', '布伦特原油', '小原油'],
			strategyList: [
				{
					name: '原油资讯',
					path: '/dd'
				}, 
				{
					name: '原油直播',
					path: '/dd'
				},
				{
					name: '原油合约',
					path: '/dd'
				},
			],
			chartsShow: false,
			chartsList: ['闪电图', '分时图', '1分钟', '5分钟', '日K'],
			tabList: ['商', '股', "汇", 'LIME', '率', 'BIT'],
			currentChartsNum: 0,
			showTip: false,
			CommodityList: ['期货名称', '最新价', '涨跌幅', '涨跌额', '买/卖'],
			marketList: [], //全部列表分类
			currentCheck: 0,
			currentChartsView: 'klineOne',
			chartsHight: 5.4,
			currentNo: '',
			showChart: false //是否画图

		}
	},
	components: {
		TopTitle,
		bottomTab,
		dishInfo,
		firstGuide,
		klineOne,
		klineFive,
		klineDay,
		fens,
		light
	},
	computed: {
		parameters() {
			return this.$store.state.market.Parameters;
		},
		quoteSocket() {
			return this.$store.state.quoteSocket;
		},
		jsonData() {
			return this.$store.state.market.jsonData;
		},
		jsonDataKline() {
			return this.$store.state.market.jsonDataKline;
		},
		go() {
			return this.$store.state.go;
		}
	},
	methods: {
		...mapActions([
			'initQuoteClient'
		]),
		toDetails: function(commodityNo, mainContract, exchangeNo, contrast) {
			this.$router.push({
				path: '/klineDetails',
				query: {
					'commodityNo': commodityNo,
					'mainContract': mainContract,
					'exchangeNo': exchangeNo,
					'contrast': contrast
				}
			});
		},
		changeCommodityNo: function(index) {
			this.currentCheck = 0;
			this.currentChartsNum = index;
		},
		changeTip: function() {
			this.showTip = !this.showTip;
		},
		getCommodityInfo: function() { //获取全部分类
			// const {account} = this.$store.state
			// if (!account.quoteStatus) return;

			pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
				if (res.success == true && res.code == 1) {
					this.marketList = res.data;
					this.$store.state.market.commodityOrder = res.data[0].list;
					this.currentNo = res.data[0].list[0].commodityNo;
					this.$store.state.market.currentNo = this.currentNo;
					//初始化行情
					if (this.$store.state.market.commodityOrder && this.$store.state.account.quoteStatus == false) {
						this.initQuoteClient();
						this.operateData();
					}
				}
			}).catch((err) => {
				Toast({
					message: err.data.message,
					position: 'bottom',
					duration: 2000
				});
			});
		},
		showKline: function(index, commodity) {
			this.$store.state.isshow.isklineshow = false;
			this.currentCheck = index;
			this.currentNo = commodity;
			this.$store.state.market.currentNo = commodity;
		},
		allowChart () {
			this.showChart = true
		},
		operateData: function(val) {
			//允许画图
			this.$store.state.isshow.isfensInit = false;
			//渲染画图
		},

		init () {
			this.currentNo = 'CL';
			if (this.$store.state.account.quoteStatus == false) {
				this.initQuoteClient();
				
			}
		}

	},
	created() {
		//获取所有合约
		
		
	},
	mounted() {
		this.init();
		setTimeout(() => {
			this.allowChart();
		}, 2000);
	},
	activated: function() {
		this.operateData()
		if (this.go) {
			this.$store.state.isshow.isklineshow = false;
			this.$store.state.market.Parameters = [];
			this.$store.state.market.commodityOrder = [];
			this.$store.state.market.commodityOrder = this.marketList[0].list;
			this.marketList[0].list.forEach((o, i) => {
				this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo + '"}}');
			});
		}



		this.$store.state.isshow.isfensshow = false;
		this.$store.state.isshow.isklineshow = false;
		this.$store.state.isshow.islightshow = false;

		// this.$store.state.isshow.isfensshow = false;
		// this.$store.state.isshow.isklineshow = false;
		// this.$store.state.isshow.islightshow = false;
		// this.$store.state.isshow.isfensInit = false;
	},
	
	filters: {
		fixNumTwo: function(num) {
			return num.toFixed(2);
		},
		fixNum: function(num, dotsize) {
			if (dotsize >= 4) dotsize = 4;
			return num.toFixed(dotsize);
		}
	},
	watch: {
		currentChartsNum: function(n, o) {
			this.$store.state.isshow.isklineshow = false;
			this.$store.state.market.Parameters = [];
			this.$store.state.market.commodityOrder = [];
			this.$store.state.market.commodityOrder = this.marketList[n].list;
			this.marketList[n].list.forEach((o, i) => {
				this.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + o.exchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + o.contractNo + '"}}');
			});
		},
		currentNo: function(n, o) {
			if (n != o) {
				this.parameters.forEach((t, i) => {
					if (t.CommodityNo == n) {
						this.$store.state.isshow.isfensshow = false;
						this.$store.state.isshow.isklineshow = false;
						this.$store.state.isshow.islightshow = false;
						this.$store.state.isshow.isfensInit = false;
						this.$store.state.market.currentdetail = t;
						return;
					}
				});
			}
		},
		parameters: function(n, o) {
			if (n && n.length == 1) {
				this.parameters.forEach((o, i) => {
					if (o.CommodityNo == this.currentNo) {
						this.$store.state.market.currentdetail = o;
						return;
					}
				});
			}
		},
	},

	beforeRouteLeave(to, from, next) {
		console.log(to)
		if (to.name === 'my') {
			// this.$store.state.isshow.isfensshow = false;
			// this.$store.state.isshow.isklineshow = false;
			// this.$store.state.isshow.islightshow = false;
			// this.$store.state.isshow.isfensInit = false;
			this.$store.state.isshow.isfensshow = false;
			this.$store.state.isshow.isklineshow = false;
			this.$store.state.isshow.islightshow = false;
			this.$store.state.isshow.isfensInit = false;
			this.$store.state.go = true
		}

		next()
	}
}
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
	opacity: 0;
}

#quote {
	width: 7.5rem;
	margin-top: 0.96rem;
	background-color: #fff;
}

.btn_box {
	@include flex(space-around);
	padding: 0.2rem 0;
	.btn {
		width: 2.1rem;
		height: 0.8rem;
		@include font($fs28, 0.8rem, $btn_bg_color);
		background-color: #f85959;
		border-radius: 0.1rem;
	}
}

.blockColor {
	width: 7.5rem;
	height: 0.16rem;
	background-color: #f4f5f6;
}

.charts_title {
	width: 100%;
	@include flex(flex-start);
	padding: 0 0.3rem;
	@include font($fs28, 0.8rem, #283835);
	border-bottom: solid 1px #d2dae7;
	li {
		width: 1rem;
		margin-right: 0.1rem;
		&.current {
			color: #f85959;
		}
	}
}
.contrast_wrap{
	padding: 0.2rem 0;
	.box{
		@include flex();
		@include font($fs28, 0.8rem, #222);
		.left{
			flex: 1;
			border-right: solid 1px #d2dae7;
		}
		.right{
			flex: 3
		}
		button{
			width: 5rem;
			height: 0.8rem;
			@include font($fs28, 0.8rem, $btn_bg_color);
			background-color: #f85959;
			border-radius: 0.1rem;
		}
	}
}
.strategy_wrap{
	width: 7.5rem;
	h2{
		@include font($fs28, 0.8rem, #222,left);
		padding: 0 0.3rem;
	}
}




.tab {
	width: 7.5rem;
	height: 1.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		width: 1rem;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		background-color: #eaeaea;
		color: #2b344a;
		font-size: 0.28rem;
		border-right: 1px solid #fff;
		&.current {
			color: #fff;
			background-color: #497df5;
		}
	}
}

.tips {
	background-color: #eaeaea;
	p {
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		color: #2b344a;
		font-size: 0.24rem;
	}
	li {
		text-align: left;
		text-indent: 1.5rem;
		color: white;
		line-height: 0.4rem;
		font-size: 0.24rem;
	}
}

.CommodityList {
	.listScoll {
		overflow-y: scroll;
		height: 8.45rem;
		.checked {
			background-color: #f7f7f7;
		}
	}
	.listName {
		height: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f7f7ff;
		span {
			font-size: 0.28rem;
			color: #2b344a;
			&:nth-child(1) {
				margin-left: 0.3rem;
				margin-right: 0.9rem;
			}
			&:nth-child(5) {
				/*margin-right: 0.3rem;*/
			}
		}
		i {
			display: inline-block;
			width: 1rem;
			height: 1rem;
			color: white;
			font-size: 0.3rem;
			line-height: 1rem;
			text-align: center;
		}
		.icon_buy {
			background-color: #ff576e;
		}
		.icon_sell {
			background-color: #14da8b;
		}
	}
	.toDetails {
		height: 0.8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.3rem;
		border-bottom: 1px solid #f7f7ff;
		span {
			color: #2b344a;
		}
	}
}

.KLinePic {
	height: 6.5rem;
	width: 100%;
	background-color: white;
}
</style>
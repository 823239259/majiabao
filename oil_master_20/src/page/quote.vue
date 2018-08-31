<template>
<div id="quote">
	<TopTitle title="原油行情">
		<span slot="my_right" class="header_icon reload_icon"></span>
	</TopTitle>
	<div class="btn_box">
		<button class="btn" v-for="(item, index) in oilList" :key="index" @click="chooseCommodityNo(item.commodityNo)">{{item.name}}</button>
	</div>
	<div class="blockColor"></div>
	<div class="chart_wrap">
		<ul class="charts_title">
			<li :class="{current: currentChartsView === item.type}" v-for="(item,index) in chartsList" @tap="chooseChart(item)" :key="index">{{item.name}}</li>
		</ul>
		<div class="charts_container">
			<components :is="currentChartsView" v-if="showChart"></components>
		</div>
	</div>
	<div class="dish_info_box">
		<dishInfo :currentDetail='this.currentdetail' v-if="showDish" />
	</div>
	
	<div class="blockColor"></div>
	<div class="contrast_wrap">
		<div class="box">
			<p class="left">对比合约</p>
			<p class="right">
				<button @click="switchKey('contrastNoShow')">点击添加行情</button>
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
	<div class="contrastNo_wrap" v-show="contrastNoShow">
		<ul class="contrastNo_list">
			<li class="contrastNo_item" v-for="(item, index) in contrastNoList" :key="index">
				<div class="info_inner">
					<p>{{item.CommodityName}}</p>
					<p>{{item.CommodityNo}}{{item.MainContract}}</p>
				</div>
				<div class="info_inner">
					<p>{{item.LastQuotation.LastPrice}}</p>
				</div>
				<div class="info_inner">
					<p :class="item.LastQuotation.ChangeValue > 0?'red': 'green'">{{item.LastQuotation.ChangeRate | fixNum}}%</p>
				</div>
				<div  class="info_inner">
					<img class="img" src="../assets/images/icons/jiahao.png" alt="">
				</div>
			</li>
			<li class="contrastNo_item" @click="switchKey('contrastNoShow')">
				<div class="info_inner">
					<img class="img" src="../assets/images/icons/shuangxia_icon.png" alt="">
				</div>
			</li>
		</ul>
	</div>
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
			oilList: [
				{
					name: '国际原油',
					commodityNo: 'CL'
				},
				{
					name: '布伦特原油',
					commodityNo: 'BRN'
				},
				{
					name: '小原油',
					commodityNo: 'QM'
				}
			],
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
			chartsList: [
				{
					name: '闪电图',
					type: 'light'
				},
				{
					name: '分时图',
					type: 'fens'
				},
				{
					name: '1分钟',
					type: 'klineOne'
				},
				{
					name: '5分钟',
					type: 'klineFive'
				},
				{
					name: '日K',
					type: 'klineDay'
				},
			],
			currentChartsNum: 0,
			showTip: false,
			marketList: [], //全部列表分类
			currentCheck: 0,
			currentChartsView: 'klineOne',
			chartsHight: 5.4,
			currentNo: '',
			contrastNoShow: false,

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
		go() {
			return this.$store.state.go;
		},
		showChart () { //控制chart显示
			return this.$store.state.isshow.showChart;
		},
		currentdetail () {
			return this.$store.state.market.currentdetail
		},
		showDish () {
			return this.$store.state.isshow.showDish;
		},
		contrastNoList () {
			return this.parameters.filter(item => item.CommodityNo !== this.currentNo)
		}
	},
	methods: {
		...mapActions([
			'initQuoteClient'
		]),
		init () {
			this.currentNo = 'CL';
			if (this.$store.state.account.quoteStatus == false) {
				this.initQuoteClient();
				
			}
		},
		chooseChart (item) {
			const {isshow} = this.$store.state;
			this.currentChartsView = item.type;
			// 切换组件重新画图初始化chart
			isshow.isklineshow = false;
			isshow.isfensshow = false;
			isshow.islight = false;
			switch (this.currentChartsView) {
				case 'klineOne':
					
					break;
				case 'klineFive':
					
					break;	
				case 'klineDay':
					
					break;	
				case 'fens':
					
					break;
				case 'light':
					
					break;		
				default:
					break;
			}
			
		},
		chooseCommodityNo (CommodityNo) {
			this.currentNo = CommodityNo;
		},
		switchKey (key) {
			this[key] = !this[key]
		}

	},
	created() {
		//获取所有合约
		this.init();
		
	},
	mounted() {
		console.log(3);
		
		// setTimeout(() => {
		// 	this.allowChart();
		// }, 2000);
	},
	activated: function() {
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
	},
	
	 filters:{
		fixNum (num, dotSize=2) {
			if(!num) return;
			if(dotSize >= 4) dotSize = 4;
			return num.toFixed(dotSize);
		},
  	},
	watch: {
		currentNo (n, o) {
			const {isshow} = this.$store.state;
			if (n != o && o != '') {
				this.$store.state.market.currentdetail = this.parameters.find(item => item.CommodityNo === n);
				this.$store.state.market.currentNo = n;
				//重新关闭所有 重新画图
				isshow.showChart = false;
				isshow.isklineshow = false;
				isshow.isfensshow = false;
				isshow.islight = false;
				setTimeout(() => {
					this.$store.state.isshow.showChart = true
				}, 10);
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
	padding-bottom: 1.16rem;
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
// .charts_container{
// 	height: 6.5rem
// }
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
.dish_info_box{
	height: 2.6rem
}
.contrastNo_wrap{
	position: fixed;
	bottom: 0;
	width: 7.5rem;
	z-index: 100;
}
.contrastNo_list{
	background-color: rgba(0, 0, 0, 0.6);
	.contrastNo_item{
		@include flex();
		padding: 0.1rem 0;
		height: 0.8rem;
		border-bottom: 1px solid #e8e8e8;
	}
	.info_inner{
		flex: 1;
		@include font($fs28,0.4rem,#fff);
		.img{
			width: 0.4rem;
			height: 0.4rem;
		}
	}
	
}
</style>
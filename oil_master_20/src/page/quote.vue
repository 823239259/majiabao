<template>
<div id="quote">
	<TopTitle title="原油行情">
		<!-- <span slot="my_right" class="header_icon reload_icon" ></span> -->
	</TopTitle>
	<div class="btn_box">
		<button :class="['btn',{'current_btn': currentNo == item.commodityNo}]" v-for="(item, index) in oilList" :key="index" @click="chooseCommodityNo(item.commodityNo)">{{item.name}}</button>
	</div>
	<div class="blockColor"></div>
	<div class="chart_wrap">
		<ul class="charts_title">
			<li :class="{current: currentChartsView === item.type}" v-for="(item,index) in chartsList" @tap="chooseChart(item)" :key="index">{{item.name}}</li>
		</ul>
		<div class="charts_container">
			<component :is="currentChartsView" v-if="showChart" test="ddd" she="4441"></component>
		</div>
	</div>
	<div class="dish_info_box">
		<dishInfo :currentDetail='currentdetail' v-if="showDish" />
	</div>
	
	<div class="blockColor"></div>
	<div class="contrast_wrap">
		<div class="box">
			<p class="left">对比合约</p>
			<p class="right">
				<button @click="showContrast">点击添加行情</button>
			</p>
		</div>
	</div>
	<div class="strategy_wrap">
		<h2>原油攻略</h2>
		<div class="btn_box">
			<button class="btn" v-for="(item, index) in strategyList" :key="index" @click="goto(item.path)">{{item.name}}</button>
			<button class="btn" @click="goto(pathId)">原油合约</button>
		</div>
	</div>
	<bottomTab :tabSelect="tabSelected"></bottomTab>
	<!-- 对比合约 -->
	<div class="contrastNo_wrap" v-show="contrastNoShow">
		<ul class="contrastNo_list">
			<li class="contrastNo_item" v-for="(item, index) in contrastNoList" :key="index" @click="addContrast(item.CommodityNo)">
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
					path: '/recommend/crude-oil'
				}, 
				{
					name: '原油直播',
					path: '/oil_online'
				},
				// {
				// 	name: '原油合约',
				// 	path: '/contract_item/8b17a25095394214a825536355b52449'
				// },
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
			id: {
				id1: 'fens',
				id2: 'volume'	
			},

		}
	},
	components: {
		TopTitle,
		bottomTab,
		dishInfo,
		klineOne,
		klineFive,
		klineDay,
		fens,
		light
	},
	computed: {
		pathId () {
			const idList = {
				'CL': '8b17a25095394214a825536355b52449',
				'BRN': '4c42983cba194db4b34cd798e820b306',
				'QM': '6f42afd430fe4183ba67b9ae21308454'
			}
			return `/contract_item/${idList[this.currentNo]}`
		},
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
		},
		jsonData(){
			return this.$store.state.market.jsonData;
		},
		isshow () {
			return this.$store.state.isshow
		}
	},
	methods: {
		...mapActions([
			'initQuoteClient'
		]),
		...mapMutations([
			'setfensoption', 
			'drawfens',
		]),
		init () {
			this.currentNo = 'CL';
			if (this.$store.state.account.quoteStatus == false) {
				this.initQuoteClient();
				
			}
		},
		goto (path) {
			this.$router.push({path:path})
		},
		chooseChart (item) {
			const {isshow} = this.$store.state;
			this.currentChartsView = item.type;
			// 切换组件重新画图初始化chart
			isshow.isklineshow = false;
			isshow.isfensshow = false;
			isshow.islightshow = false;
			isshow.iskline = false;
			isshow.isfens = false;
			isshow.islight = false;
			switch (this.currentChartsView) {
				case 'klineOne':
					isshow.iskline = true
					break;
				case 'klineFive':
					isshow.iskline = true
					break;	
				case 'klineDay':
					isshow.iskline = true
					break;	
				case 'fens':
					isshow.isfens = true
					break;
				case 'light':
					isshow.islightshow = false;
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
		},
		showContrast () {
			this.switchKey('contrastNoShow')
			this.getHistoryQuote()
		},
		getHistoryQuote () {
			this.parameters.forEach(item =>{
				let data = {
					Method: "QryHistory",
					Parameters:{
						ExchangeNo: item.ExchangeNo,
						CommodityNo: item.CommodityNo,
						ContractNo: item.MainContract,
						HisQuoteType: 0,
						BeginTime: "",
						EndTime: "",
						Count: 0
					}
				};
				this.quoteSocket.send(JSON.stringify(data));
			})
		},
		addContrast(index){
				if(this.currentChartsView != 'fens'){
					return Toast({message: '只能在分时添加对比', position: 'bottom', duration: 1500});
				}
				var currentOrderPrice, contrastOrderPrice, scale,isAdd;
				this.parameters.forEach((o, i) => {
					if(o.CommodityNo == index){
						if(o.check == 1) {
							isAdd = true
						}else{
							o.check = 1
						}
						
					}
				});
				if (isAdd) return;
				let color = ['#5ca1e6', '#d9b816', '#e66b2e', '#b673e6', '#d99a6c'];
				let arr = [];
				this.$store.state.market.scale = [];
				var time;
				this.parameters.forEach((o, i) => {
					if(o.check == 1){
						let price = [], len = '';
						let lens = this.jsonData[o.CommodityNo].Parameters.Data.length;
						//TODO
						time = this.jsonData[o.CommodityNo].Parameters.Data[lens - 1][0];
						contrastOrderPrice = this.jsonData[o.CommodityNo].Parameters.Data[lens - 1][1];//对比价格
						// console.log(time)
						this.jsonData[this.currentNo].Parameters.Data.forEach((j, h) => {
							price.push('');
							if(j[0] == time){
								currentOrderPrice = j[1]; //当前价格
							}
							// console.log(currentOrderPrice);
							
						});
						
						o.scale = parseFloat(contrastOrderPrice/currentOrderPrice).toFixed(10); //缩放比例
						this.jsonData[this.currentNo].Parameters.Data.forEach((j, h) => {
							this.jsonData[o.CommodityNo].Parameters.Data.forEach((v) => {
								if(j[0] == v[0]){
									price[h] = parseFloat(v[1]/o.scale); //重新赋值price
//									price.push(parseFloat(v[1]/o.scale).toFixed(this.orderTemplist[this.currentNo].DotSize));
								}
							});
						});
						// console.log(color[i - 1],i);
						
						let obj = {
							name: o.CommodityNo,
							type: 'line',
				            data: price,
				            lineStyle: {normal: {width: 1, color: color[i]}},
				            itemStyle: {normal: {color: color[i]}},
							symbolSize: 2,
						}
						arr.push(obj);
						let scale = {
							commodityNo: o.CommodityNo,
							scale: o.scale
						}
						this.$store.state.market.scale.push(scale);
					}
				});
				this.$store.state.market.contrastData = arr;
				this.setfensoption(arr);
				this.drawfens(this.id);
			},

	},
	created() {
		//获取所有合约
		this.init();
		
	},
	mounted() {
		
	},
	activated: function() {
		console.log(this.isshow)
		if (this.showChart) {
			if (this.isshow.isfens) {
				return this.isshow.isfensshow = true;
			}
			if (this.isshow.islight) {
				return this.isshow.islightshow = true;
			}
			if (this.isshow.iskline) {
				return	this.isshow.isklineshow = true;
			}
			
		}
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
				this.currentNo = this.$store.state.market.currentNo;
				//清空历史对比合约
				this.$store.state.market.contrastData = [];
				//清空parameters
				this.parameters.forEach((o, i) => {
					o.check = 0
				});
				//重新关闭所有 重新画图
				isshow.showChart = false;
				isshow.isklineshow = false;
				isshow.isfensshow = false;
				isshow.islightshow = false;
				// isshow.isfens = false;
				// isshow.isling = false;
				// isshow.islight = false;

				setTimeout(() => {
					this.$store.state.isshow.showChart = true
				}, 10);
				console.log(isshow);
				
			}
		},
		
	},
	beforeRouteEnter: (to, from, next) => {
         next(vm => {
             vm.$store.state.market.klineOne = {
				kId: "kline",
				volId: "kline_volume"
			 }
            // 通过 `vm` 访问组件实例
        })
    },
	beforeRouteLeave(to, from, next) {
		const {isshow} = this.$store.state;
		isshow.isklineshow = false;
		isshow.isfensshow = false;
		isshow.islightshow = false;
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
	padding: 0.96rem 0 1.16rem;
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
	.current_btn {
		color: #f85959;
		background-color: #fff;
		border: 1px solid #f85959;
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
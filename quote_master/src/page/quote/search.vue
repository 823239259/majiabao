<template>
	<div id="search">
		<mt-header title="搜索" fixed>
		 	   	<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="container">
			<div class="content_box">
				<h2 class="title">请输入行情名称</h2>
				<div class="search_ipt">
					<i></i>
					<input type="text" placeholder="搜索" v-model="searchVal" :class="{input_2:showCancel,input_1:!showCancel}"/>
					<span v-show="showCancel" @click="cancel">取消</span>
				</div>
			</div>
			
			<ul class="recominds" v-show="showRemind">
				<li v-for="(k,index) in recommendList" :style="{backgroundColor:nameColor[index]}" @click="chooseType(k.label)">{{k.label}}</li>
			</ul>
			<ul class="recomind" v-show="showResult">
				<!-- <li v-for="(k,index) in resultList" :style="{backgroundColor:nameColor[index]}" @tap="toQuoteDetails(k.CommodityNo, k.MainContract, k.ExchangeNo, k.contrast)">{{k.CommodityName}}</li> -->
				<li v-for="(k,index) in resultList" @tap="toQuoteDetails(k.CommodityNo, k.MainContract, k.ExchangeNo, k.contrast)" :key="index">{{k.CommodityName}}</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'search',
		components: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
		},
		data(){
			return{
				recommendList:[],
				searchVal:'',
				showCancel:false,
				totalList: [],
				resultList:[],
				showRemind:true,
				showResult:false,
				nameColor:["#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#9bbb58"]
			}
		},
		computed: {
		},
		watch: {
			searchVal:function(n,o){
				if(!n) return this.showCancel = false;
				this.showCancel = true;
				this.resultList = [];
				this.totalList.forEach((o, i) => {
					if(o.match(this.searchVal) != null){
						let obj = {};
						let arr = o.split(',');
						obj.CommodityName = arr[0];
						obj.CommodityNo = arr[1];
						obj.MainContract = arr[2];
						obj.ExchangeNo = arr[3];
						obj.isOptional = 0;
						this.resultList.push(obj);
					}
				});
				if(this.resultList.length>0){
					this.showRemind = false;
					this.showResult = true;
				}else{
					this.showRemind = false;
					this.showResult = false;
				}
			}
		},
		methods: {
			getRecommend: function(){
				pro.fetch('post', '/quoteTrader/getRecommend', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						this.recommendList = res.data;
					}
				}).catch((err) => {
					Toast({message: err.data.message, position: 'bottom', duration: 1000});
				});
			},
			toQuoteDetails: function(commodityNo, mainContract, exchangeNo, contrast){
				this.$store.state.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + exchangeNo + '","CommodityNo":"' + commodityNo + '","ContractNo":"' + contrast +'"}}');
				this.$router.push({path: '/klineDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
			},
			cancel:function(){
				this.searchVal = "";
				this.showRemind = true;
				this.showResult = false;
			},
			chooseType:function(label){
				this.searchVal = label;
			},
			goBack () {       
				window.history.length > 1
					? this.$router.go(-1)
					: this.$router.push('/')
			
			},
		},
		mounted: function(){
			//获取推荐
			this.getRecommend();
			//所有合约
			this.$store.state.market.markettemp.forEach((o,i) => {
				let str = o.CommodityName + ',' + o.CommodityNo + ',' + o.MainContract + ',' + o.ExchangeNo;
				this.totalList.push(str);
			});
		},
		activated: function(){
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#search{
		width: 7.5rem;
		background-color: #fff;
	}
	.container{
		margin-top: 0.98rem;
		padding: 0 0.3rem;
		.search_ipt{
			position: relative;
			// padding: 0 0.3rem;
			width: 100%;
			vertical-align: middle;
			// height: 1.2rem;
			// background-color: #e5f9f6;
			i{
				position: absolute;
				display: block;
				top: 50%;
				left: 0.2rem;
				transform: translateY(-50%);
				
				width: 0.4rem;
				height: 0.4rem;
				background: url(../../assets/images/account/search_icon.png) no-repeat;
				background-size: 0.4rem 0.4rem;
			}
			.input_1{
				// position: absolute;
				// top: 0.2rem;
				width: 100%;
				height: 0.8rem;
				// border: 0.01rem solid #bbf6ec;
				// border-radius: 0.3rem;
				background-color: #fff;
				text-indent: 0.8rem;
				vertical-align: middle;
			}
			.input_2{
				width: 70%;
				height: 0.8rem;
				background-color: #fff;
				text-indent: 0.8rem;
				vertical-align: middle;
			}
			span{
				width: 1.2rem;
				height: 0.8rem;
				display: inline-block;
				border-radius: 0.1rem;
				border: solid 0.02rem red;
				font-size: 0.28rem;
				text-align: center;
				line-height: 0.8rem;
				vertical-align: middle;
			}
		}	
		.recominds{
			width: 100%;
			padding: 0 0.3rem;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			li{
				text-align: center;
				line-height: 0.8rem;
				font-size: 0.24rem;
				color: #2b344a;
				width: 30%;
				height: 0.8rem;
				border-radius: 0.15rem;
				margin-right: 0.2rem;
				margin-top: 0.2rem;
			}
		}
		.recomind{
			width: 100%;
			// padding: 0 0.3rem;
			// display: flex;
			// justify-content: flex-start;
			// flex-wrap: wrap;
			li{
				text-align: left;
				line-height: 0.8rem;
				font-size: 0.3rem;
				color: #2b344a;
				// width: 1.84rem;
				// height: 0.8rem;
				// border-radius: 0.15rem;
				// margin-right: 0.4rem;
				// margin-top: 0.2rem;
			}
		}
	}
	.content_box{
		background-color: #eaeaea;
		padding: 0.3rem;
		h2{
			@include font($fs28,0.88rem,#333,left);

		}
	}
	
</style>
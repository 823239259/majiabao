<template>
	<div id="search">
		<mt-header title="搜索" fixed>
		 	<router-link to="/quote" slot="left">
		 	   	<mt-button icon="back" ></mt-button>
		 	</router-link>
		</mt-header>
		<div class="container">
			<div class="search_ipt">
				<i></i>
				<input type="text" placeholder="搜索" v-model="searchVal" :class="{input_2:showCancel,input_1:!showCancel}"/>
				<span v-show="showCancel" @click="cancel">取消</span>
			</div>
			<div class="recomind">
				<li v-for="(k,index) in recommendList" :style="{backgroundColor:nameColor[index]}" @click="toQuoteDetails(k.CommodityNo, k.MainContract, k.ExchangeNo, k.contrast)">{{k.label}}</li>
			</div>
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
		},
		data(){
			return{
				recommendList:[],
				searchVal:'',
				showCancel:false,
				nameColor:["#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#e18683","#9bbb58","#f44234","#94cdde","#03a2dc","#9bbb58"]
			}
		},
		computed: {
		},
		watch: {
			searchVal:function(n,o){
				if (n!=undefined || n!='') {
					this.showCancel = true
				}else{
					this.showCancel = false
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
				console.log(commodityNo,mainContract,exchangeNo,contrast)
				this.$router.push({path: '/quoteDetails', query: {'commodityNo': commodityNo, 'mainContract': mainContract, 'exchangeNo': exchangeNo, 'contrast': contrast}});
			},
			cancel:function(){
				this.showCancel = false
			}
		},
		mounted: function(){
			//获取推荐
			this.getRecommend();
		},
		activated: function(){
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#search{
		width: 7.5rem;
		background-color: #E5F9F6;
	}
	.container{
		margin-top: 0.98rem;
		.search_ipt{
			position: relative;
			padding: 0 0.3rem;
			width: 100%;
			height: 1.2rem;
			background-color: #e5f9f6;
			i{
				position: absolute;
				top: 0.4rem;
				left: 0.5rem;
				display: block;
				width: 0.4rem;
				height: 0.4rem;
				background: url(../../assets/images/account/search_icon.png) no-repeat;
				background-size: 0.4rem 0.4rem;
			}
			.input_1{
				position: absolute;
				top: 0.2rem;
				width: 6.9rem;
				height: 0.8rem;
				border: 0.01rem solid #bbf6ec;
				border-radius: 0.3rem;
				text-indent: 0.8rem;
			}
			.input_2{
				position: absolute;
				top: 0.2rem;
				width: 5.06rem;
				height: 0.8rem;
				border: 0.01rem solid #bbf6ec;
				border-radius: 0.3rem;
				text-indent: 0.8rem;
			}
			span{
				position: absolute;
				right: 0.3rem;
				top: 0.2rem;
				width: 1.6rem;
				height: 0.8rem;
				display: block;
				border-radius: 0.1rem;
				border: solid 0.02rem #bbf6ec;
				font-size: 0.28rem;
				text-align: center;
				line-height: 0.8rem;
			}
		}	
		.recomind{
			width: 100%;
			padding: 0 0.3rem;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			li{
				text-align: center;
				line-height: 0.8rem;
				width: 1.84rem;
				height: 0.8rem;
				border-radius: 0.15rem;
				margin-right: 0.4rem;
				margin-top: 0.2rem;
			}
		}
	}
	
</style>
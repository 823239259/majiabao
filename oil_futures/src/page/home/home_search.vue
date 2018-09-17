<template>
	<div id="search" :style="{height:clientHeight}">
		<mt-header title="搜索" fixed>
			<mt-button slot="left" icon="back" @click="goBack"></mt-button>
		</mt-header>
		<div class="container">
			<div class="search_ipt">
				<i></i>
				<input type="text" placeholder="搜索" v-model="searchVal" :class="{input_2:showCancel,input_1:!showCancel}"/>
				<span v-show="showCancel" @click="cancel">取消</span>
			</div>
			<div class="show_none" v-show="showResult">無</div>
		</div>
		<tips-float></tips-float>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import tipsFloat from '../../components/tipsFloat'
	export default {
		name: 'search',
		components: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			tipsFloat,
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
			 clientHeight () {
					return document.documentElement.clientHeight + 'px';
				}
		},
		watch: {
			searchVal:function(value){
				if(!value) {
					this.showResult = false;
					this.showCancel = false;
				}else{
					this.showCancel = true;
					this.showResult = true;
				}
				
				
			}
		},
		methods: {
			goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
			//history.go(-1);
			},
			cancel:function(){
				this.searchVal = "";
				this.showRemind = true;
				this.showResult = false;
			},
			chooseType:function(label){
				this.searchVal = label;
			}
		},
		mounted: function(){
		},
		activated: function(){
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#search{
		width: 7.5rem;
		padding-top: 0.98rem;
	}
	.container{
		// margin-top: 0.98rem;
		.search_ipt{
			position: relative;
			padding: 0 0.3rem;
			width: 100%;
			height: 1.2rem;
			background-color: #344a65;
			// border-bottom: 1px solid #d2dae7;
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
				// border: 0.01rem solid #d2dae7;
				border-radius: 0.08rem;
				text-indent: 0.8rem;
				background-color: #162336;
				color: #fff;
			}
			.input_2{
				position: absolute;
				top: 0.2rem;
				width: 5.06rem;
				height: 0.8rem;
				// border: 0.01rem solid #d2dae7;
				border-radius: 0.3rem;
				text-indent: 0.8rem;
				color: #fff;
				background-color: #162336;
			}
			span{
				position: absolute;
				right: 0.3rem;
				top: 0.2rem;
				width: 1.6rem;
				height: 0.8rem;
				display: block;
				border-radius: 0.1rem;
				border: solid 0.02rem #d2dae7;
				font-size: 0.28rem;
				text-align: center;
				line-height: 0.8rem;
				color: #fff;
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
.show_none{
	@include font(0.9rem,0.9rem,#ccc);
	padding-top: 4rem;







}	
</style>
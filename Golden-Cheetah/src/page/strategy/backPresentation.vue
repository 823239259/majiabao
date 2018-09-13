<template>
	<div id="backPresentation">
		<TopTitle :title="strategyName" type="back" />
		<!-- <mt-header :title="strategyName" fixed style="background-color:#b3daff;font-size: 0.32rem;height: 1rem;;line-height: 1rem;">
		 	<mt-button slot="left" icon="back" @click="backRounter"></mt-button>
		</mt-header> -->
		<div id="container">
			<div class="tab">
				<template v-for="(v, index) in tabList" >
					<span :class="{current: currentNum == index}" @click="switchover(index)">{{v}}</span>
				</template>
			</div>
			<div class="cont" v-if="fatherFirst">
				<components :is="currentView"></components>
			</div>
		</div>
	</div>
</template>

<script>
	import TopTitle from '../../components/top_Title'
	import presentation from "./presentation.vue"
	import backDetails from "./backDetails.vue"
	import backHistory from "./backHistory.vue"
	export default{
		name:"backPresentation",
		components:{
			presentation,
			backDetails,
			backHistory,
			TopTitle
		},
		data(){
			return{
				tabList:["回测报告","回测详情"],
				currentNum:0,
				resArr:"",
				currentView:'presentation',
				backtestIndexMsg:"",
				fatherFirst: false,
				strategyName:""
			}
		},
		computed:{
			backtestIndexArr:function(){
				return this.$store._modules.root.state.account.backtestIndexArr
			}
		},
		methods:{
			switchover:function(index){
				this.currentNum = index;
				switch (index){
					case 0:
						this.currentView = 'presentation';
						break;
					case 1:
						this.currentView = 'backDetails';
						break;
					case 2:
						this.currentView = 'backHistory';
						break;
					default:
						break;
				}
			},
			backRounter:function(){
				this.$router.go(-1);
			}
		},
		activated:function(){
			this.currentNum = 0;
			this.currentView = 'presentation';
			if(this.backtestIndexArr) this.fatherFirst = true
			this.strategyName = this.$route.query.strategyName;
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#backPresentation{
		width:7.5rem;
	}
	#back{
		display: inline-block;
		width: 0.64rem;
		height: 1rem;
		background: url(../../assets/images/quote/back_icon.png) no-repeat 0.15rem 0.34rem;
		background-size: 0.24rem 0.32rem;
		margin-top: 0.34rem;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		.tab{
			padding: 0 0.3rem;
			width: 100%;
			display: flex;
			text-align: center;
			height:0.9rem;
			span{
				flex: 1;
				// width: 1.2rem;
				// margin-right: 0.3rem;	
				line-height: 0.9rem;
				&.current{
					border-bottom: 1px solid #f85959;	
					color: #f85959;
				}
			}
		}
	}
</style>
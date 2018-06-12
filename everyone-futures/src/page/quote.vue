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
	import guzhi from "./quote/guzhi.vue"
	import commodity from "./quote/commodity.vue"
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
				currentView:guzhi
			}
		},
		computed:{
			
		},
		methods:{
			...mapActions([
				'initQuoteClient'
			]),
			changeTab:function(index){
				this.currentNM = index ;
			}
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
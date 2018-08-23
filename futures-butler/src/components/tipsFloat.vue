<template>
	<div class="tips_wrap">
		<div class="flex flexBack" v-if="isBack">
			<div class="floatTips1" @click="goBack">
				<span class="back_icon"></span>
			</div>
		</div>
		<div class="flex" v-else>
			<div class="right_box">
				<transition name="custom-classes-transition"
    				enter-active-class="animated fadeInUp"
    				leave-active-class="animated fadeOutDown" 
					>	
					<ul v-show="showTools">
						<!-- <li class="item" v-for="(item, index) in toolsList" :key="item.name" :style="{'margin-left':marginLeft(index,toolsList,'-0.16')}" @click="itemClick(item)">{{item.name}}</li> -->
						<li class="item" v-for="(item, index) in toolsList" :key="item.name" @click="itemClick(item)">{{item.name}}</li>
					</ul>
				</transition>
				<!-- <div class="floatTip">
					<div class="floatTips" @click="show('showTools')">
						<span>+</span>
					</div>
				</div> -->
				
			</div>
		</div>
		
	</div>
</template>

<script>
import pro from '../assets/js/common'
	export default{
		name:"tipsButton",
		props:['isBack'],
		mixins:[pro.mixinsToCustomer],
		data(){
			return{
				toolsList: [
					{
					name: '外汇',
					path: '/type?type=外汇'
					},
					{
						name: '股指期货',
						path: '/type?type=股指期货'
					},
					{
						name: '数值货币',
						path: '/type?type=数值货币'
					},
					{
						name: '商品',
						path: '/type?type=商品'
					},
					{
						name: '利率期货',
						path: '/type?type=利率期货'
					},
					{
						name: 'LME金属',
						path: '/type?type=LME金属'
					},
				],
				showMy: false,
				showTools: true,
				
			}
		},
		methods:{
			goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
			marginLeft (index,arr,spaceNum) {
				let length = arr.length;
				//得到平均数
				let averageNum = (length+1)/2;
				let left = (index + 1 - averageNum)*spaceNum;
				if(spaceNum>0){
					left = left>0?-left:left
				}else{
					left = left>0?left:-left
				}
				return  left+'rem'
			},
			itemClick (item) {
				if(item.path) {
					this.$router.push({path: item.path})
				}
				if(item.method){
					console.log(item.method)
					this[item.method]()
				}
			},
			show (key) {
				this[key] = !this[key]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	.tips_wrap{
		position: fixed;
		//right: 0.5rem;
		bottom: 2.28rem;
		display: flex;
		width: 7.5rem;
		// height: 3.6rem;
		padding: 0 0.3rem;
	}
	.flex{
		display: flex;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		
	}
	.flexBack{
		justify-content: flex-end;
	}
	.left_box,.right_box{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.right_box{
		.floatTips{
			order: 1;
			background-color: #169781;
		}
		
	}
	.floatTip{
		width: 100%;
		
	}
	.floatTips{
		position: relative;
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		background-color: #41b5ff;
		border-radius: 50%;
		float: right;
		span{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate3d(-50%,-50%,0);
			@include font(0.6rem,0.6rem,#fff);
		}
		.back_icon{
			width: 0.29rem;
			height: 0.58rem;
			background: url('../assets/images/tools/icon_go_back.png') center no-repeat;
			background-size: 100%;
		}
	}
	
	ul{
		
		@include flex(space-around);
		flex-wrap: wrap;

	}
	.item{
		width: 1.84rem;
		height: 0.8rem;
		background-color: #2cc4aa;
		border-radius: 0.1rem;
		@include font($fs24,0.8rem,#fff);
		margin-bottom: 0.16rem
	}
	
</style>
<template>
	<div class="tips_wrap">
		<div class="flex flexBack" v-if="isBack">
			<div class="floatTips1" @click="goBack">
				<span class="back_icon"></span>
			</div>
		</div>
		<div class="flex" v-else>
			<div class="left_box">
				<div class="floatTips" @click="show('showMy')">
					<span>+</span>
				</div>
				<transition name="custom-classes-transition"
    				enter-active-class="animated fadeInRight"
    				leave-active-class="animated fadeOutRight" 
					
					>	
					<ul v-show="showMy">
						<li class="item" v-for="(item, index) in myList" :key="item.name" :style="{'margin-left':marginLeft(index,myList,'0.16')}" @click="itemClick(item)">{{item.name}}</li>
					</ul>
				</transition>
				
			</div>
			<div class="right_box">
				<div class="floatTips" @click="show('showTools')">
					<span>+</span>
				</div>
				<transition name="custom-classes-transition"
    				enter-active-class="animated fadeInLeft"
    				leave-active-class="animated fadeOutLeft" 
					>	
					<ul v-show="showTools">
						<li class="item" v-for="(item, index) in toolsList" :key="item.name" :style="{'margin-left':marginLeft(index,toolsList,'-0.16')}" @click="itemClick(item)">{{item.name}}</li>
					</ul>
				</transition>
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
				myList: [{
					name: '客服',
					path: '/service_online'
				},
				{
					name: '帮助',
					path: '/help_docs'
				},
				{
					name: '工具箱',
					path: '/datas'
				},
				{
					name: '分享',
					method: 'shareSystem'
				},
				{
					name: '意见反馈',
					path: '/feedback'
				}],
				toolsList: [{
					name: '合约',
					path: '/tools_item/3'
					},
					{
						name: '算价格',
						path: '/tools_item/2'
					},
					{
						name: '算汇率',
						path: '/tools_item/1'
					},
				],
				showMy: false,
				showTools: false,
				
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
					this[item.method]
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
		bottom: 0.28rem;
		display: flex;
		width: 7.5rem;
		height: 3.6rem;
		padding: 0 0.3rem;
	}
	.flex{
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		
	}
	.flexBack{
		justify-content: flex-end;
	}
	.left_box,.right_box{
		flex: 1;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.right_box{
		justify-content: flex-end;
		.floatTips{
			order: 1;
			background-color: #f06c14;
		}
		.item{
			background-color: #f06c14;
		}
	}
	.floatTips,.floatTips1{
		position: relative;
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		background-color: #41b5ff;
		border-radius: 50%;
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
	.floatTips1 {
		background-color: #f06c14;	
	}
	ul{
		padding-left: 0.24rem; 
	}
	.item{
		width: 1.4rem;
		height: 0.56rem;
		margin-bottom: 0.16rem;
		background-color: #41b5ff;
		border-radius: 0.1rem;
		@include font($fs24,0.56rem,#fff);
	}
	
</style>
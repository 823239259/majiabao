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
						<li class="item" v-for="(item, index) in toolsList" :key="item.name"  @click="itemClick(item)">{{item.name}}</li>
					</ul>
				</transition>
				<div class="floatTips" @click="show('showTools')">
					<span>+</span>
				</div>
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
						name: '首页',
						path: '/home'
					},
					{
						name: '行情',
						path: '/quote'
					},
					{
						name: '工具',
						path: '/discover'
					},
					{
						name: '资讯',
						path: '/news_details/1'
					},
					{
						name: '客服',
						path: '/service_online'
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
		bottom: 1.28rem;
		right: 0.3rem;
		display: flex;
		padding: 0 0.3rem;
		z-index: 10;
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
		flex-direction: column;
	}
	.right_box{
		justify-content: flex-end;
		.floatTips{
			background-color: #127c8d;
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
		background-color: #5534ff;	
	}
	
	.item{
		width: 0.8rem;
		height: 0.8rem;
		background-color: #40a9e6;
		margin-bottom: 0.16rem;
		border-radius: 50%;
		@include font($fs24,0.8rem,#fff);
	}
	@for $i from 1 through 5 {
      $background_color: (#40a9e6, #e3b18f, #f2a0b6, #7ea8cf,#70baba);
      .item:nth-child(#{$i}) {
       
          $bg: nth($background_color, $i);
          background-color: $bg;
          
        
      }
    }

	
</style>
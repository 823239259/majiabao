<template>
	<div class="unableShow">
		<p class="msg">{{msg}}</p>
		<div class="btn_group">
			<button @click="handleClick1">{{btnList[0]}}</button>
			<button @click="handleClick2">{{btnList[1]}}</button>
		</div>
	</div>
</template>

<script>
import pro from '../assets/js/common'
	export default{
		name:"unableShow",
		props: {
			msg: {
				type: String,
				default: '您尚未登录，暂无数据'
			},
			btnList: {
				type: Array,
				default: function () {
					return ['登录', '注册']
				}  
			},
			method: {
				type: Function
			}
		},
		mixins:[pro.mixinsToCustomer],
		data(){
			return{
			}
		},
		methods:{
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
			},
			handleClick1 () {
				this.method('/login')
			},
			handleClick2 () {
				this.method('/register')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	.unableShow{
		width: 7.5rem;
		padding-top: 0.5rem;
	}
	.msg{
		width: 100%;
		@include font(0.3rem,0.56rem,#8f94a7)
	}
	.btn_group{
		text-align: center;
		button{
			width: 1.6rem;
			height: 0.8rem;
			background-color: #8f94a7;
			border-radius: 0.1rem;
			@include font(0.28rem,0.8rem,#FFF)
		}
		button:first-child{
			margin-right: 0.3rem;
		}
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
			background-color: #5534ff;
		}
		
	}
	.floatTips,.floatTips1{
		position: relative;
		display: block;
		width: 1.2rem;
		height: 1.2rem;
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
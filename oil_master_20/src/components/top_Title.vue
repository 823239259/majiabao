<template>
	<div id="loginHeader">
		<mt-header :fixed='fixed' :title="title">
		<mt-button v-if="type==='back'" icon="back" slot="left" @click="goBack"></mt-button>
		<mt-button v-else slot="left">
			<slot name="my_left"></slot>
		</mt-button>
		<!-- <mt-button slot="left" >
			<span class="header_icon customer_icon" ></span>
		</mt-button> -->
		<mt-button slot="right" >
			<slot name="my_right"></slot>
		</mt-button>
		</mt-header>
	</div>
</template>

<script>
	export default{
		name:"loginHeader",
		props: {
			title: {
				type: String,
				required: true
			},
			type: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: true
			},
		},
		data(){
			return{
				
			}
		},
		methods:{
			goBack () {       
				window.history.length > 1? this.$router.go(-1): this.$router.push('/')
			},  
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#loginHeader{
		width: $w;
		position: fixed;
		top: 0;
		z-index: 1;
	}
	#container{
		height: 0.96rem;
		background-color: $headColr;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		h1{
			color: $blcakThin;
			font-size: 0.36rem;
		}
		.account{
			display: inline-block;
			width: 0.64rem;
			height: 0.64rem;
			background: url(../assets/images/account/account_user.png) no-repeat 100% 50%;
			background-size: 0.32rem 0.32rem;
		}
		.online{
			display: inline-block;
			width: 0.64rem;
			height: 0.64rem;
			background: url(../assets/images/account/account_online.png) no-repeat 0 50%;
			background-size: 0.32rem 0.32rem;
		}
		.back{
			display: inline-block;
			width: 2rem;
			height: 0.64rem;
			background: url(../assets/images/account/icon_back.png) no-repeat 15% 50%;
			background-size: 0.16rem 0.32rem;
		}
		.span_color{
			font-size: $fs28;
			color: $bg;
			padding-right: 0.3rem;
			width: 2rem;
			text-align: right;
		}
		.iconRight{
			width: 2rem;
		}
	}
	
</style>
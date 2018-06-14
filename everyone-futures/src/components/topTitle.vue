<template>
	<div id="loginHeader">
		<div id="container">
			<i :class="type == 1 ? 'account' : 'back'" @click="toNext(type)"></i>
			<h1>{{title}}</h1>
			<i class="online" @click="toRight" v-if="type1 == '1'"></i>
			<span class="span_color" v-else-if="type1 == '0' " @click="toRight()">我的跟投</span>
			<i v-else-if="type1 == '2' " class="iconRight"></i>
		</div>
	</div>
</template>

<script>
	export default{
		name:"loginHeader",
		props:['title',"type","type1",'matchid'],
		data(){
			return{
				
			}
		},
		methods:{
			toNext(type){
				if(type == 1){
					this.$router.push({path:"/my"})
				}else{
					this.$router.back(-1)
				}
			},
			toRight(){
				if(this.type1 == "1"){
					this.$router.push({path:"/customer_online"});
				}else{
					this.$router.push({path:"/mineGt",query:{matchId:this.matchid}});
				}
			}
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
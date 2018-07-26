<template>
	<div id="alertMessage">
		<div class="alert_wrap">
			<template v-if="myType==1">
				<div class="content_box">
					<span class="icon"></span>
					<p class="content">{{typeText}}</p>
				</div>
				<button class="btn" @click="clickHandle">我知道了</button>
			</template>
			<template v-else>
				<div class="content_box">
					<span class='close' @click="closeHandle"></span>
					<span class="icon"></span>
					<p class="text">签到成功</p>
					<p class="content">获得1个管家币,已累计签到<span class="color1">{{text}}</span>天</p>
				</div>
			</template>
			
		</div>
		
	</div>
</template>

<script>
	export default{
		name:"AlertMessage",
		props:{
			comfirm: Function,
			text: [String, Number],
			type: Number
		},
		data(){
			return{
				isShow: false,
				myType: this.type
			}
		},
		computed: {
			typeText () {
				return typeof this.text === 'number'?`再签${7 - this.text}天有礼`:this.text
			}
		},
		methods:{
			clickHandle () {
				this.comfirm()
			},
			closeHandle () {
				this.myType = 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#alertMessage{
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		background-color: rgba(0,0,0,0.4);
	}
	.alert_wrap{
		width: 6.12rem;
		background-color: #ffffff;
		border-radius: 0.2rem;
		text-align: center;
		
	}
	.content_box{
		position: relative;
		border-bottom: 1px solid #d5d6d8;
	}
	.close{
		position: absolute;
		right: 0;
		top: 0;
		display: inline-block;
		width: 0.8rem;
		height: 0.8rem;
		background: url('../assets/images/home/close.png') center no-repeat;
		background-size: 0.3rem 0.3rem;
		
	}
	.icon{
		display: inline-block;
		width: 1rem;
		height: 1rem;
		background: url('../assets/images/home/alert_icon.png') center no-repeat;
		background-size: cover;
		margin: 0.48rem 0 0 0; 
	}
	.content{
		
		@include font(0.28rem,0.88rem,#283835)	
	}
	.btn{
		width: 100%;
		background-color: #ffffff;
		@include font(0.36rem,0.88rem,#169781);
		border-radius: 0.2rem;
	}
	.text{
		@include font(0.36rem,0.88rem,#169781);
	}
	.color1{
      color: #de8c22;
      padding: 0 0.1rem;
    }
</style>
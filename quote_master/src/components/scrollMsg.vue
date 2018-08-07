<template>
	<div id="scroll_msg">
		
			<transition-group name="slide-fade" tag="div" class="msg_box">
				<div class="quote_wrap" v-show="index===currentIndex" v-for="(item, index) in msgList" :key="index">
					<div class="left_box">{{item.name}}</div>
					<div class="numbers red">{{item.lastPrice}}</div>
					<div class="numbers">{{item.ChangeValue}}</div>
					<div class="numbers green">{{item.ChangeRate}}</div>
				</div>
			</transition-group>
			
		
		
		
	</div>
</template>

<script>
	export default{
		name:"scrollMsg",
		props:['title',"type","type1",'matchid'],
		data(){
			return{
				currentIndex: 1,
				msgList:[
					{
						name: '国际原油',
						lastPrice: 65.55,
						ChangeValue: 2.11,
						ChangeRate: '1.11%'
					},
					{
						name: '国际原油123',
						lastPrice: 65.55,
						ChangeValue: 2.11,
						ChangeRate: '1.11%'
					},
					{
						name: '国际原油123',
						lastPrice: 65.55,
						ChangeValue: 2.11,
						ChangeRate: '1.11%'
					},
					{
						name: '国际原油123',
						lastPrice: 65.55,
						ChangeValue: 2.11,
						ChangeRate: '1.11%'
					},
					{
						name: '国际原油123',
						lastPrice: 65.55,
						ChangeValue: 2.11,
						ChangeRate: '1.11%'
					},

				]
			}
		},
		methods:{
			scrollContent () {
				let totalNumber = this.msgList.length;
				setInterval(()=>{
					if (this.currentIndex<totalNumber-1) {
						this.currentIndex++;
					}else{
						this.currentIndex = 0;
					}
					

				},5000)
				
			}
			
		},
		mounted () {
			this.scrollContent()
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	
	#scroll_msg {
		width: 7.5rem;
		height: 0.6rem;
		background-color: $masterBg;
		overflow: hidden;
	}
	.msg_box {
		position: relative;
		
	}
	.quote_wrap{
		width: 7.5rem;
		padding: 0 0.3rem;
		@include flex(space-between);
		@include font($fs30,0.6rem,#9597a3,left);
		background-color: #383b4e;
		.left_box{
		flex: 3
		}
		.numbers{
		flex: 1;
		}
	}
	.slide-fade-enter-active {
		transition: all 1s ease;
	}
	.slide-fade-leave-active {
		//position: absolute;
		transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to {
		transform: translateX(10px);
		opacity: 0;
	}
</style>
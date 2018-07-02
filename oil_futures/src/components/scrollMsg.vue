<template>
	<div id="scroll_msg">
		
			<transition-group name="slide-fade" tag="div" class="msg_box">
				<p class="msg_text" v-show="index===currentIndex" v-for="(item, index) in msgList" :key="item">{{index+1}}. {{item}}</p>
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
				msgList: ['澳洲联储公布5月货币政策会议纪要','4月社会消费品零售品总额同比', '欧洲央行管委Villeroy发表讲话', '石油与美元齐飞 秋水共长天一色', '季节性增产周期到来 棕榈油谨慎看多', '鸡蛋现货小幅上涨，期货震荡调整']
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
	#loginHeader{
		width: $w;
		position: fixed;
		top: 0;
		z-index: 1;
	}
	#scroll_msg {
		width: 7.5rem;
		height: 0.8rem;
		background-color: $bgWhite;
		overflow: hidden;
		border-bottom: 1px solid #bbf6ec;
	}
	.msg_box {
		position: relative;
		
	}
	.msg_text{
		padding: 0 0.32rem;
		@include font($fs28,0.8rem,$blackNormal,left);

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
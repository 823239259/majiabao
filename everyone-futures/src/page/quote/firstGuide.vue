<template>
	<div id="firstGuide">
		<div class="shade"></div>
		<div class="img img_one current" @tap="tapEvent"><img src="../../assets/images/help_01.png"/></div>
		<div class="img img_two" @tap="tapEvent"><img src="../../assets/images/help_02.png"/></div>
		<div class="img img_two" @tap="tapEvent"><img src="../../assets/images/help_03.png"/></div>
		<div class="img img_two" @tap="tapEvent"><img src="../../assets/images/help_04.png"/></div>
		<div class="img img_two" @tap="tapEvent"><img src="../../assets/images/help_05.png"/></div>
		<div class="img img_two" @tap="tapEvent"><img src="../../assets/images/help_06.png"/></div>
	</div>
</template>

<script>
	export default{
		name:"firstGuide",
		data(){
			return{
				
			}
		},
		methods:{
			tapEvent: function(e){
				var index = $(e.currentTarget).index();
				$(e.currentTarget).removeClass('current').next().addClass('current');
				if(index == 6){
					var a = {id:true};
					localStorage.setItem("showGuide",JSON.stringify(a));
					this.$store.state.account.isShowGuide = true;
				}
			}
		},
		mounted: function(){
			document.getElementById("firstGuide").addEventListener('touchmove', function(e){
				e.preventDefault();
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.shade{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1112;
	background: #000;
	opacity: 0.7;			
}
.img{
	position: absolute;
	z-index: 1115;
	display: none;
	&.current{
		display: inline;
	}
}
</style>
<template>
	<div id="echarts">
		<div id="light"></div>
	</div>
</template>

<script>
	import { mapMutations,mapActions } from 'vuex'
	export default{
		name: 'echarts',
		data(){
			return{
				id: 'light'
			}
		},
		computed: {
			quoteSocket(){
				return this.$store.state.quoteSocket;
			},
			currentdetail(){
				return this.$store.state.market.currentdetail;
			}
		},
		methods: {
			...mapMutations([
				'drawlight',
				'setlightDate'
			])
		},
		mounted: function(){
			this.$store.state.isshow.islightshow = false;
			this.$store.state.isshow.islight = true;
			this.$store.state.market.lightChartTime.time = [];
			this.$store.state.market.lightChartTime.price = [];	
			setTimeout(function(){
				this.setlightDate();
				this.drawlight(this.id);
			}.bind(this),100)
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#light{
		width: 100%;
		height: 3.7rem;
	}
</style>
<template>
	<div id="type">
		<mt-header :title="type" fixed>
		 	<router-link to="" slot="left">
		 	   	<mt-button icon="back" ></mt-button>
		 	</router-link>
		</mt-header>
		<div class="container">
			<ul>
				<li>
					<i>NG</i>
				</li>
				<li>
					<p>天然气</p>
					<p>价格：<span>2.53135</span></p>
				</li>
				<li>
					<p>涨跌：<span>.2002</span></p>
				</li>
				<li>
					<i>收藏</i>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	export default{
		name:"",
		data(){
			return{
				type:''
			}
		},
		computed:{
			parameters(){
				return this.$store.state.market.Parameters;
			},
		},
		methods:{
		},
		mounted: function(){
		},
		activated:function(){
			this.type = this.$route.query.type;
			console.log(this.type)
		},
		created () {
		}
	}
</script>


<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#type{
		width: 7.5rem;
	}
	.container{
		margin-top: 1rem;
		ul{
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 0 0.3rem;
			align-items: center;
			height: 1.36rem;
		}
	}
</style>
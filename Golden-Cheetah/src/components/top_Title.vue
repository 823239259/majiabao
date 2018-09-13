<template>
	
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
	
	
</style>
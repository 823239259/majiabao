<template>
	<div>
		<div>
			<iframe  id="iframe1" target="_parent" src="http://www.duokongtai.com/html/1/191/index.html" frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
		</div>
		<div class="iframe-wrap" :style="{height:iframeHeight}">
			<iframe  id="iframe2" :class="{'inherit-height':!isIphone}" src="http://www.duokongtai.com/html/1/189/index.html" frameborder="0" :scrolling="isIphone?'no':'yes'" ></iframe>
			<!-- <iframe  id="iframe2"  src="http://www.duokongtai.com/html/1/189/index.html" frameborder="0"  :scrolling="isIphone" ></iframe> -->
		</div>
		
		
	</div>
</template>

<script>
	export default {
		name: "focusNews",
		data() {
			return {
				tabSelected: 'discover',
				selected: "1",
				infoArr:[{title:"比特币再现巨大跌幅，自高位跌去七成 这次还能爬起来吗？",time:"2018-02-10",imgurl:require("../../assets/images/discover/important_1.jpg"),id:"1"},
				{title:"美股暴跌的原因猜想：这次可能没法指望美联储了",time:"2018-02-09",imgurl:require("../../assets/images/discover/important_2.jpg"),id:"2"},
				{title:"俄媒数据：中石油2017年海外油气开采量增17.2%",time:"2018-02-08",imgurl:require("../../assets/images/discover/important_3.jpg"),id:"3"},
				{title:"钢材总库存处于低位，沪钢稳居3900元/吨之上",time:"2018-02-05",imgurl:require("../../assets/images/discover/important_4.jpg"),id:"4"},
				{title:"铜业公司业绩喜人，铜市有望进入“长牛”",time:"2018-02-03",imgurl:require("../../assets/images/discover/important_5.jpg"),id:"5"}],
			}
		},
		computed: {
			iframeHeight () {
				const ratio = parseFloat(document.documentElement.style.fontSize)
				// return (document.documentElement.clientHeight - (2.4+0.98+0.96)*ratio) 
				return (document.documentElement.clientHeight - (2.4+0.98+0.96)*ratio) + 'px'
			},
			isIphone () {
				const isIphone = window.navigator.userAgent.toLowerCase().indexOf('iphone');
				console.log(window.navigator.userAgent.toLowerCase())
				return isIphone>-1
			}
		},
		methods: {
			goto(...pathObj) {
				if (pathObj.length == 1) {
					this.$router.push({
						path: pathObj[0]
					})
				} else if (pathObj.length == 2) {
					this.$router.push({
						path: pathObj[0],
						query: {
							id: pathObj[1].id,
							title: pathObj[1].title,
							time: pathObj[1].time
						}
					})
				}
			},			
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.swipe_wrap {
		width: 7.5rem;
		height: 2.4rem;
		padding: 0.3rem 0.3rem 0;
		box-sizing: content-box;
	}
	
	.news_list {
		.item {
			@include flex(space-between);
			padding: 0.3rem;
			border-bottom: 1px solid $bgDeep;
			.img {
				width: 1.2rem;
				height: 1.2rem;
				margin-right: 0.3rem;
			}
			p {
				@include font($fs28, 0.44rem, $blcakThin, left);
			}
			.time {
				@include font($fs24, 0.46rem, $grayMiddle, left);
			}
		}
	}
	#iframe1{
		width: 1px;
		min-width: 100%;
		*width: 100%;
		height: 2.4rem;

	}
	#iframe2 {
		width: 1px;
		min-width: 100%;
		*width: 100%;
	}
	.iframe-wrap{
		-webkit-overflow-scrolling: touch;
		overflow: scroll;
		&::-webkit-scrollbar {display:none}
	}
	.inherit-height{
		height: inherit
	}
</style>
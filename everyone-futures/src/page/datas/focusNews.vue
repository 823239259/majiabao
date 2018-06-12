<template>
	<div>
		<div class="swipe_wrap">
			<mt-swipe>
				<mt-swipe-item>
					<img src="../../assets/images/discover/solider_01.png" alt="01">
				</mt-swipe-item>
				<mt-swipe-item>
					<img src="../../assets/images/discover/solider_02.png" alt="02">
				</mt-swipe-item>
				<mt-swipe-item>
					<img src="../../assets/images/discover/solider_01.png" alt="03">
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div>
			<ul class="news_list">
				<li class="item" v-for="k in infoArr" @click="goto('/importantDetails',k)">
					<img class="img" :src="k.imgurl" alt="01">
					<div>
						<p>{{k.title}}</p>
						<p class="time">{{k.time}}</p>
					</div>
				</li>
			</ul>
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
		}
	
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
</style>
<template>
	<div id="datas" ref="viewBox"  :style="{height:clientHeight,overflow:'scroll'}" >
		<mt-header fixed title="数据">           
            <mt-button slot="left"  @click="goto('/help_info')">知识</mt-button>
            <mt-button slot="right" @click="shareSystem">分享</mt-button>
        </mt-header>
		<!-- 选项卡 -->
		<div class="tab_wrap">
			<div style="background-color:#cae5ff">
				<mt-navbar v-model="selected">
					<mt-tab-item id="1">7x24</mt-tab-item>
					<mt-tab-item id="2">金融事件日历</mt-tab-item>
					<!-- <mt-tab-item id="3">要闻</mt-tab-item> -->
				</mt-navbar>
			</div>
			

			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<!-- <transition-group name="custom-classes-transition"
    				enter-active-class="animated fadeInRight"
    				leave-active-class="animated fadeOutRight" 
					> -->
				<mt-tab-container-item id="1" :key="1">
					<discover7x24></discover7x24>
				</mt-tab-container-item>
				<mt-tab-container-item id="2" :key="2">
					<calendar-news :newDate ="newsDate"></calendar-news>
				</mt-tab-container-item>
		
				<!-- </transition-group> -->
			</mt-tab-container>


		</div>
		<bottomTab :tabSelect="tabSelected"></bottomTab>
		<tips-float></tips-float>
	</div>
</template>

<script>
	import bottomTab from "../components/bottom_tab"
	import discover7x24 from '../page/datas/discover7x24'
	import calendarNews from '../page/datas/calendarNews'
	import tipsFloat from '../components/tipsFloat'
	import pro from '../assets/js/common'

	export default {
		name: "datas",
		components: {
			bottomTab,
			discover7x24,
			calendarNews,
			tipsFloat,
			//focusNews
		},
		mixins:[pro.mixinsToCustomer],
		data() {
			return {
				tabSelected: 'datas',
				selected: "1",
				navCheck: 0,
				newsDate: '',
				value: null,
		      	value1: new Date(),
		      	startDate: new Date('2014'),
                endDate: new Date('2020-12-31'),
                datePosition: '',
                scrollY: 0,
			}
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
        },
		methods: {
			goto (...pathObj) {
				if (pathObj.length == 1) {
					this.$router.push({path:pathObj[0]})
				}else if (pathObj.length == 2) {
					this.$router.push({path:pathObj[0] ,query: {
						id:1,
						title:'比特币再现巨大跌幅，自高位跌去七成 这次还能爬起来吗？',
						time: '2018-02-10'
					}})
				}

			},
			toChooseDay (picker) {
				this.$refs[picker].open();
			},
			handleChange (value) {
				console.log(value)
				console.log(this.$pro.getDate(Date.parse(value),"y-m-d"))
				this.newsDate = this.$pro.getDate(Date.parse(value),"y-m-d");
            },
            getDatePosition (value) {
                this.datePosition = value
			},
		},
		watch: {
			selected (value) {
				if(value == 2) {
					//接受子组件的传值来进行定位
					let calendar_date = document.getElementsByClassName('calendar_date')[0]
                    this.$nextTick(()=>{
						//calendar_date.scrollLeft = this.datePosition
					})
				}
			}
        },
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#datas {
		width: $w;
		background-color: $bg;
		//-webkit-overflow-scrolling: touch;
		
		.mint-navbar .mint-tab-item.is-selected {
			margin: 0;
			border-bottom: 0.03rem solid $tabBgColor;
			color: $tabBgColor;
		}
		.mint-navbar .mint-tab-item{
			padding: 0.27rem;
			color: #333;
		}
		.mint-navbar .mint-tab-item:nth-child(1) {
			flex: 1;
		}
		.mint-navbar .mint-tab-item:nth-child(2) {
			flex: 2;
		}
		.mint-navbar {
			padding: 0 0.3rem;
		}
		

	}

	.icon_account,
	.icon_search,
	.icon_calendar {
		display: inline-block;
		width: 0.32rem;
		height: 0.32rem;
		background: url("../assets/images/account/account_user.png") center no-repeat;
		background-size: cover;
	}

	.icon_search {
		background: url("../assets/images/account/search_icon_white.png") center no-repeat;
		background-size: cover;
	}
	.icon_calendar {
		background: url("../assets/images/discover/choose_day.png") center no-repeat;
		background-size: cover;
	}
	.tab_wrap{
		margin-top: 2.08rem;
		width: 7.5rem;
		padding-bottom: 1.16rem;
	}


</style>
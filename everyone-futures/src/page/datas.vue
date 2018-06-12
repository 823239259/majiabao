<template>
	<div id="datas" ref="viewBox"  :style="{height:clientHeight,overflow:'scroll'}">
		<mt-header fixed title="金融数据">
			<mt-button slot="left" @click="goto('/my')">
				<span class="icon_account"></span>
			</mt-button>
			<mt-button slot="right">
				<span class="icon_search" v-show="selected==1" @click="goto('/discoverSearch')"></span>
		    	<span class="icon_calendar" v-show="selected==2" @click="toChooseDay('picker1')"></span>
			</mt-button>
		</mt-header>
		<!-- 选项卡 -->
		<div class="tab_wrap">
			<mt-navbar v-model="selected">
				<mt-tab-item id="1">7x24</mt-tab-item>
				<mt-tab-item id="2">金融事件日历</mt-tab-item>
				<!-- <mt-tab-item id="3">要闻</mt-tab-item> -->
			</mt-navbar>

			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<discover7x24></discover7x24>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<calendar-news :newDate ="newsDate" @datePosition="getDatePosition"></calendar-news>
				</mt-tab-container-item>
				<!-- <mt-tab-container-item id="3">
					<focus-news></focus-news>
				</mt-tab-container-item> -->
			</mt-tab-container>
			<mt-datetime-picker
				ref="picker1"
				type="date"
				v-model="value1"
				year-format="{value} 年"
				month-format="{value} 月"
				date-format="{value} 日"
				:startDate="startDate"
				:endDate="endDate"
				@confirm="handleChange">
			</mt-datetime-picker>


		</div>
		<bottomTab :tabSelect="tabSelected"></bottomTab>
	</div>
</template>

<script>
	import bottomTab from "../components/bottom_tab"
	import discover7x24 from '../page/datas/discover7x24'
	import calendarNews from '../page/datas/calendarNews'
	// import focusNews from '../page/discover/focusNews'

	export default {
		name: "datas",
		components: {
			bottomTab,
			discover7x24,
			calendarNews,
			//focusNews
		},
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
			// forTest () {
			// 	clearTimeout(timer)
			// 	var timer = setTimeout(() => {
            //         //console.log(this)
            //         this.scrollY = this.$refs.viewBox.scrollTop
			// 		console.log(this.$refs.viewBox.scrollTop)
			// 	}, 100);
			// }
		},
		watch: {
			selected (value) {
				if(value == 2) {
					//接受子组件的传值来进行定位
					let calendar_date = document.getElementsByClassName('calendar_date')[0]
                    this.$nextTick(()=>{
						calendar_date.scrollLeft = this.datePosition
					})
				}
			}
        },
        //定位回到离开时的位置
		// activated () {        
        //     let _this = this
        //     this.$refs.viewBox.scrollTop = this.scrollY
        //     //this.$refs.viewBox.addEventListener('scroll',_this.forTest)
        // },
		// deactivated () {
        //     let _this = this
        //     this.scrollY = this.$refs.viewBox.scrollTop
		// 	//window.removeEventListener('scroll', _this.forTest);
				
		// }


	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#datas {
		width: $w;
		background-color: $bgRed;
		.mint-navbar .mint-tab-item.is-selected {
			margin: 0;
			border-bottom: 0.03rem solid $tabBgColor;
			color: $blcakThin;
		}
		.mint-navbar .mint-tab-item{
			padding: 0.27rem;
			color: #aaa;
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
		margin-top: 0.96rem;
		width: 7.5rem;
		padding-bottom: 1.16rem;
	}


</style>
<template>
	<div id="datas" ref="viewBox"  :style="{height:clientHeight,overflow:'scroll'}" >
		<mt-header fixed title="信息">
			<mt-button slot="left" @click="showTab('tabShow')">
				<span class="header_icon" :class="tabShow?'tab_open_icon':'tab_close_icon'"></span>
			</mt-button>
			<mt-button slot="right">
				<span class="search_icon header_icon" @click="goto('/home_search')"></span>
				<span class="help_icon header_icon" @click="goto('/list/class')"></span>
			</mt-button>
		</mt-header>
		<!-- 选项卡 -->
		<div class="tab_wrap">
			<div >
				<mt-navbar v-model="selected">
					<mt-tab-item id="1">实时信息流</mt-tab-item>
					<mt-tab-item id="2">金融大事件</mt-tab-item>
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
					<calendar-news :newDate ="newsDate" :changeSelected = 'changeSelected'></calendar-news>
				</mt-tab-container-item>
		
				<!-- </transition-group> -->
			</mt-tab-container>


		</div>
		<bottomTab :tabSelect="tabSelected" v-show="tabShow"></bottomTab>
		<tips-float></tips-float>
		<bottom  :tabSelect="tabSelected"/>
	</div>
</template>

<script>
	import bottomTab from "../components/bottom_tab"
	import bottom from "../components/bottoms_tab"
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
			bottom
			//focusNews
		},
		mixins:[pro.mixinsToCustomer],
		data() {
			return {
				tabSelected: 'message',
				selected: "2",
				navCheck: 0,
				newsDate: '',
				value: null,
		      	value1: new Date(),
		      	startDate: new Date('2014'),
                endDate: new Date('2020-12-31'),
                datePosition: '',
				scrollY: 0,
				tabShow: true,
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
				}
			},
			changeSelected (index) {
				this.selected = index
			},
			showTab (...key) {
				if(key.length === 1) {
				this[key[0]] = !this[key[0]]
				}else{
				this[key[1]] = key[0]
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
		background-color: $white;
		padding-top: 0.96rem;
		.mint-navbar .mint-tab-item.is-selected {
			margin: 0;
			border-bottom: 0;
			//color: $tabBgColor;
			color: #fff;
			background-color: #8f94a7;
		}
		.mint-navbar .mint-tab-item{
			padding: 0.27rem;
			color: #333;
			background-color: #ffffff;
		
			
		}
		
		.mint-navbar {
			//padding: 0 0.3rem;
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
	
	.tab_wrap{
		width: 7.5rem;
		padding-bottom: 1.16rem;
	}


</style>
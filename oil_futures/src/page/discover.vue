<template>
	<div id="discover" ref="viewBox" >
		<mt-header fixed title="发现">
			<mt-button slot="left" @click="showTab('tabShow')">
				<span class="header_icon" :class="tabShow?'tab_open_icon':'tab_close_icon'"></span>
			</mt-button>
			<mt-button slot="right">
				<span class="search_icon header_icon" @click="goto('/home_search')"></span>
				<span class="help_icon header_icon"  @click="goto('/list/class')"></span>
			</mt-button>
		</mt-header>
		
		<div class="list_wrap" v-for="(item, index) in warpList" :key="index">
			<h2>{{item.title}}</h2>
			<ul class="list">
				<li class="item" v-for="(n, index) in item.list" @click="goto(n.path)" :key="n.name">
					<img :src="n.img" :alt="n.name">
					<p>{{n.name}}</p>
				</li>
			</ul>
		</div>
		<div class="list_wrap">
			<h2>教学视频</h2>
			<div class="list" @click="goto('/class_room')">
				<img src="../assets/images/discover/shipin_bg.jpg" alt="">
			</div>
		</div>


		
		<bottomTab :tabSelect="tabSelected" v-show="tabShow" @show-tab="showTab($event,'tabShow')"></bottomTab>
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
				tabSelected: 'discover',
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
				warpList: [
					{
						title: '现货行情',
						list: [
							{
								img: require('../assets/images/discover/hangjin_bg.jpg'),
								name: '黄金',
								path: '/tools_item/1'
							},
							{
								img: require('../assets/images/discover/baiyin_bg.jpg'),
								name: '白银',
								path: '/tools_item/2'
							},
							{
								img: require('../assets/images/discover/bajin_bg.jpg'),
								name: '钯金',
								path: '/tools_item/3'
							},
							{
								img: require('../assets/images/discover/bojin_bg.png'),
								name: '铂金',
								path: '/tools_item/4'
							}
						]
					},
					{
						title: '期货工具',
						list: [
							{
								img: require('../assets/images/discover/guize_bg.jpg'),
								name: '规则搜索',
								path: '/contract_search'
							},
							{
								img: require('../assets/images/discover/jiage_bg.jpg'),
								name: '价格换算',
								path: '/futures_calc'
							},
							{
								img: require('../assets/images/discover/huilv_bg.jpg'),
								name: '汇率计算',
								path: '/exchange_calc'
							},
							{
								img: require('../assets/images/discover/shuju_bg.jpg'),
								name: '基础数据',
								path: '/tools_item/5'
							}
						]
					}
				]
			}
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
        },
		methods: {
			goto (pathObj) {
				this.$router.push({path:pathObj})
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
#discover{
	padding-top: 0.96rem
}	
	
.list_wrap{
	h2{
		@include font($fs28,0.8rem,#8f94a7,left);
		padding-left: 0.3rem;
		border-top: 1px solid #d2dae7; 
		border-bottom: 1px solid #d2dae7; 
	}
	.list{
		padding: 0.3rem;
		@include flex(space-between);
		flex-wrap: wrap;
	}
	.item{
		width: 3.3rem;
		box-shadow: 0rem 0.05rem 0.05rem 0rem 
		rgba(0, 0, 0, 0.1);
		border-radius: 0.1rem;
		margin-bottom: 0.3rem;
		p{
			@include font($fs30,0.8rem,#181722);
		}
	}
}
	


</style>
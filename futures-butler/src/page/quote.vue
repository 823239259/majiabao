<template>
	<div id="quote">
		<div v-show="isShowGuide">
			<mt-header title="行情" fixed>
			 	<router-link to="/search" slot="right">
			 	   	<mt-button icon="search" ></mt-button>
			 	</router-link>
			</mt-header>
			<bottomTab :tabSelect="tabSelected"></bottomTab>
		</div>
		<div class="container">
			<div id="drawPie"></div>
		</div>
		<firstGuide v-show="!isShowGuide"></firstGuide>
	</div>
</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts');
	require('echarts/lib/chart/pie');
	// 引入提示框和title组件
	import bottomTab from '../components/bottom_tab'
	import firstGuide from "./quote/firstGuide.vue"
	import pro from '../assets/js/common.js'
	import { mapMutations,mapActions } from 'vuex'
	
	export default{
		name:"",
		components:{bottomTab,firstGuide},
		data(){
			return{
				tabSelected:'quote',
				startAngle:0,
				currentType:[],
				allType:[]
			}
		},
		computed:{
			isShowGuide(){
				return this.$store.state.account.isShowGuide
			}
		},
		methods:{
			draw:function(){
				let myChart = echarts.init(document.getElementById('drawPie'));
				var option = {
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['外汇','商品','LME金属','利率期货','数字货币','股指期货']
				    },
				    series : [
				        {
				            name: '点击进入',
				            type: 'pie',
				            radius : '90%',
				            center: ['50%', '50%'],
				            startAngle:this.startAngle,
				            data:[
				                {value:100, name:'外汇'},
				                {value:100, name:'商品'},
				                {value:100, name:'LME金属'},
				                {value:100, name:'利率期货'},
				                {value:100, name:'数字货币'},
				                {value:100, name:'股指期货'},
				            ],
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            },
				            label:{
								normal:{
									position:'inner',
									fontSize :12
								}
							}
				        }
				    ],
				    color:['#9bbb58','#94cdde', '#f44234', '#a43b38', '#03a2dc','#e18683']
				};
				myChart.setOption(option);
				myChart.on('click', function (params) {  
					this.startAngle = 90;
				    var value = params.name;  
//				    document.getElementById("drawPie").style.transform = 'rotate(60deg)' ;
//				     document.getElementById("drawPie").style.transition = '2s' ;
				    this.$store.state.market.commodityOrder = this.allType[1].list;
				    this.$router.push({path:"/type",query:{type:this.allType[1].name}});

				}.bind(this)); 
			},
			changRote:function(){
				this.startAngle = 90;
			},
			//获取分类
			getCommodityInfo: function(){
				pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data!=undefined || res.data!=null){
							this.allType = res.data;
							this.currentType = res.data[0];
						}
					}
				}).catch((err) => {
					//Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
		},
		mounted: function(){
		},
		activated:function(){
			this.$store.state.market.Parameters = [];
			this.draw();
			this.getCommodityInfo()
		},
		created () {
		}
	}
</script>


<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#quote{
		width: 7.5rem;
		overflow: hidden;
	}
	.container{
		margin-top: 1rem;
	}
	#drawPie{
		width: 6.02rem;
		height: 6.02rem;
	}
	
</style>
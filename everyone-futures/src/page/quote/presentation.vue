<template>
	<div id="presentation">
		<div class="title_left">回测报告({{timestart | changeDay}}-{{timeend | changeDay}})</div>
		<div class="pat1">
			<ul>
				<li>{{FinalPortfolio | changPoint1}}</li>
				<li>总资产</li>
			</ul>
			<ul>
				<li>{{FinalReturn | changPoint}}</li>
				<li>收益率</li>
			</ul>
			<ul>
				<li class="color_yellow">{{MaxDraw | changPoint}}</li>
				<li>最大回撤</li>
			</ul>
		</div>
		<div class="title_left">资金收益曲线</div>
		<div class="container">
			<div id="drawMoney"></div>
		</div>
		<div class="title_left">每日盈亏数据</div>
		<div class="container">
			<div id="drawMoney1"></div>
		</div>
	</div>
</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/line')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	import pro from '../../assets/js/common.js'
	export default{
		name:"presentation",
		data(){
			return{
				FinalReturn:'',
				FinalPortfolio:"",
				MaxDraw:"",
				timestart:"",
				timeend:""
			}
		},
		computed:{
			backtestIndexArr:function(){
				return this.$store._modules.root.state.account.backtestIndexArr
			}
		},
		methods:{
			drawMoney:function(){
				let myChart = echarts.init(document.getElementById('drawMoney'));
				var option = {
				    tooltip : {
				        trigger: 'axis',
						formatter:function(e){
							var str = Number(e[0].value*100).toFixed(4);
							str += "%"; 
							return '累计收益率:'+str+'</br>'+e[0].name
						},
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
				    grid: {
				    	top:0,
				        left: 0,
				        right: 0,
				        bottom: 10,
				        containLabel: false,
				        height:300
				    },
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data :this.backtestIndexArr.plotting.Time,
				        }
				    ],
				    yAxis : [
				        {
				        	show : false,
				            type : 'value',
				            splitLine:{show:false}
				        }
				    ],
				    series : [
				        {
				        	symbol:'none',
				            name:'收益曲线',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {color:"white"}},
				            lineStyle:{normal:{color:"#fa7f69",width:1}},
				            data:this.backtestIndexArr.plotting.Cumreturn
				        }
				    ]
				};
				 myChart.setOption(option);
			},
			drawMoney1:function(){
				let myChart = echarts.init(document.getElementById('drawMoney1'));	
				var option = {
			    tooltip : {
			        trigger: 'axis',
			        formatter:function(e){
			        	var str = Number(e[0].value*100).toFixed(4);
							str += "%"; 
							return '每日盈亏:'+str+'</br>'+e[0].name
			        }
			    },
			    calculable : true,
			    grid: {
				    	top:0,
				        left: 0,
				        right: 0,
				        bottom: 10,
				        containLabel: false,
				        height:300
				    },
			    xAxis : [
			        {
			            type : 'category',
			            data :this.backtestIndexArr.plotting.Time,
			        }
			    ],
			    yAxis : [
			        {
			        	show : false,
			            type : 'value',
			            splitLine:{show:false}
			        }
			    ],
			    series : [
			        {
			            name:'每日盈亏',
			            type:'bar',
			           	data:this.backtestIndexArr.plotting.Simplereturn,
			           	itemStyle:{
			           		normal:{
			           			color:function(params){
			           				 var index_color = params.value;
                                    if(index_color>=0){
                                        return '#fe4365';
                                    }else {
                                        return '#25daba';
                                    }
			           			}
			           		}
			           	}
			        }
			    ]
			};
			 myChart.setOption(option);
			}
		},
		mounted:function(){
			this.timestart = this.backtestIndexArr.backtestIndex.timestart;
			this.timeend = this.backtestIndexArr.backtestIndex.timeend;
			this.FinalReturn = this.backtestIndexArr.backtestIndex.finalReturn;
			this.FinalPortfolio = this.backtestIndexArr.backtestIndex.finalPortfolio;
			this.MaxDraw = this.backtestIndexArr.backtestIndex.maxDrawndown;
			this.drawMoney();
			this.drawMoney1();
		},
		activated:function(){
			this.timestart = this.backtestIndexArr.backtestIndex.timestart;
			this.timeend = this.backtestIndexArr.backtestIndex.timeend;
			this.FinalReturn = this.backtestIndexArr.backtestIndex.finalReturn;
			this.FinalPortfolio = this.backtestIndexArr.backtestIndex.finalPortfolio;
			this.MaxDraw = this.backtestIndexArr.backtestIndex.maxDrawndown;
			this.drawMoney();
			this.drawMoney1();
		},
		filters:{
			changPoint:function(e){
				var str=Number(e*100).toFixed(2);
			    str+="%";
			    return str;
			},
			changPoint1:function(e){
				return Number(e).toFixed(2);
			},
			changeDay:function(e){
				return pro.getDate(Date.parse(e.replace(/\-/g,"/")),"yy-mm-dd")
			}
		}
	}
</script>


<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#presentation{
		width: 7.5rem;
		.title_left{
			padding-left:0.3rem;
			width:100%;
			height:0.65rem;
			background-color: #b3daff;
			line-height:0.65rem;
		}
		.pat1{
			height: 2.4rem;
			padding:0 0.3rem;
			ul{
				background-color:#edf6ff;
				float: left;
				width:2.1rem;
				height:1.8rem;
				background-color:white;
				border-radius:0.1rem;
				display: flex;
				flex-flow: column;
				text-align: center;
				margin-top: 0.4rem;
				li{
					&:nth-child(1){
						margin-top: 0.5rem;
						color:#ff4c4c;
						margin-bottom: 0.1rem;
						font-weight: 600;
					}
				}
				&:nth-child(2){
					margin-right: 0.3rem;
					margin-left: 0.3rem;
				}
			}
			
		}
		.container{
			width: 7.5rem;
			overflow-x: scroll;
			#drawMoney{
				width: 7.5rem;
				height: 6.4rem;
				background-color: white;
			}
			#drawMoney1{
				width: 50rem;
				height: 6.4rem;
				background-color: white;
			}
		}
	}
</style>
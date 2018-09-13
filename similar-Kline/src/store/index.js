/**
 * Created by Administrator on 2017/6/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Toast, Indicator } from 'mint-ui';
import pro from "../assets/common.js"
import  echarts from 'echarts'
Vue.$axios = axios
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		contractList: [],
		historyList: {},
	},
	getters: {
		searchArr (state) {
			let searchArr = state.contractList.reduce((searchArr, item) => {
				let { commodity_name, commodity_no } = item;
				searchArr.push(`${commodity_name}${commodity_no}`);
				return searchArr;
			}, []);
			return searchArr
		}
	},
	mutations: {
		changeContractList (state,payload) {
			state.contractList = payload
		},
		addHistoryList (state,payload) {
			Object.assign(state.historyList,payload)
		},
		createKLine (state,payload) {
			
			let xData = payload.xDatas1.concat(payload.xDatas2);
			let chartBox = document.getElementById(payload.id);
			let myChart = echarts.init(chartBox);
			
			

			let upColor = '#ec0000';
			let upBorderColor = '#8A0000';
			let downColor = '#00da3c';
			let downBorderColor = '#008F28';
			let option = {
				title: {
					text: payload.name,
					textStyle:{
						color: '#fff',
					},
					

				},
				tooltip: {
					show: true, //控制是否显示提示框
					trigger: 'axis', //触发的位置 axis与 item 前者是在坐标轴触发 后者是在点上触发
					axisPointer: {  //axisPointer 默认不显示 
						type: 'cross',
						lineStyle: {
							//color: 'blue'
						}
					},
					formatter: function (params) {
						//console.log(params)
						let time = params[0].name;
						let kd = params[0].data;
						var rate = ((kd[2] - kd[1]) / kd[1] * 100).toFixed(2);  //收盘价  - 开盘价 / 开盘价
						let tipsText;
						tipsText = `时间: ${time} 涨跌幅: ${rate}%<br>`;
						//遍历价格
						const priceList = ['开盘价', '收盘价', '最低价', '最高价'];
						tipsText = priceList.reduce((str,item,index) =>{
							str += `${item}: ${kd[index+1]} <br/>`;
							return str
						},tipsText)
						return tipsText
					},
					textStyle: {fontSize: 12}
				},
				legend: {
					data: [{name:"小时K",textStyle:{color:"blue"}},]
				},
				grid: {
					show: false, //控制边框线是否显示
					left: '10%', //左侧的距离
					right: '10%',
					bottom: '15%'
				},
				xAxis: { //横坐标
					type: 'category',
					data: xData,
					scale: false, //min max 后无效
					boundaryGap: false, //两边不留白
					axisLine: { //横坐标轴线相关设置
						onZero: false,
						lineStyle: {
							color: '#8392A5' //影响label
						}
					},
					splitLine: { //外边框线
						show: false
					},
					//splitNumber: 20, //坐标轴的分割段数
					min: 'dataMin', //坐标轴的刻度最小值
					max: 'dataMax', //坐标轴的刻度最大值
					axisPointer: { //坐标轴设置
						label: {
							//color: 'red'
							backgroundColor: 'rgba(50, 50, 50, 0.5)'
						}
					},
					axisLabel: { //横坐标的值的相关设置
						color: '#8392A5',
						//interval: xData.length - 2,  //隔多少个显示
						interval: payload.xDatas1.length - 2,  //隔多少个显示
						showMaxLabel: true, //是否显示最大值
						formatter: function(value,index){ //html标签无法使用
							console.log(value,index)
							let values =  value.split(' ');
							console.log(values)
							let newValues = `{a|${values[0]}}\n{b|${values[1]}}`
							return newValues
						},
						rich: {
							a: {
								color: 'red',
								lineHeight: 12
							},
							b: {
								color: 'white',
								lineHeight: 12
							},
						}

					},
					axisTick: { //横坐标的朝向
						show: true,
						
					},
					splitArea: {
						show: true,
						
						interval: payload.xDatas1.length - 2,
						areaStyle: {
							color: ['blue','yellow'] 
						}
					}
				},
				yAxis: { //纵轴
					scale: true,
					axisLabel: { //坐标轴文字相关
						color: '#8392A5'
					},
					splitArea: { //背景色
						show: false
					},
					axisLine: { //坐标轴线相关设置
						onZero: false,
						lineStyle: {
							color: '#8392A5'
						}
					},
					axisTick: { //刻度相关
						show: false
					},
					axisPointer: {
						type: 'line',
						snap: false,
						triggerTooltip: true,
						label: { //tooltips文本
							show: true,
							backgroundColor: 'rgba(50, 50, 50, 0.5)'
							
						},
						lineStyle: {
							color: 'red'
						}
					}
				},
				// dataZoom: [{
                //     type: 'inside',
                //     start: 50,
                //     end: 100
                // },
                // {
                //     show: true,
                //     type: 'slider',
                //     y: '90%',
                //     start: 50,
                //     end: 100
				// }],
				series:[{
					name: '小时K',
                    type: 'candlestick',
					data: state.historyList[payload.commodity_no].set123.concat(state.historyList[payload.commodity_no].nextDatas),
					itemStyle: {
                        normal: {
                            color: upColor,
							color0: downColor,
							borderColor: upBorderColor,
							borderColor0: downBorderColor
							//borderWidth: 3
                        }
					},
					//  markPoint: {
                    //     label: {
                    //         normal: {
                    //             formatter: function (param) {
                    //                 return param != null ? Math.round(param.value) : '';
                    //             }
                    //         }
                    //     },
                    //     data: [{
                    //             name: 'XX标点',
                    //             coord: ['2013/5/31', 2300],
                    //             value: 2300,
                    //             itemStyle: {
                    //                 normal: {
                    //                     color: 'rgb(41,60,85)'
                    //                 }
                    //             }
                    //         },
                    //         {
                    //             name: 'highest value',
                    //             type: 'max',
                    //             valueDim: 'highest'
                    //         },
                    //         {
                    //             name: 'lowest value',
                    //             type: 'min',
                    //             valueDim: 'lowest'
                    //         },
                    //         {
                    //             name: 'average value on close',
                    //             type: 'average',
                    //             valueDim: 'close'
                    //         }
                    //     ],
                    //     tooltip: {
                    //         formatter: function (param) {
                    //             return param.name + '<br>' + (param.data.coord || '');
                    //         }
                    //     }
					// },
					// markLine: {
                    //     symbol: ['none', 'none'],
                    //     data: [
                    //         [{
                    //                 name: 'from lowest to highest',
                    //                 type: 'min',
                    //                 valueDim: 'lowest',
                    //                 symbol: 'circle',
                    //                 symbolSize: 10,
                    //                 label: {
                    //                     normal: {
                    //                         show: false
                    //                     },
                    //                     emphasis: {
                    //                         show: false
                    //                     }
                    //                 }
                    //             },
                    //             {
                    //                 type: 'max',
                    //                 valueDim: 'highest',
                    //                 symbol: 'circle',
                    //                 symbolSize: 10,
                    //                 label: {
                    //                     normal: {
                    //                         show: false
                    //                     },
                    //                     emphasis: {
                    //                         show: false
                    //                     }
                    //                 }
                    //             }
                    //         ],
                    //         {
                    //             name: 'min line on close',
                    //             type: 'min',
                    //             valueDim: 'close'
                    //         },
                    //         {
                    //             name: 'max line on close',
                    //             type: 'max',
                    //             valueDim: 'close'
                    //         }
                    //     ]
                    // }
				}]
            	

			}
			myChart.setOption(option);
		}
	},
	actions: {
		getContractList (context) {
			Vue.$axios.post("/api/quote/symbols.do", {
				security_type: 'FUT_OUT'
			  })
			  .then(response => {
				//console.log(response.data)
				if (response.status === "ok") {
					//存储contractList
					context.commit('changeContractList',response.data)
				}
			  })
			  .catch(function(error) {
				//console.log(456)
				console.log(error);
			  });
		},
		
	},
	
})
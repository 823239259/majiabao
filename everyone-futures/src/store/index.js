/**
 * Created by Administrator on 2017/6/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { Toast, Indicator } from 'mint-ui';
import pro from "../assets/js/common.js"

if (process.env.NODE_ENV === 'development') {
	Vue.use(Vuex)
  }
const state = {
  direction: 'forward',
};
/*更新路由方向*/
//const UPDATE_DIRECTION = 'UPDATE_DIRECTION';
//const mutations = {
//UPDATE_DIRECTION(state,payload) {
//  state.direction = payload.direction
//},
//};
//控制显示与否
var isshow = {
	state: {
		isconnected: false,
		//判断是第一次画图还是第二次
		isfensshow: false,
		islightshow: false,
		isklineshow: false,
		//判断是否画图
		isfens: false,
		iskline: false,
		islight: false,
		isfensInit: false,
		warningShow: false,
		warningType: '',
	}
};

//账户信息
var account = {
	state: {
		packChannel: '5a7bc601b27b0a7ded0000e7',   //统计代码
		isLogin: false, //判断是否是从登录跳至首页
		isRefresh: false,  //判断是否刷新
		isBack: false,   //判断是否退出交易账号并跳至首页
		loginStatus: false,  //交易账号登录状态	
		exitStatus: false,   //交易账号退出状态
		quoteStatus: false,  //行情初始化状态
		userName: '',   //平台账号
		currentNav: 0,  //当前导航索引
		currentUrlHead: 'http:', //http or https
		phone:"",
		username:"",
		commodityAll: [],    //所有市场合约
		tradableCommodity: [],   //所有可交易合约
		weixinLoginInfo:false,
		backtestIndexArr:[],
		isShowGuide:localStorage.showGuide ? JSON.parse(localStorage.showGuide).id : false
	}
}
const tradeName = {
	CL: '国际原油',
	HSI: '恒指期货',
	GC: '美黄金',
	CUS: '美元兑人民币',
	DX: '美元指数',
	FDAX: '德国DAX指数',
	MHI: '小恒指',
	CN: '富时A50',
	HG: '美铜',
	SI: '美白银',
	YM: '迷你道琼',
	NQ: '迷你纳斯达克',
	ES: '迷你标准普尔',
	NK: '日经225',
	HHI: 'H股指数',
	MCH: '小H股指数',
	QM: '小原油',
	FDXM: '迷你德国DAX指数',
	NG: '天然气',
	IF: '沪深300指数',
	BRN: '布伦特原油'
}
//行情交易数据
var market = {
	state: {
		quoteConfig:{
			version: '5.1.2',    //版本
//			url_real: "ws://192.168.0.232:19002",  //测试地址/
			url_real: "ws://quote.zhishutianxia.com:19002",   //正式地址
			userName: "13677622344",
			passWord: "a123456"
		},
		tradeConfig:{
			version: "5.1.4",	//版本
			url_real: '',
//			url_real: "ws://192.168.0.232:6102",   //测试地址
//			url_real: "ws://139.196.176.60:6101",  //正式地址
			model: "1", // 实盘：0；	模拟盘：1
			
			client_source: "N_WEB",	// 客户端渠道
//			username: "00004",		// 账号(新模拟盘——000008、直达实盘——000140、易盛模拟盘——Q517029969)
//			password: "YTEyMzQ1Ng==" 	// 密码：base64密文(明文：a123456——YTEyMzQ1Ng==     888888——ODg4ODg4	 74552102——NzQ1NTIxMDI=		123456=MTIzNDU2)
			username:'',
			password:''
		},
		physhon:{
			url:"http://139.224.6.183:8989", //physhon生产环境，
//			url:"http://192.168.0.223:8989" //physhon测试环境
		},
		//心跳信息
		HeartBeatTiming: null,   //心跳定时器
		HeartBeat:{
			lastHeartBeatTimestamp : 1,	// 行情最后心跳时间
			oldHeartBeatTimestamp : 0,	// 上一次心跳时间
			intervalCheckTime : 8000  // 间隔检查时间：8秒
		},
//		HeartBeat00:{
//			lastHeartBeatTimestamp : 1,	// 交易最后心跳时间
//			oldHeartBeatTimestamp : 0,	// 上一次心跳时间
//			intervalCheckTime : 8000  // 间隔检查时间：8秒
//		},
		quoteInitStatus: false,    //行情是否已经初始化
		quoteInitStep: '',      //判断行情Parameters是否已经初始化完
		CacheLastQuote: [],    //缓存最新一条行情数据
		volume: 0,           //缓存最新成交量
		subscribeIndex: 1,   //订阅推送次数统计
		quoteIndex: '',      //行情变化索引
		quoteColor: '',      //行情变化颜色
		
		//行情历史合约数据（分时）
		jsonData: {},
		//行情历史合约数据（K线）
		jsonDataKline: {
			"Method": "OnRspQryHistory",
			"Parameters": {
				"ColumNames": ["DateTimeStamp", "LastPrice", "OpenPrice", "LowPrice", "HighPrice", "Position", "Volume"],
				"CommodityNo": "CL",
				"ContractNo": "1708",
				"Count": 102,
				"Data": [
					["2017-06-26 09:31:00", 43.38, 43.35, 43.34, 43.39, 548303, 634,0],
				],
				"ExchangeNo": "NYMEX",
				"HisQuoteType": 0
			}
		},
		//行情数据格式
		jsonTow: {
			"Method": "OnRtnQuote",
			"Parameters": {}
		},
		chartHeight: '',
		//绘制分时的设置
		option1: {},   //成交量
		option2: {},   //价格
		scale: [],     //比例
		contrastData: [],   //对比合约数据
		//绘制K线的设置
		option3: {},   //价格
		option4: {},   //成交量
		strategyData:[],//策略数据
		//绘制闪电图的设置
		option5: {},   //价格
		//K线图（蜡烛图）数据
		tempArr: [], 
		//闪电图用到的数据
		lightChartTime: {
			"time": [],
			"price": []
		},
		//时间差（行情数据更新 画图）
		charttime: 0,
		charttimetime: 0,
		charttimems: 0,
		charttimetime2: 0,
		charttimems2: 0,
		
		//选择K线的类型
		selectTime: 1,
		//当前合约代码（CL）
		currentNo: '',
		//当前类型平台合约
		commodityOrder: [],
		//第一次所有合约列表
		markettemp: [],
		//订阅成功后查询品种列表
		orderTemplist:{},
		//存订阅成功后的行情信息
		templateList:{},
		//当前所有有效合约列表
		Parameters: [],   
		//当前所有有效合约成交明细
		tradeParameters: [],
		//当前选中合约
		currentdetail: {},
		currentdetailDefault: {
			CommodityName: "国际原油",
			CommodityNo: "CL",
			ContractSize: 10,
			CurrencyNo: "USD",
			DotSize: 2,
			ExchangeNo: "NYMEX",
			Index: 1,
			IsDomestic: 0,
			IsUsed: 1,
			LastQuotation: {
				LastPrice: 55.81
			}
		},
		//当前选中合约的成交明细
		currentTradeDetails: [],
		
		//缓存账户信息
		CacheAccount:{
			moneyDetail:[],
			jCacheAccount : {},	// key 为CurrencyNo
			jCacheTotalAccount:{
				TodayBalance : 0.0,	// 今权益
				TodayCanUse : 0.0,	// 今可用
				FloatingProfit : 0.0,	// 浮动盈亏
				CloseProfit : 0.0,	// 平仓盈亏
				FrozenMoney : 0.0,	// 冻结资金
				Deposit : 0.0,	// 保证金
				CounterFee : 0.0,	// 手续费
				RiskRate : 0.0,	// 风险率
				RiskDegree: 0.0,   //风险度
			}
		},
		//订单状态
		OrderType:{
			0: "订单已提交",
			1: "排队中",
			2: "部分成交",
			3: "完全成交",
			4: "已撤单",
			5: "下单失败",
			6: "未知"
		},
		forceLine: 0.00,    //强平线
		initBalance: 0.00,   //初始资金
		//存持仓列表
		qryHoldTotalArr: [],
		positionListCont: [],
		//委托列表页面数据
		OnRspOrderInsertEntrustCont: [],
		//挂单页面列表
		OnRspOrderInsertOrderListCont: [],
		orderListCont: [],
		//成交记录列表
		OnRspQryTradeDealListCont: [],
		//持仓合约浮盈处理
		CacheHoldFloatingProfit: {
			jHoldFloatingProfit: {},	// 持仓合约对应浮盈
			jCurrencyNoFloatingProfit: {}	// 币种对应浮盈
		},
		ifUpdateHoldProfit: false,       //是否使用最新行情更新持仓盈亏
		ifUpdateAccountProfit: false,   //是否可以更新账户盈亏标志：资金信息显示完毕就可以更新盈亏
		//成交历史列表
		queryHisList: [], 
		
		//切换后合约的名字
		jContractFloatingProfitVO:{
			currencyNo: '',
			floatingProfit: 0.0
		},
		
		//止损止盈
		stopLossList: [],   //未触发列表
		stopLossTriggeredList: [],    //已触发列表
		//条件单
		conditionList: [],   //未触发列表
		triggerConditionList: [],   //已触发列表
		
		//判断是否可以进行交易操作
		buyStatus: false,
		cancelStatus: false,
		stopStatus: false,
		conditionStatus: false,
	}
}

export default new Vuex.Store({
	modules: {
		isshow,
		account,
		market,
	},
	state: {
		direction: 'forward',
		tradeName: tradeName,
		userInfo: {},
		accountInfo: {},
		newsList: [],
	    wsjsondata: {},
		//行情websocket
		quoteSocket: {},
		//交易websocket
		tradeSocket: {},
		//test 测试环境，online 正式环境
		environment: 'online',
		//打包的时候，值为 build ，开发的时候，值为 dev
		setting: 'build',
	},
	getters: {  
		PATH: function(state) {
			if(state.setting == 'dev') {
//				return 'http://192.168.0.132:8080/qiw-platform';
				return 'http://platform-trade.dktai.cn'
			} else if(state.setting == 'build'){
				if(state.environment == 'test'){
					return state.account.currentUrlHead + '//test.platform-trade.dktai.cn';
				}else{
					return state.account.currentUrlHead + '//platform-trade.dktai.cn';
				}
			} else if(state.setting == 'nat') {
				return '/nat';
			}
		},
		IMGPATH: function (state) {
			if(state.setting == 'dev') {
				return state.account.currentUrlHead + '//test.platform-trade.dktai.cn'
			}else if(state.setting == 'build'){
				if(state.environment == 'test'){
					return state.account.currentUrlHead + '//test.platform-trade.dktai.cn';
				}else{
					return state.account.currentUrlHead + '//platform-trade.dktai.cn';
                }
            }    
		},
		futurePath () {
			if(state.setting == 'dev') {
				//return 'http://192.168.0.132:8080/qiw-platform';
					return '/other'
				} else if(state.setting == 'build'){
					if(state.environment == 'test'){
						return state.account.currentUrlHead + '//test.futures.duokongtai.cn';
					}else{
						return state.account.currentUrlHead + '//futures.duokongtai.cn';
					}
				} else if(state.setting == 'nat') {
					return '/nat';
				}
		}
	},
    mutations: {
    	['UPDATE_DIRECTION'](state,payload) {
      		state.direction = payload.direction
		},
		['ACCOUNT_INFO'](state,payload) {
			state.accountInfo = payload
		},
		['INFO_CLEAR'](state,payload) {
			state.userInfo = {}
			state.accountInfo = {}
		},
		//画闪电图
		drawlight: function(state, e) {
			// 引入 ECharts 主模块
			var echarts = require('echarts/lib/echarts');
			// 引入柱状图
			require('echarts/lib/chart/bar');
			// 基于准备好的dom，初始化echarts图表
			var lightChart;
			if(state.isshow.islightshow == false) {
				lightChart = echarts.init(document.getElementById(e));
				state.isshow.islightshow = true;
			} else {
				if(document.getElementById(e) != null){
					lightChart = echarts.getInstanceByDom(document.getElementById(e));
				}
			}
			
			lightChart.setOption(state.market.option5);
		},
		//设置闪电图数据
		setlightDate: function(state) {
			state.market.jsonTow.Parameters = state.market.currentdetail.LastQuotation;
			var TimeLength = state.market.lightChartTime.time.length;
			state.market.lightChartTime.price.push(state.market.jsonTow.Parameters.LastPrice.toFixed(state.market.currentdetail.DotSize));
			state.market.lightChartTime.time.push((state.market.jsonTow.Parameters.DateTimeStamp).split(" ")[1]);
			state.market.lightChartTime.time = state.market.lightChartTime.time.slice(-50);
			state.market.lightChartTime.price = state.market.lightChartTime.price.slice(-50);
			state.market.option5 = {
				"tooltip": {
					"show": false,
				},
				animation: false,
				grid: {
					x: 50,
					y: 40,
					x2: 46,
					y2: 20
				},
//				backgroundColor: '#2d3040',
				xAxis: [{
					type: 'category',
					show: true,
					data: state.market.lightChartTime.time,
					axisLine: {
						lineStyle: {
							color: '#8392A5'
						}
					},
					boundaryGap: true
				}],
				yAxis: [{
					type: 'value',
					scale: true,
					position: "left",
					axisTick: {
						show: false,
					},
					axisLine: {
						lineStyle: {
							color: '#8392A5'
						}
					},
					splitArea: {
						show: false
					},
					axisLabel: {
						inside: false,
						margin: 3,
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: "#8392A5"
						}
					}
				}],
				"series": [{
					"name": "总数",
					"type": "line",
					"stack": "总量",
					symbolSize: 10,
					symbol: 'circle',
					"itemStyle": {
						"normal": {
							"color": "#8392A5",
							"barBorderRadius": 0,
							"label": {
								"show": true,
								"position": "top",
								formatter: function(p) {
									return p.value > 0 ? (p.value) : '';
								}
							}
						}
					},
					"data": state.market.lightChartTime.price
				}]
			}
		},
		//设置K线图数据
		setklineoption: function(state,strategyData) {
			// 引入 ECharts 主模块
			var echarts = require('echarts/lib/echarts');
			// 引入柱状图
			require('echarts/lib/chart/bar');
			require('echarts/lib/chart/line');
			require('echarts/lib/component/tooltip');
			require('echarts/lib/chart/candlestick');
			require('echarts/lib/component/markpoint');
			var dosizeL = state.market.currentdetail.DotSize;
			var rawData = [];
			var parameters = state.market.jsonDataKline.Parameters.Data;
			var Len = parameters.length;
			var lent = rawData.length;
			if(state.market.jsonDataKline.Parameters.HisQuoteType == 1440) {
				for(var i = 0; i < Len; i++) {
					var timeStr = parameters[i][0].split(" ")[0];
					var openPrice = parseFloat(parameters[i][2]).toFixed(dosizeL);
					var closePrice = parseFloat(parameters[i][1]).toFixed(dosizeL);
					var sgData = [timeStr, openPrice, closePrice, parseFloat(parameters[i][3]).toFixed(dosizeL), parseFloat(parameters[i][4]).toFixed(dosizeL), parameters[i][0].substring(0,10)];
					rawData[lent + i] = sgData;
				};
				
			} else {
				for(var i = 0; i < Len; i++) {
					var time2 = parameters[i][0].split(" ");
					var str1 = time2[1].split(":");
					var str2 = str1[0] + ":" + str1[1];
					var openPrice = parseFloat(parameters[i][2]).toFixed(dosizeL);
					var closePrice = parseFloat(parameters[i][1]).toFixed(dosizeL);
					var sgData = [str2, openPrice, closePrice, parseFloat(parameters[i][3]).toFixed(dosizeL),parseFloat(parameters[i][4]).toFixed(dosizeL), parameters[i][0]];
					rawData[lent + i] = sgData;
				};
			}
			
			var categoryData = [];
			var values = [];
			var time = [];
			for(var i = 0; i < rawData.slice(-40).length; i++) {
				categoryData.push(rawData.slice(-40)[i][0]);
				values.push([rawData.slice(-40)[i][1], rawData.slice(-40)[i][2], rawData.slice(-40)[i][3], rawData.slice(-40)[i][4]]);
				time.push(rawData.slice(-40)[i][5])
			}
			var chartDataC = {
				categoryData: categoryData,
				values: values,
				time: time
			};
			/*MA5 10 20 30*/
			function calculateMA(dayCount) {
				var result = [];
				for(var i = 0, len = chartDataC.values.length; i < len; i++) {
					if(i < dayCount) {
						result.push('-');
						continue;
					}
					var sum = 0;
					for(var j = 0; j < dayCount; j++) {
						sum += Number(chartDataC.values[i - j][1]);
					}
					result.push(Number(sum / dayCount).toFixed(dosizeL));
				}
				return result;
			}
			state.market.option3 = {
				grid: {
					x: 43,
					y: 40,
					x2: 30,
					y2: 5
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						animation: false,
						lineStyle: {
							color: '#8585a6',
							width: 1,
							opacity: 1
						}
					},
					formatter: function(params) {
						var time = params[0].name;
						if(time == null || time == "") {
							return
						}
						var kd = params[0].data;
						var ma5 = params[1].data;
						var ma10 = params[2].data;
						var ma20 = params[3].data;
						var ma30 = params[4].data;
						var rate = (kd[2] - kd[1]) / kd[1] * 100;
						rate = parseFloat(rate).toFixed(2);
						var res = "时间:" + params[0].name + '  涨跌幅: ' + rate+'%';
						res += '<br/>  开盘 : ' + parseFloat(kd[1]).toFixed(dosizeL) + '  最高 : ' + parseFloat(kd[4]).toFixed(dosizeL);
						res += '<br/>  收盘 : ' + parseFloat(kd[2]).toFixed(dosizeL) + ' 最低 : ' + parseFloat(kd[3]).toFixed(dosizeL);
						res += '<br/> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#3689B3"></span> MA5 : ' + ma5 + '  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#B236B3"></span> MA10 : ' + ma10;
						res += '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#B37436"></span> MA20 : ' + ma20 + '  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#B2B336"></span> MA30 : ' + ma30;
						return res;
					},
					textStyle: {fontSize: 10}
				},
				xAxis: {
					type: 'category',
					data: chartDataC.time,
					show: true,
					axisLine: {
						show:true,
						lineStyle: {
							color: '#8392A5'
						}
					},
					 splitLine: {
                        show: true, 
                        //  改变轴线颜色
                        interval : 8,
                        lineStyle: {
                        	type:'dotted',
                            // 使用深浅的间隔色
                            color: ['gray']
                        }                            
                    },
				},
				yAxis: {
					scale: true,
					axisLine: {
						lineStyle: {
							color: '#8392A5'
						}
					},
					axisTick: {
						show: false,
					},
					splitArea: {
						show: false
					},
					axisLabel: {
						inside: false,
						margin: 3,
						fontSize: 10,
					},
					splitLine: {
						show: true,
						interval : 8,
						lineStyle: {
							type:'dotted',
							color: ['gray']
						}
					}
				},
				animation: false,
				series: [{
						type: 'candlestick',
						name: '',
						data: chartDataC.values,
						markPoint: {
							label: {
			                    normal: {
			                        formatter: function (param) {
			                            return " "
			                        }
			                    }
			                },
							data:strategyData
			            },
						markLine: {
							symbol: ['none', 'none'],
							clickable: false,
							lineStyle: {
								normal: {
									width: 1,
									color: "#ffffff"
								}
							},
							data: [{
									name: '标线2起点',
									value: 0,
									xAxis: "1",
									yAxis: 0
								}, // 当xAxis或yAxis为数值轴时，不管传入是什么，都被理解为数值后做空间位置换算
								{
									name: '标线2终点',
									xAxis: "2",
									yAxis: 0
								}
							]
						},
						itemStyle: {
							normal: {
								color: '#e64552',
								color0: '#3aa643',
								borderColor: '#e64552',
								borderColor0: '#3aa643'
							}
						}
					},
					{
						name: 'MA5',
						type: 'line',
						data: calculateMA(5),
						smooth: true,
						showSymbol: false,
						lineStyle: {
							normal: {
								color: '#3689B3',
								width: 1,
							}
						}
					},
					{
						name: 'MA10',
						type: 'line',
						showSymbol: false,
						data: calculateMA(10),
						smooth: true,
						lineStyle: {
							normal: {
								color: '#B236B3',
								width: 1,
							}
						}
					},
					{
						name: 'MA20',
						type: 'line',
						showSymbol: false,
						data: calculateMA(20),
						smooth: true,
						lineStyle: {
							normal: {
								color: '#B37436',
								width: 1,
							}
						}
					},
					{
						name: 'MA30',
						type: 'line',
						showSymbol: false,
						data: calculateMA(30),
						smooth: true,
						lineStyle: {
							normal: {
								color: '#B2B336',
								width: 1,
							}
						}
					},
				]
			}
			var vol = [],
				price = [],
				time = [];
			var Ktime;
			state.market.jsonDataKline.Parameters.Data.slice(-40).forEach(function(e) {
				vol.push(e[6]);
				Ktime = e[0].split(' ')[1].split(':')[0] + ':' + e[0].split(' ')[1].split(':')[1];
				if(Ktime == '00:00'){
					time.push(e[0].split(' ')[0]);
				}else{
					time.push(e[0].split(' ')[1].split(':')[0] + ':' + e[0].split(' ')[1].split(':')[1]);
				}
				price.push(e[1]);
			});
			//成交量设置
			state.market.option4 = {
				grid: {
					x: 43,
					y: 30,
					x2: 30,
					y2: 20
				},
				tooltip: {},
				xAxis: [{
					type: 'category',
					position: 'bottom',
					boundaryGap: true,
					axisTick: {
						onGap: false
					},
					splitLine: {
						show: true,
						interval : 8,
						lineStyle: {
							type:'dotted',
							color: ['gray']
						}
					},
					axisLabel: {
						textStyle: {
							fontSize: 10,
						}
					},
					axisLine: {
						lineStyle: {
							color: '#8392A5'
						}
					},
					data: time
				}],
				yAxis: [{
					type: 'value',
					name: '成交量(万)',
					axisLine: {
						lineStyle: {
							color: '#8392A5'
						}
					},
					axisTick: {
						show: false,
					},
					scale: true,
					splitNumber:2,
					axisLabel: {
						margin: 3,
						formatter: function(a) {
							a = +a;
							return isFinite(a) ? echarts.format.addCommas(+a / 10000) : '';
						},
						textStyle: {
							fontSize: 10
						},
					},
					splitLine: {
						show: true,
						lineStyle: {
							type:'dotted',
							color: ['gray']
						}
					}
				}],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						animation: false,
						lineStyle: {
							color: '#8585a6',
							width: 1,
							opacity: 1
						}
					},
					triggerOn: 'mousemove|click'
				},
				series: [{
					name: '成交量',
					type: 'bar',
					data: vol,
					itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = ['#e64552','#3aa643'];
                            return  (params.dataIndex % 2 == 0 ) ? colorList[0] : colorList[1]
                        },
　　　　　　　　　　　　　
                    }
                },
				}]
			};
			var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			if(h < 950){
				state.market.option4.yAxis[0].axisLabel.show = false
			}
		},
		//画K线图
		drawkline: function(state, x) {
			// 引入 ECharts 主模块
			var echarts = require('echarts/lib/echarts');
			// 引入柱状图
			require('echarts/lib/chart/bar');
			require('echarts/lib/chart/line');
			require('echarts/lib/component/tooltip');
			require('echarts/lib/chart/candlestick');
			var kline, volume;
			if(state.isshow.isklineshow == false) {
				kline = echarts.init(document.getElementById(x.id1));
				volume = echarts.init(document.getElementById(x.id2));
				volume.group = 'group2';
				kline.group = 'group2';
				// 基于准备好的dom，初始化echarts实例
				echarts.connect("group2");
				state.isshow.isklineshow = true;
			} else {
				if(document.getElementById(x.id1) != null){
					kline = echarts.getInstanceByDom(document.getElementById(x.id1));
				}
				if(document.getElementById(x.id2) != null){
					volume = echarts.getInstanceByDom(document.getElementById(x.id2));
				}
			}
			kline.setOption(state.market.option3);
			volume.setOption(state.market.option4);
		},
		
    },
actions: {
				//初始化行情
		initQuoteClient: function(context) {
			context.state.quoteSocket = new WebSocket(context.state.market.quoteConfig.url_real);
			context.state.quoteSocket.onopen = function(evt) {
//				console.log('open');
				context.state.quoteSocket.send('{"Method":"Login","Parameters":{"UserName":"'+context.state.market.quoteConfig.userName+'","PassWord":"'+context.state.market.quoteConfig.passWord+'"}}');
			};
			context.state.quoteSocket.onclose = function(evt) {
				console.log('close');
				context.state.isshow.warningType = 1;
				context.state.isshow.warningShow = true;
				context.state.account.quoteStatus = false;
			};
			context.state.quoteSocket.onerror = function(evt) {
//				console.log('error');
			};
			context.state.quoteSocket.onmessage = function(evt) {
//				console.log('message');
				//console.log(evt.data)
				context.state.wsjsondata = JSON.parse(evt.data);
				if(context.state.wsjsondata.Method == "OnRspLogin") { // 登录行情服务器
					Toast({message: '行情服务器连接成功', position: 'bottom', duration: 2000});
					context.state.account.quoteStatus = true;
					// 查询服务器支持品种用于订阅
					context.state.quoteSocket.send('{"Method":"QryCommodity","Parameters":{' + null + '}}');
				} else if(context.state.wsjsondata.Method == "OnRspQryCommodity") { // 行情服务器支持的品种
					// 行情服务器支持的品种
					context.state.market.markettemp = JSON.parse(evt.data).Parameters;
					context.state.market.markettemp.forEach(function(e) {
						var key = e.CommodityNo;
						context.state.market.orderTemplist[key] = e;
					});
					if(context.state.market.commodityOrder){
						context.state.market.commodityOrder.forEach((o, i) => {
							context.state.quoteSocket.send('{"Method":"Subscribe","Parameters":{"ExchangeNo":"' + context.state.market.orderTemplist[o.commodityNo].ExchangeNo + '","CommodityNo":"' + o.commodityNo + '","ContractNo":"' + context.state.market.orderTemplist[o.commodityNo].MainContract +'"}}');
						});
					}
				} else if(context.state.wsjsondata.Method == "OnRspSubscribe") { // 订阅成功信息
					var key = JSON.parse(evt.data).Parameters.CommodityNo;
					context.state.market.templateList[key] = JSON.parse(evt.data).Parameters;
					var dealDetails = {CommodityNo: '', data: []}, _dealDetails = {};
					context.state.market.markettemp.forEach(function(e) {
						if(e.CommodityNo == key) {
							e.LastQuotation = JSON.parse(evt.data).Parameters.LastQuotation;
							context.state.market.Parameters.push(e);
							//订阅成功  成交信息
							_dealDetails['time'] = e.LastQuotation.DateTimeStamp.split(' ')[1];
							_dealDetails['price'] = e.LastQuotation.LastPrice;
							_dealDetails['volume'] = e.LastQuotation.LastVolume;
							_dealDetails['_price'] = e.LastQuotation.PreSettlePrice;
							_dealDetails['dotSize'] = e.DotSize;
							dealDetails.CommodityNo = e.CommodityNo;
							dealDetails.data.push(_dealDetails);
							context.state.market.tradeParameters.push(dealDetails); 
						}
					});
					//重新组装数据
					context.state.market.Parameters.forEach(function(o, i){
						context.state.market.commodityOrder.forEach(function(v){
							if(o.CommodityNo == v.commodityNo){
								o.isRecommend = v.isRecommend;
								o.commodityType = v.commodityType;
								o.contrast = v.contrast;
								o.orderNum = v.orderNum;
								o.id = v.id;
								o.check = 0;
							}
							
						});
					});
					context.state.market.quoteInitStep = true;
//					if(context.state.market.subscribeIndex == 1){
//						//初始化交易
//						context.dispatch('initTrade');
//					}
					context.state.market.subscribeIndex++;
				} else if(context.state.wsjsondata.Method == "OnRtnQuote") { // 最新行情
					var val = JSON.parse(evt.data).Parameters;
					var key = JSON.parse(evt.data).Parameters.CommodityNo;
					context.state.market.Parameters.forEach(function(a, r) {
						if(a.CommodityNo == key){
							if(JSON.parse(evt.data).Parameters.LastPrice > a.LastQuotation.LastPrice){
								context.state.market.quoteIndex = r;   //行情变颜色
								context.state.market.quoteColor = 'red';
							}else if(JSON.parse(evt.data).Parameters.LastPrice < a.LastQuotation.LastPrice){
								context.state.market.quoteIndex = r;   //行情变颜色
								context.state.market.quoteColor = 'green';
							}
						}
					});
					//合约成交明细
					var _dealDetails00 = {};
					context.state.market.tradeParameters.forEach(function(o, i){
						if(key == o.CommodityNo){
							_dealDetails00['time'] = val.DateTimeStamp.split(' ')[1];
							_dealDetails00['price'] = val.LastPrice;
							_dealDetails00['volume'] = val.LastVolume;
							_dealDetails00['_price'] = val.PreSettlePrice;
							_dealDetails00['dotSize'] = context.state.market.orderTemplist[key].DotSize;
							if(o.data.length >= 12){
								o.data.shift();
							}
							o.data.push(_dealDetails00);
						}
					});
					//更新数据
					context.state.market.templateList[key] = JSON.parse(evt.data).Parameters;
					context.state.market.markettemp.forEach(function(e, i) {
						//如果拿到的数据的CommodityNo与缓存的数据的CommodityNo相等
						if(JSON.parse(evt.data).Parameters.CommodityNo == e.CommodityNo) {
							//就把拿到数据存入缓存中
							e.LastQuotation = JSON.parse(evt.data).Parameters;
							context.state.market.orderTemplist[key] = e;
							//将显示数据进行更新
							context.state.market.Parameters.forEach(function(a, r) {
								if(a.CommodityNo == e.CommodityNo) {
									context.state.market.Parameters.splice(r, 1, e);
								}
							});
							
							
							
							if(context.state.market.currentNo == e.CommodityNo) {
								context.state.market.CacheLastQuote.push(JSON.parse(evt.data).Parameters);
								if(context.state.market.CacheLastQuote.length > 2){
									context.state.market.CacheLastQuote.shift();
								}
								//更新分时图
								if(context.state.isshow.isfensshow == true && context.state.isshow.isfens == true) {
									var arr = [], arr1, arr2, arr3, arr4;
									context.state.market.charttimetime = new Date();
									context.state.market.charttimems = context.state.market.charttimetime.getTime();
									context.state.market.charttime = context.state.market.charttimems - context.state.market.charttimems2;
									if(context.state.market.charttime >= 1000 || context.state.market.charttimetemp >= 1000) {
										arr = [];
										arr[0] = JSON.parse(evt.data).Parameters.DateTimeStamp;
										arr[1] = JSON.parse(evt.data).Parameters.LastPrice;
										arr[2] = JSON.parse(evt.data).Parameters.OpenPrice;
										arr[3] = JSON.parse(evt.data).Parameters.LowPrice;
										arr[4] = JSON.parse(evt.data).Parameters.HighPrice;
										arr[5] = JSON.parse(evt.data).Parameters.Position;
										arr[6] = JSON.parse(evt.data).Parameters.LastVolume;
										arr1 = JSON.parse(evt.data).Parameters.DateTimeStamp.split(' ');
										arr2 = arr1[1].split(':'); //最新时间
										arr3 = context.state.market.jsonData[context.state.market.currentNo].Parameters.Data[context.state.market.jsonData[context.state.market.currentNo].Parameters.Data.length - 1][0].split(' ');
										arr4 = arr3[1].split(':'); //历史时间
										if(arr2[1] == arr4[1]) {
											var time = context.state.market.jsonData[context.state.market.currentNo].Parameters.Data[context.state.market.jsonData[context.state.market.currentNo].Parameters.Data.length - 1][0];
											var vol = parseInt(context.state.market.jsonData[context.state.market.currentNo].Parameters.Data[context.state.market.jsonData[context.state.market.currentNo].Parameters.Data.length - 1][6]) + parseInt(arr[6]);
											context.state.market.jsonData[context.state.market.currentNo].Parameters.Data[context.state.market.jsonData[context.state.market.currentNo].Parameters.Data.length - 1] = arr;
											context.state.market.jsonData[context.state.market.currentNo].Parameters.Data[context.state.market.jsonData[context.state.market.currentNo].Parameters.Data.length - 1][0] = time;
											context.state.market.jsonData[context.state.market.currentNo].Parameters.Data[context.state.market.jsonData[context.state.market.currentNo].Parameters.Data.length - 1][6] = vol;
										}else{
//											context.state.market.jsonData.Parameters.Data.shift();
											context.state.market.jsonData[context.state.market.currentNo].Parameters.Data.push(arr);
										}
										context.commit('setfensoption', context.state.market.contrastData);
										context.commit('drawfens', {
											id1: 'fens',
											id2: 'volume'
										});
										context.state.market.charttimetemp = 0;
									} else {
										context.state.market.charttimetemp += context.state.market.charttime;
									}
									context.state.market.charttimetime2 = new Date();
									context.state.market.charttimems2 = context.state.market.charttimetime2.getTime();
								}
								//更新闪电图
								if(context.state.isshow.islightshow == true && context.state.isshow.islight == true) {
									context.state.market.jsonTow = JSON.parse(evt.data);
									context.commit('setlightDate');
									context.commit('drawlight', 'light');
								}
								//更新K线图
								if(context.state.isshow.isklineshow == true && context.state.isshow.iskline == true) {
									if(context.state.market.CacheLastQuote[1].TotalVolume <= context.state.market.CacheLastQuote[0].TotalVolume){
										return;
									}
									var arr = [];
									arr[0] = JSON.parse(evt.data).Parameters.DateTimeStamp;
									arr[1] = JSON.parse(evt.data).Parameters.LastPrice;
									arr[2] = JSON.parse(evt.data).Parameters.OpenPrice;
									arr[3] = JSON.parse(evt.data).Parameters.LowPrice;
									arr[4] = JSON.parse(evt.data).Parameters.HighPrice;
									arr[5] = JSON.parse(evt.data).Parameters.Position;
									context.state.market.volume+=JSON.parse(evt.data).Parameters.LastVolume;
									arr[6] = context.state.market.volume;
									
									var arr1 = JSON.parse(evt.data).Parameters.DateTimeStamp.split(' '); //得到的时间
									//["20", "47", "38"]
									var arr2 = arr1[1].split(':'); //得到的数据
									var arr3 = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0].split(' ');
									//["20", "48", "00"]
									var arr4 = arr3[1].split(':'); //历史
									var _arr1 = JSON.parse(evt.data).Parameters.DateTimeStamp;
									_arr1 = _arr1.split(' ')[0].replace(/-/g, '/') + ' ' + _arr1.split(' ')[1].split('.')[0];
									var _arr3 = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
									_arr3 = _arr3.replace(/-/g, '/');
									if(context.state.market.selectTime == 1) {
										if(arr2[1] == arr4[1]) {
											arr[0] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
											if(arr[1] < context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]) {
												arr[3] = arr[1];
											} else {
												arr[3] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]
											}
											if(arr[1] > context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]) {
												arr[4] = arr[1];
											} else {
												arr[4] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]
											}
											arr[1] = arr[1];
											arr[2] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][2];
											arr[5] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][5];
											arr[6] = context.state.market.volume;
											var length = context.state.market.jsonDataKline.Parameters.Data.length;
											context.state.market.jsonDataKline.Parameters.Data.splice(length-1,1,arr);
										} else{
											var arrTemp = [];
											context.state.market.jsonDataKline.Parameters.Data.shift();
											context.state.market.volume = 0;
											arrTemp[0] = arr[0].substring(0, arr[0].length - 2) + '00';
											arrTemp[1] = arr[1];
											arrTemp[2] = arr[1];
											arrTemp[3] = arr[1];
											arrTemp[4] = arr[1];
											arrTemp[5] = arr[5];
											arrTemp[6] = arr[6];
											arr = arrTemp;
											context.state.market.jsonDataKline.Parameters.Data.push(arrTemp);
										}
									}else if(context.state.market.selectTime == 5){
										if(arr2[1]%5 != 0) {
											arr[0] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
											if(arr[1] < context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]) {
												arr[3] = arr[1];
											} else {
												arr[3] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]
											}
											if(arr[1] > context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]) {
												arr[4] = arr[1];
											} else {
												arr[4] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]
											}
											arr[1] = arr[1];
											arr[2] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][2];
											arr[5] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][5];
											//arr[6] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][6];
											arr[6] = context.state.market.volume;
											var length = context.state.market.jsonDataKline.Parameters.Data.length;
											context.state.market.jsonDataKline.Parameters.Data.splice(length-1,1,arr);
											//context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1] = arr;
										} else if(arr2[1]%5 == 0 && arr2[2]=='00'){
											var arrTemp = [];
											context.state.market.jsonDataKline.Parameters.Data.shift();
											context.state.market.volume=0;
											arrTemp[0] = arr[0].substring(0, arr[0].length - 2) + '00';
											arrTemp[1] = arr[1];
											arrTemp[2] = arr[1];
											arrTemp[3] = arr[1];
											arrTemp[4] = arr[1];
											arrTemp[5] = arr[5];
											arrTemp[6] = arr[6];
											arr = arrTemp;
											context.state.market.jsonDataKline.Parameters.Data.push(arr);
										}
									}else if(context.state.market.selectTime == 15){
										if(arr2[1]%15 != 0) {
											arr[0] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
											if(arr[1] < context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]) {
												arr[3] = arr[1];
											} else {
												arr[3] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]
											}
											if(arr[1] > context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]) {
												arr[4] = arr[1];
											} else {
												arr[4] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]
											}
											arr[1] = arr[1];
											arr[2] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][2];
											arr[5] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][5];
											//arr[6] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][6];
											//context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1] = arr;
											arr[6] = context.state.market.volume;
											var length = context.state.market.jsonDataKline.Parameters.Data.length;
											context.state.market.jsonDataKline.Parameters.Data.splice(length-1,1,arr);
										} else if(arr2[1]%15 == 0 && arr2[2]=='00'){
											var arrTemp = [];
											context.state.market.jsonDataKline.Parameters.Data.shift();
											arrTemp[0] = arr[0].substring(0, arr[0].length - 2) + '00';
											arrTemp[1] = arr[1];
											arrTemp[2] = arr[1];
											arrTemp[3] = arr[1];
											arrTemp[4] = arr[1];
											arrTemp[5] = arr[5];
											arrTemp[6] = arr[6];
											arr = arrTemp;
											context.state.market.volume=0;
											context.state.market.jsonDataKline.Parameters.Data.push(arr);
										}
									}else if(context.state.market.selectTime == 30){
										if(arr2[1]%30 != 0) {
											arr[0] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
											if(arr[1] < context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]) {
												arr[3] = arr[1];
											} else {
												arr[3] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]
											}
											if(arr[1] > context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]) {
												arr[4] = arr[1];
											} else {
												arr[4] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]
											}
											arr[1] = arr[1];
											arr[2] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][2];
											arr[5] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][5];
											//arr[6] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][6];
											//context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1] = arr;
											arr[6] = context.state.market.volume;
											var length = context.state.market.jsonDataKline.Parameters.Data.length;
											context.state.market.jsonDataKline.Parameters.Data.splice(length-1,1,arr);
										} else if(arr2[1]%30 == 0 && arr2[2]=='00'){
											var arrTemp = [];
											context.state.market.jsonDataKline.Parameters.Data.shift();
											arrTemp[0] = arr[0].substring(0, arr[0].length - 2) + '00';
											arrTemp[1] = arr[1];
											arrTemp[2] = arr[1];
											arrTemp[3] = arr[1];
											arrTemp[4] = arr[1];
											arrTemp[5] = arr[5];
											arrTemp[6] = arr[6];
											arr = arrTemp;
											context.state.market.volume = 0;
											context.state.market.jsonDataKline.Parameters.Data.push(arr);
										}
									}else if(context.state.market.selectTime == 60){
										if(arr2[0] == arr4[0]) {
											arr[0] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
											if(arr[1] < context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]) {
												arr[3] = arr[1];
											} else {
												arr[3] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]
											}
											if(arr[1] > context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]) {
												arr[4] = arr[1];
											} else {
												arr[4] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]
											}
											arr[1] = arr[1];
											arr[2] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][2];
											arr[5] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][5];
											arr[6] = context.state.market.volume;
											var length = context.state.market.jsonDataKline.Parameters.Data.length;
											context.state.market.jsonDataKline.Parameters.Data.splice(length-1,1,arr);
										} else{
											var arrTemp = [];
											context.state.market.jsonDataKline.Parameters.Data.shift();
											context.state.market.volume = 0;
											arrTemp[0] = arr[0].substring(0, arr[0].length - 2) + '00';
											arrTemp[1] = arr[1];
											arrTemp[2] = arr[1];
											arrTemp[3] = arr[1];
											arrTemp[4] = arr[1];
											arrTemp[5] = arr[5];
											arrTemp[6] = arr[6];
											arr = arrTemp;
											context.state.market.jsonDataKline.Parameters.Data.push(arrTemp);
										}
									}else if(context.state.market.selectTime == 120){
										let t = 120 * 60 * 1000;
										let startTime = Date.parse(_arr1);
										let endTime = Date.parse(_arr3);
										let _t = startTime - endTime;
										if(t > _t) {
											arr[0] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
											if(arr[1] < context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]) {
												arr[3] = arr[1];
											} else {
												arr[3] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]
											}
											if(arr[1] > context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]) {
												arr[4] = arr[1];
											} else {
												arr[4] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]
											}
											arr[1] = arr[1];
											arr[2] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][2];
											arr[5] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][5];
											arr[6] = context.state.market.volume;
											var length = context.state.market.jsonDataKline.Parameters.Data.length;
											context.state.market.jsonDataKline.Parameters.Data.splice(length-1,1,arr);
										}else{
											var arrTemp = [];
											context.state.market.jsonDataKline.Parameters.Data.shift();
											context.state.market.volume = 0;
											arrTemp[0] = arr[0].substring(0, arr[0].length - 2) + '00';
											arrTemp[1] = arr[1];
											arrTemp[2] = arr[1];
											arrTemp[3] = arr[1];
											arrTemp[4] = arr[1];
											arrTemp[5] = arr[5];
											arrTemp[6] = arr[6];
											arr = arrTemp;
											context.state.market.jsonDataKline.Parameters.Data.push(arrTemp);
										}
									}else if(context.state.market.selectTime == 240){
										let t = 240 * 60 * 1000;
										let startTime = Date.parse(_arr1);
										let endTime = Date.parse(_arr3);
										let _t = startTime - endTime;
										if(t > _t) {
											arr[0] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
											if(arr[1] < context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]) {
												arr[3] = arr[1];
											} else {
												arr[3] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]
											}
											if(arr[1] > context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]) {
												arr[4] = arr[1];
											} else {
												arr[4] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]
											}
											arr[1] = arr[1];
											arr[2] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][2];
											arr[5] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][5];
											arr[6] = context.state.market.volume;
											var length = context.state.market.jsonDataKline.Parameters.Data.length;
											context.state.market.jsonDataKline.Parameters.Data.splice(length-1,1,arr);
										} else{
											var arrTemp = [];
											context.state.market.jsonDataKline.Parameters.Data.shift();
											context.state.market.volume = 0;
											arrTemp[0] = arr[0].substring(0, arr[0].length - 2) + '00';
											arrTemp[1] = arr[1];
											arrTemp[2] = arr[1];
											arrTemp[3] = arr[1];
											arrTemp[4] = arr[1];
											arrTemp[5] = arr[5];
											arrTemp[6] = arr[6];
											arr = arrTemp;
											context.state.market.jsonDataKline.Parameters.Data.push(arrTemp);
										}
									}else if(context.state.market.selectTime == 720){
										let t = 720 * 60 * 1000;
										let startTime = Date.parse(_arr1);
										let endTime = Date.parse(_arr3);
										let _t = startTime - endTime;
										if(t > _t) {
											arr[0] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
											if(arr[1] < context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]) {
												arr[3] = arr[1];
											} else {
												arr[3] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]
											}
											if(arr[1] > context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]) {
												arr[4] = arr[1];
											} else {
												arr[4] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]
											}
											arr[1] = arr[1];
											arr[2] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][2];
											arr[5] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][5];
											arr[6] = context.state.market.volume;
											var length = context.state.market.jsonDataKline.Parameters.Data.length;
											context.state.market.jsonDataKline.Parameters.Data.splice(length-1,1,arr);
										} else{
											var arrTemp = [];
											context.state.market.jsonDataKline.Parameters.Data.shift();
											context.state.market.volume = 0;
											arrTemp[0] = arr[0].substring(0, arr[0].length - 2) + '00';
											arrTemp[1] = arr[1];
											arrTemp[2] = arr[1];
											arrTemp[3] = arr[1];
											arrTemp[4] = arr[1];
											arrTemp[5] = arr[5];
											arrTemp[6] = arr[6];
											arr = arrTemp;
											context.state.market.jsonDataKline.Parameters.Data.push(arrTemp);
										}
									}else if(context.state.market.selectTime == 1440){
										if(arr2[1]=='00' && arr2[2]=='00') {
											arr[0] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][0];
											if(arr[1] < context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]) {
												arr[3] = arr[1];
											} else {
												arr[3] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][3]
											}
											if(arr[1] > context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]) {
												arr[4] = arr[1];
											} else {
												arr[4] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][4]
											}
											arr[1] = arr[1];
											arr[2] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][2];
											arr[5] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][5];
											//arr[6] = context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1][6];
											//context.state.market.jsonDataKline.Parameters.Data[context.state.market.jsonDataKline.Parameters.Data.length - 1] = arr;
											arr[6] = context.state.market.volume;
											var length = context.state.market.jsonDataKline.Parameters.Data.length;
											context.state.market.jsonDataKline.Parameters.Data.splice(length-1,1,arr);
										} else if(arr2[0]=='00' && arr2[1]=='00' && arr2[2]=='00'){
											var arrTemp = [];
											context.state.market.jsonDataKline.Parameters.Data.shift();
											arrTemp[0] = arr[0].substring(0, arr[0].length - 2) + '00';
											arrTemp[1] = arr[1];
											arrTemp[2] = arr[1];
											arrTemp[3] = arr[1];
											arrTemp[4] = arr[1];
											arrTemp[5] = arr[5];
											arrTemp[6] = arr[6];
											arr = arrTemp;
											context.state.market.volume = 0;
											context.state.market.jsonDataKline.Parameters.Data.push(arr);
										}
									}
									context.commit('setklineoption',context.state.market.strategyData);
									context.commit('drawkline', {
										id1: 'kline',
										id2: 'kline_volume'
									});
								}
							}
						}
					});
				} else if(context.state.wsjsondata.Method == "OnRspQryHistory") { // 历史行情
					let data = JSON.parse(evt.data);
					if(data.Parameters.HisQuoteType == 0){
						context.state.market.jsonData[data.Parameters.CommodityNo] = data;
						if(context.state.isshow.isfensInit == true) return;
						if(context.state.isshow.isfens == true){
							context.commit('setfensoption');
							context.commit('drawfens', {
								id1: 'fens',
								id2: 'volume'
							});
						}
					}else{
						context.state.market.jsonDataKline = data;
						let len = context.state.market.jsonDataKline.Parameters.Data.length;
//						console.log(context.state.market.jsonDataKline.Parameters)
						context.state.market.volume = context.state.market.jsonDataKline.Parameters.Data[len - 1][6];
						if(context.state.isshow.iskline == true){
							context.commit('setklineoption');
							context.commit('drawkline', {
								id1: 'kline',
								id2: 'kline_volume'
							});
						}
					}
				}
			}
		}
	}
})

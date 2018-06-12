/**
 * Created by Administrator on 2017/6/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { Toast, Indicator } from 'mint-ui';
import pro from "../assets/js/common.js"

Vue.use(Vuex);
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
		backtestIndexArr:[]
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
			url_real: "ws://192.168.0.232:19002",  //测试地址/
//			url_real: "ws://quote.zhishutianxia.com:19002",   //正式地址
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
//			url:"http://139.224.6.183:8989", //physhon生产环境，
			url:"http://192.168.0.223:8989" //physhon测试环境
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
		environment: 'test',
		//打包的时候，值为 build ，开发的时候，值为 dev
		setting: 'dev',
	},
	getters: {  
		PATH: function(state) {
			if(state.setting == 'dev') {
//				return 'http://192.168.0.132:8080/qiw-platform';
				return '/api'
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
    },
actions: {
		//处理交易数据
	
	}
})

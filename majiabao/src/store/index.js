import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from 'mint-ui'

Vue.use(Vuex)
let market = {
  state: {
    quoteConfig:{
			version: '5.1.2',    //版本
			//url_real: "ws://192.168.0.232:19002",  //测试地址
			url_real: "ws://quote.zhishutianxia.com:19002",   //正式地址
			userName: "13677622344",
			passWord: "a123456"
    },
    //用来判定是否初始化
    quoteStatus:false,
    //第一次所有合约列表
    markettemp: [],
    //订阅成功后查询品种列表
    orderTemplist:{},
    //当前类型平台合约
    commodityOrder: ['NG', 'CL', 'SI', 'BRN', 'QM', 'HG', 'GC',  'IH', 'FDXM', 'MHI', 'HHI', 'NQ', 'HSI', 'ES', 'MCH','NIY', 'NK', 'IF', 'FDAX', 'CN', 'YM'],
    //第二个品种
    //commodityOrder2: ['IH', 'FDXM', 'MHI', 'HI', 'NQ', 'HSI', 'ESI', 'MCH','NIY', 'NK', 'IF', 'FDAX', 'CN', 'YM'],
    //存订阅成功后的行情信息
    templateList:{},
    testArr: []
  }
}
export default new Vuex.Store({
  modules: {
    market
  },
  state: {
    wsjsondata: {},
    quoteSocket: {},
    testNum:0
  },
  mutations:{
    test1 (state) {
      state.testNum++
    }
  },
  actions: {
    test1 (context) {
      context.commit('test1')
    },
    initQuoteClient (context) {
      let {quoteSocket, wsjsondata} = context.state
      let {quoteConfig, quoteStatus, markettemp, orderTemplist, commodityOrder, templateList} = context.state.market
      //console.log(quoteSocket)
      const loginParams = {
        Method: 'Login',
        Parameters: {
          UserName: quoteConfig.userName,
          PassWord: quoteConfig.passWord
        }
      }
      quoteSocket = new WebSocket(quoteConfig.url_real);

      quoteSocket.onopen  = (evt)=>{
       // console.log('open')
        quoteSocket.send(JSON.stringify(loginParams))
      }
      quoteSocket.onclose = (evt) =>{
        console.log('close');
		    context.state.market.quoteStatus = true;
      }
      quoteSocket.onmessage = (evt) =>{
       // console.log('message');
        wsjsondata = JSON.parse(evt.data);
        //console.log(wsjsondata)
        if(wsjsondata.Method == "OnRspLogin"){
          //Toast({message: '行情服务器连接成功', position: 'bottom', duration: 2000});
          context.state.market.quoteStatus = true;
          quoteSocket.send('{"Method":"QryCommodity","Parameters":{' + null + '}}');
        }else if(wsjsondata.Method == "OnRspQryCommodity"){
          markettemp = JSON.parse(evt.data).Parameters;
          context.state.market.markettemp = markettemp;
          markettemp.forEach((obj) => {
            let key = obj.CommodityNo;
            orderTemplist[key] = obj;
          });

          console.log(context.state.market.orderTemplist);
          //推送我需要的合约
          if(commodityOrder){
						commodityOrder.forEach((o, i) => {
              let params = {
                Method: 'Subscribe',
                Parameters: {
                  ExchangeNo: orderTemplist[o].ExchangeNo, //交易所
                  CommodityNo: o, //传递代码
                  ContractNo: orderTemplist[o].MainContract //期数
                }
              }
							quoteSocket.send(JSON.stringify(params));
						});
					}          
        }else if(wsjsondata.Method == "OnRspSubscribe") {
          //订阅成功后
          let quotationItem = JSON.parse(evt.data).Parameters;
          let key = quotationItem.CommodityNo;
          //console.log(quotationItem);
          //console.log(orderTemplist[key])
          templateList[key] =  Object.assign({CommodityName: orderTemplist[key].CommodityName},quotationItem);
          context.state.market.testArr.push(templateList[key])
          //console.log(templateList[key])
          
        }else if(wsjsondata.Method == "OnRtnQuote") {
          //console.log(JSON.parse(evt.data).Parameters)
          let newTemplateList  = JSON.parse(evt.data).Parameters;
          let key = newTemplateList.CommodityNo;
          let {LastPrice, TotalVolume, ChangeRate} = newTemplateList;
          context.state.market.testArr.forEach((value)=>{
            if(value.CommodityNo == key){
              value.LastQuotation = newTemplateList              
            }
          })
        // console.log(context.state.market.testArr)
          context.state.market.templateList = templateList;
         // console.log(context.state.market.templateList)
        }   
      }
    }
  }
  
})
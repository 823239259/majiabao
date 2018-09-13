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
  },
  mutations: {
    update_markettemp (state, arr) {
      state.markettemp = arr
    },
    update_orderTemplist (state, obj) {
      state.orderTemplist = obj
    },
    update_templateList (state, obj) {
      state.templateList = obj
    },
    init_testArr (state, obj) {
      state.testArr.push(obj)
    },
    update_testArr(state, obj) {
      state.testArr.forEach(e => {
        if(e.CommodityNo == obj.key ){
          value.LastQuotation = obj.newTemplateList
        }
      })
    }


  }
}
export default new Vuex.Store({
  modules: {
    market
  },
  state: {
    wsjsondata: {},
    quoteSocket: {},
    testNum:0,
    //用来判定是否初始化
    quoteStatus:false,
  },
  mutations:{
    test1 (state) {
      state.testNum++
    },
    update_quoteStatus (state, boolean ) {
      state.quoteStatus = boolean
    }
  },
  actions: {
    test1 (context) {
      context.commit('test1')
    },
    initQuoteClient (context) {
      /* 
        行情websocket连接推送,并将合约详情订阅查询 (store + websocket)
         1. 建立websocket  ----- function ==> webSocketLink
         2. 写onmessage回调函数,
              1. 订阅业务过程: 1.登录websocket => 2. 查询拿到所有的合约 => 3. 订阅所有的合约 => 4. 实时更新过推送的消息
              2.  判定方式 : websocket每次推送: 一次send 对应 一次应答 , 根据 应答进行状态判定
      
      */
     
      
      let {quoteSocket, wsjsondata} = context.state
      let {quoteConfig, quoteStatus, markettemp, orderTemplist, commodityOrder, templateList, testArr} = context.state.market
      let quoteSocket1 = webSocketLink(context);
      // console.log(testArr)
      quoteSocket1.onmessage = function (evt){        
        onMessage.call(this,evt)
      }
      function onMessage (evt) {
        //console.log('message');
        wsjsondata = JSON.parse(evt.data);
        //console.log(wsjsondata)
        switch (wsjsondata.Method) {
          case "OnRspLogin":
           //Toast({message: '行情服务器连接成功', position: 'bottom', duration: 2000});
            context.commit('update_quoteStatus',true)
            this.send('{"Method":"QryCommodity","Parameters":{' + null + '}}');           
            break;
          case "OnRspQryCommodity":
            //储存所有的合约
            markettemp = JSON.parse(evt.data).Parameters;
            context.commit('update_markettemp',markettemp)
            markettemp.forEach((obj) => {             
              let key = obj.CommodityNo;
              orderTemplist[key] = obj;
            });
            context.commit('update_orderTemplist',orderTemplist)
           // 推送我需要的合约
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
                this.send(JSON.stringify(params));
              });
            }
            break;
          case "OnRspSubscribe":
            //订阅成功后
            {
            let quotationItem = JSON.parse(evt.data).Parameters;
            let key = quotationItem.CommodityNo;
            //console.log(quotationItem);
            //console.log(orderTemplist[key])
            templateList[key] = Object.assign({CommodityName: orderTemplist[key].CommodityName},quotationItem)  
            context.commit('init_testArr',templateList[key])         
            }
            break;
            case "OnRtnQuote":
              //console.log(JSON.parse(evt.data).Parameters)
              {
              let newTemplateList  = JSON.parse(evt.data).Parameters;
              let key = newTemplateList.CommodityNo;
              testArr.forEach((value)=>{
                if(value.CommodityNo == key){
                  value.LastQuotation = newTemplateList              
                }
              })
            // console.log(context.state.market.testArr)
              context.state.market.templateList = templateList;
            // console.log(context.state.market.templateList)
            }
            break; 
          default:
            break;
        }
      }
      // 建立websocket连接
      function webSocketLink(context) {
        let {quoteConfig} = context.state.market
        const loginParams = {
          Method: 'Login',
          Parameters: {
            UserName: quoteConfig.userName,
            PassWord: quoteConfig.passWord
          }
        }
        let quoteSocket = new WebSocket(quoteConfig.url_real)
        quoteSocket.onopen  = (evt)=>{
            console.log('open')
          quoteSocket.send(JSON.stringify(loginParams))
        }
        quoteSocket.onclose = (evt) =>{
          console.log('close');
          context.state.market.quoteStatus = true;
        }
        return quoteSocket
      }
      
    }
  }
  
})
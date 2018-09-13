<template>
	<div id="klineDetails">
		<template v-for="(v, index) in parameters">
			<div v-if="v.CommodityNo == currentNo">
				<header>
					<ul>
						<li @click="routerback"><i></i></li>
						<li>
							<h1>k线数据详情</h1>
						</li>
						<li @click="addOptional"><i></i></li>
					</ul>
				</header>
				<div id="container">
					<div class="klinePic">
						<div class="chartsList">
							<span v-for="(key,index) in chartsList" :class="{current:currentChartsNum == index}" @click="menuEvent(index)">{{key}}</span>
						</div>
						<div class="charts_container">
							<components :is="currentChartsView" v-if="chartsShow"></components>
						</div>
					</div>
					<div class="commodityName">
						<ul>
							<li>{{v.CommodityName}}</li>
							<li>
								<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span>
								<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
								<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeRate | fixNumTwo}}%</span>
							</li>
						</ul>
					</div>
					<div class="strategy">
						<div class="name">
							策略选择
						</div>
						<div class=" traggle_content">
							
								请将策略拖动至阴影区域K线图将实时直观展示买卖点
							
						</div>
						<div class="strategyList" id="draggle_box">
							<div class="list draggle" v-for="(item,index) in strategyList"  
							@touchstart="handleDraggleStart"
							@touchmove="handleDraggleMove(index, $event)"
							@touchend="handleDraggleEnd(item, $event)"
							:key="index">
								<div class="top" :id="'draggle'+index">
									<p>{{item.name}}</p>
								</div>
								<div class="bottom"></div>
							</div>
						</div>
					</div>
					<div class="black"></div>
					<div class="infoDetails">
						<div class="name">数据盘口</div>
						<div class="infos">
							<ul>
								<li>
									<span>现手</span>
									<span>{{v.LastQuotation.LastVolume}}</span>
								</li>
								<li>
									<span>买价</span>
									<span>{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>卖价</span>
									<span>{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>平均价</span>
									<span>{{v.AveragePrice ? v.AveragePrice : 0}}</span>
								</li>
							</ul>
						</div>
						<div class="infos">
							<ul>
								<li>
									<span>买量</span>
									<span>{{v.LastQuotation.BidQty1}}</span>
								</li>
								<li>
									<span>卖量</span>
									<span>{{v.LastQuotation.AskQty1}}</span>
								</li>
								<li>
									<span>成交量</span>
									<span>{{v.LastQuotation.TotalVolume}}</span>
								</li>
								<li>
									<span>持仓量</span>
									<span>{{v.LastQuotation.Position}}</span>
								</li>
							</ul>
						</div>
						<div class="infos">
							<ul>
								<li>
									<span>开盘</span>
									<span class="default" :class="{red: v.LastQuotation.OpenPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.OpenPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.OpenPrice | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>昨结</span>
									<span>{{v.LastQuotation.PreSettlePrice | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>最高价</span>
									<span class="default" :class="{red: v.LastQuotation.HighPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.HighPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.HighPrice | fixNum(v.DotSize)}}</span>
								</li>
								<li>
									<span>最低价</span>
									<span class="default" :class="{red: v.LastQuotation.LowPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LowPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LowPrice | fixNum(v.DotSize)}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="black"></div>
					<div class="name">买家趋势</div>
					<div class="buySell">
						 <div id="pie1"></div> 
					</div>
					<div class="black"></div>
					<div class="name">对比合约</div>
					<div class="currentCommodityNo">
						<span>当前合约</span>
						<span>最新价</span>
						<span>涨跌幅</span>
					</div>
					<div class="currentCommodityNoInfo">
						<span>{{v.CommodityName}}</span>
						<span :class="{red: v.LastQuotation.LastPrice > v.LastQuotation.PreSettlePrice, green: v.LastQuotation.LastPrice < v.LastQuotation.PreSettlePrice}">{{v.LastQuotation.LastPrice | fixNum(v.DotSize)}}</span>
						<span :class="{green: v.LastQuotation.ChangeRate < 0, red: v.LastQuotation.ChangeRate > 0}">{{v.LastQuotation.ChangeValue | fixNum(v.DotSize)}}</span>
					</div>
					<div class="currentCommodityNo">
						<span>对比合约</span>
						<span>最新价</span>
						<span>涨跌幅</span>
					</div>
					<div class="currentCommodityNoInfo">
						<span>美黄金</span>
						<span>16.2</span>
						<span>123.3</span>
					</div>
					<div class="name">您认为后续走势？</div>
					<div class="buySellBar">
						<mt-range v-model="rangleft" :barHeight="20" :min="0" :max="100" :step="1"></mt-range>
						<ul class="duoKong">
							<li>
								<span class="red">{{rangleft}}%</span>
								<span class="green">{{100-rangleft}}%</span>
							</li>
							<li>
								<span @click="chooseDuo('add')">我看多</span>
								<span @click="chooseDuo('del')">我看空</span>
							</li>
						</ul>
					</div>
					<div class="black"></div>
					<talkArea />
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import pro from '../../assets/js/common.js'
	import { mapMutations, mapActions } from 'vuex'
	import { Toast, MessageBox, Indicator } from 'mint-ui';
	import klineOne from './klineOne.vue'
	import klineThirty from './klineThirty.vue'
	import klineDay from './klineDay.vue'
	import klineFive from './klineFive.vue'
	import klineOneHour from './klineOneHour.vue'
	import fens from './fens.vue'
	import talkArea from '../../components/talkArea'
	let echarts = require('echarts/lib/echarts');
  	// 引入饼图组件
  	require('echarts/lib/chart/pie');
  	// 引入提示框和图例组件
  	require('echarts/lib/component/title');
  	require('echarts/lib/component/tooltip');
  	require('echarts/lib/component/legend');
  	require("echarts/lib/component/legendScroll");

	export default {
		name: "klineDetails",
		mixins: [pro.mixinsToCustomer],
		data() {
			return {
				title: "",
				currentNo: '',
				total: '',
				total1: "",
				userInfo: localStorage.user ? JSON.parse(localStorage.user) : '',
				bottomList1: [{
						name: '101',
						method: 'dianzan'
					},
					{
						name: '工具箱',
						path: '/tools'
					},
					{
						name: '推荐给朋友',
						method: 'shareSystem'
					},

				],
				chartsList: ['1分k线', '5分k线', '30分k线', '1小时k线', '日K'],
				currentChartsNum: 0,
				currentChartsView: 'klineOne',
				chartsShow: false,
				chartsHight: 5.4,
				strategyList: [
					{
						name: '经典日内策略',
						type: 'Rbreaker'
					},
					{
						name: '双重推力策略',
						type: 'DualThrust'
					},
					{
						name: 'Boll分析策略',
						type: 'Bollingerbandit'
					},
					{
						name: '均线加权策略',
						type: 'SMA'
					},
					{
						name: '查德丹尼斯策略',
						type: 'Turtle'
					},
					{
						name: '三价通道策略',
						type: 'Jintena'
					},
				],
				ContractNo: '',
				dian: '',
				chooseKline: '分时',
				id1: {
					id1: 'kline',
					id2: 'kline_volume'
				},
				strategyData1: [],
				strategyK: "",
				rangleft:50,
				 oW: 0, //draggle 左边
				oH: 0, //draggle 右边
				IsClone: true, // 是否clone
				money: '1000000',
			currentIndex: 0,
			strategyChecked: 'SMA',
			}
		},
		components: {
			klineOne,
			klineFive,
			klineThirty,
			klineDay,
			klineOneHour,
			talkArea
		},
		computed: {
			parameters() {
				this.$store.state.market.Parameters.forEach((a, i) => {
					if(a.CommodityNo == this.currentNo) {
						this.$store.state.market.currentdetail = a;
						this.ContractNo = a.MainContract
						this.total = Number(a.LastQuotation.BidQty1) + Number(a.LastQuotation.BidQty2) + Number(a.LastQuotation.BidQty3) + Number(a.LastQuotation.BidQty4) + Number(a.LastQuotation.BidQty5)
						this.total1 = Number(a.LastQuotation.AskQty1) + Number(a.LastQuotation.AskQty2) + Number(a.LastQuotation.AskQty3) + Number(a.LastQuotation.AskQty4) + Number(a.LastQuotation.AskQty5)
					}
				})
				return this.$store.state.market.Parameters;
			},
			orderTemplist() {
				return this.$store.state.market.orderTemplist;
			},
			tradeName() {
				return this.$store.state.tradeName;
			},
			quoteSocket() {
				return this.$store.state.quoteSocket;
			},
			jsonDataKline() {
				return this.$store.state.market.jsonDataKline;
			},
			physhonUrl() {
				return this.$store.state.market.physhon.url
			}
		},
		methods: {
			...mapMutations([
				'setfensoption', 'drawfens', 'setklineoption', 'drawkline'
			]),
			chooseDuo:function(type){
				type == "add" ? this.rangleft++ : this.rangleft-- ;
			},
			drawPie:function(){
				let mycharts = echarts.init(document.getElementById('pie1'));
				var option = {
					legend: {
				        orient: 'vertical',
				        x: 'left',
				        data:['买','卖']
				    },
				    series: [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius: ['50%', '70%'],
				            avoidLabelOverlap: false,
				            label: {
				                normal: {
				                    show: false,
				                    position: 'center'
				                },
				                emphasis: {
				                    show: true,
				                    textStyle: {
				                        fontSize: '30',
				                        fontWeight: 'bold'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
				                }
				            },
				            data:[
				                {value:this.total, name:'卖', itemStyle:{normal:{color:'#14da8b'}}},
				                {value:this.total1, name:'买', itemStyle:{normal:{color:'#ff576e'}}},
				            ],
				            
				        }
				    ]
				}
				mycharts.setOption(option);
			},
			baifenbi(a, b) {
				a = Number(a)
				b = Number(b)
				//console.log(a,b)
				if(a == 0 && b == 0) return 0;
				return((a / (a + b)) * 100).toFixed(2) + '%'
			},
			toBackProbe: function(val, k) {
				MessageBox.confirm("是否使用策略进行回测？").then(action => {
					this.$store.state.isshow.isfensshow = false;
					this.$store.state.isshow.isklineshow = false;
					this.$store.state.isshow.islightshow = false;
					this.$router.push({
						path: "/backProbe",
						query: {
							strategyName: val,
							strategyK: k,
							CommodityNoK: this.currentNo,
							ContractNo: this.ContractNo
						}
					});
				});
			},
			operateData: function() {
				this.chartsShow = true;
				//允许画图
				this.$store.state.isshow.isfensInit = false;
//				this.$store.state.isshow.iskline = false;
				//渲染画图
				this.currentChartsNum = 0;
				this.currentChartsView = 'klineOne';
//				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
//				this.$store.state.isshow.islightshow = false;
			},
			//选择画图类型
			menuEvent: function(index) {
				//允许画图
				this.$store.state.isshow.isfensInit = false;
				this.currentChartsNum = index;
				switch(index) {
					case 0:
						this.currentChartsView = 'klineOne';
						this.chooseKline = '1min';
						break;
					case 1:
						this.currentChartsView = 'klineFive';
						this.chooseKline = '5min';
						break;
					case 2:
						this.currentChartsView = 'klineThirty';
						this.chooseKline = '30min';
						break;
					case 3:
						this.currentChartsView = 'klineOneHour';
						this.chooseKline = '1hour';
						break;
					case 4:
						this.currentChartsView = 'klineDay';
						this.chooseKline = '1day';
						break;
				}
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
//				this.parameters.forEach((o, i) => {
//					o.check = 0;
//				});
			},
			routerback: function() {
				this.$router.go(-1);
				this.chartsShow = false;
				this.$store.state.isshow.isfensshow = false;
				this.$store.state.isshow.isklineshow = false;
				this.$store.state.isshow.islightshow = false;
			},
			addOptional: function() {
				this.shareSystem();
			},
			//选择回测类型
			choseStrategy: function(e, id) {
				if(this.chooseKline == 'shandian' || this.chooseKline == "分时") {
					Toast({
						message: '只能在K线图选择策略',
						position: 'bottom',
						duration: 1500
					});
				} else if(id == 'haigui') {
					Toast({
						message: '尽情期待',
						position: 'bottom',
						duration: 1500
					});
				} else {
					$(".celue_pie p").removeClass('current');
					$(e.target).addClass('current');
					this.strategyK = id;
					clearInterval(this.timeing);
					this.strategyData1 = [];
					this.setklineoption(this.strategyData1),
						this.$store.state.market.strategyData = this.strategyData1;
					this.drawkline(this.id1);
					Indicator.open({
						spinnerType: 'fading-circle'
					});
					//第一步回测拿到打点数据
					this.setklineoption("")
					this.$store.state.market.strategyData = "";
					this.drawkline(this.id1);
					this.backProbeAjax();
				}
			},
			//回测
			backProbeAjax: function(k) {
				this.strategyData1 = [];
				var timeData = this.jsonDataKline.Parameters.Data;
				var ContractNo = this.jsonDataKline.Parameters.ContractNo;
				var TimeStart = timeData[0][0];
				var CommodityNo = this.jsonDataKline.Parameters.CommodityNo;
				this.CommodityNoK = CommodityNo;
				var TimeEnd = timeData[timeData.length - 1][0];
				let obj = {
					"strategy": this.strategyK,
					"commodity": CommodityNo,
					"frequency": this.chooseKline,
					"timeStart": TimeStart,
					"timeEnd": TimeEnd,
					"initialAccount": 1000000,
					"commodityNumber": ContractNo
				}
				$.ajax({
					type: "POST",
					url: this.physhonUrl + "/back_test",
					async: true,
					data: JSON.stringify(obj),
					timeout: 5000,
					dataType: "json",
					success: function(res) {
						var tradeInfo = res.tradeInfo;
						for(var i of tradeInfo) {
							var strategyObj = {};
							if(res.backtestIndex.frequency == "1day") {
								strategyObj.coord = [i[1].substring(0, 10), i[4]];
							} else {
								strategyObj.coord = [i[1], i[4]];
							}
							strategyObj.symbolSize = [7, 14];
							switch(i[3]) {
								case "BP":
									strategyObj.name = "开空";
									strategyObj.symbol = "image://static/lib/images/BP.png";
									break;
								case "BK":
									strategyObj.name = "开多";
									strategyObj.symbol = "image://static/lib/images/BK.png";
									break;
								case "SP":
									strategyObj.name = "平空";
									strategyObj.symbol = "image://static/lib/images/SP.png";
									break;
								case "SK":
									strategyObj.name = "平多";
									strategyObj.symbol = "image://static/lib/images/SK.png";
									break;
								case "SF":
									strategyObj.name = "反卖";
									strategyObj.symbol = "image://static/lib/images/BF.png";
									break;
								case "BF":
									strategyObj.name = "反买";
									strategyObj.symbol = "image://static/lib/images/SF.png";
									break;
							}
							this.strategyData1.push(strategyObj);
						}
						this.strategyData1 = this.strategyData1.slice(-10);
						this.setklineoption(this.strategyData1);
						this.$store.state.market.strategyData = this.strategyData1;
						this.drawkline(this.id1);
						Indicator.close();
					}.bind(this),
					error: function(err) {
						//						console.log("err====="+JSON.stringify(err));
						Indicator.close();
						if(err.statusText == "timeout") {
							this.$toast({
								message: "连接超时，请重新选择类型或策略！",
								duration: 1000
							})
						} else {
							this.$toast({
								message: "网络不给力，请稍后再试!",
								duration: 1000
							});
						}
					}.bind(this)
				});
			},
			handleDraggleStart (e) {
          e.preventDefault()
          var touches = e.touches[0];
          var block = e.target;
          var BoxScrollLeft = document.getElementById('draggle_box').scrollLeft;
          console.log(BoxScrollLeft)
          this.oW = touches.clientX - block.offsetLeft + BoxScrollLeft; //点击点到左边的距离
          this.oH = touches.clientY - block.offsetTop;  //点击点到顶部的距离
          //阻止页面的滑动默认事件
          window.addEventListener("touchmove",this.defaultEvent,{ passive: false });
      },
      handleDraggleMove (index, e) {
		var block;
		if (e.target.tagName==='P'){
			block = e.target.parentNode;
		}else{
			block = e.target;
		}
        if (this.IsClone) {
            //复制一个对象
          var abc = block.cloneNode();
          abc.setAttribute('id','test');
          block.style.position = 'absolute'
          document.getElementsByClassName("draggle")[index].insertBefore(abc,block);
          this.IsClone = false
        }
        var touches = e.touches[0];
        var oLeft = touches.clientX - this.oW;
        var oTop = touches.clientY - this.oH;
        if(oLeft < 0) {
          oLeft = 0;
        }else if(oLeft > document.documentElement.clientWidth - block.offsetWidth) {
          oLeft = (document.documentElement.clientWidth - block.offsetWidth);
        }
        // console.log(oLeft,'当前x');
        // console.log(oTop,'当前y');
        block.style.left = oLeft + "px";
        block.style.top = oTop + "px";
      },
      handleDraggleEnd (item, e) {
        //放置区间
        var content = document.getElementsByClassName('traggle_content')[0]
        var block;
		if (e.target.tagName==='P'){
			block = e.target.parentNode;
		}else{
			block = e.target;
		}
        var myWidth = block.clientWidth; //拖拽元素本身宽度
        var myHight = block.clientHeight; //拖拽元素本身高度
        var contentWidth = content.clientWidth; //元素本身的宽度(content)
        var contentHight = content.clientHeight //元素本身的高度(content)

        var leftBorder = content.clientLeft; //元素border的宽度
        var topBorder = content.clientTop; //元素border的宽度
        var contentTop = content.offsetTop //元素到顶部的距离
        var contentLeft = content.offsetLeft; //元素到左边的距离
        //  放置区域的上下左右
        var Ctop = topBorder + contentTop; //content到顶部距离
        var Cbottom = Ctop + contentHight; // content底部 距离
        var Cleft = leftBorder + contentLeft; //content到左边的距离
        var Cright = Cleft + contentWidth; //右边内border到左边的距离

        var target = e.changedTouches[0]

        var oLeft = target.clientX - this.oW;
        var oTop = target.clientY - this.oH;

        console.log(oLeft,Cleft);
        console.log(oTop,Ctop);
        
        if((oLeft>=Cleft&&oLeft<=Cright - myWidth)&&(oTop>=Ctop&&oTop <= Cbottom - myHight)){
		  console.log(1)
		  this.submit()
        //   this.itemClick(item)
          //this.clearClone(block)
        }else{
         // this.clearClone(block)
        }
        this.clearClone(block)
        window.removeEventListener("touchmove",this.defaultEvent,{ passive: false });
      },

      defaultEvent (e) {
        e.preventDefault();
      },
      clearClone (block) {
        var abc = document.getElementById('test');
        abc.remove();
        block.style.position = 'static' ;
        this.IsClone = true
	  },
	//回测
	submit() {
			if (this.money == '' || this.money == null) {
				this.$toast({
					message: "初始资金不能为空",
					duration: 1000
				});
			} else if (this.money < 1000000) {
				this.$toast({
					message: "初始资金不能低于1000000",
					duration: 1000
				});
			} else {
				// this.showConatiner = false;
				// this.showSubmit = true;
				this.startTime = new Date();
				this.endTime = new Date(this.startTime.getTime() - (3 * 24 * 60 * 60) * 1000);
				let timeStart = pro.getDate(this.endTime.getTime(), 'y-m-d h:i:s')
				let timeEnd = pro.getDate(this.startTime.getTime(), 'y-m-d h:i:s')
				console.log(this.parameters)
				let obj = {
					"strategy": this.strategyChecked,
					"commodity": this.currentNo,
					//"frequency": this.getFrequency(this.type),
					"frequency": '1min',
					"timeStart": timeStart,
					"timeEnd": timeEnd,
					"initialAccount": Number(this.money),
					"commodityNumber": this.parameters[this.currentIndex].MainContract
				}
				this.$indicator.open({
					text: '回测中...',
					spinnerType: 'fading-circle'
				});
				$.ajax({
					type: "POST",
					url: this.physhonUrl + "/back_test",
					async: true,
					data: JSON.stringify(obj),
					dataType: "json",
					success: function(res) {
						if (res.tradeInfo.length == 0) {
							this.$indicator.close()
							this.$toast({
								message: "无回测数据，请重新选择",
								duration: 1000
							});
							this.$router.back(-1);
						} else {
							this.$indicator.close()
							//const strategyName = this.strategyList.find(item => item.type == this.strategyChecked).name;
							const strategyName = '移动平均策略';
							this.$router.push({
								path: "/backPresentation",
								query: {
									strategyName
								}
							});
							this.$store._modules.root.state.account.backtestIndexArr = res;
						}
					}.bind(this),
					error: function(err) {
						this.$indicator.close()
						this.$toast({
							message: "网络不给力，请稍后再试",
							duration: 1000
						});
					}.bind(this)
				})
			}
		},




		},
		mounted: function() {
			//重组数据
			this.operateData();
			setTimeout(()=>{this.drawPie()},500);
		},
		activated: function() {
			this.operateData();
			this.currentNo = this.$route.query.commodityNo;
		},
		filters: {
			changName: function(e) {
				return e
			},
			fixNumTwo: function(num) {
				return num.toFixed(2);
			},
			fixNum: function(num, dotsize) {
				if(dotsize >= 4) dotsize = 4;
				return num.toFixed(dotsize);
			}
		},
		watch: {
			total:function(){
				// this.drawPie();
			},
			parameters: function(n, o) {
				if(n && n.length == 1) {
					this.parameters.forEach((o, i) => {
						if(o.CommodityNo == this.currentNo) {
							this.$store.state.market.currentdetail = o;
							this.$store.state.market.currentNo = o.CommodityNo;
							return;
						}
					});
				}
			},
			chooseKline: function(n, o) {
				if(n == "分时" && this.strategyK != '') {
					Toast({
						message: "请在k线图查看策略",
						position: 'bottom',
						duration: 1500
					})
				} else if(n == "shandian" && this.strategyK != '') {
					Toast({
						message: "请在k线图查看策略",
						position: 'bottom',
						duration: 1500
					})
				} else if(this.strategyK != '') {
					Indicator.open({
						spinnerType: 'fading-circle'
					});
					this.backProbeAjax();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	#klineDetails {
		width: 7.5rem;
	}
	
	#container {
		width: 7.5rem;
		background-color: #fff;
	}
	header{
		background-color: #fff;
		width: 100%;
		height: 0.88rem;
		border-bottom: #dadbe0 solid 1px;
		ul{
			padding: 0 0.3rem;
			flex-direction: row;
			display: flex;
			justify-content: space-between;
			align-items: center;
			li{
				height: 0.88rem;
				&:nth-child(1){
					line-height: 0.88rem;
					flex: 1;
					i{
						display:inline-block;
						width: 0.24rem;
						height: 0.3rem;
						background: url(../../assets/images/quote/back_icon.png) no-repeat 0 100%;
						background-size: 0.24rem 0.3rem;
					}
				}
				&:nth-child(2){
					flex: 6;
					display: inline-flex;
					justify-content: center;
					align-items: center;
					h1{
						padding-right: 0.3rem;
						font-size: 0.36rem;
						color: #2b344a;
					}
				}
				&:nth-child(3){
					flex: 1;
					line-height: 0.88rem;
					text-align: right;
					i{
						display: inline-block;
						width: 0.32rem;
						height: 0.3rem;
						background: url(../../assets/images/quote/icon_share.png) no-repeat 0 100%;
						background-size: 0.32rem 0.3rem;
					}
				}
			}
		}
	}
	.klinePic {
		width: 100%;
		height: 7.5rem;
		background-color: #eaeaea;
		.chartsList {
			padding: 0 0.3rem;
			height: 1rem;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				//flex: 1;
				font-size: 0.28rem;
				color: #2b344a;
				
				&.current {
					color: #497df5;
					text-decoration: underline;
					//background-color: #497df5;
				}
			}
		}
		.charts_container {
			background-color: white;
			width: 7.5rem;
			height: 6.5rem;
		}
	}
	
	.commodityName {
		font-size: 0.3rem;
		padding: 0 0.3rem;
		color: #9597a3;
		ul {
			display: flex;
			height: 1rem;
			;
			justify-content: space-between;
			align-items: center;
			span {
				margin-left: 0.3rem;
			}
		}
	}
	
	.strategy {
		.strategyContainer {
			width: 6.9rem;
			height: 2.6rem;
			margin: auto;
			margin-top: 0.3rem;
			margin-bottom: 0.3rem;
			// padding: 0.3rem;
			// background-color: #35384b;
		}
		.strategyContainer1 {
			box-sizing: content-box;
			width: 6.3rem;
			height: 2rem;
			// background-color: #2a2f42;
			color: #acafb6;
			text-align: center;
			border: 0.3rem solid #eaeaea;
			line-height: 2rem;
		}
		.strategyList {
			width: 7.5rem;
			height: 2.4rem;
			display: flex;
			padding: 0 0.3rem;
			justify-content: space-between;
			.list {
				width: 0.7rem;
				height: 2.1rem;
				// position: relative;
				.top {
					z-index: 10;
					// position: absolute;
					// left: 0;
					width: 0.7rem;
					height: 1.9rem;
					background-color: #a8bce1;
					border-radius: 0.35rem 0.35rem 0.1rem 0.1rem;
					text-align: center;
					p{
						margin-top: 0.1rem;
						display: inline-block;
						width: 0.1rem;
						height: 1.9rem;
						color: white;
						 word-wrap: break-word;
					}

				}
				.bottom {
					// position: absolute;
					// top: 1.8rem;
					// left: 0;
					width: 0.7rem;
					height: 0.2rem;
					margin-top: -0.2rem;
					border-radius: 0.1rem ;
					background-color: #6064e1;
				}
			}
		}
	}
	
	.name {
		height: 1rem;
		padding: 0 0.3rem;
		color: #2b344a;
		font-size: 0.32rem;
		line-height: 1rem;
		font-weight: 600;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.black {
		height: 0.3rem;
		background-color: #f7f7f7;
		
	}
	
	.infoDetails {
		width: 100%;
		height: 3.4rem;
		.infos {
			color: #9597a3;
			font-size: 0.24rem;
			line-height: 0.36rem;
			padding: 0 0.3rem;
			ul {
				height: 0.8rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				li {
					display: flex;
					flex: 1;
					flex-direction: column;
					align-content: center;
					text-align: center;
					span {
						&:nth-child(2) {
							color: #333;
						}
					}
				}
			}
		}
	}
	
	.buySell {
		width: 100%;
		height: 3.62rem;
		
	}
	#pie1{
		width: 7.5rem;
		height: 3rem;
		background-color: white;
	}
	.currentCommodityNo {
		padding: 0 0.3rem;
		height: 0.8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #9597a3;
		font-size: 0.28rem;
		span {
			&:nth-child(1) {
				flex: 4;
			}
			&:nth-child(2) {
				flex: 1;
			}
			&:nth-child(3) {
				flex: 1;
			}
		}
	}
	
	.currentCommodityNoInfo {
		padding: 0 0.3rem;
		height: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #2b344a;
		font-size: 0.3rem;
		span {
			&:nth-child(1) {
				flex: 4;
			}
			&:nth-child(2) {
				flex: 1;
			}
			&:nth-child(3) {
				flex: 1;
			}
		}
	}
	
	.buySellBar {
		width: 100%;
		padding: 0.3rem 0 ;
		.duoKong{
			width: 100%;
			height: 1.8rem;
			li{
				&:nth-child(1){
					display: flex;
					justify-content: space-between;
					padding: 0 0.3rem;
					span{
						font-size: 0.26rem;
					}
				}
				&:nth-child(2){
					display: flex;
					justify-content: center;
					span{
						width:1.6rem;
						height:1rem; 
						border-radius: 0.2rem;
						font-size: 0.36rem;
						color: white;
						text-align: center;
						line-height: 1rem; 
						&:nth-child(1){
							background-color: #FF576E;
						}
						&:nth-child(2){
							background-color: #14da8b;
							margin-left: 0.3rem;
						}
					}
				}
			}
		}
	}
	.traggle_content{
      margin: 0.3rem;
      height: 3rem;
      border: 0.3rem solid #eaeaea;
      @include font($fs26,2.4rem,#acafb6)
    }
</style>
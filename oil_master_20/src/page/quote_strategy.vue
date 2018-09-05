<template>
<div id="quote_strategy">
    <TopTitle title="原油行情">
        <!-- <span slot="my_right" class="header_icon reload_icon"></span> -->
    </TopTitle>
    <div class="btn_box">
       <button :class="['btn',{'current_btn': currentNo == item.commodityNo}]" v-for="(item, index) in oilList" :key="index" @click="chooseCommodityNo(item.commodityNo)">{{item.name}}</button>
    </div>
    <div class="blockColor"></div>
    <div class="chart_wrap">
        <!-- <ul class="charts_title">
			<li :class="{current: currentChartsView === item.type}" v-for="(item,index) in chartsList" @tap="chooseChart(item)" :key="index">{{item.name}}</li>
		</ul> -->
        <div class="charts_container">
            <components :is="currentChartsView" v-if="showChart" test="quote_strategy" she="44"></components>
        </div>
    </div>
    <div class="swipe-wrap">
      <mt-swipe :auto="0" :showIndicators="false" :speed="100">
        <mt-swipe-item v-for="(strategy, index) in strategyList" :key="index" >
            <img :src="strategy.img" alt="banner1" @click="choseStrategy(strategy.type, index)">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="dish_info_box">
        <dishInfo :currentDetail='this.currentdetail' v-if="showDish" />
    </div>

    <div class="blockColor"></div>
    <bottomTab :tabSelect="tabSelected"></bottomTab>

</div>
</template>

<script>
import TopTitle from '../components/top_Title'
import bottomTab from '../components/bottom_tab'
import klineOne from './quote/components/klineOne2.vue'
import pro from '../assets/js/common.js'

import {
    mapMutations,
    mapActions
} from 'vuex'
import {
    Toast,
    Indicator
} from 'mint-ui';

export default {
    name: "quote_strategy",
    components: {
        TopTitle,
        bottomTab,
        dishInfo,
        klineOne
    },
    data() {
        return {
            tabSelected: 'quote_strategy',
            oilList: [{
                    name: '国际原油',
                    commodityNo: 'CL'
                },
                {
                    name: '布伦特原油',
                    commodityNo: 'BRN'
                },
                {
                    name: '小原油',
                    commodityNo: 'QM'
                }
            ],
            chartsShow: false,
            currentChartsNum: 0,
            showTip: false,
            marketList: [], //全部列表分类
            currentCheck: 0,
            currentChartsView: 'klineOne',
            chartsHight: 5.4,
            currentNo: 'CL',
            contrastNoShow: false,
            strategyList: [
                {
                    name: '原油大师推荐策略',
                    realName: '移动平均策略',
                    type: 'SMA',
                    img: require('../assets/images/oil_master/yidong_banner.png')
                },
                 {
                    name: '原油多单策略',
                    realName: '海龟交易策略',
                    type: 'Turtle',
                    img: require('../assets/images/oil_master/haigui_banner2.png')
                },
                 {
                    name: '原油控线策略',
                    realName: 'DualThrust',
                    type: 'DualThrust',
                    img: require('../assets/images/oil_master/DualThrust_banner3.png')
                },
                 {
                    name: '原油做空策略',
                    realName: 'Rbreaker',
                    type: 'Rbreaker',
                    img: require('../assets/images/oil_master/Rbreaker_banner4.png')
                },
                 {
                    name: '原油回落策略',
                    realName: '布林通道策略',
                    type: 'Bollingerbandit',
                    img: require('../assets/images/oil_master/bulin_banner5.png')
                },
                 {
                    name: '原油稳线策略',
                    realName: '金肯特纳策略',
                    type: 'Jintena',
                    img: require('../assets/images/oil_master/jinken_banner6.png')
                }

            ],
            showNoneStrategy: false,
            showContrast: true,
            backProbe: false,
            strategyName: "",
            strategyData: [],
            id1:{
                id1: 'kline2',
                id2: 'kline_volume2'
            },
            currentss: -1,
            intervalTime: '60000',
            CommodityNoK: '',
            strategyData1: [],
            strategyK: "",
            timeing: "",
            obj: ['2小时','4小时','12小时'],
            type: '',
            ContractNo:"",
            chooseKline: "1min",
            isFirst: true

        }
    },
    computed: {
        parameters() {
            return this.$store.state.market.Parameters;
        },
        quoteSocket() {
            return this.$store.state.quoteSocket;
        },
        go() {
            return this.$store.state.go;
        },
        showChart() { //控制chart显示
            return this.$store.state.isshow.showChart;
        },
        currentdetail() {
            return this.$store.state.market.currentdetail
        },
        showDish() {
            return this.$store.state.isshow.showDish;
        },
        contrastNoList() {
            return this.parameters.filter(item => item.CommodityNo !== this.currentNo)
        },
        jsonDataKline () {
            return this.$store.state.market.jsonDataKline; 
        },
        physhonUrl(){
            return this.$store.state.market.physhon.url
        }
    },
    methods: {
        ...mapActions([
            'initQuoteClient',
        ]),
        ...mapMutations([
            'setfensoption',
             'drawfens',
             'setklineoption',
             'drawkline'
		]),
        init() {
            this.currentNo = 'CL';
            if (this.$store.state.account.quoteStatus == false) {
                this.initQuoteClient();

            }
        },
        goto(path) {
            this.$router.push({
                path: path
            })
        },
        chooseChart(item) {
            const { isshow } = this.$store.state;
            this.currentChartsView = item.type;
            // 切换组件重新画图初始化chart
            isshow.isklineshow = false;
            isshow.isfensshow = false;
            isshow.islight = false;
            switch (this.currentChartsView) {
                case 'klineOne':

                    break;
                case 'klineFive':

                    break;
                case 'klineDay':

                    break;
                case 'fens':

                    break;
                case 'light':

                    break;
                default:
                    break;
            }

        },
        chooseCommodityNo(CommodityNo) {
            this.currentNo = CommodityNo;
        },
        switchKey(key) {
            this[key] = !this[key]
        },
        //获取可用策略信息
        getStrategy: function() {
            pro.fetch("post", "/others/getStrategys", "", "").then((res) => {
                if (res.code == 1 && res.success) {
                    this.strategyList = res.data;
                    if (this.strategyList == "" || this.strategyList == null) {
                        this.showNoneStrategy = true;
                    } else {
                        this.showNoneStrategy = false;
                    }
                }
            }).catch((err) => {
                console.log(err);

            })
        },
        //回测
        backProbeAjax: function(k) {
            this.strategyData1 = [];
            var timeData = this.jsonDataKline.Parameters.Data;
            this.ContractNo = this.jsonDataKline.Parameters.ContractNo;
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
                "commodityNumber": this.ContractNo
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
                    const symbolObj = {
                        BP: '开空',
                        BK: '开多',
                        SP: '平空',
                        SK: '平多',
                        SF: '反卖',
                        BF: '反买'
                    }
                    for (var i of tradeInfo) {
                        var strategyObj = {
                            name: symbolObj[i[3]],
                            symbol: `image://static/lib/images/${i[3]}.png`,
                            symbolSize: [7, 14],
                        }
                        if (res.backtestIndex.frequency == "1day") {
                            strategyObj.coord = [i[1].substring(0, 10), i[4]];
                        } else {
                            strategyObj.coord = [i[1], i[4]]; //时间 价格
                        }
                        this.strategyData1.push(strategyObj);
                    }
                    this.setklineoption(this.strategyData1);
                    this.$store.state.market.strategyData = this.strategyData1;
                    this.drawkline(this.id1);
                    Indicator.close();
                }.bind(this),
                error: function(err) {
                    console.log("err=====" + JSON.stringify(err));
                    Indicator.close();
                    if (err.statusText == "timeout") {
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
        backProbeInterval: function(k) {
            this.timeing = setInterval(() => {
                var infoArr = []; //最后30个总数据
                var closeArr = []; //收盘价30个
                var highArr = []; //最高价30个
                var lowArr = []; //最低价30个
                var volumeArr = []; //成交量30个
                var position = '' //持仓
                var accountMoney = '' //资金量
                var openArr = []; //开盘价30个
                infoArr = this.$store.state.market.jsonDataKline.Parameters.Data.slice(-30);
                var position = infoArr[infoArr.length - 1][5];
                var lastTrade = infoArr[infoArr.length - 1][1];
                var lastTradeTime = infoArr[0][0].substring(11, 16);
                for (var i of infoArr) {
                    closeArr.push(i[1]);
                    openArr.push(i[2]);
                    lowArr.push(i[3]);
                    highArr.push(i[4]);
                    volumeArr.push(i[6])
                }
                let obj1 = {
                    "close": closeArr,
                    "open": openArr,
                    "high": highArr,
                    "low": lowArr,
                    "volume": volumeArr,
                    "position": position,
                    "lastTrade": lastTrade,
                    "strategy": this.strategyK
                    //						"account":1000000
                }
                $.ajax({
                    type: "POST",
                    url: this.physhonUrl + "/calc_strategy_signal",
                    async: true,
                    data: JSON.stringify(obj1),
                    dataType: "json",
                    success: function(res) {
                        var strategy_signal_obj = {};
                        //							strategyObj.coord = [i[1].substring(11,16),i[4]];
                        var strategy_signal_time = pro.getDate("h:m", Date.parse(new Date()));
                        strategy_signal_obj.coord = [strategy_signal_time, res.last_trade];
                        strategy_signal_obj.symbolSize = [7, 14];
                        switch (res.action) {
                            case null:
                                strategy_signal_obj.coord = [];
                                strategy_signal_obj.symbolSize = [];
                                break;
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
                        this.strategyData1.push(strategy_signal_obj);
                        this.strategyData1 = this.strategyData1.slice(-40);
                        this.$store.state.market.strategyData = this.strategyData1;
                        this.drawkline(this.id1);
                    }.bind(this),
                    error: function(err) {
                        Indicator.close();
                        this.$toast({
                            message: "网络不给力，请稍后再试",
                            duration: 1000
                        });
                    }.bind(this)
                })
            }, this.intervalTime);
        },
        //选择策略
        choseStrategy:function(k,index){
            if(this.chooseKline == "闪电"){
                this.$toast({message:"闪电图不能查看策略",duration: 1000});
            }else if(this.chooseKline == "分时"){
                this.$toast({message:"分时图不能查看策略",duration: 1000});
            }else{
                this.currentss = index;
                this.strategyK = k;
                clearInterval(this.timeing);
                this.strategyData1 = [];
                this.setklineoption(this.strategyData1),
                this.$store.state.market.strategyData= this.strategyData1;
                this.drawkline(this.id1);
                Indicator.open({spinnerType: 'fading-circle'});
                //第一步回测拿到打点数据
                this.setklineoption("")
                this.$store.state.market.strategyData= "";
                this.drawkline(this.id1);
                this.backProbeAjax();
                //第二步实时
                this.backProbeInterval();
            }
        },

    },
    created() {
        //获取所有合约
        //this.init();

    },
    mounted() {
       // this.getStrategy()
        // setTimeout(() => {
        // 	this.allowChart();
        // }, 2000);
    },
    activated() {
       if (this.isFirst) {
           this.isFirst = false
       }else{
           this.$store.state.isshow.isklineshow = true;
       }
    },
    filters: {
        fixNum(num, dotSize = 2) {
            if (!num) return;
            if (dotSize >= 4) dotSize = 4;
            return num.toFixed(dotSize);
        },
    },
    watch: {
        currentNo(n, o) {
            const {
                isshow
            } = this.$store.state;
            if (n != o && o != '') {
                this.$store.state.market.currentdetail = this.parameters.find(item => item.CommodityNo === n);
                this.$store.state.market.currentNo = n;
                this.currentNo = this.$store.state.market.currentNo;
                //重新关闭所有 重新画图
                isshow.showChart = false;
                isshow.isklineshow = false;
                // isshow.isfensshow = false;
                // isshow.islight = false;
                setTimeout(() => {
                    this.$store.state.isshow.showChart = true
                }, 10);
            }
        },
        chooseKline(e){
            clearInterval(this.timeing);
            if(e == "分时" && this.strategyK !=''){
                this.$toast({message:"分时图不能查看策略",duration: 1000});
            }else if(e == "闪电" && this.strategyK !=''){
                    this.$toast({message:"闪电图不能查看策略",duration: 1000});
            }else if(this.strategyK !=''){
                Indicator.open({spinnerType: 'fading-circle'});
                //第一步回测拿到打点数据
                this.backProbeAjax();
                //第二步实时
                this.backProbeInterval();
            }
        }

    },
    beforeRouteEnter: (to, from, next) => {
         next(vm => {
             vm.$store.state.market.klineOne = {
				kId: "kline2",
				volId: "kline_volume2"
			 }
            // 通过 `vm` 访问组件实例
        })
    },
    beforeRouteLeave(to, from, next) {
        const { isshow } = this.$store.state;
        //isshow.iskline = false;
        this.$store.state.isshow.isklineshow = false
        isshow.isklineshow = false;
        // if (to.name = 'quote') {
            
        // }
        console.log(isshow);
        
        next()
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
    opacity: 0;
}

#quote_strategy {
    width: 7.5rem;
    padding: 0.96rem 0 1.16rem;
    background-color: #fff;
}

.btn_box {
    @include flex(space-around);
    padding: 0.2rem 0;
    .btn {
        width: 2.1rem;
        height: 0.8rem;
        @include font($fs28, 0.8rem, $btn_bg_color);
        background-color: #f85959;
        border-radius: 0.1rem;
    }
    .current_btn {
		color: #f85959;
        background-color: #fff;
        border: 1px solid #f85959;
	}
}

.blockColor {
    width: 7.5rem;
    height: 0.16rem;
    background-color: #f4f5f6;
}

// .charts_container{
// 	height: 6.5rem
// }
.charts_title {
    width: 100%;
    @include flex(flex-start);
    padding: 0 0.3rem;
    @include font($fs28, 0.8rem, #283835);
    border-bottom: solid 1px #d2dae7;
    li {
        width: 1rem;
        margin-right: 0.1rem;
        &.current {
            color: #f85959;
        }
    }
}
.swipe-wrap{
    width: 7.5rem;
    height: 3.2rem;
}
.contrast_wrap {
    padding: 0.2rem 0;
    .box {
        @include flex();
        @include font($fs28, 0.8rem, #222);
        .left {
            flex: 1;
            border-right: solid 1px #d2dae7;
        }
        .right {
            flex: 3
        }
        button {
            width: 5rem;
            height: 0.8rem;
            @include font($fs28, 0.8rem, $btn_bg_color);
            background-color: #f85959;
            border-radius: 0.1rem;
        }
    }
}

.strategy_wrap {
    width: 7.5rem;
    h2 {
        @include font($fs28, 0.8rem, #222, left);
        padding: 0 0.3rem;
    }
}

.tab {
    width: 7.5rem;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        width: 1rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        background-color: #eaeaea;
        color: #2b344a;
        font-size: 0.28rem;
        border-right: 1px solid #fff;
        &.current {
            color: #fff;
            background-color: #497df5;
        }
    }
}

.tips {
    background-color: #eaeaea;
    p {
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        color: #2b344a;
        font-size: 0.24rem;
    }
    li {
        text-align: left;
        text-indent: 1.5rem;
        color: white;
        line-height: 0.4rem;
        font-size: 0.24rem;
    }
}

.CommodityList {
    .listScoll {
        overflow-y: scroll;
        height: 8.45rem;
        .checked {
            background-color: #f7f7f7;
        }
    }
    .listName {
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f7f7ff;
        span {
            font-size: 0.28rem;
            color: #2b344a;
            &:nth-child(1) {
                margin-left: 0.3rem;
                margin-right: 0.9rem;
            }
            &:nth-child(5) {
                /*margin-right: 0.3rem;*/
            }
        }
        i {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            color: white;
            font-size: 0.3rem;
            line-height: 1rem;
            text-align: center;
        }
        .icon_buy {
            background-color: #ff576e;
        }
        .icon_sell {
            background-color: #14da8b;
        }
    }
    .toDetails {
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        border-bottom: 1px solid #f7f7ff;
        span {
            color: #2b344a;
        }
    }
}

.KLinePic {
    height: 6.5rem;
    width: 100%;
    background-color: white;
}

.dish_info_box {
    height: 2.6rem
}

.contrastNo_wrap {
    position: fixed;
    bottom: 0;
    width: 7.5rem;
    z-index: 100;
}

.contrastNo_list {
    background-color: rgba(0, 0, 0, 0.6);
    .contrastNo_item {
        @include flex();
        padding: 0.1rem 0;
        height: 0.8rem;
        border-bottom: 1px solid #e8e8e8;
    }
    .info_inner {
        flex: 1;
        @include font($fs28, 0.4rem, #fff);
        .img {
            width: 0.4rem;
            height: 0.4rem;
        }
    }
}
</style>
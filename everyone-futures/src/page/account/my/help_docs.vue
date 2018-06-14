<template>
    <div id="help_info" :style="{'height': clientHeight}">
        <mt-header fixed title="帮助文档" >
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        <!-- 列表 -->
        <div class="list_wrap">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">比赛相关</mt-tab-item>
                <mt-tab-item id="2">期货相关</mt-tab-item>
                <mt-tab-item id="3">行情相关</mt-tab-item>
                <mt-tab-item id="4">提醒相关</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <ul class="list">
                        <li class="list_item" v-for="item in selfList" :key="item.question">
                            <h3 @click="changeShow(item)">{{item.question}}<i :class="item.isShow?'triangle_top':'triangle_down'"></i></h3>
                            <p :class="{'show': item.isShow}">{{item.answer}}</p>
                        </li>
                    </ul>
    
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <ul class="list">
                         <li class="list_item" v-for="item in tradeList" :key="item.question">
                            <h3 @click="changeShow(item)">{{item.question}}<i :class="item.isShow?'triangle_top':'triangle_down'"></i></h3>
                            <p :class="{'show': item.isShow}">{{item.answer}}</p>
                        </li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <ul class="list">
                         <li class="list_item" v-for="item in exchangeList" :key="item.question">
                            <h3 @click="changeShow(item)">{{item.question}}<i :class="item.isShow?'triangle_top':'triangle_down'"></i></h3>
                            <p :class="{'show': item.isShow}">{{item.answer}}</p>
                        </li>
                    </ul>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <ul class="list">
                         <li class="list_item" v-for="item in remindList" :key="item.question">
                            <h3 @click="changeShow(item)">{{item.question}}<i :class="item.isShow?'triangle_top':'triangle_down'"></i></h3>
                            <p :class="{'show': item.isShow}">{{item.answer}}</p>
                        </li>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    const self_about = [{
            question: '怎么参与比赛?',
            answer: '登录帐号，进入【比赛】页面，选择想参与的活动并报名就可以参与比赛了。',
            isShow: false
        },
        {
            question: '参与比赛需要充值现金吗？',
            answer: '活动都是可以免费参与的。',
            isShow: false
        },
        {
            question: '活动报名时间与比赛时间是否限制；结束后多长时间能出比赛结果？',
            answer: '活动报名时间一般在比赛之前，比赛开始后不可报名；比赛结束后实时显示赛事结果；',
            isShow: false
        },
        {
            question: '每人可以参与多少活动？',
            answer: '任何人都能参与所有即将开始的活动',
            isShow: false
        },
        {
            question: '活动奖励能否兑换成现金？',
            answer: '活动奖品取决于当场活动的设定，除此以外没有可兑换的现金奖励哦',
            isShow: false
        },
        {
            question: '排行榜的排名规则是什么？',
            answer: '排行榜根据用户的总收益率进行排名，总收益率=跟投分成收益+自行交易收益',
            isShow: false
        },
        {
            question: '跟投的收益可以拿来交易吗？',
            answer: '可以的，但需要等到第二天完成结算后，即第一天的跟投分成可以在第二天用来交易；',
            isShow: false
        },
        {
            question: '跟投或交易能够持仓隔夜吗？',
            answer: '不可以！请注意，比赛中的交易无法持仓隔夜，持仓将在次日早上5点被平仓。',
            isShow: false
        },
        {
            question: '跟投人数是否有限制？',
            answer: '无限制，理论上所有人都可以跟投你',
            isShow: false
        },
        {
            question: '不参与比赛活动，模拟交易怎么开户？',
            answer: '注册后系统将自动发放一个自由交易帐号，支持持仓隔夜，可自行模拟交易；',
            isShow: false
        },
        {
            question: '比赛过程中能否手动平仓，等待活动比赛结束。或者结束时间一到，未平仓是系统强平吗？',
            answer: '可以手动平仓，活动结束后统一平仓',
            isShow: false
        },

    ]
    const trade_about = [{
            question: '期货是什么？',
            answer: '期货是以某种大众产品如棉花、大豆、石油等及金融资产如股票、债券等为标的标准化可交易合约。',
            isShow: false
        },
        {
            question: '期货交易所有哪些？',
            answer: '国内有：大连商品交易所、郑州商品交易所、上海期货交易所、中国金融期货交易所。国际有：芝加哥商业交易所（CME）、纽约商业交易所（NYMEX）、伦敦金属交易所(LME)、新加坡国际金融交易所(SIMEX)、香港期货交易所(HKFE)等。',
            isShow: false
        },
        {
            question: '什么是开仓、平仓？',
            answer: '【开仓】：是指期货交易者买入或者卖出，并持有期货合约的交易的行为。【平仓】：是指期货交易者买入或者卖出与其所持期货合约的品种、数量及交割月份相同但交易方向相反的期货合约，了结期货交易的行为。',
            isShow: false
        },
        {
            question: '什么是最小变动价位？',
            answer: '期货合约的单位价格涨跌变动的最小值。',
            isShow: false
        },
        {
            question: '什么是最后交易日？',
            answer: '某一期货合约在合约交割月份中进行交易的最后一个交易日。',
            isShow: false
        },
        {
            question: '什么是套利交易？',
            answer: '同时买进或卖出两种相关商品，并希望在日后对冲交易部位时有所获利。套利交易关心的是合约之间的相互价格关系，而不是绝对价格水平。',
            isShow: false
        }
    ]
    const exchange_about = [{
            question: '行情可以最多叠加多少个？',
            answer: '目前支持最多5个不同行情的叠加对比。',
            isShow: false
        },
        {
            question: '所有行情都可以叠加和提醒吗？',
            answer: '是的，所有行情均支持叠加、提醒。',
            isShow: false
        },
    ]
    const remind_about = [{
            question: '短信提醒最多可以发多少条？',
            answer: '无条数限制。',
            isShow: false
        },
        {
            question: '设置好上涨的点位，超过了又跌下来会提醒吗？',
            answer: '不会提醒。若需要跌下来后再进行提醒，可设置参数"下跌到XX点进行提醒"',
            isShow: false
        },
    ]




var axios1 = axios.create({
	baseURL: '',
	timeout: 5000,
  });



    export default {
        name: "help_info",
    
        data() {
            return {
                hasList: true,
                selected: '1',
                selfList: self_about,
                tradeList: trade_about,
                remindList: remind_about,
                exchangeList: exchange_about
    
            };
        },   
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + "px";
            },
            futurePath () {
                return this.$store.getters.futurePath
            }
        },   
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
    
            goto(path) {
                this.$router.push({
                    path: path
                });
            },
            changeShow(item) {
                item.isShow = !item.isShow
            },
            getList () {
                axios1.post('others/getNotice',{

                })
                .then((res) =>{
                     console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }
        },
        mounted () {
            this.getList()
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #help_info {
        width: 7.5rem;
        background-color: $bgGray;
    }
    
    .list_wrap {
        width: 7.5rem;
        padding: 0.96rem 0 0 0;
        background-color: $bg;
        .list_item {
            width: 7.5rem;
            @include font($fs28, 0.46rem, $grayMiddle, left);
            h3,
            p {
                padding: 0.2rem 0.3rem;
                border-bottom: 1px solid #e6e6e6;
            }
            p {
                display: none;
                color: $blcakThin;
                line-height: 0.36rem;
                padding: 0.2rem 0.3rem;
            }
            .show {
                display: block;
            }
            h3 {
                position: relative;
                .triangle_down,
                .triangle_top {
                    position: absolute;
                    right: 0.3rem;
                    bottom: 0.1rem;
                    content: '';
                    width: 0;
                    height: 0;
                    border: 0.1rem solid transparent;
                    border-right-color: #c2c2cc;
                }
                .triangle_down {
                    border-bottom-color: #c2c2cc;
                }
                .triangle_top {
                    border-top-color: #c2c2cc;
                }
            }
        }
    }
    
    #help_info .is-selected {
        margin: 0;
        border-bottom: 0.03rem solid #e64552;
        color: #e64552;
    }
    
    #help_info .mint-navbar {
        border-bottom: 1px solid #e6e6e6;
        padding: 0 0.3rem;
    }
</style>
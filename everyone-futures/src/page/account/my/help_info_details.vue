<template>
    <div id="news_info_details" :style="{'height':clientHeight}">
        <mt-header fixed title="帮助详情">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>   
        <!-- 列表 -->
        <div class="article_wrap">
            <h2>{{details.title}}</h2>
            <span>{{details.time}}</span>
            <p v-html="details.content"></p>
        </div>
    </div>
</template>

<script>
import pro from '../../../assets/js/common'
const newsList = [{

        content: "期货投机交易，是指在期货市场上以获取价差收益为目的的期货交易行为。投机者根据自己对期货价格走势的判断，作出买进或卖出的决定，如果这种判断与市场价格走势相同，则投机者平仓出局后可获取投机利润；如果判断与价格走势相反，则投机者平仓出局后承担投机损失。由于投机的目的是赚取差价收益，所以，投机者一般只是平仓了结持有的期货合约，而不进行实物交割。投机交易分为两种：价差投机和套利交易。1、价差投机。价差投机是指投机者通过对价格的预期，在认为价格上升时买进、价格下跌时卖出，然后待有利时机再卖出或买进原期货合约，以获取利润的活动。进行价差投机的关键在于对期货市场价格变动趋势的分析预测是否准确，由于影响期货市场价格变动的因素很多，特别是投机心理等偶然性因素难以预测，因此，正确判断难度较大，所以这种投机的风险较大。套利交易是期货投机交易中的一种特殊方式，它利用期货市场中不同月份、不同市场、不同商品之间的相对价格差，同时买入和卖出不同种类的期货合约，来获取利润。正如一种商品的现货价格与期货价格经常存在差异，同种商品不同交割月份的合约价格变动也存在差异；同种商品在不同的期货交易所的价格变动也存在差异。由于这些价格差异的存在，使期货市场的套利交易成为可能。2、套利交易。套利交易丰富和发展了期货投机交易的内容，并使期货投机不仅仅局限于期货合约绝对价格水平变化，更多地转向期货合约相对价格水平变化。套利交易对期货市场的稳定发展有积极的意义，具体地讲，套利的作用主要表现在两个方面：一方面，套利提供了风险对冲的机会；另一方面，套利有助于合理价格水平的形成。",
        createDate: "2018-05-15 16:11:31",
        id: "b66d35237fbe4eca9db33010abfa3a01",
        isNewRecord: false,
        isPublish: "1",
        isTop: "0",
        time: "2018-05-15 16:11:23",
        title: "期货投机交易定义",
        updateDate: "2018-06-11 16:06:11",
        version: 2
    },
    {

        content: "在期货市场，投机交易必不可少，它起到了增加市场流动性和承担套期保值者转嫁风险的作用，还有利于期货交易的顺利进行和期货市场的正常运转，它是期货市场套期保值功能和发现价格功能得以发挥的重要条件之一。1、主动承担期货市场风险。2、投机交易促进市场流动性，保障了期货市场发现价格功能的实现。3、适度的期货投机能够缓减价格波动。4、期货市场的投机者不仅利用价格短期波动进行投机，而且还利用同一种商品或同类商品在不同时间、不同交易所之间的差价变动来进行套利交易。这种投机，使不同品种之间和不同市场之间的价格，形成一个较为合理的价格结构。",
        createDate: "2018-05-15 16:11:31",
        id: "b66d35237fbe4eca9db33010abfa3a11",
        isNewRecord: false,
        isPublish: "1",
        isTop: "0",
        time: "2018-05-15 16:11:23",
        title: "期货投机的作用",
        updateDate: "2018-06-11 16:06:11",
        version: 2
    },
    {

        content: '投机者类型的划分，根据不同的标准而定。1、按照交易量的大小，可划分为大投机者与小投机者。2、按照交易部位区分，可分为多头投机者和空头投机者。3、按照投机者持有合约时间的长短，可分为趋势交易者、当日交易者、"抢帽子"者。 无论你是哪一种类型的投机者，在期货市场，你必须与一大群专业人员展开竞争。这些专业人员包括以期货交易为生、得到很好回报的职业投机者，也包括主要目的是为市场提供流动性的做市商，以及从事商品期货基金管理的职业操盘手，还包括一大批有现货背景的现货商。',
        createDate: "2018-05-15 16:11:31",
        id: "b66d35237fbe4eca9db33010abfa3aff",
        isNewRecord: false,
        isPublish: "1",
        isTop: "0",
        time: "2018-05-15 16:11:23",
        title: "期货投机者的类型",
        updateDate: "2018-06-11 16:06:11",
        version: 2
    },
    
    ]







    export default {
        name: 'news_info_details',
        props: ['id'],
        data() {
            return {
                details: {}
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            }
        },
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
            getDetails() {
                var data = {
                    id: this.id
                }
                pro.fetch("post", "/others/getNotice", data, "").then((res) => {
                    console.log(res)
                    if (res.code == 1 && res.success == true) {
                        this.details = res.data
                    }
                }).catch((err) => {
                    //console.log("err==="+JSON.stringify(err));
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后再试",
                            duration: 1000
                        });
                    } else {
                        if (data.code == -9999) {
                            this.$toast({
                                message: "认证失败，请重新登录",
                                duration: 1000
                            });
                            this.$router.push({
                                path: "/login"
                            });
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 1000
                            });
                        }
                    }
                })
            }
        },
        watch: {
            id (value, oldValue) {
                // if(value !== oldValue){
                //     this.getDetails()
                // }
            }
        },
        created () {
            //this.getDetails() 
            this.details = newsList.find((obj)=>{
                return obj.id == this.id
            })
        },
        // activated() {
        //     console.log(1)
        //     this.getDetails()
        // }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #news_info_details {
        width: 7.5rem;
        overflow: auto;
        //background-color: $bgGray;
    }
    
    .article_wrap {
        width: 7.5rem;
        padding: 1.26rem 0.3rem 0;
        background-color: $bg;
        h2 {
            @include font($fs36, 0.5rem, $blcakThin, left);
            font-weight: 600;
        }
        span {
            display: block;
            @include font($fs24, 0.8rem, $graySimple, right);
        }
        p {
            @include font($fs28, 0.4rem, $graySimple, left);
            text-indent: 2em;
        }
    }
</style>
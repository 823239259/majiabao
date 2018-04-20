<template>
  <div>
    <mt-header fixed :title="title">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <!-- 问题 -->
    <div class="question-wrap">
      <div class="item" v-for="item in itemList">
        <h2>{{item.question}}</h2>
        <p v-html="item.answer"></p>
      </div>      
    </div>   
  </div>
</template>

<script>
const messageList = [
  {
  question: '短信提醒最多可以发多少条？',
  answer: '无条数限制。',       
  },
  {
  question: '设置好上涨的点位，超过了又跌下来会提醒吗？',
  answer: '不会提醒。若需要跌下来后再进行提醒，可设置参数"下跌到XX点进行提醒"',       
  },
  {
  question: '短信提醒有延迟吗？',
  answer: '是的，短信提醒的延迟取决于您的网络通信信号，故您在设置提醒参数时，应适当考虑延迟问题。',       
  }        
]
const informationList = [
  {
  question: '什么是最小变动价位？',
  answer: '期货合约的单位价格涨跌变动的最小值。',       
  },
  {
  question: '什么是最后交易日？',
  answer: '某一期货合约在合约交割月份中进行交易的最后一个交易日。',       
  },
  {
  question: '为何要追加保证金？',
  answer: '当交易者的必须保证金少于一定数量时（这个数量由交易所和经纪公司根据市场行情确定），按照需要补足的保证金进行缴纳。交易者也可以自行增加保证金获得更大开仓手数。',       
  },
  {
  question: '什么是套利交易？',
  answer: '同时买进或卖出两种相关商品，并希望在日后对冲交易部位时有所获利。套利交易关心的是合约之间的相互价格关系，而不是绝对价格水平。',       
  },   
]
const quotationList = [
   {
    question: '期货是什么？',
    answer: '期货是以某种大众产品如棉花、大豆、石油等及金融资产如股票、债券等为标的标准化可交易合约。',       
    },
   {
    question: '期货交易所有哪些？',
    answer: '国内有：大连商品交易所、郑州商品交易所、上海期货交易所、中国金融期货交易所。国际有：芝加哥商业交易所（CME）、纽约商业交易所（NYMEX）、伦敦金属交易所(LME)、新加坡国际金融交易所(SIMEX)、香港期货交易所(HKFE)等。',       
    },
   {
    question: '期货保证金是什么？',
    answer: '期货交易者按照规定标准交纳的资金，用于结算和保证履约。',       
    },
   {
    question: '做多做空是什么意思？',
    answer: '在保证金交易制度下，期货交易者可以先买后卖，也可以先卖后买，前者称之为做多交易，后者称之为做空交易。做空交易者可能并不拥有其所卖出的期货合约的标的物，他们假设能以低于开仓卖出的价格买回期货合约平仓。',       
    },
    {
    question: '什么是开仓、平仓？',
    answer: '【开仓】：是指期货交易者买入或者卖出，并持有期货合约的交易的行为。<br>【平仓】：是指期货交易者买入或者卖出与其所持期货合约的品种、数量及交割月份相同但交易方向相反的期货合约，了结期货交易的行为。',       
    },
]
export default {
  name: 'room_item',
  props: ['name'],
  data () {
    return {
      title: '',
      itemList:[
        {
        question: '短信提醒最多可以发多少条？',
        answer: '无条数限制。',       
        },
        {
        question: '设置好上涨的点位，超过了又跌下来会提醒吗？',
        answer: '不会提醒。若需要跌下来后再进行提醒，可设置参数"下跌到XX点进行提醒"',       
        },
        {
        question: '短信提醒有延迟吗？',
        answer: '是的，短信提醒的延迟取决于您的网络通信信号，故您在设置提醒参数时，应适当考虑延迟问题。',       
        }        
      ],
    }  
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },
    getList (name) {
      let title = '';
      switch (name) {
        case 'information':
          this.itemList = informationList;
          title = '行情相关'
          break;
        case 'quotation':
          this.itemList = quotationList;
          title = '期货入门'
          break;
        case 'message':
          this.itemList = messageList;
          title = '短信提醒'
          break;    
      
        default:
          break;
      }
      this.title = title
    }
    
  },  
  created () {
   this.getList(this.name)
    
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/css/common.scss";
.question-wrap{
  width: 7.5rem;
  padding-top: 0.9rem ;
  padding-bottom: 55px;
  background-color: #f8f9fc;
  .item{
    background-color: #fff; 
    h2,p{
      @include font(0.28rem, 0.8rem, #8b8b8b,left);
      padding-left: 0.25rem;
      border-bottom: #e9e9e9 1px solid;
    }
    p{
      @include font(0.28rem, 0.6rem, #333,left);
      color:#333 ;
      padding: 0.2rem 0 0 0.25rem;
    }
  }
}


</style>

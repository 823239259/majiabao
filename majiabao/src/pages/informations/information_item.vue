<template>
  <div>
    <mt-header fixed title="最新资讯">    
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>    
    </mt-header>
    <div class="article">
      <div class="header">
        <h2>国务院：深化多层次资本市场改革</h2>
        <p><span>2018.03.27</span><span>15:07:35</span></p>
      </div>
      <div class="article-content">
        <p v-for="item in text" v-html="item.text"></p>
      </div>
    </div>
   
  </div>
</template>

<script>
const text_content = [
  {
    text:'核心提示：对于期指松绑，东证期货分析师李智祥表示，期指松绑至正常水平应当是一种中长期趋势，期指目前的流动性还不是特别好，很多参与者的套保需求难以满足，所以对期指松绑的需求是很大的。'
  },
  {
    text: '近期，关于监管层考虑放宽股指期货交易限制的传闻再起。中金所相关人士表示，目前尚无相关安排。从业内人士表示，日前中金所就期指松绑对部分期货公司进行了调研，但落实尚需进一步讨论。'
  },
  {
    text: '2015年股市异常波动期间，股指期货交易曾被采取了一定限制措施。去年，中金所两度对期指保证金、手续费等进行松绑。'
  },
  {
    text: '今年全国两会期间，对于上海证券报记者提出股指期货的交易限制措施会否进一步放松的问题，证监会副主席姜洋说：“我想，你说的这种情况是存在的。”他同时表示，金融衍生品市场总是要发展的，要适应市场稳定健康发展的趋势，逐步按照市场的情况，由交易所来确定何时放松限制。'
  },
  {
    text: '弘业期货金融研究院院长诸艾表示，股指期货要进一步松绑和目前市场的运行状态有直接关系。“股指期货的进一步松绑必然是基于过去一段时间市场运行健康稳定，同时未来没有太大的可见风险，比如说中美贸易摩擦没有激化的可能，这样的情况下股指期货进一步松绑应是可期待的。” '
  },
  {
    text: '股指期货作为股票市场有效的对冲工具，对于股票市场的发展具有积极的意义。多位业内人士表示，从长期看，股票市场的长期健康稳定发展离不开股指期货市场的健康发展，投资者需要行之有效的套期保值和管理风险工具。'
  },
  {
    text: '对于期指松绑，东证期货分析师李智祥表示，期指松绑至正常水平应当是一种中长期趋势，期指目前的流动性还不是特别好，很多参与者的套保需求难以满足，所以对期指松绑的需求是很大的。'
  },
  {
    text: '方正中期研究院分析师相阳分析认为，在目前市场逻辑下，市场参与者尤其是机构投资者对于对冲产品需求大幅上升。“未来松绑应该是趋势，但不会一步到位，而是渐进式的。'
  },
  {
    text: '关于期指松绑对市场的影响，诸艾表示：“前两次松绑后，市场成交量的回升力度并不是很大，这是因为前两次松绑对于日内开仓限额、平今手续费等还有较高要求和限制。我们认为后面的松绑动作还要看在这些方面有没有较大调整，如果有的话，成交量可能会有更明显的回升。”'
  },
  {
    text: '李智祥表示，期指松绑将对市场构成一定利好，“如果使用期指作为风险管理工具以后，市场在一般情况下的波动会减小。'
  }
  ]
export default {
  name: 'imformation_item',
  data () {
    return {
      selected: '首页',
      text: text_content
    }  
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },
    goto (id) {
      this.$router.push({path: `/contract-item/${id}`})
    }
    
  },
  watch: {
    selected (value, oldvalue) {
      console.log(value)
    }
  }
  
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/css/common";
.article{
  padding: 0.88rem 0 0 0.26rem;
  h2{
    @include font(0.32rem, 0.72rem, #333, left);
    
  }
  p{
    text-align: left;
    span:nth-child(1){
        padding-right: 0.24rem
      }
  }
}
.article-content{
  padding: 0.3rem 0 0 0;
  @include font(0.28rem, 0.56rem, #333, left);
  p{
    padding-bottom: 0.3rem
  }
}

</style>

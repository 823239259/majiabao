<template>
  <div>
    <mt-header fixed title="基础知识">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      <ul>
        <li @click="isshow('isshow1')">
          <p class="title">期货安全知识<span :class="{'show':isshow1}" class="youjiantou"></span></p>
          <div class="text" v-show="isshow1">
            <h3>作为期货市场的投资者，特别是新进入期货市场的新手，在进行期货交易时，要注意4个方面：</h3>
            <p>1、严格遵守期货交易所和期货经纪公司的一切风险管理制度。如若违反这些制度，将使您处于非常被动的地位。<br>2、投资的资金、规模必须正当、适度。如果资金渠道有问题，一旦抽紧，势必影响交易；而交易规模如果失当，盲目下单、过量下单，就会使您面临超越自己财力、能力的巨大风险。切记，期货市场是风险投资市场，决不是赌场，不要把自己降格为一个赌徒。<br>3、要有良好的投资战略。根据自己的条件(资金、时间、健康等)，培养良好的心理素质，不断充实自己，逐步形成自己的投资战略。<br>4、关注信息、分析形势，注意期货市场风险的每一个环节。期货市场是一个消息满天飞的地方，要逐步培养分析能力，充分掌握有价值的信息。同时，时刻注意市场的变化，提高自己反应的灵敏度。记住，市场永远是对的。</p>
          </div>
        </li>
        <li @click="isshow('isshow2')">
          <p class="title">期货基础知识<span :class="{'show':isshow2}" class="youjiantou"></span></p>
          <div class="text" v-show="isshow2">
            <h3>作为期货市场的投资者，特别是新进入期货市场的新手，在进行期货交易时，要注意4个方面：</h3>
            <p>1、严格遵守期货交易所和期货经纪公司的一切风险管理制度。如若违反这些制度，将使您处于非常被动的地位。<br>2、投资的资金、规模必须正当、适度。如果资金渠道有问题，一旦抽紧，势必影响交易；而交易规模如果失当，盲目下单、过量下单，就会使您面临超越自己财力、能力的巨大风险。切记，期货市场是风险投资市场，决不是赌场，不要把自己降格为一个赌徒。<br>3、要有良好的投资战略。根据自己的条件(资金、时间、健康等)，培养良好的心理素质，不断充实自己，逐步形成自己的投资战略。<br>4、关注信息、分析形势，注意期货市场风险的每一个环节。期货市场是一个消息满天飞的地方，要逐步培养分析能力，充分掌握有价值的信息。同时，时刻注意市场的变化，提高自己反应的灵敏度。记住，市场永远是对的。</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about_us',
  data () {
    return {
      isshow1: false,
      isshow2: false
    }  
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },   
    isshow (id) {
      this[id] = !this[id]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/css/common.scss";
.wrap{
  width: 7.5rem;  
  padding-top: 0.88rem;
  li{  
    
    text-indent: 0.24rem;
    @include font(0.32rem,0.8rem,#333,left);
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 0.1rem;
    .title{
      position: relative;
      border-bottom: 1px solid #e9e9e9;
    }
    .youjiantou{
      position: absolute;
      right: 0.28rem;
      top: 50%;
      display: inline-block;
      width: 0.17rem;
      height: 0.34rem;
      background: url('../../assets/img/youjiantou.png') center center no-repeat;
      background-size: cover;
      transform: translateY(-50%)
    }
    .show{
      transform: rotate(90deg) translateX(-100%);
      transition: transform .5s
    }
    .text{
      padding: 0.25rem;
      h3{
        @include font(0.32rem,0.48rem,#333,left);
      }
      p{
        @include font(0.28rem,0.48rem,#5d718c,left);
      }
    }
  }
}
</style>

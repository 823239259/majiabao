<template>
  <div>
   <div class="header">
     <span class="back" @click="goBack"></span>
     <h2>合约详情</h2>
   </div>
   <ul class="details-list">
     <li v-for="(value, key) in items" :key=key>
       <p class="title">{{ getTitle(key) }}</p>
       <p class="value">{{ value }}</p>
     </li>
   </ul>
  </div>
</template>

<script>
export default {
  name: 'contractDetails',
  props:['id'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:{},
    }  
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },
    getTitle (key) {
      switch (key) {
        case 'contractName':
          return '合约名称';
          break;
        case 'code':
          return '合约代码';
          break;
         case 'exchange':
          return '上市交易所';
          break;
        case 'minimumVariablePrice':
          return '最小变动价位';
          break;
        case 'unit':
          return '交易单位';
          break;
        case 'month':
          return '合约月份';
          break;
        case 'time':
          return '交易时间';
          break;

        case 'lastNoticeDay':
          return '最后交易日';
          break;
        case 'mode':
          return '交割方式';
          break;
        case 'rangee':
          return '涨跌停板幅度';
          break;
        case 'supplement':
          return '最后交易日&结算补充';
          break;         
        default:
         return key;
          break;
      }
    }
  },
  created () {
     this.$axios.post('ContractDetails', {
        id : this.id
    })
    .then( (response) => {
      //console.log(response.data);
      let {isNewRecord, ...mytest} = response.data.contract;
      //console.log(mytest)
      this.items = mytest;
    })
    .catch( (error) => {
      console.log(error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/css/common";
.header{
  position: fixed;
  width: 7.5rem;
  background-color: #333340;
  .back{
    position: absolute;
    left: 0.28rem;
    top: 0.3rem;
    width: 0.18rem;
    height: 0.32rem;
    background: url('../../assets/images/contract_search/zuojiantou.png') center center no-repeat;
    background-size: 100%;
  }
  h2{
    @include font(0.36rem,0.88rem,#fff);
  }
}
.details-list{
  background-color: #ebf0f2;
  padding-top: 1.08rem;
  li{
    @include font(0.32rem, 0.62rem ,#333,left);
    padding-left: 0.3rem;
    background-color: #fff;
    margin-bottom: 0.2rem;
    .title{
      width: 6.8rem;
       &::before{
        content: '';
        display: inline-block;
        width: 0.1rem;
        height: 0.1rem;
        vertical-align: middle;
        margin-right: 0.1rem;
        background-color: #e64552;
        border-radius: 50%;
      }
    }
    .value{
      width: 6.8rem;
      font-size: 0.28rem;
      color:#666;
    }
   
  }
}
</style>

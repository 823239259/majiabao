<template>
  <div>
    <div class="header">
      <span class="back" @click="goBack"></span>
      <h2>{{id|headerName}}</h2>
    </div>
    <div class="wrap" :style="{height:client_height}">
      <div class="gold-group input-group">
        <h3>参数一</h3>
        <label for="">运费 (美元/吨)</label>
        <input @input="maxLength('carriage')" v-model="carriage" type="number" placeholder="">
      </div>
      <div class="gold-group input-group">
        <h3>参数二</h3>
        <label for="">基差(美分/蒲式耳)</label>
        <input @input="maxLength('jicha')" v-model="jicha" type="number" placeholder="">
      </div>
      <div class="gold-group input-group">
        <h3>参数三</h3>
        <label for="">税率</label>
        <input @input="maxLength('taxRate')" v-model="taxRate" type="number" placeholder="">
      </div>
      <div class="gold-group input-group">
        <h3>参数四</h3>
        <label for="">汇率(人民币/美元)</label>
        <input @input="maxLength('exchangeRate',5)" v-model="exchangeRate" type="number" placeholder="">
      </div>
      <div class="gold-group input-group">
        <h3>芝加哥盘面价</h3>
        <input @input="maxLength('panelPrice')" v-model="panelPrice" type="number" placeholder="">
      </div>
      <div class="gold-group input-group">
        <h3>美国离岸成本</h3>
        <input :value="usPrice" disabled type="number" placeholder="">
      </div>
      <div class="gold-group input-group">
        <h3>中国到岸成本</h3>
        <input :value="cnPrice" disabled type="number" placeholder="">
      </div>      
      <div class="btn-wrap">
        <button @click="getResult" class="btn">计算</button>
        <button @click="valueClean" class="btn btn-clean">重置</button>
        <p>注:税率＝(1＋关税)×(1＋增值税)</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'corn',
  data () {
    return {
      isChange: true,
      carriage: 61,
      jicha: 52,
      taxRate: 1.14,
      exchangeRate: '',
      panelPrice: '',
      usPrice: '',
      cnPrice: ''
    }  
  },
  computed: {
    client_height () {
      return document.documentElement.clientHeight + 'px'
    },
    id () {
      console.log(this.$route.name)
      return this.$route.name
    } 

  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },   
    getResult () {
      const msgArr = ['参数一','参数二', '参数三', '参数四', '芝加哥盘面价']
      const listArr = ['carriage','jicha', 'taxRate', 'exchangeRate', 'panelPrice']
      for (const index in listArr) {  
       if(!this.promptMsg(this[listArr[index]],msgArr[index])) return
      }
      // 美国离岸成本
      this.usPrice = this.moneyFormula(this.panelPrice, this.jicha, this.carriage)
      // 中国进口成本 = 离岸价 *税率 *汇率
      this.cnPrice = (this.usPrice * this.exchangeRate * this.taxRate).toFixed(3)
    },
    promptMsg (id,msg) {
      if(!id){
        this.$toast({
          message: '请输入' + msg,
          position: 'middle',
          duration: 2000
        })
        return false
      }else{
        return true
      }
    },
    moneyFormula (panelPrice, jicha, carriage) {
      //扩大倍数 避免js精度问题
      const params1 = 907; //公式参数1
      let usPrice = ((panelPrice + jicha)*params1 + carriage*1000)/1000
      return usPrice
    },
    maxLength (value, lengths = 9) {
      if(this[value].length>lengths) this[value] = this[value].slice(0,lengths)
    },
    valueClean () {
      const keyArr = ['carriage', 'jicha', 'taxRate', 'exchangeRate', 'panelPrice', 'usPrice', 'cnPrice']
      const valueArr =[61, 52, 1.14, '', '', '', '']
      keyArr.forEach((key,index) => {
        this[key] = valueArr[index]
      })

      
    }
  },
  filters: {
    headerName (idName) {
      switch (idName) {
        case 'corn':
          return '进口玉米换算价格'
          break;
        case 'wheat':
          return '进口小麦换算价格'
          break;
        default:
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.header{
  position: fixed;
  width: 7.5rem;
  background-color: #333340;
  z-index: 100;
  .back{
    position: absolute;
    left: 0.28rem;
    top: 0.3rem;
    width: 0.18rem;
    height: 0.32rem;
    background: url('../assets/img/zuojiantou.png') center center no-repeat;
    background-size: 100%;
  }
  h2{
    @include font(0.36rem,0.88rem,#fff);
    
  }
}
.wrap{
  width: 7.5rem;
  padding-top: 1.08rem;
  background-color: #dfe4e6;
  
}
.gold-group,.zn-group{
  position: relative;
  h3{
    @include font(0.26rem,0.86rem,#333,left);
    text-indent: 0.3rem;
  }
  input {
    width: 7rem;
    background-color: #fafafa;
    border-radius: 0.08rem;
    @include font(0.24rem,1rem,#333,left);
    text-indent: 0.3rem;
    border: 1px solid #dfe4e6;

  }
  input::-webkit-input-placeholder{
    color: #333;
  }
  label{
    position: absolute;
    right: 0.36rem;
    @include font(0.24rem,1rem,#333);

  }
}
.input-group{
  padding: 0.3rem 0;
  background-color: #fff;
  border-bottom: 1px solid #dfe4e6;
  
}

.btn-wrap{
  width: 7.5rem;
  background-color: #ebf0f2;
  p{
    @include font(0.26rem,0.86rem,#333);
  }
}
.btn{
  width: 5.7rem;
  @include font(0.36rem,1rem,#fff); 
  background-color: #e64552;
  border-radius: 0.08rem;
  margin-top: 0.6rem;
}  
.btn-clean{
  background-color: #ebf0f2;
  color: #e64552;
  border: 0.02rem solid #e64552;
}
</style>

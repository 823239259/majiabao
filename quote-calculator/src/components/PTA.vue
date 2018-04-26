<template>
  <div>
    <div class="header">
      <span class="back" @click="goBack"></span>
      <h2>PTA成本价计算</h2>
    </div>
    <div class="wrap" :style="{height:client_height}">
      <div class="gold-group input-group">
        <h3>PX价</h3>
        <label for="">人民币/克</label>
        <input @input="maxLength('pxPrice')" @focus="inputBug" @blur="output" v-model="pxPrice" type="number" placeholder="">
      </div>
      <div class="gold-group input-group">
        <h3>费用</h3>
        <label for="">美元/盎司</label>
        <input @input="maxLength('costPrice')" @focus="inputBug" @blur="output" v-model="costPrice" type="number" placeholder="">
      </div>
      <p class="text-box">PTA成本价公式：PTA成本价 = 0.655 × PX价 + 费用</p>
      <div class="gold-group input-group">
        <h3>结果</h3>
        <label for=""></label>
        <input @input="maxLength('taxRate')" :value="resultPrice" type="number" placeholder="">
      </div>
      
      <div class="btn-wrap">
        <button @click="getResult" class="btn">计算</button>
      </div>
      <div class="note-wrap">
        <div class="box">       
          <p>PX又称对二甲苯，是一种重要的有机化工原料，用它可生产精对苯二甲酸(PTA)。0.655×PX价格为原料成本，1200元为各种生产费用。</p>       
          <h2>说明:</h2>
          <ul>
            <li>PTA的生产原料成本PTA的原料成本=0.655*PX价</li>
            <li>单位产品直接加工成本约375元/吨 </li>
            <li>单位产品包装成本约45元/吨</li>
            <li>单位产品人工成本约20元/吨 </li>
            <li>单位产品财务费用约145元，单位产品折旧约305元</li>
            <li>单位产品维修、管理费用估计在60元/吨 </li>
            <li>单位产品运费约50元/吨 </li>
            <li>PTA生产的税前总成本：0.655×PX价+1000 "</li>
          </ul>  
        </div>      
      </div>
    </div>
  </div>
</template>

<script>
const pxPrams = 655;
const danwei  = 0.2027;
export default {
  name: 'corn',
  data () {
    return {
      isChange: true,
      pxPrice: '',
      costPrice: '1200',
      resultPrice: ''
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
      const msgArr = ['PX价','运费']
      const listArr = ['pxPrice','costPrice']
      for (const index in listArr) {  
       if(!this.promptMsg(this[listArr[index]],msgArr[index])) return
      }
      this.resultPrice = (((Number(this.pxPrice) * pxPrams) + Number(this.costPrice)*danwei)/1000).toFixed(3)
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
    maxLength (value, lengths = 9) {
      if(this[value].length>lengths) this[value] = this[value].slice(0,lengths)
    },
    inputBug () {
      this.isInput = true
    },
    output () {
      this.isInput = false
    }
  },
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
.text-box{
  @include font(0.26rem,0.86rem,#999);
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
  input[disabled],input:disabled,input.disabled{  
    color: #333;  
    -webkit-text-fill-color:#333;  
    -webkit-opacity:1;  
    opacity: 1;  
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
  padding: 0.3rem 0;
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
  //margin-top: 0.6rem;
}  
.note-wrap{
  width: 7.5rem;
  background-color: #fff;
  .box{
    width: 6.8rem;
    margin: 0 auto;
  }
  p{  
    @include font(0.26rem,0.4rem,#666,left); 
    padding-bottom: 0.5rem
  }
  h2{
    @include font(0.28rem,0.4rem,#000,left);
  }
  li{
    @include font(0.26rem,0.46rem,#666,left);
    list-style: disc;
    list-style-position: inside;
  }
}
.inputHeader{
  position: absolute;

}
</style>

<template>
  <div>
     <mt-header fixed :title="id|headerName" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap" :style="{height:client_height}">
      <div class="gold-group input-group">
        <label for="">{{isChange|change_name}}</label>
        <input @input="maxLength" v-model="in_money" type="number" placeholder="请输入金额">
      </div>
      <div class="input-group spacial-group">
        <div class="switch-box">
          <mt-switch v-model="isChange"></mt-switch>
        </div>        
      </div>
      <div class="zn-group input-group">
        <label for="">{{!isChange|change_name}}</label>
        <input :value="out_money" type="number" disabled>
      </div>
    </div>
  </div>
</template>

<script>
const goldRate = 2027;
export default {
  name: 'gold',
  props: ['id'],
  data () {
    return {
      isChange: true,
      in_money: '',

    }  
  },
  computed: {
    client_height () {
      return document.documentElement.clientHeight + 'px'
    },
    out_money () {
      if(!this.in_money){
        return ''
      }else if(this.isChange){
        return (this.in_money*goldRate)/10000
      }else{
        return (this.in_money*10000/goldRate).toFixed(4)
      }      
    }    
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    }, 
    maxLength () {
      if(this.in_money.length>9) this.in_money = this.in_money.slice(0,9)
    }   
  },
  filters: {
    change_name (blo) {
      if(blo){
        return '美元/盎司'
      }else{
        return '人民币/克'
      }
    },
    headerName (idName) {
      switch (idName) {
        case 'gold':
          return '黄金换算'
          break;
        case 'silver':
          return '白银换算'
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
@import "../../assets/css/common";

.wrap{
  width: 7.5rem;
  padding-top: 1.08rem;
  background-color: #dfe4e6;
  text-align: center;
}
.gold-group,.zn-group{
  position: relative;
  input {
    width: 7rem;
    background-color: #4595e6;
    border-radius: 0.08rem;
    @include font(0.24rem,1rem,#fff,left);
    text-indent: 0.3rem;

  }
  input::-webkit-input-placeholder{
    color: #fff;
  }
  label{
    position: absolute;
    right: 0.36rem;
    @include font(0.24rem,1rem,#fff);

  }
}
.input-group{
  padding: 0.3rem 0;
  background-color: #fff;
  border-bottom: 1px solid #dfe4e6;
  
}

.zn-group{
  input {
    background-color: #fff;
    border: solid 0.01rem #dfe4e6;
    color: #000;
  }
  input[disabled],input:disabled,input.disabled{  
    color: #333;  
    -webkit-text-fill-color:#333;  
    -webkit-opacity:1;  
    opacity: 1;  
  }  
  label{
    color: #999
  }
}
.spacial-group{
  height: 1.28rem;
}
.switch-box{
  position: absolute;
  left: 6.2rem;
} 
</style>

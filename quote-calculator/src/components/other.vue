<template>
  <div>
    <div class="header">
      <span class="back" @click="goBack"></span>
      <h2>面积长度温度换算</h2>
    </div>
    <div class="wrap" :style="{height:client_height}">
      <div class="note-wrap">
        <div class="box">            
          <h2>面积换算</h2>
          <ul>
            <li> 1平方公里（km2）=100公顷（ha）=247.1英亩（acre）=0.386平方英里（mile2）</li>
            <li>1平方米（m2）=10.764平方英尺（ft2） </li>
            <li>1公顷（ha）=10000平方米（m2）=2.471英亩（acre）</li>
            <li>1平方米（m2）=10.764平方英尺（ft2） </li>
            <li>1平方英里（mile2）=2.590平方公里（km2）</li>
            <li>1平方码（yd2）=0.8361平方米（m2）</li>
            <li>1平方英寸（in2）=6.452平方厘米（cm2） </li>
            <li>1英亩（acre）=0.4047公顷（ha）=4.047×10-3平方公里（km2）=4047平方米（m2）</li>
            <li>1平方英尺（ft2）=0.093平方米(m2)</li>
          </ul>  
        </div>  
      </div> 
      <div class="note-wrap">
        <div class="box">            
          <h2>长度换算</h2>
          <ul>
            <li>1千米（km）=0.621英里（mile）</li>
            <li>1米（m）=3.281英尺（ft）=1.094码（yd）</li>
            <li>1厘米（cm）=0.394英寸（in）</li>
            <li> 1英里（mile）=1.609千米（km） </li>
            <li>1海里（n mile）=1.852千米（km）</li>
            <li>1英寸（in）=2.54厘米（cm）</li>
          </ul>  
        </div>  
      </div>  
      <div class="note-wrap">
        <div class="box">            
          <h2>温度换算</h2>
          <ul>
            <li>K＝5/9（℉+459.67）</li>
            <li>K=℃+273.15n℃=(5/9·n+32)℉n℉=[(n-32)×5/9]℃</li>
            <li>1℉=5/9℃（温度差）</li>
          </ul>  
        </div>  
      </div>  
    </div> 
  </div>  
</template>

<script>
const pxPrams = 655;
export default {
  name: 'corn',
  data () {
    return {
      isChange: true,
    }  
  },
  computed: {
    client_height () {
      return document.documentElement.clientHeight + 'px'
    },
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },   
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
  padding: 0.3rem;
  margin-top: 0.3rem;
  .box{
    width: 6.8rem;
    margin: 0 auto;
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
.note-wrap:nth-child(1){
  margin-top: 0
}
</style>

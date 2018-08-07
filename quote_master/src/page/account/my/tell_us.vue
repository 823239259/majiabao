<template>
  <div id="tell_us" :style="{height:clientHeight}">
    <mt-header fixed title="意见反馈">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      <textarea v-model="value" placeholder="请输入您对我们的意见或者建议" cols="30" rows="5"></textarea>
      <button @click="submit" class="btn">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about_us',
  data () {
    return {
      value: ''
    }  
  },
  computed: {
    clientHeight () {
          return document.documentElement.clientHeight + 'px';
      }
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },   
    submit () {
      if(!this.value){
        this.$toast({message: '还未输入内容呢',duration: 2000})
      }else{
        this.$toast({message: '提交成功',duration: 2000})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
#tell_us{
   width: 7.5rem;
  padding-top: 0.96rem;
  //background-color: $bgButler
}
.wrap{
  width: 7.5rem;  
  margin-top: 0.2rem;
  text-align: center;
  textarea{
    width: 7.5rem;
    @include font(0.32rem,0.48rem,#333,left);
    padding: 0.2rem;
    box-sizing: border-box;
    outline:none;
    resize:none;
    //border: none;
    margin-bottom: 0.6rem;
  }
  .btn{
    width: 6.9rem;
    @include font(0.36rem,0.88rem,#fff);
    background-color: #169781;
    border-radius: 0.4rem;
  }
}
</style>

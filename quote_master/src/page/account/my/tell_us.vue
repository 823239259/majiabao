<template>
  <div id="tell_us" >
    <mt-header fixed title="BUG反馈">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      <h2 class="title">您想要说写什么？</h2>
      <textarea v-model="tellValue" placeholder="请输入您对我们的意见或者建议" cols="30" rows="3"></textarea>
    </div>
    <div class="wrap">
      <h2 class="title">您的手机号:</h2>
      <textarea v-model="mobile" placeholder="手机号" cols="30" rows="1"></textarea>
    </div>
    <div class="wrap">
      <h2 class="title">您的微信号：</h2>
      <textarea v-model="wxValue" placeholder="微信号" cols="30" rows="1"></textarea>
    </div>
    <div class="wrap">
      <h2 class="title">您的邮箱：</h2>
      <textarea v-model="eMail" placeholder="邮箱地址" cols="30" rows="1"></textarea>
    </div>
    <button @click="submit" class="btn">提交BUG</button>
  </div>
</template>

<script>
export default {
  name: 'about_us',
  data () {
    return {
      tellValue: '',
      mobile: '',
      wxValue: '',
      eMail: '',
      phoneReg:/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/,
      emailReg: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
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
      if(!this.tellValue||!this.mobile||!this.wxValue||!this.eMail){
        this.$toast({message: '有未输入内容',duration: 2000})
      }else if(!this.phoneReg.test(this.mobile)){
        this.$toast({message: '请输入正确的手机号码',duration: 2000})
      }else if(!this.emailReg.test(this.eMail)){
        this.$toast({message: '请输入正确的邮箱',duration: 2000})
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
  background-color: #fff;
  text-align: center;
}
.wrap{
  //width: 7.5rem;  
  margin: 0.2rem 0.3rem;
  padding: 0 0.3rem;
  background-color: #eaeaea;
  text-align: center;
  textarea{
    width: 100%;
    @include font(0.32rem,0.48rem,#fff,left);
    padding: 0.2rem;
    box-sizing: border-box;
    outline:none;
    resize:none;
    border: none;
    margin-bottom: 0.3rem;
    background-color: #ffffff
  }
  
}
.btn{
    width: 3.2rem;
    @include font(0.36rem,1rem,#fff);
    background-color: #497df5;
    border-radius: 0.1rem;
    margin-bottom: 0.3rem;
  }
.title{
  @include font(0.28rem,0.9rem,#9597a3,left);

}
</style>

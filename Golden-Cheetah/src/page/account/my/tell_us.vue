<template>
  <div id="tell_us" >
    <TopTitle title="意见反馈" type="back" />
    <div class="wrap">
      <textarea v-model="tellValue" placeholder="请输入您对我们的意见或者建议" cols="50" rows="5"></textarea>
    </div>
    <button @click="submit" class="btn">提交</button>
  </div>
</template>

<script>
import TopTitle from '../../../components/top_Title'
export default {
  name: 'about_us',
  components: {
    TopTitle
  },
  data () {
    return {
      tellValue: '',
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
      if(!this.tellValue) {
        this.$toast({message: '有未输入内容',duration: 2000})
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
  text-align: center;
  textarea{
    width: 100%;
    @include font(0.32rem,0.48rem,#333,left);
    padding: 0.2rem;
    box-sizing: border-box;
    outline:none;
    resize:none;
    border-top: none;
    margin-bottom: 0.3rem;
    background-color: #ffffff
  }
  
}
.btn{
    width: 5.7rem;
    @include font(0.36rem,1rem,$btn_bg_color);
    background-color: $btn_color;
    border-radius: 0.1rem;
    margin-bottom: 0.3rem;
  }
.title{
  @include font(0.28rem,0.9rem,#9597a3,left);

}
</style>

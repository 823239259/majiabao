<template>
  <div id="tell_us" :style="{height:clientHeight}">
    <mt-header fixed title="意见反馈">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
      <div class="topic_box flex-box">
          <div class="left">
            <img src="../../../assets/images/home/top_icon.png" alt="话题配图">
          </div>
          <div class="right">
            <h3>#我给产品提建议#</h3>
            <p>欢迎大家在此吐槽或提建议，产品经理将倾听反馈。如遇问题或BUG请在APP中联系客服</p>
          </div>
      </div>
      <div class="navbar">
        <div></div>
        <div :class="['item', {'selected': selected==index}]" v-for="(item, index) in tabList" :key="index" @click="changeItem(index)">{{item}}</div>
      </div>
      <div class="nav_content">
        <div v-show="selected == 0">
          <TalkArea1 id="最新讨论"></TalkArea1>
        </div>
        <div v-show="selected == 1">
          <TalkArea2 id='热门讨论'></TalkArea2>
        </div>
      </div>



      
    </div>
  </div>
</template>

<script>
import TalkArea1 from '../../../components/talkArea'
import TalkArea2 from '../../../components/talkArea'

export default {
  name: 'about_us',
  components: {
    TalkArea1,
    TalkArea2
  },
  data () {
    return {
      value: '',
      selected: 0,
      tabList: ['最新讨论', '热门讨论']
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
    changeItem (index) {
          this.selected = index
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
.flex-box{
  @include flex(space-between);
  .left{
    flex: 1
  }
  .right{
    flex: 3
  }
}
.topic_box{
  padding: 0 0.3rem;
  .left{
    img{
      width: 1.3rem
    }
  }
  .right{
    h3{
      @include font(0.32rem, 0.72rem,#181722,left)

    }
    p{
      @include font(0.28rem, 0.42rem,#8f94a7,left)
     
    }
  }
}
.navbar{
  @include flex();
  @include font(0.28rem, 0.8rem,#8f94a7);
  border-top: 1px solid #344a65;
  border-bottom: 1px solid #344a65;
  .item{
    flex: 1
  }
  .selected{
    color: #ffffff;
    background-color: #8f94a7;
  }

}
</style>

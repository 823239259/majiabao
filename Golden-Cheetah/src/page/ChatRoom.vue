<template>
  <div id="home">
    <TopTitle title="聊天室" >
      <span slot="my_right" class="header_icon customer_icon"></span>
    </TopTitle>
    <div class="video-box">
      <p class="title">本期主体视频</p>
      <p class="date">当前时间：2018-9-17 14:26</p>
      <div class="video-img">
        <img :src="imgUrl" width="100%">
      </div>
      <p class="note">在人多的时候切换会有更好的体验</p>
      <div class="per-flower">
        <p class="person-num">
          <img :src="personImg">
          <span>当前人数：3123人</span>
        </p>
        <p class="flower-num">
          <img :src="flowerImg"></img>
          <span>频道鲜花：3123</span>
        </p>
      </div>
      <div class="speak" v-for="(speak,index) in speakArr" :key="index">
        <div class="header-img">
          <img :src="speak.HeadPortrait" >
        </div>
        <ul class="speak-msg">
          <li class="user-name">{{speak.name}}</li>
          <li class="user-speak">{{speak.speakMsg}}</li>
          <li class="user-date">{{speak.speakDate}}</li>
        </ul>
      </div>
    </div>
    <div class="user-input">
      <p><img :src="flowerIcon"></p>
      <p><input type="text"></p>
      <p><img :src="enterIcon" alt=""></p>
    </div>
    <bottomTab :tabSelect="tabSelected"></bottomTab>
  </div>
</template>

<script>
  import bottomTab from '../components/bottom_tab'
  import TopTitle from '../components/top_Title'
  export default {
    data() {
      return {
        msg: '聊天室',
        tabSelected: 'chat-room',
        imgUrl:require('../assets/ChatRoomImg/video1.png'),
        personImg:require('../assets/images/golden_cheetah/persons_icon.png'),
        flowerImg:require('../assets/images/golden_cheetah/flower_yellow.png'),
        speakArr:[
          {
            HeadPortrait:require('../assets/images/golden_cheetah/person01.png'),
            name:'长者',
            speakMsg:'我和大佬谈笑风声',
            speakDate:'2018-9-17 16:08'
          },
          {
            HeadPortrait:require('../assets/images/golden_cheetah/person02.png'),
            name:'长者',
            speakMsg:'我和大佬谈笑风声',
            speakDate:'2018-9-17 15:08'
          },
        ],
        flowerIcon:require('../assets/images/golden_cheetah/flower_icon.png'),
        enterIcon:require('../assets/images/golden_cheetah/enter_icon.png')
      }
    },
    components: {
      bottomTab,
      TopTitle,
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";
  #home {
    width: 7.5rem;
    /*min-height:7rem;*/
    background-color: $bodyBg;
    padding-top: 0.96rem;
    padding-bottom: 1.22rem;
    //overflow: hidden;
    height: 100vh;
  }
  .video-box{
    width: 6.9rem;
    /*height: 4rem;*/
    /*background-color:black;*/
    color:#fff;
    margin: 0 auto;
    display: block;
    /*text-align: center;*/
  }
  .title{
    float: left;
    font-size: 0.3rem;
    height: 0.3rem;
    line-height: 0.36rem;
  }
  .date{
    float: right;
    height: 0.3rem;
    line-height: .35rem;
  }
  .video-img img{
    margin-top: .2rem;
    border-radius: .4rem;
  }
  .note{
    margin-top: .3rem;
  }
  .per-flower{
    margin-top: 0.43rem;
    margin-bottom: 1rem;
  }
  .person-num img{
    width: .4rem;
  }
  .person-num{
    float: left;
  }
  .flower-num{
    float: right;
  }
  .flower-num img{
    width: .4rem;
  }
  .speak{
    width: 6.9rem;
    height: 1.8rem;
    background-color:#373a41;
    margin-top: .3rem;
    border-radius: .2rem;
    position: relative;
  }
  .header-img img{
    position: absolute;
    width: .8rem;
    left: .29rem;
    top: .29rem;
  }
  .speak-msg{
    position: absolute;
    top:.34rem;
    left:1.29rem;
  }
  .speak-msg li{
    margin-bottom: .2rem;
  }
  .user-name{
    font-size: .32rem;
  }
  .user-speak{
    font-size: .28rem;
  }
  .user-date{
    font-size: .24rem;
  }
  .user-input{
    width: 7.5rem;
    height: 0.98rem;
    background-color: #4c5059;
    margin: 0 auto;
    line-height: .98rem;
    position: absolute;
    bottom: 1.23rem;
  }
  .user-input p{
    float: left;
    margin-left: .3rem;
  }
  .user-input p input{
    width: 5.3rem;
    height: .7rem;
    background-color: #303238;
    border-radius: .35rem;
    color:#fff;
  }
  .user-input p img{
    width: .5rem;
  }
</style>

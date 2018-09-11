<template>
<div class="wrap">
    <div class="my_box" v-for="(item, index) in imgList" :key="index">
        <h2 class="titles">{{titleList[index]}}</h2>
        <div class="box"  @click="goto(item.id)" >
            <img :src="item.img" alt="01">
        </div>
        <div class="icon_box">
          <span :class="['icon', 'dianzan_no',{'dianzan_sure':item.isGood}]" @click="dianzan(item)"></span>
          <span class="numbers">{{item.goodNumbers}}</span>
          <span class="icon share_icon" @click="shareSystem"></span>
        </div>
    </div>                                    
</div>
</template>

<script>
  import pro from '../../assets/js/common'
  
  const local = pro.local;
  
  export default {
    name: "community_activity",
    components: {
     
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        userInfo: {},
        imgList: [{
            img: require('../../assets/images/home/welfare_activity01.jpg'),
            id: 1,
            isGood: false,
            goodNumbers: 43
        },
        {
            img: require('../../assets/images/home/welfare_activity02.jpg'),
            id: 2,
            isGood: false,
            goodNumbers: 64
        },
        {
            img: require('../../assets/images/home/welfare_activity03.jpg'),
            id: 3,
            isGood: false,
            goodNumbers: 12
        },
        {
            img: require('../../assets/images/home/welfare_activity04.jpg'),
            id: 4,
            isGood: false,
            goodNumbers: 54
        }],
        titleList: ['管家签到', '管家讲堂', '问答有礼', '推荐有奖'],
        today: ''
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      
    },
    methods: {
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      goto(path) {
        this.$router.push({
          path: `/welfare_details/${path}`
        });
      },
      dianzan (item) {
        if (!this.userInfo.name) return this.$toast({message: "您还未登录",duration: 1000});
        if(item.isGood){
            return  this.$toast({
                message: "你已经点赞过了",
                duration: 1000
            });
        }else{
            item.isGood = true;
            item.goodNumbers++;
            this.setImgList();
            this.$toast({
                message: "点赞成功",
                duration: 1000
            });

        }
      },
      setImgList () {
         //this.imgList[this.id] = this.community;
          local.set('imgList',this.imgList)
      },
      getToday () {
        return new Date().toLocaleDateString();
      },
      updateTime () {
        let today = new Date().toLocaleDateString();
        if(this.today == today) return;
        this.today = today;
        local.set('today', this.today)
        this.imgList.forEach(obj => {
          obj.goodNumbers = obj.goodNumbers + Math.round(Math.random()*4+1)
        });
        this.setImgList()
      }
    },
    mounted() {
      
      if (!local.get('today')) {
        local.set('today', this.getToday())
      }
    },
    activated() {
      this.userInfo = local.get('user')||{};
      this.imgList = local.get('imgList')||this.imgList;
      // this.today = local.get('today1')||this.getToday();
      // this.updateTime()
  
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #butler_welfare {
    width: 7.5rem;
    padding-top: 0.96rem;
    background-color: $bgButler;
  }
  .my_box{
    background-color: #fff;
    border-bottom: 0.16rem solid $bgButler;
  }
  .box{
    margin-bottom: 0.16rem; 
    img{
      display: block;
      width: 6.9rem;
      height: 2.4rem;
      border-radius: 0.1rem;
      margin: 0 auto;
    }
  }
  .titles{
    @include font($fs28,0.8rem,#283835,left);
    padding: 0 0.3rem;
  }
  .icon_box{
    @include flex(flex-end);
    padding: 0 0.3rem;

  }
  .numbers{
    @include font($fs24,0.32rem,#de8c22);
    padding: 0 0.15rem;
  }
  .icon{
    width: 0.6rem;
    height: 0.6rem;
    margin-left: 0.1rem;

  }
  .dianzan_no{
    background: url('../../assets/images/home/dianzan_no.png') center no-repeat;
    background-size: 0.32rem 0.32rem;
  }
  .dianzan_sure{
    background: url('../../assets/images/home/dianzan_sure.png') center no-repeat;
    background-size: 0.32rem 0.32rem;
  }
  .share_icon{
    background: url('../../assets/images/home/share_icon_green.png') center no-repeat;
    background-size: 0.32rem 0.32rem;
  }



</style>
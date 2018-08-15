<template>
  <div id="list_details">
    <div class="scroll_wrap" ref="scrollWrap">
        <h2 class="titles">话题讨论</h2>
        <div class="comment_wrap">
            <ul class="comment_list">
                <li class="comment_item" v-for="(item, index) in community" :key="index">
                    <div class="title_box">
                        <div class="left">
                            <img :src="item.img" alt="03">
                            <!-- <p>{{nameList[userInfo.username]||item.name}}</p> -->
                        </div>
                        <div class="right">
                            <p>{{item.contentText}}</p>
                            
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    
    <div class="input_wrap">
        <button class="dianzan" @click="dianzan">{{dianzanText}}</button>
        <button class="dianzan" @click="shoucang">{{isSelectedText}}</button>
        <textarea class="input" v-model="text" rows="1"  :class="{'lh36': rows>1}" @focus="focus1" @blur="blur1"></textarea>
        <button class="btn" @click="addNews">发送</button>
    </div>
    
  </div>
</template>

<script>
  import pro from '../assets/js/common'
  
  const local = pro.local;
  let interval;
  
  export default {
    name: "list_details",
    props: ['id'],
    components: {
     
    },
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        isSelected: false,
        isGood: false,
        details: {},
        text: '',
        communityList: {},
        community: [{
            time: '2018-6-25',
            name: 'kelelle',
            img: require('../assets/images/home/person02_icon.png'),
            goodNumbers: 123,
            contentText: '搞定了感觉到了分管局领导国家劳动法攻击力的房价高的浪费了较高的老公的浪费国家了'
        },
        {
            time: '2018-6-25',
            name: 'kelelle',
            img: require('../assets/images/home/person02_icon.png'),
            goodNumbers: 123,
            contentText: '搞定了感觉的浪费国家了'
        },
        {
            time: '2018-6-25',
            name: 'kelelle',
            img: require('../assets/images/home/person02_icon.png'),
            goodNumbers: 123,
            contentText: '搞定的浪费了较高的老公的浪费国家了'
        }
        ],
        userInfo: {},
        nameList: {}
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      title () {
        return this.details.categoryText + '详情'
      },
      rows () {
          //console.log(Math.ceil(this.text.length/19))
          return Math.ceil(this.text.length/19)
      },
      currentDetail () {
        //   console.log(this.$store.state.market.currentDtail)
          return this.$store.state.market.currentdetail
      },
      dianzanText () {
          return this.isGood?'已赞': '点赞'
      },
      isSelectedText () {
          return this.isSelected?'已收藏': '收藏'
      },
      
    },
    methods: {
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      goto(path) {
        this.$router.push({
          path: path
        });
      },
      dianzan () {
        if(this.isGood){
            return  this.$toast({
                message: "你已经点赞过了",
                duration: 1000
            });
        }else{
            this.isGood = true;
            this.setGood();
            this.$toast({
                message: "点赞成功",
                duration: 1000
            });

        }
      },
      shoucang () {
        if(this.isSelected){
            return  this.$toast({
                message: "你已经收藏过了",
                duration: 1000
            });
        }else{
            this.isSelected = true;
            this.setshoucang();
            this.$toast({
                message: "点赞成功",
                duration: 1000
            });

        }
      },
      setGood () {
          if (!this.communityList[this.currentDetail.CommodityNo]) {
              this.communityList[this.currentDetail.CommodityNo] = {}
          }
          this.communityList[this.currentDetail.CommodityNo].isGood = this.isGood;
          local.set('communityList',this.communityList)
      },
      setshoucang () {
          if (!this.communityList[this.currentDetail.CommodityNo]) {
              this.communityList[this.currentDetail.CommodityNo] = {}
          }
          this.communityList[this.currentDetail.CommodityNo].isSelected = this.isGood;
          local.set('communityList',this.communityList)
      },
      addNews () {
          if (!this.text) return this.$toast({message:"发送内容不能为空",duration: 1000});
          let nowTime = pro.getDate(new Date().getTime(),'y-m-d');
          let newsObj = {
              time: nowTime,
              contentText: this.text,
              img: require('../assets/images/home/person02_icon.png'),
              goodNumbers: 0,
              name: this.userInfo.username,
              isGood: false
          }
          
          this.community.push(newsObj);
          this.setCommunicationList();
          this.text = '';
          console.log(123)
          this.$nextTick(()=>{
            //    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            setTimeout(()=>{
                if (document.documentElement) {
                    document.documentElement.scrollTop = 100000;
                }else{
                    document.body.scrollTop = 100000
                }
                
            },20)
          })
          
      },
      setCommunicationList () {
          console.log(this.communityList[this.currentDetail.CommodityNo])
          if (!this.communityList[this.currentDetail.CommodityNo]) {
              this.communityList[this.currentDetail.CommodityNo] = {}
          }
          this.communityList[this.currentDetail.CommodityNo].contentList = this.community;
        //   this.communityList[this.currentDetail.CommodityNo] = this.community;
          local.set('communityList',this.communityList)
      },

        focus1(event){
            // interval = setInterval(function(){//设置一个计时器，时间设置与软键盘弹出所需时间相近
            //     if (document.documentElement) {
            //          document.documentElement.scrollTop = document.documentElement.scrollHeight
            //     }else{
            //         document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
            //     }
            // },100)
        },
        blur1 () {
            // console.log(111)
            // clearInterval(interval)
        }
    },
    mounted() {
        // console.log('mounted')
         if(JSON.stringify(this.communityList) === JSON.stringify(local.get('communityList'))){
           this.community = this.communityList[this.currentDetail.CommodityNo].contentList||[];
       } else{
        //    console.log(123)
           this.communityList = local.get('communityList')?local.get('communityList'):{};
           this.community = this.communityList[this.currentDetail.CommodityNo].contentList||[];
       }
        this.userInfo = local.get('user')||{}
        this.nameList = local.get('nameList')|| {}
        this.isGood =  this.communityList[this.currentDetail.CommodityNo].isGood||false;
        this.isSelected =  this.communityList[this.currentDetail.CommodityNo].isSelected||false;
    },
    activated() {
        console.log(this.$store.state.market.currentNo)
        this.communityList = local.get('communityList')?local.get('communityList'):{};
        this.community =  (this.communityList[this.$store.state.market.currentNo]&&this.communityList[this.$store.state.market.currentNo].contentList)||[];
        this.userInfo = local.get('user')||{}
        this.nameList = local.get('nameList')|| {}
        this.isGood =  (this.communityList[this.$store.state.market.currentNo]&&this.communityList[this.$store.state.market.currentNo].isGood)||false;
        this.isSelected =  (this.communityList[this.$store.state.market.currentNo]&&this.communityList[this.$store.state.market.currentNo].isSelected)||false;
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";
  #list_details {
    width: 7.5rem;
    //padding-top: 0.96rem;
    //background-color: $bg;
  }
  .scroll_wrap{
    //height: calc(100vh - 1rem - 0.96rem);
	box-sizing: border-box;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
    padding-bottom: 0.8rem;

  }
  h2{
    width: 7.5rem;
    padding-left: 0.3rem;
    @include font($fs32,1rem,#fff,left);
    border-bottom: 1px solid #383b4e;
    }

  .comment_wrap{
      width: 7.5rem;
      .comment_list{
          padding: 0.24rem 0.3rem;
          
      }
      .comment_item{
          padding-bottom: 0.2rem;
      }
      .title_box{
          @include flex(space-between,flex-start);
          .left{
              margin-right: 0.2rem;
              img{
                max-width: none;
                width: 0.8rem;
              }
              p{
                  @include font($fs32,0.48rem,#de8c22,left);
              }
          }
          .right{
              flex: 1;
              min-height: 0.8rem;
              border-bottom: 1px solid #383b4e;
               @include flex(space-between);
            //   .dianzan_icon{
            //       width: 0.32rem;
            //       height: 0.32rem;
            //       background: url('../assets/images/home/dianzan_no.png') center no-repeat;
            //       background-size: 100%;
            //       margin-right: 0.2rem;
            //   }
            //   .dianzan_sure{
            //       background: url('../assets/images/home/dianzan_sure.png') center no-repeat;
            //       background-size: 100%;  
            //   }
              p{
                  
                  @include font($fs30,0.56rem,#9597a3,left);
                  span{
                      color: #333;
                  }
              }
          }
      }
      .comment_text{
          padding: 0.1rem 0.6rem;
          @include font($fs28,0.48rem,#788b87,left);
      }
      .time{
         @include font($fs24,0.48rem,#788b87,right); 
      }
  }
.input_wrap{
    // position: fixed;
    // bottom: 0;
    @include flex(space-between);
    padding: 0.2rem;
    width: 7.5rem;
    background-color: #2a2f42;
    border-top: 1px solid #383b4e;
    .input{
        width: 4.2rem;
        height: 0.72rem;
        @include font($fs28,.72rem,#fff,left);
        padding: 0 0.2rem;
        background-color: #373a4d;
        border-radius: 0.35rem;
        vertical-align: middle;
        border: none
    }
    .dianzan,.btn{
        width: 0.7rem;
        height: 0.7rem;
        background-color: #585b6c;
        border-radius: 50%;
        @include font(0.26rem,0.7rem,#fff)
    }
    .btn{
        background-color: #6064e1;
        
    }
    .lh36{
        line-height: 0.36rem;
    }
}


</style>
<template>
  <div id="list_details">
    <mt-header :title="title" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="scroll_wrap" ref="scrollWrap">
        <div class="wrap">
            <h2>{{details.title}}</h2>
            <p v-html="details.content"></p>
        </div>
    </div>
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  
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
        details: {},
        text: '',
        communityList: {},
        community: [{
            time: '2018-6-25',
            name: 'kelelle',
            img: require('../../assets/images/home/person02_icon.png'),
            goodNumbers: 123,
            contentText: '搞定了感觉到了分管局领导国家劳动法攻击力的房价高的浪费了较高的老公的浪费国家了'
        }],
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
      }
      
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
      dianzan (item) {
       
        if(item.isGood){
            return  this.$toast({
                message: "你已经点赞过了",
                duration: 1000
            });
        }else{
            item.isGood = true;
            item.goodNumbers++;
            this.setCommunicationList();
            this.$toast({
                message: "点赞成功",
                duration: 1000
            });

        }


         
      },
      addNews () {
          if (!this.text) return this.$toast({message:"发送内容不能为空",duration: 1000});
          let nowTime = pro.getDate(new Date().getTime(),'y-m-d');
          let newsObj = {
              time: nowTime,
              contentText: this.text,
              img: require('../../assets/images/home/person02_icon.png'),
              goodNumbers: 0,
              name: this.userInfo.username,
              isGood: false
          }
          this.community.push(newsObj);
          this.setCommunicationList();
          this.text = '';
          this.$nextTick(()=>{
              this.$refs.scrollWrap.scrollTop = 100000;
          })
          
      },
      setCommunicationList () {
          this.communityList[this.id] = this.community;
          local.set('communityList',this.communityList)
      },
       getNewDetails() {
                const data = {
                    id: this.id
                }
                pro.fetch("post", "/others/getTNotice", data, "").then((res) => {
                    //console.log(res)
                    if (res.success == true) {
                        if (res.code == 1) {
                            //console.log(res.data)
                            this.details = res.data
                        }
                    }
    
                }).catch((err) => {
                    var data = err.data;
                    if (data == undefined) {
                    } else {
                        if (data.code == -9999) {
                            this.$toast({
                                message: "认证失败，请重新登录",
                                duration: 1000
                            });
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 1000
                            });
                        }
                    }
                })
            },
            focus1(event){
                

                interval = setInterval(function(){//设置一个计时器，时间设置与软键盘弹出所需时间相近
                    document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
                },100)
            },
            blur1 () {
                clearInterval(interval)
            }
    },
    activated() {
        this.getNewDetails();
        if(JSON.stringify(this.communityList) === JSON.stringify(local.get('communityList'))){
           this.community = this.communityList[this.id]||[];
       } else{
           this.communityList = local.get('communityList')?local.get('communityList'):{};
           this.community = this.communityList[this.id]||[];
       }
        this.userInfo = local.get('user')||{}
        this.nameList = local.get('nameList')|| {}
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #list_details {
    width: 7.5rem;
    //padding-top: 0.96rem;
    //background-color: $bg;
  }
  .scroll_wrap{
    height: calc(100vh - 1rem - 0.96rem);
	box-sizing: border-box;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch

  }
  .wrap{
    padding-bottom: 0.2rem;
    border-bottom: 0.16rem solid #e5f9f6;
      h2{
        width: 7.5rem;
        padding-left: 0.3rem;
        @include font($fs32,0.8rem,$blackNormal,left);
      }
      p{
        padding: 0 0.3rem;
        @include font($fs28,0.46rem,$blackNormal,left);
      }
    
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
          @include flex(space-between);
          .left{
              @include flex(space-between);
              img{
                  width: 0.48rem;
                  height: 0.48rem;
                  margin-right: 0.15rem;
              }
              p{
                  @include font($fs32,0.48rem,#de8c22,left);
              }
          }
          .right{
              @include flex(space-between);
              .dianzan_icon{
                  width: 0.32rem;
                  height: 0.32rem;
                  background: url('../../assets/images/home/dianzan_no.png') center no-repeat;
                  background-size: 100%;
                  margin-right: 0.2rem;
              }
              .dianzan_sure{
                  background: url('../../assets/images/home/dianzan_sure.png') center no-repeat;
                  background-size: 100%;  
              }
              p{
                  @include font($fs26,0.48rem,#788b87,left);
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
    position: fixed;
    bottom: 0;
    width: 7.5rem;
    background-color: $headerColor;
    text-align: center;
    .input{
        width: 5.4rem;
        height: 0.72rem;
        @include font($fs28,.72rem,#333,left);
        padding: 0 0.2rem;
        background-color: #fff;
        border-radius: 0.35rem;
        vertical-align: middle;
    }
    .btn{
        width: 1.16rem;
        height: 0.7rem;
        background-color: #ebf0f2;
        border-radius: 0.1rem;
        @include font($fs36,.7rem,#169781);
        margin: 0.15rem 0;
        vertical-align: middle;
    }
    .lh36{
        line-height: 0.36rem;
    }
}


</style>
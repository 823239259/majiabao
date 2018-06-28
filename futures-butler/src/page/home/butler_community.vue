<template>
  <div id="butler_community" >
    <mt-header title="管家社区" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="scroll_wrap" ref="scrollWrap">
         <div class="community_wrap">
            <div class="Communication_box">
                <div class="note_box">
                    <div class="title_box">
                        <span class="butler_icon"></span>
                        <p class="title">管家小助手</p>
                    </div>
                    <p class="note">温馨提示：大家可以在这里学习交流哦</p>
                </div>
            </div>
            <div class="msg_wrap">
                <div class="msg_box clearfix" v-for="(n, index) in communicationList">
                    <div class="msg" :class="n.type === 'others'?'others':'my'">
                        <img :src="personImg[n.type]" alt="01"> 
                        <div  class="msg_s_box">
                            <div class="msg_s">
                                <p class="msgs">{{n.content}}</p>
                            </div>
                            <span class="time">{{n.time}}</span>
                        </div>
                    </div>
                    
                    
                </div>
            </div>

    </div>
    </div>
   
    <div class="input_wrap">
        <textarea class="input" v-model="text" rows="1"  :class="{'lh36': rows>1}" @focus="focus1" @blur="blur1"></textarea>
        <button class="btn" @click="addNews('my')">发送</button>
    </div>
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  
  const local = pro.local;
  let interval;
  export default {
    name: "butler_community",
    components: {
     
    },
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        personImg: {
            others: require('../../assets/images/home/person01_icon.png'),
            my: require('../../assets/images/home/person02_icon.png'),
        },
        text: '',
        communicationList: [
                    {
                        type: 'others',
                        content: '大哥，明天和谁打？时间地点',
                        time:  '2018/6/25 23:51',
                    },
                    {
                        type: 'my',
                        content: '不知道咋死的',
                        time:  '2018/6/25 23:51',
                    },
               
                    {
                        type: 'others',
                        content: '大哥，明天和谁打？时间地点',
                        time:  '2018/6/25 23:51',
                    },
                    {
                        type: 'my',
                        content: '不知道咋死的',
                        time:  '2018/6/25 23:51',
                    },
                    {
                        type: 'my',
                        content: '速度来',
                        time:  '2018/6/25 23:51',
                    }
                
  
        ],
      }  
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      rows () {
          //console.log(Math.ceil(this.text.length/19))
          return Math.ceil(this.text.length/19)
      },
     
      
    },
    methods: {
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      addNews (type) {
          if (!this.text) return this.$toast({message:"发送内容不能为空",duration: 1000});
          let nowTime = pro.getDate(new Date().getTime(),'y/m/d h:i');
          let newsObj = {
              type: type,
              content: this.text,
              time: nowTime
          }
          this.communicationList.push(newsObj);
          this.setCommunicationList();
          this.text = '';
          this.$nextTick(()=>{
              this.$refs.scrollWrap.scrollTop = 100000;
          })

      },
       focus1(event){
                interval = setInterval(function(){//设置一个计时器，时间设置与软键盘弹出所需时间相近
                    document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
                },100)
            },
        blur1 () {
            clearInterval(interval)
        },
      setCommunicationList () {
          local.set('communicationList',this.communicationList)
      },
      
    },
    activated() {
       if(JSON.stringify(this.communicationList) === JSON.stringify(local.get('communicationList'))){
           return;
       } else{
           this.communicationList = local.get('communicationList')?local.get('communicationList'):[]
       }
       
      
  
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #butler_community {
    width: 7.5rem;
    background-color: $bgButler;
  }
  .note_box{
      padding: 0 0 0.6rem 0.3rem;
  }
  .title_box{
      font-size: 0;
      padding: 0.2rem 0 0.1rem 0;
  }
  .butler_icon{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.2rem;
    background: #169781 url('../../assets/images/home/zhinan_bg.png') center no-repeat;
    background-size: 0.2rem  0.32rem;
    border-radius: 50%;
    vertical-align: middle;
}
.title{
    display: inline-block;
    @include font($fs28,.4rem,#169781,left);
    vertical-align: middle;
}
.note{
    @include font($fs28,.4rem,#788b87,left);
}

.msg_wrap{
    text-align: center;
    padding-bottom: 1rem;
}
.time{
    display: inline-block;
    @include font($fs24,.4rem,#c6c5cc);
}   
.msg_box {
    
   //margin-top: 0.3rem;  
}
.msg{
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    width: 6.1rem;
    margin-bottom: 0.3rem;
    
    img{
        width: 0.8rem;
        height: 0.8rem;
        margin-right: 0.3rem; 
    }
    .msg_s_box{
        text-align: right;
    }
    .msg_s{
        position: relative;
        @include font($fs28,.36rem,#333,left);
        background-color: #fff;
        border-radius: 0.04rem;
        
        &::before{
            position: absolute;
            content: '';
            display: block;
            width: 0;
            height: 0;
            border: 0.18rem solid transparent;
            
        }

    }
    
    .msgs{
        
        padding: calc((0.8rem - 0.36rem)/2) 0.2rem; 
    }

}
.others{
    margin-left: 0.3rem;
    .msg_s{
        &::before{
            left: -0.35rem;
            top: 0.2rem;
            border-right-color: #fff;
        }
    }
}

.my{
    justify-content: flex-end;
    float: right;
    margin-right: 0.3rem;
    img{
        order: 2;
        margin: 0 0 0 0.3rem;
    }
    .msg_s{
        color: #fff;
        background-color: #169781;
        &::before{
            right: -0.35rem;
            top: 0.2rem;
            border-left-color: #169781;
        }
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
.scroll_wrap{
    height: calc(100vh - 1rem - 0.96rem);
	box-sizing: border-box;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch

  }

</style>
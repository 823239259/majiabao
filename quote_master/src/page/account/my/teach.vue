<template>
  <div id="butler_community" >
    <mt-header fixed title="投资者教育" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="scroll_wrap" ref="scrollWrap">
         <div class="community_wrap">
            <div class="msg_wrap">
                <div class="msg_box clearfix" v-for="(n, index) in communicationList">
                    <div class="msg" :class="n.type === 'others'?'others':'my'">
                        <img :src="personImg[n.type]" alt="01"> 
                        <div  class="msg_s_box">
                            <div class="msg_s">
                                <p class="msgs" v-html="n.content"></p>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
    </div>
    </div>
  </div>
</template>

<script>
  import pro from '../../../assets/js/common'
  
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
            others: require('../../../assets/images/home/person01_icon.png'),
            my: require('../../../assets/images/home/person02_icon.png'),
        },
        text: '',
        communicationList: [
                    {
                        type: 'others',
                        content: '什么是期货？',
                    },
                    {
                        type: 'my',
                        content: '期货的英文为Futures，是由“未来” 一词演化而来，其含义是：交易双方不必在买卖发生的初期就交收实货，而是共同约定在未来的某一时刻交收实货，因此就称其为“期货”。<br/><br/>通俗地说，就是你要买一样东西，但要三个月后才买，但你不知道三个月后的价格会变成怎样，所以你先找人肯三个月后卖给你，先签合同，你先给一部分定金，三个月后就可以以合同价买入，避免了三个月中的价格变动风险。<br/><br/>所以，期货也称为期货合约，是由期货交易所统一指定的标准化合约，规定了期货交易的买卖对象或标的物，在什么时间，什么地点进行一定数量和质量商品的交割。',
                    },
                     {
                        type: 'others',
                        content: '现货和期货有什么区别吗？',
                    },
                    {
                        type: 'my',
                        content: '1、买卖的直接对象不同；<br/>2、交易目的不同；<br/>3、交易方式不同；<br/>4、交易场所不同；<br/>5、保障制度不同；<br/>6、商品范围不同；<br/>7、结算方式不同；',
                    },
                    {
                        type: 'others',
                        content: '期货的买卖对象是什么？',
                    },
                    {
                        type: 'my',
                        content: '目的一般不是到期获得实物。套期保值者的目的是通过期货交易转移现货市场的价格风险，投资者的目的是为了从期货市场的价格波动中获得风险利润。',
                    },
                    {
                        type: 'others',
                        content: '期货的交易目的是什么？',
                    },
                    {
                        type: 'my',
                        content: '目的一般不是到期获得实物。套期保值者的目的是通过期货交易转移现货市场的价格风险，投资者的目的是为了从期货市场的价格波动中获得风险利润',
                    },
                    {
                        type: 'others',
                        content: '期货的交易方式什么？',
                    },
                    {
                        type: 'my',
                        content: '是以公开，公平竞争的方式进行交易。一对一谈判交易被视为违法。',
                    },
                    {
                        type: 'others',
                        content: '期货的交易场所在哪儿？',
                    },
                    {
                        type: 'my',
                        content: '必须在交易所内依照法规进行公开，集中交易，不能进行场外交易。',
                    },
                    {
                        type: 'others',
                        content: '期货的保障制度是什么？',
                    },
                    {
                        type: 'my',
                        content: '除了国家的法律和行业，交易所规则之外，主要是保证金等期货交易制度为保障，以保证到期兑现。',
                    },
                    {
                        type: 'others',
                        content: '期货的商品范围是哪些？',
                    },
                    {
                        type: 'my',
                        content: '主要不是货，而是以某种大众产品为标的标准化可交易合约，这个标的物可以是某种商品（例如黄金，原油，农产品），也可以是金融工具。',
                    },
                    {
                        type: 'others',
                        content: '期货的结算方式是什么？',
                    },
                    {
                        type: 'my',
                        content: '实行每日无负债结算制度，必须每日结算盈亏，结算价格是按照成交价加权平均计算的。',
                    },
                    {
                        type: 'others',
                        content: '期货和股票交易有什么不同？',
                    },
                    {
                        type: 'my',
                        content: '1、买卖方式不同；<br/>2、杠杆比例不同；<br/>3、市场透明度不同；<br/>4、交易速度不同；<br/>5、手续费不同；',
                    },
                    {
                        type: 'others',
                        content: '期货可以做2个方向？',
                    },
                    {
                        type: 'my',
                        content: '是双向交易，可以做多也可以做空。价格上涨时可以低买高卖，价格下跌时可以高卖低补。',
                    },
                    {
                        type: 'others',
                        content: '期货天生带有杠杆？',
                    },
                    {
                        type: 'my',
                        content: '是杠杆交易，无需支付全部资金，只需要支付一定的比例的保证金即可控制合约总价值的权利。',
                    },
                    {
                        type: 'others',
                        content: '期货是“T+0”吗？',
                    },
                    {
                        type: 'my',
                        content: '“T+0”的交易，在一天之内就可以买卖平仓，交易速度快。',
                    },
                
  
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
   
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/common.scss";
  #butler_community {
    width: 7.5rem;
    background-color: #fff;
    padding-top: 0.96rem;
  }
  .note_box{
      padding: 0 0 0.6rem 0.3rem;
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
        @include font($fs28,.36rem,#2b344a,left);
        background-color: #eaeaea;
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
            border-right-color: #eaeaea;
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
        color: #2b344a;
        background-color: #f7f7f7;
        &::before{
            right: -0.35rem;
            top: 0.2rem;
            border-left-color: #f7f7f7;
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
	box-sizing: border-box;
    padding-top: 0.3rem;
  }

</style>
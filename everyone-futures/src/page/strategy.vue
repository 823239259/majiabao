<template>
    <div id="strategy" >
         <mt-header fixed title="回测策略">           
            <mt-button slot="left"  @click="callCustomer">客服</mt-button>
            <mt-button slot="right" @click="shareSystem">分享</mt-button>
        </mt-header>
        <div class="use_wrap">
            <h2>使用说明</h2>
            <div class="box">
              <p>回测数据采用真实历史数据，模拟策略进行买卖交易，最终展示策略交易结果，以便于用户评估策略在特定品种特定历史时段下的收益和风险承受能力。</p>
            </div>
            <div class="box flex" @click="changeKey('showTypeArr')">
              <span class="huiaaa">选择回测周期</span>
              <span class="numbers">{{type}}</span>
              <i class="icons"></i>
              <div class="typeArr" v-show="showTypeArr">
                <p v-for="item in typeArr" @click.stop="selectType(item)">{{item}}</p>
              </div>
            </div>
            <div class="box flex"  @click="changeKey('showTimeArr')">
              <span class="huiaaa">选择回测时间</span>
              <span class="numbers">{{timeType}}</span>
              <i class="icons"></i>
              <div class="typeArr" v-show="showTimeArr">
                <p v-for="item in timeArr" @click.stop="selectTime(item)">{{item}}</p>
              </div>
            </div>
            <div class="box flex">
              <span class="huiaaa"></span>
              <span class="numbers">{{replaceExg(endTime)}}-{{replaceExg(startTime)}}</span>
            </div>
            <div  class="box flex">
              <input class="input" type="text" v-model="money" placeholder="请输入回测起始资金（需大于1,000,000）">
            </div>
        </div>
        <div class="strategy_wrap">
          <h2>使用说明</h2>
          <ul class="strategy_list">
            <li :class="['item',{'checked':strategyChecked == index}]"  v-for="(item,index) in strategyList" @click="changeItem(index,'strategyChecked')" :key="item.name" >{{item.name}}</li>
          </ul>
          
        </div>
        <div class="varieties_wrap strategy_wrap">
          <h2>品种选择</h2>
          <ul class="strategy_list">
            <li :class="['item',{'checked':varietiesChecked == index}]" v-for="(item,index) in varietiesList" @click="changeItem(index,'varietiesChecked')" :key="item.name">{{item.commodityName}}</li>
          </ul>
        </div>
        <div class="btn_box">
          <button class="btn" @click="submit">提交回测</button>
        </div>

        <bottom-tab :tabSelect='tabSelected'></bottom-tab>
        
<mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
                </mt-actionsheet>
       
          
    </div>
</template>

<script>

import {mapMutations} from 'vuex'
import bottomTab from '../components/bottom_tab'
import pro from '../assets/js/common'
const local = pro.local;
export default {
  name: "strategy",
  components: {
    bottomTab
  },
  mixins:[pro.mixinsToCustomer],
  data() {
    return {
      tabSelected: 'strategy',
      userList: [],
      type: '1分K',
      showTypeArr: false,
      typeArr: ['1分K','5分K','15分K','30分K','日K'],
      timeType: '1天',
      time: '2018.06.19-2018.06.20',
      showTimeArr: false,
      timeArr:['1天','3天','5天','10天'],
      startTime: '',
      endTime: '',
      strategyChecked: 0,
      varietiesChecked: 0,
      money: '',

      strategyList: [
      {
        name: '海龟交易策略',
        strategy: 'Turtle' 
      },
       {
        name: '移动平均策略',
        strategy: 'SMA' 
      },
      {
        name: 'DualThrust策略',
         strategy: 'DualThrust' 
      },
      {
        name: '布林通道策略',
        strategy: 'Bollingerbandit' 
      },
      {
        name: 'RBreaker策略',
        strategy: 'RBreaker' 
      },
      {
        name: '金肯特纳策略',
        strategy: 'Jintena' 
      },
      ],
      varietiesInit: ['CL', 'HSI', 'GC', 'SI', 'HG', 'CN'],

    };
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
    varietiesList () {
      //console.log(this.$store.state.market.commodityOrder)
      return this.$store.state.market.commodityOrder.filter(item =>{
        return this.varietiesInit.includes(item.commodityNo)
      })
    },
    physhonUrl(){
      return this.$store.state.market.physhon.url
    }
  },
  methods: {
    ...mapMutations({
      setAccountInfo: 'ACCOUNT_INFO',
      clearUserInfo: 'INFO_CLEAR',
    }),
    goLast() {
      this.$router.push(this.lastPath);
    },
    goto(path) {
      this.$router.push({ path: path });
    },
    changeKey (key) {
      this[key] = !this[key]
    },
    selectType (item) {
      this.showTypeArr = false;
      this.type = item;
    },
    selectTime (item) {
      this.showTimeArr = false;
      this.timeType = item;
      // endTime
      this.endTime = this.changeDate(this.startTime,item)
    },
    changeDate (time,type) {
      const typeObj = {
        '1天': 1,
        '3天': 3,
        '5天': 5,
        '10天': 10
      }
      let parseTime = this.startTime.getTime();
      let newTime = parseTime - (typeObj[type]*24*60*60)*1000;
      return new Date(newTime)
    },
    replaceExg (time) {
      // if (typeof time !== 'string') return;
      return pro.getDate(time,"y-m-d").replace(/\-/g,'.')
    },
    changeItem (index,key) {
      this[key] = index
    },
    getFrequency (type) {
      const frequencyList = {
        '1分K': '1min',
        '5分K': '5min',
        '15分K': '15min',
        '30分K': '30min',
        '日K': '1day',
      }
      return frequencyList[type]
    },
    submit () {
				if(this.money == '' || this.money == null){
					this.$toast({message:"初始资金不能为空",duration: 1000});
				}else if(this.money < 1000000){
					this.$toast({message:"初始资金不能低于1000000",duration: 1000});
				}else{
					// this.showConatiner = false;
          // this.showSubmit = true;
          let timeStart = pro.getDate(this.endTime.getTime(),'y-m-d h:i:s')
          let timeEnd = pro.getDate(this.startTime.getTime(),'y-m-d h:i:s')
         
					let obj = {
						"strategy":this.strategyList[this.strategyChecked].strategy,
						"commodity":this.varietiesList[this.varietiesChecked].commodityNo,
						"frequency":this.getFrequency(this.type),
						"timeStart":timeStart,
						"timeEnd": timeEnd,
						"initialAccount":Number(this.money),
						"commodityNumber":this.varietiesList[this.varietiesChecked].contractNo
          }
          this.$indicator.open({
            text: '回测中...',
            spinnerType: 'fading-circle'
          });
					$.ajax({
						type:"POST",
						url:this.physhonUrl+"/back_test",
						async:true,
						data: JSON.stringify(obj),
						dataType:"json",
						success:function(res){
							if(res.tradeInfo.length == 0){
								this.$toast({message:"无回测数据，请重新选择",duration: 1000});
								this.$router.back(-1);
							}else{
                this.$indicator.close()
								this.$router.replace({path:"/backPresentation",query:{strategyName:this.strategyList[this.strategyChecked].name}});
								this.$store._modules.root.state.account.backtestIndexArr = res;
							}
						}.bind(this),
						error:function(err){
							this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
						}.bind(this)
					})
				}
			},
  }, 
  activated () {   
    
  },
  created () {
    let today = new Date();
    this.startTime =  today;
    this.selectTime('1天')
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
#strategy {
  width: 7.5rem;
  //background-color: $bgPink;
 
}
.use_wrap{
  width: 100%;
  padding-bottom: 0.27rem;
  margin-top: 2.08rem;
  h2{
    @include font($fs28,0.8rem,$black222,left);
    background-color: $headColr;
    padding: 0 0.3rem;
  } 
  .box{
    position: relative;
    width: 6.9rem;
    //padding: 0.2rem 0;
    margin: 0.17rem auto 0;
    border-radius: 0.1rem;
    background-color: $bgWhite;
    box-shadow: 0 0 10px 2px #ccc;
    p{
      padding: 0.2rem 0.24rem; 
      @include font($fs28,0.42rem,$black222,left);
    }
    .huiaaa{
       @include font($fs28,0.8rem,#aaa);
    }
    .numbers{
      @include font($fs28,0.8rem,$black222);
    }
    .icons{
      position: absolute;
      right: 0.1rem;
      bottom: 0;
      display: block;
      width: 0;
      height: 0;
      border: 0.1rem transparent solid;
      border-top-color: #b3daff;

    }
    .input{
      width: 100%;
      padding: 0 0.3rem;
      @include font($fs28,0.8rem,$black222,left);
    }
  }
  .flex{
    justify-content: space-between;
    padding: 0 0.24rem;

  }
}
.strategy_wrap{
  h2{
    @include font($fs28,0.8rem,$black222,left);
    background-color: $headColr;
    padding: 0 0.3rem;
  } 
  .strategy_list{
    @include flex(space-between);
    padding: 0.1rem 0.3rem;
    flex-wrap: wrap;
  }
  .item{
    width: 2.2rem;
    margin-top: 0.16rem;
    @include font($fs28,0.8rem,$whitefff);
    background-color: #1482f0;
    border-radius: 0.1rem;
  }
  .checked{
    background-color: inherit;
    color: #1482f0;
    border: solid 1px #1482f0;
  }
}
.btn_box{
  text-align: center;
  padding: 0.4rem 0;
}
.btn{
  width: 6.9rem;
  @include font($fs28,0.8rem,$whitefff);
	background-color: #1482f0;
	border-radius: 0.1rem;
}
.typeArr{
    position: absolute;
    top: 0.8rem;
    left: 0;
    width: 6.9rem;
    background-color: $bgWhite;
    box-shadow: 0 0 10px 2px #ccc;
    z-index: 102;
    border-radius: .1rem;
    border-width: 0 1px;
    p{
      border-bottom: 1px solid #ccc;
    }
}




</style>
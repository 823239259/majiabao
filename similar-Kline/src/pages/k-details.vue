<template>
  <div>
   <div class="header">
     <span class="back" @click="goBack"></span>
     <h2>国际原油(CL 1805)</h2>
   </div>
   <ul class="details-list">
     <li class="item">
       <h3><p>相似区间</p><p>模拟走势</p></h3>
       <!-- canvas 区间 -->
       <div id="current_box"></div>
     </li>
     <li class="item last_item">
       <h3><p>国际原油 CL1604</p><p>相似度：<span>80.78%</span></p></h3>
       <!-- canvas 区间 -->
       <div id="current_box2" class="canvas"></div>
     </li>


     <li v-for="(value, key) in items" :key=key>
       <p class="title">{{ getTitle(key) }}</p>
       <p class="value">{{ value }}</p>
     </li>
   </ul>
  </div>
</template>

<script>

import {mapMutations, mapGetters,mapActions} from 'vuex'

export default {
  name: 'kDetails',
  props:['id'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:{},
      nextKdatas: [],
    }  
  },
  computed: {
    historyList () {
      return this.$store.state.historyList
    },
    currentItem () {
      return this.$store.state.contractList.find((item)=>{
          return item.commodity_no == this.id
      })
    }
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    ...mapActions([
      '$AJAX'
    ]),
    ...mapMutations([
      'createKLine',
      'addHistoryList'
    ]),
    getHistoryList (item) {
        let sendData = {
          commodity: `${item.commodity_no}_${item.main_contract_no}`,
          frequency: "KLINE_1HR",
        }
        $.ajax({
          type: "post",
          //url: 'http://192.168.0.174:8989/similar_k',
          url: 'http://192.168.0.223:8989/similar_k',
          //contentType: "application/json;charset=utf-8",
          data: JSON.stringify(sendData),
          dataType: "json",
          success: function(data){
            console.log(data.correlatedPairs)

            data.correlatedPairs[0]  //预测的24根k线
            this.nextKdatas = data.correlatedPairs[0];
            let klineData = {};
            console.time('abc')
            /* 
              处理返回的数据格式
            */
            // for (let index = 1,length = data.correlatedPairs.length; index < length; index++) {
            //   let element = data.correlatedPairs[index];
              
            // }

            let firstHistory = data.correlatedPairs[2];
            const {opennew_pre, highnew_pre, lownew_pre, close_pre} = firstHistory;

            let abcd =  highnew_pre.reduce((newArr,value,index) => {
              let arrs = [];
              //开盘价 收盘价 最低价 最高价
              arrs.push(opennew_pre[index],close_pre[index],lownew_pre[index], value)
              newArr.push(arrs)
              return newArr
            },[]);
            
            klineData.set123 = abcd;

            const {opennew_after, highnew_after, lownew_after, close_after} = firstHistory;

            let nextDatas =  highnew_after.reduce((newArr,value,index) => {
              let arrs = [];
              //开盘价 收盘价 最低价 最高价
              arrs.push(opennew_after[index],close_after[index],lownew_after[index], value )
              newArr.push(arrs)
              return newArr
            },[]);

            klineData.nextDatas = nextDatas;

            console.log('后续的24根',nextDatas)

            
            console.timeEnd('abc')
            //储存klineData
            this.addHistoryList({
              [item.commodity_no]:klineData
            })
            this.createKLine({
              id: 'current_box2',
              commodity_no: item.commodity_no,
              name:`${item.commodity_name} ${item.commodity_no}${item.main_contract_no}`,
              xDatas1: firstHistory.time_pre,
              xDatas2: firstHistory.time_after
            })
            
					
          }.bind(this),
          error:function(err){
            console.log(err)
          } 
			});
    },
    fortest () {
      
    }
  },
  created () {
     //this.getHistoryList(this.id);
      this.getHistoryList(this.currentItem);
  },
  mounted () {
    //this.getHistoryList(this.currentItem);
    // this.createKLine({
    //    id: 'current_box2'
    //  })
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.header{
  position: fixed;
  width: 7.5rem;
  background-color: #333340;
  .back{
    position: absolute;
    left: 0.28rem;
    top: 0.3rem;
    width: 0.18rem;
    height: 0.32rem;
    background: url('../assets/img/zuojiantou.png') center center no-repeat;
    background-size: 100%;
  }
  h2{
    @include font(0.36rem,0.88rem,#fff);
  }
}
.details-list{
  background-color: #3d3d4d;
  padding-top: 0.88rem;
  .item{
    h3{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0.8rem;
      @include font(0.26rem,0.8rem,#fff);
      p{
        box-sizing: border-box;
        flex: 1;
      }
    }
  }
  .last_item{
    h3{
      p:nth-child(2){
        text-align: right;
        padding-right: 0.3rem;
      }
      span{
        color: #ffc44c;
      }
    }
  }
  
}
.canvas{
  width: 100%;
  height: 250px;
  background-color: #292933;
}
</style>

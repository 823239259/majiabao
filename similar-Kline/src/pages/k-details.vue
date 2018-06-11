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
    }  
  },
  computed: {
    historyList () {
      return this.$store.historyList
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
    getHistoryList (commodityNo) {
        let sendData = {
          commodity: commodityNo,
          frequency: "KLINE_5MIN",
          timeStart: "2018-05-19 00:00:00",
          timeEnd: "2018-05-20 00:00:00"
        }
        $.ajax({
          type: "post",
          url: 'http://192.168.0.223:8989/similar_k',
          //contentType: "application/json;charset=utf-8",
          data: JSON.stringify(sendData),
          dataType: "json",
          success: function(data){
            console.log(data.correlatedPairs)
            let klineData = {};
            console.time('abc')
            let abcd =  data.correlatedPairs[0][2].reduce((newArr,value,index) => {
              let arrs = [];
              //开盘价 收盘价 最低价 最高价
              arrs.push(data.correlatedPairs[0][3][index],data.correlatedPairs[0][5][index], data.correlatedPairs[0][4][index], value )
              newArr.push(arrs)
              return newArr
            },[]);
            console.log(abcd)
            klineData.set123 = abcd;
            console.timeEnd('abc')
            //储存klineData
            this.addHistoryList({
              [commodityNo]:klineData
            })
            this.createKLine({
              id: 'current_box2'
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
     this.getHistoryList(this.id);
     
  },
  mounted () {
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
  background-color: #fff;
}
</style>

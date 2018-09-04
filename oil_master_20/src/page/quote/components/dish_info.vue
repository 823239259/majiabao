<template>
  <div class="dish_info">
      <ul class="dish_info_box">
			<li class="top_info">
				<div class="info_inner">{{details.CommodityNo}}{{details.MainContract}}</div>
				<div class="info_inner">
					<p class="left">{{details.LastQuotation.LastPrice}}</p>
					<p class="right reds">
						<span :class="details.LastQuotation.ChangeValue > 0?'reds': 'greens'">{{details.LastQuotation.ChangeValue | fixNum}}</span>
						<span :class="details.LastQuotation.ChangeValue > 0?'reds': 'greens'">{{details.LastQuotation.ChangeRate | fixNum}}%</span>
					</p>		
				</div>
				<div  class="info_inner">
					<p>现手</p>
					<p class="blocks">{{details.LastQuotation.LastVolume}}</p>
				</div>
			</li>
			<li class="dish_item">
				<div class="inner_item">
					<p>买量</p>
                    <p>{{details.LastQuotation.BidQty1}}</p>
				</div>
				<div class="inner_item">
					<p>买价</p>
					<p :class="showColor(details.LastQuotation.BidQty1)">{{details.LastQuotation.BidQty1 | fixNum(details.DotSize)}}</p>
				</div>
				<div class="inner_item">
					<p>成交量</p>
                    <p>{{details.LastQuotation.TotalVolume}}</p>
				</div>
				<div class="inner_item">
					<p>最高</p>
                    <p :class="showColor(details.LastQuotation.HighPrice)">{{details.LastQuotation.HighPrice | fixNum(details.DotSize)}}</p>
				</div>
				<div class="inner_item">
					<p>今开</p>
                    <p>{{details.LastQuotation.OpenPrice | fixNum(details.DotSize)}}</p>
				</div>
			</li>
			<li class="dish_item">
				<div class="inner_item">
					<p>卖量</p>
                   <p>{{details.LastQuotation.AskQty1}}</p>
				</div>
				<div class="inner_item">
					<p>卖价</p>
                    <p :class="showColor(details.LastQuotation.AskPrice1)">{{details.LastQuotation.AskPrice1 | fixNum(details.DotSize)}}</p>
				</div>
				<div class="inner_item">
					<p>持仓量</p>
                    <p>{{details.LastQuotation.Position}}</p>
				</div>
				<div class="inner_item">
					<p>最低</p>
                    <p :class="showColor(details.LastQuotation.LowPrice)">{{details.LastQuotation.LowPrice | fixNum(details.DotSize)}}</p>
				</div>
				<div class="inner_item">
					<p>昨结</p>
                    <p>{{details.LastQuotation.PreSettlePrice | fixNum(details.DotSize)}}</p>
				</div>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
  name: 'dish_info',
  props: {
      currentDetail: {
          type: Object,
          required: true      
      }
  },
  data() { 
    return {

    }
  },
  computed:{
      details () {
          return this.currentDetail
      }
  },
  methods:{
      showColor (price1,price2= this.details.LastQuotation.PreSettlePrice) {
          if(!price1) return ;
          return price1 > price2 ? 'red':'green'
      }
  },
  mounted() {
     // console.log(this.currentDetail)
  },
  filters:{
    fixNum (num, dotSize=2) {
        if(!num) return;
        if(dotSize >= 4) dotSize = 4;
        return num.toFixed(dotSize);
    },
  }
 }
</script>

<style lang='scss' scoped>
@import "../../../assets/css/common";
  .dish_info{
      li{
        @include flex()
      }
  }
  .top_info{
      height: 1rem;
      @include font($fs28,0.36rem,#222);
      .info_inner{
          flex: 1;
          border-right: 1px solid #e8e8e8;
      }
      .info_inner:nth-child(1){
          font-size: 0.32rem;
          line-height: 1rem;
      }
      .info_inner:nth-child(2){
         @include flex();
         .left{
             flex: 1
         } 
         .right{
             flex: 1
         }
      }
  }
  .reds{
      color: #f85959;
  }
  .greens{
      color: #19d961;
  }
  .blocks{
      color: #333;
  }
.dish_item{
   @include flex(); 
   @include font($fs24,0.36rem,#858585);
   height: 0.8rem;
   .inner_item{
       flex: 1;
       p:last-child{
           color: #333;
       }
   }
}  
</style>
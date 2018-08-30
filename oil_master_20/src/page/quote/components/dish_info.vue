<template>
  <div class="dish_info">
      <ul class="dish_info_box">
			<li class="top_info">
				<div class="info_inner">CL1805</div>
				<div class="info_inner">
					<p class="left">66.83</p>
					<p class="right reds">
						<span>+0.16</span>
						<span>+0.24%</span>
					</p>		
				</div>
				<div  class="info_inner">
					<p>现手</p>
					<p class="blocks">1</p>
				</div>
			</li>
			<li class="dish_item">
				<div class="inner_item">
					<p>买量</p>
                    <p>123456</p>
					<!-- <p>{{v.LastQuotation.LastVolume}}</p> -->
				</div>
				<div class="inner_item">
					<p>买价</p>
                    <p>123456</p>
					<!-- <p>{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</p> -->
				</div>
				<div class="inner_item">
					<p>成交量</p>
                    <p>123456</p>
					<!-- <p>{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</p> -->
				</div>
				<div class="inner_item">
					<p>最高</p>
                    <p>123456</p>
					<!-- <p>{{v.AveragePrice ? v.AveragePrice : 0}}</p> -->
				</div>
				<div class="inner_item">
					<p>今开</p>
                    <p>123456</p>
					<!-- <p>{{v.AveragePrice ? v.AveragePrice : 0}}</p> -->
				</div>
			</li>
			<li class="dish_item">
				<div class="inner_item">
					<p>卖量</p>
                    <p>123456</p>
					<!-- <p>{{v.LastQuotation.LastVolume}}</p> -->
				</div>
				<div class="inner_item">
					<p>卖价</p>
                    <p>123456</p>
					<!-- <p>{{v.LastQuotation.BidPrice1 | fixNum(v.DotSize)}}</p> -->
				</div>
				<div class="inner_item">
					<p>持仓量</p>
                    <p>123456</p>
					<!-- <p>{{v.LastQuotation.AskPrice1 | fixNum(v.DotSize)}}</p> -->
				</div>
				<div class="inner_item">
					<p>最低</p>
                    <p>123456</p>
					<!-- <p>{{v.AveragePrice ? v.AveragePrice : 0}}</p> -->
				</div>
				<div class="inner_item">
					<p>昨结</p>
                    <p>123456</p>
					<!-- <p>{{v.AveragePrice ? v.AveragePrice : 0}}</p> -->
				</div>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
  name: 'dish_info',
  data() { 
    return {

    }
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
<template>
	<div id="quote">
		<div>
			<mt-header title="行情" fixed>
			 	<router-link to="/search" slot="right">
			 	   	<mt-button icon="search" ></mt-button>
			 	</router-link>
			</mt-header>
			<bottomTab :tabSelect="tabSelected"></bottomTab>
		</div>
		<ul id='pie'>  
		    <li class='slice-one slice' @click="choose('商品',5)"></li>  
		    <li class='slice-two slice' @click="choose('外汇',0)"> </li>  
		    <li class='slice-three slice' @click="choose('股指期货',1)"> </li>  
		    <li class='slice-four slice' @click="choose('数字货币',2)"> </li>  
		    <li class='slice-five slice' @click="choose('利率期货',3)"> </li>  
		    <li class='slice-six slice' @click="choose('LME金属',4)"> </li>  
		    <span @click="choose('外汇',0)">外汇</span> 
		    <span @click="choose('商品',5)">商品</span>
		    <span @click="choose('LME金属',4)">LME金属</span>
		    <span @click="choose('利率期货',3)">利率期货</span>
		    <span @click="choose('数字货币',2)">数字货币</span>
		    <span @click="choose('股指期货',1)">股指期货</span>
		</ul> 
		<!-- <p class="note">
			管家提示：点击转盘转动分类到指针位置，再点击指针所指可打开行情。
		</p> -->
		 <!-- <i></i> -->
		 <tipsFloat :allType="allType" :type="type"></tipsFloat>
	</div>
</template>

<script>
	import bottomTab from '../components/bottom_tab'
	import pro from '../assets/js/common.js'
	import tipsFloat from '../components/tipsFloat'
	import { mapMutations,mapActions } from 'vuex'
	
	export default{
		name:"",
		components:{bottomTab, tipsFloat},
		data(){
			return{
				tabSelected:'quote',
				startAngle:0,
				currentType:[],
				allType:[],
				//初始位置
				beginValue:'外汇',
				type:['商品','股指期货','外汇','LME金属','利率期货','数字货币']
			}
		},
		computed:{
			isShowGuide(){
				return this.$store.state.account.isShowGuide
			}
		},
		methods:{
			//获取分类
			getCommodityInfo: function(){
				pro.fetch('post', '/quoteTrader/getCommodityInfo', '', '').then((res) => {
					if(res.success == true && res.code == 1){
						if(res.data!=undefined || res.data!=null){
							this.allType = res.data;
							this.currentType = res.data[0];
						}
					}
				}).catch((err) => {
					//Toast({message: err.data.message, position: 'bottom', duration: 2000});
				});
			},
			choose (value,index) {
				var currentNum = this.type.indexOf(value);
				this.$store.state.market.commodityOrder = this.allType[currentNum].list;
				this.$router.push({path:"/type",query:{type:this.allType[currentNum].name}});
			},
// 			choose:function(value,index){
// 				if(value == this.beginValue){
// 					var currentNum = this.type.indexOf(value);
// 					this.$store.state.market.commodityOrder = this.allType[currentNum].list;
// 				    this.$router.push({path:"/type",query:{type:this.allType[currentNum].name}});
// 				}else{
// 					var rotate = "rotate("+index*60+"deg)";
// 					document.getElementById('pie').style.transform = rotate;
// 					document.getElementById('pie').style.transition = '2s';
// 					setTimeout(function(){
// 						this.beginValue = value;
// 					}.bind(this),1500)
// //					this.beginValue = value;
// 				}
// 			}
		},
		mounted: function(){
		},
		activated:function(){
			
			this.getCommodityInfo();
		},
		created () {
		}
	}
</script>


<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#quote{
		width: 7.5rem;
		overflow: hidden;
	}
	i{
		position: fixed;
		top: 1.2rem;
		left: 3.45rem;
		display: block;
		width: 0.64rem;
		height: 0.7rem;
		background: url(../assets/images/quote/quote-cricle.png) no-repeat;
		background-size: 0.64rem 0.7rem;
	}
	#pie {  
	    position: relative;  
	    padding: 0;  
	    width: 6rem;  
	  	height: 6rem;  
	    border-radius: 50%;  
	    list-style: none;  
		overflow: hidden;  
		margin-top: 1.5rem;
		margin-left: 0.75rem;
	}  
	.slice {  
	    overflow: hidden;  
	    position: absolute;  
	    top: 0;   
	 	right: 0;  
	    width: 50%;  
	 	height: 50%;  
	    transform-origin: 0% 100%;   
	}  
	span{
		color: white;
	}
	.slice-one {  
	 	transform: rotate(30deg) skewY(-30deg);  
	  	background: #94cdde; 
	}  
	.slice-two {  
	  	transform: rotate(-30deg) skewY(-30deg);  
	  	background: #9bbb58;  
	}  
	.slice-three {  
	 	transform: rotate(-90deg) skewY(-30deg);  
	  	background: #e18683;  
	}  
	.slice-four {  
	  	transform: rotate(-150deg) skewY(-30deg);  
	  	background: #03a2dc;  
	}  
	.slice-five {  
	  	transform: rotate(-210deg) skewY(-30deg);  
	 	background: #a43b38;  
	  
	}  
	.slice-six {  
	  	transform: rotate(-270deg) skewY(-30deg);  
	 	background: #f44234; 
	}  
	span{
		position: absolute;
		color:white; 
		font-size:0.28rem; 
		&:nth-child(7){
			top: 1.2rem;
			left:2.75rem ;
		}
		&:nth-child(8){
			top: 2rem;
			left:4.4rem ;
			transform: rotate(60deg);
		}
		&:nth-child(9){
			top: 3.8rem;
			left:4.2rem ;
			transform: rotate(120deg);
		}
		&:nth-child(10){
			top: 4.9rem;
			left:2.55rem ;
			transform: rotate(180deg);
		}
		&:nth-child(11){
			top: 3.8rem;
			left:0.8rem ;
			transform: rotate(240deg);
		}
		&:nth-child(12){
			top: 2rem;
			left:0.8rem ;
			transform: rotate(300deg);
		}
	}
	.note{
	  @include font($fs24,0.8rem,#788b87);
	  span{
	    color: #c6c5cc
	  }
	  position: absolute;
	  bottom: 2.1rem;

	}
</style>
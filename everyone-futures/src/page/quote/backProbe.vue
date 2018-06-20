<template>
	<div id="backProbe">
		<mt-header :title="strategyName" fixed style="background-color:#b3daff;font-size: 0.32rem;height: 0.96rem;line-height: 0.96rem;">
		 	<router-link to="" slot="left">
			    <i id="back" @tap.stop="backRounter"></i>
			</router-link>
		</mt-header>
		<div id="container" v-show="showConatiner">
			<div class="info">
				<p>历史回测测试，是通过真实的历史数据，测试并评估一个量化策略在此历史时段的收益能力和风险控制能力。 </p>
			</div>
			<div class="title_left">
				选择回测周期，开始回测测试
			</div>
			<div class="choose">
				<mt-button type="primary" class="type" @click.native="chooseType">{{type}}</mt-button>
				<i class="rightSign"></i>
				<div class="typeArr" v-show="showTypeArr">
					<p v-for="item in typeArr" @click="selectType(item)">{{item}}</p>
				</div>
			</div>
			
			<div class="title_left">
				回测时间
			</div>
			<div class="choose1">
				<mt-button type="primary" class="type1" @click.native="chooseTime">{{time}}</mt-button>
				<i class="rightSign1"></i>
				<mt-button type="primary" class="type2">{{TimeEnd | changeTimeType}}-{{TimeStart | changeTimeType}}</mt-button>
				<!--<i class="rightSign"></i>-->
				<div class="dayType" v-show="showDayType">
					<p v-for="k in timeArr" @click="chooseDay(k)">{{k}}</p>
				</div>
			</div>
			<div class="title_left">
				初始资金
			</div>
			<div class="choose">
				<input type="number" class="money" v-model="money" placeholder="请输入初始回测资金(不少于1000,000)"/>
			</div>
			<mt-button type="primary" class="submit" @click.native="submit" v-show="showButton">提交回测</mt-button>
		</div>
		<div id="submitBackProbe" v-show="showSubmit">
			<ul class="ulList">
				<li>策略名称：</li>
				<li>{{strategyName}}</li>
			</ul>
			<ul class="ulList">
				<li>回测时间：</li>
				<li>{{TimeEnd | changeTimeType}}-{{TimeStart | changeTimeType}}</li>
			</ul>
			<div class="h_20"></div>
			<p class="color_yellow">策略回测申请已提交到服务器，等待结果返回</p>
			<!--<p @click="tobackPresentation">这里有个进度条。</p>-->
			<p>如果用户提交的策略回测太多，可能会造成等待时间较长，请您 耐心等候。</p>
		</div>
	</div>
</template>

<script>
	import pro from "../../assets/js/common.js"
	export default{
		name:"backProbe",
		data(){
			return{
				type:"1分K",
				Percentage:"25%",
				money:"",
				time:"1天",
				day:"2018年1月-2018年12月",
				strategyName:'',
				strategyK:"",
				timeArr:[],
				dayArr:[],
				typeArr:['1分K','5分K','15分K','30分K','日K'],
				showTypeArr:false,
				timeArr:['1天','3天','5天','10天'],
				showDayType:false,
				CommodityNo:'',
				//k线类型
				frequency:'1min',
				TimeStart:'',
				TimeEnd:'',
				timec:"",
				showConatiner:true,
				showSubmit:false,
				fullHeight:document.documentElement.clientHeight,
				fullHeight1:document.documentElement.clientHeight,
				showButton:true
			}
		},
		computed:{
			backtestIndexArr:function(){
				return this.$store._modules.root.state.account.backtestIndexArr
			},
			physhonUrl(){
				return this.$store.state.market.physhon.url
			}
		},
		methods:{
			backRounter:function(){
				this.$router.go(-1);
			},
			submit:function(){
				if(this.money == '' || this.money == null){
					this.$toast({message:"初始资金不能为空",duration: 1000});
				}else if(this.money < 1000000){
					this.$toast({message:"初始资金不能低于1000000",duration: 1000});
				}else{
					this.showConatiner = false;
					this.showSubmit = true;
					let obj = {
						"strategy":this.strategyK,
						"commodity":this.CommodityNo,
						"frequency":this.frequency,
						"timeStart":this.TimeEnd,
						"timeEnd":this.TimeStart,
						"initialAccount":Number(this.money),
						"commodityNumber":this.ContractNo
					}
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
								this.$router.replace({path:"/backPresentation",query:{strategyName:this.strategyName}});
								this.$store._modules.root.state.account.backtestIndexArr = res;
							}
						}.bind(this),
						error:function(err){
							console.log(err)
							this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
						}.bind(this)
					})
				}
			},
			chooseType:function(){
				this.showBg=!this.showBg;
				this.showTypeArr=!this.showTypeArr;
			},
			selectType:function(item){
				this.showTypeArr=!this.showTypeArr;
				this.type = item;
			},
			chooseTime:function(){
				this.showDayType=!this.showDayType;
			},
			chooseDay:function(k){
				this.showDayType=!this.showDayType;
				this.time = k;
			},
		},
		activated:function(){
			this.showTypeArr = false;
			this.showDayType = false;
			this.CommodityNo = this.$route.query.CommodityNoK;
			this.ContractNo = this.$route.query.ContractNo;
			this.strategyName = this.$route.query.strategyName;
			this.strategyK = this.$route.query.strategyK;
			this.timec = Date.parse(new Date())/1000;
			this.TimeStart = pro.getDate(this.timec*1000,"y-m-d h:i:s");
			this.TimeEnd = pro.getDate((this.timec-24*60*60)*1000,"y-m-d-0");
			this.showConatiner = true;
			this.showSubmit = false;
			this.type = "1分k",
			this.time = "1天",
			this.money = "",
			this.fullHeight1 = document.documentElement.clientHeight;
			const that = this
		    window.onresize = () => {
		        return (() => {
		          window.fullHeight = document.documentElement.clientHeight
		          that.fullHeight = window.fullHeight
		        })()
		    }
		},
		watch:{
			type:function(o){
				switch (o){
					case "1分K":
						this.frequency = '1min';
						this.timeArr=['1天','3天','5天','10天'];
						break;
					case "5分K":
					this.frequency = '5min';
						this.timeArr=['1天','3天','5天','10天',"20天"];
						break;
					case "15分K":
					this.frequency = '15min';
						this.timeArr=['1天','3天','5天','10天',"20天","30天"];
						break;
					case "30分K":
					this.frequency = '30min';
						this.timeArr=['1天','3天','5天','10天',"20天","30天","60天"];
						break;
					case "日K":
					this.frequency = '1day';
						this.timeArr=['1天','3天','5天','10天',"20天","30天","60天","1年"];
						break;
					default:
						break;
				}
			},
			time:function(e){
				switch (e){
					case "1天":
					this.TimeEnd = pro.getDate((this.timec-24*60*60)*1000,"y-m-d-0");
						break;
					case "3天":
					this.TimeEnd = pro.getDate((this.timec-3*24*60*60)*1000,"y-m-d-0");
						break;
					case "5天":
					this.TimeEnd = pro.getDate((this.timec-5*24*60*60)*1000,"y-m-d-0");
						break;
					case "10天":
					this.TimeEnd = pro.getDate((this.timec-10*24*60*60)*1000,"y-m-d-0");
						break;
					case "20天":
					this.TimeEnd = pro.getDate((this.timec-20*24*60*60)*1000,"y-m-d-0");
						break;
					case "30天":
					this.TimeEnd = pro.getDate((this.timec-30*24*60*60)*1000,"y-m-d-0");
						break;
					case "60天":
					this.TimeEnd = pro.getDate((this.timec-60*24*60*60)*1000,"y-m-d-0");
						break;
					case "1年":
					this.TimeEnd = pro.getDate((this.timec-365*60*60)*1000,"y-m-d-0");
						break;
				}
			},
			fullHeight (val) {
		        if(val != this.fullHeight1){
		        	this.showButton = false;
		        }else{
		        	this.showButton =true;
		        }
		    },
		},
		filters:{
			changeTimeType:function(e){
				var a = pro.getDate(Date.parse(e.replace(/\-/g, "/")),"yy-mm-dd");
				return a
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#backProbe{
		width: 7.5rem;
	}
	#back{
		display: inline-block;
		width: 0.64rem;
		height: 1rem;
		background: url(../../assets/images/quote/back_icon.png) no-repeat 0.15rem 0.34rem;
		background-size: 0.24rem 0.32rem;
		margin-top: 0.34rem;
	}
	#container{
		width: 100%;
		margin-top: 1rem;
		.info{
			padding: 0 0.3rem;
			height: 1rem;
			line-height: 0.5rem;
		}
		.title_left{
			height: 0.6rem;
			background-color: #b3daff;
			line-height: 0.6rem;
			padding-left: 0.3rem;
		}
		.choose{
			height: 1.5rem;
			padding: 0 0.3rem;
			position: relative;
			.rightSign{
				position: absolute;
				bottom: 0.4rem;
				right: 0.4rem;
				display: inline-block;
				width: 0.16rem;
				height: 0.16rem;
				background-size: 100% 100%;
				background: url(../../assets/images/quote/rightSign.png);
			}
			.rightSign1{
				position: absolute;
				bottom: 0.4rem;
				left: 1.2rem;
				display: inline-block;
				width: 0.16rem;
				height: 0.16rem;
				background-size: 100% 100%;
				background: url(../../assets/images/quote/rightSign.png);
			}
			.typeArr{
				margin-left: 0.3rem;
				width: 6.9rem;
				height: 4.5rem;
				background-color: $bg;
				z-index: 102;
				position: absolute;
				top: 1.2rem;
				left: 0;
				border-radius: 0.1rem;
				border:1px solid $bgDeep;
				border-width:0 1px;
				p{
					height: 0.9rem;
					text-align: center;
					line-height: 0.9rem;
					color: $blcakThin;
					font-size: 0.28rem;
					border-bottom: 0.01rem solid $bgDeep;
				}
			}
			.dayType{
				z-index: 103;
				width: 1.2rem;
				background-color: $bg;
				position: absolute;
				top: 1.2rem;
				left: 0.3rem;
				height: 3.6rem;
				overflow-y: scroll;
				border:1px solid $bgDeep;
				border-width:0 1px;
				p{
					height: 0.9rem;
					line-height: 0.9rem;
					color: $blcakThin;
					text-align: center;
					border-bottom: 0.01rem solid $bgDeep;
				}
			}
			.Percentage{
				z-index: 999;
				width: 6.9rem;
				background-color: #1b1f26;
				position: absolute;
				bottom: 1.2rem;
				left: 0.3rem;
				height: 3.6rem;
				border:1px solid $bgDeep;
				border-width:0 1px;
				overflow-y: scroll;
				p{
					height: 0.9rem;
					line-height: 0.9rem;
					color: $white;
					text-align: center;
					border-top: 0.01rem solid $bgDeep;
				}
			}
		}
		.choose1{
			height: 2.5rem;
			padding: 0 0.3rem;
			position: relative;
			.rightSign{
				position: absolute;
				bottom: 0.4rem;
				right: 0.4rem;
				display: inline-block;
				width: 0.16rem;
				height: 0.16rem;
				background-size: 100% 100%;
				background: url(../../assets/images/quote/rightSign.png);
			}
			.rightSign1{
				position: absolute;
				bottom: 0.4rem;
				left: 1.2rem;
				display: inline-block;
				width: 0.16rem;
				height: 0.16rem;
				background-size: 100% 100%;
				background: url(../../assets/images/quote/rightSign.png);
			}
			.typeArr{
				margin-left: 0.3rem;
				width: 6.9rem;
				height: 4.5rem;
				background-color: $bg;
				z-index: 102;
				position: absolute;
				top: 1.2rem;
				left: 0;
				border-radius: 0.1rem;
				border:1px solid $bgDeep;
				border-width:0 1px;
				p{
					height: 0.9rem;
					text-align: center;
					line-height: 0.9rem;
					color: $blcakThin;
					font-size: 0.28rem;
					border-bottom: 0.01rem solid $bgDeep;
				}
			}
			.dayType{
				z-index: 103;
				width: 6.9rem;
				background-color: $bg;
				position: absolute;
				top: 1.2rem;
				left: 0.3rem;
				height: 3.6rem;
				overflow-y: scroll;
				border:1px solid $bgDeep;
				border-width:0 1px;
				p{
					height: 0.9rem;
					line-height: 0.9rem;
					color: $blcakThin;
					text-align: center;
					border-bottom: 0.01rem solid $bgDeep;
				}
			}
			.Percentage{
				z-index: 999;
				width: 6.9rem;
				background-color: #1b1f26;
				position: absolute;
				bottom: 1.2rem;
				left: 0.3rem;
				height: 3.6rem;
				border:1px solid $bgDeep;
				border-width:0 1px;
				overflow-y: scroll;
				p{
					height: 0.9rem;
					line-height: 0.9rem;
					color: $white;
					text-align: center;
					border-top: 0.01rem solid $bgDeep;
				}
			}
		}
		.type{
			position: absolute;
			top: 0.3rem;
			width: 6.9rem;
			height: 0.9rem;
			border: 0.01rem solid $bgDeep;
			color: $blcakThin;
			outline: none;
			background-color: white;
			line-height: 0.9rem;
			font-size: 0.28rem;
		}
		.type1{
			float: left;
			margin-top: 0.2rem;
			width: 100%;
			height: 0.9rem;
			border: 0.01rem solid $bgDeep;
			color: $blcakThin;
			outline: none;
			background-color: white;
			line-height: 0.9rem;
			font-size: 0.28rem;
		}
		.type2{
			margin-top: 0.2rem;
			float: left;
			width: 100%;
			height: 0.9rem;
			color: $blcakThin;
			outline: none;
			background-color: white;
			line-height: 0.9rem;
			font-size: 0.28rem;
		}
		.money{
			padding-left: 0.3rem;
			position: absolute;
			top: 0.3rem;
			width: 6.9rem;
			height: 0.9rem;
			border-radius: 0.1rem;
			background-color: white;
			line-height: 0.9rem;
			font-size: 0.28rem;
		}
		.answer{
			width: 100%;
			text-align: center;
			height: 0.4rem;
			line-height: 0.4rem;
			color: $blcakThin;
			margin-top: 0.5rem;
			font-size: 0.28rem;
		}
		.submit{
			width: 6.9rem;
			height: 0.9rem;
			position: fixed;
			bottom: 0.3rem;
			left: 0.3rem;
			font-size: 0.32rem;
			background-color: #1482f0;
		}
	}
	.bg{
		z-index: 101;
	}
	#submitBackProbe{
		width: 7.5rem;
		margin-top: 1rem;
		.ulList{
			width: 100%;
			height: 0.9rem;
			line-height: 0.9rem;
			padding: 0 0.3rem;
			border-bottom: 1px solid $bgDeep;
			li{
				float: left;
				&:nth-child(2){
					color: $redDeep;
				}
			}
		}
		.black{
			width: 100%;
			height: 0.2rem;
			background-color: #1b1f26;
			border-bottom: 1px solid $bgDeep;
		}
		.color_yellow{
			padding-left: 0.3rem;
			font-size: 0.24rem;
			color: $yellow;
			line-height: 0.4rem;
		}
		p{
			padding: 0 0.3rem;
			line-height: 0.4rem;
		}
	}
</style>
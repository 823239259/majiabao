<template>
	<div id="backDetails">
		<div class="title_left">收益</div>
		<div class="detailsInfo">
			<span>策略收益率:</span>
			<span>{{finalReturn | changPoint}}</span>
			<span>年化收益率:</span>
			<span>{{yearlyReturn | changPoint}}</span>
		</div>
		<div class="title_left">策略描述</div>
		<div class="describe">
			<ul class="span_bwt">
				<li>
					<span>策略描述：</span>
					<span>暂无</span>
				</li>
				<li>
					<span>策略周期：</span>
					<span>{{frequency}}</span>
				</li>
				<li>
					<span>交易合约：</span>
					<span>{{port}}</span>
				</li>
				<li>
					<span>初始资金：</span>
					<span>{{initialaccount}}元</span>
				</li>
				<li>
					<span>测试天数：</span>
					<span>{{testDays}}天（交易日）</span>
				</li>
				<li>
					<span>测试周期数：</span>
					<span>{{testZhouqi}}次</span>
				</li>
				<li>
					<span>开始时间：</span>
					<span>{{timestart}}</span>
				</li>
				<li>
					<span>结束时间：</span>
					<span>{{timeend}}</span>
				</li>
			</ul>
		</div>
		<div class="title_left">策略评估</div>
		<div class="Assessment">
			<ul class="span_bwt">
				<li>
					<span>交易胜率：</span>
					<span>{{winTimes | changPoint}}</span>
				</li>
				<li>
					<span>最大回撤比例：</span>
					<span>{{maxDrawndown | changPoint}}</span>
				</li>
				<li>
					<span>夏普比例：</span>
					<span>{{sharpeRatio | changPoint}}</span>
				</li>
			</ul>
		</div>
		<div class="title_left">交易统计</div>
		<div class="Statistics">
			<ul class="span_bwt">
				<li>
					<span>交易频率：</span>
					<span>{{tradeFrequency | changPoint1}}</span>
				</li>
				<li>
					<span>交易手续费：</span>
					<span>{{commission | changPoint1}}</span>
				</li>
				<li>
					<span>交易次数：</span>
					<span>{{tradeTimes}}</span>
				</li>
			</ul>
		</div>
		<div class="Notice">
			<span>说明：</span>
			<span>为计算方便，交易费用收取单边的手续费。</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:"backDetails",
		data(){
			return{
//				backtestIndex:""
				testDays:"",//测试天数
				testZhouqi:'',//测试周期
				finalReturn:"",//最终受益
				winTimes:'',//交易胜率
				tradeTimes:"",//交易次数
				winRate:"",//盈利次数
				tradeFrequency:"",//交易平率
				maxDrawndown:"",//最大回测
				finalPortfolio:"",//最终权益
				loseTimes:"",//亏损次数
				commission:"",//总手续费
				yearlyReturn:"",//年化收益率
				sharpeRatio:'',//夏普率
				timeend:"",//结束时间
				timestart:"",//开始时间
				port:"",//合约
				initialaccount:"",//初始资金
				frequency:""//k线类型
			}
		},
		computed:{
			backtestIndexArr:function(){
				return this.$store._modules.root.state.account.backtestIndexArr
			}
		},
		activated:function(){
			
		},
		mounted:function(){
//			console.log("this.backtestIndex==========="+JSON.stringify(this.backtestIndex))
			this.testDays = this.backtestIndexArr.backtestIndex.testDays;
			this.testZhouqi  = this.backtestIndexArr.backtestIndex.testZhouqi;
			this.finalReturn=this.backtestIndexArr.backtestIndex.finalReturn;
			this.winTimes=this.backtestIndexArr.backtestIndex.winRate;
			this.tradeTimes=this.backtestIndexArr.backtestIndex.tradeTimes;
			this.winRate=this.backtestIndexArr.backtestIndex.winRate;
			this.tradeFrequency=this.backtestIndexArr.backtestIndex.tradeFrequency;
			this.maxDrawndown=this.backtestIndexArr.backtestIndex.maxDrawndown;
			this.finalPortfolio=this.backtestIndexArr.backtestIndex.finalPortfolio;
			this.loseTimes=this.backtestIndexArr.backtestIndex.loseTimes;
			this.commission=this.backtestIndexArr.backtestIndex.commission;
			this.yearlyReturn=this.backtestIndexArr.backtestIndex.yearlyReturn;
			this.sharpeRatio=this.backtestIndexArr.backtestIndex.sharpeRatio;
			this.timeend=this.backtestIndexArr.backtestIndex.timeend;
			this.timestart=this.backtestIndexArr.backtestIndex.timestart;
			this.port=this.backtestIndexArr.backtestIndex.port;
			this.initialaccount = this.backtestIndexArr.backtestIndex.initialaccount;
			this.frequency = this.backtestIndexArr.backtestIndex.frequency
		},
		filters:{
			changPoint:function(e){
				var str=Number(e*100).toFixed(2);
			    str+="%";
			    return str;
			},
			changPoint1:function(e){
				return Number(e).toFixed(2);
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#backDetails{
		width: 7.5rem;
		background-color: #e5f9f6;
		.title_left{
			padding-left:0.3rem;
			width:100%;
			height:0.65rem;
			border-bottom: 1px solid #ffffff;
			border-top: 1px solid #ffffff;
			background-color:#fff;
			line-height:0.65rem;
		}
		.detailsInfo{
			height: 0.9rem;
			line-height: 0.9rem;
			font-size: 0.28rem;
			padding: 0 0.3rem;
			background-color:#fff;
			span{
				&:nth-child(2){
					color: #ff4c4c;
					margin-left: 0.1rem;
				}
				&:nth-child(3){
					margin-left: 0.3rem;
				}
				&:nth-child(4){
					color: #12b362;
					margin-left: 0.1rem;
				}
			}
		}
		.describe{
			//height: 4.5rem;
			padding: 0.24rem 0;
		}
		.span_bwt{
			padding: 0 0.3rem;
			margin: 0 auto;
			border: solid 1px #bbf6ec;
			li{
				padding: 0 0.2rem;
				height:0.5rem ;
				line-height: 0.5rem;
				display: flex;
				justify-content: space-between;
				font-size: 0.28rem;
				background-color:#fff;
				span{
					&:nth-child(2){
						color: #333;
					}
				}
			}
		}
		.Assessment{
			padding: 0.24rem 0;
		}
		.Statistics{
			padding: 0.24rem 0;
		}
		.Notice{
			//border-top: 1px solid #12141a;
			padding: 0 0.3rem;
			width: 100%;
			height: 1rem;
			line-height: 1rem;
			span{
				&:nth-child(2){
					color: #333;
				}
			}
		}
	}
	
</style>
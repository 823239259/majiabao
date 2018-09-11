<template>
	<div id="backHistory">
		<div id="historyRecords">
				<div class="list_title">
					<ul>
						<li>
							<span>序号</span>
							<span>时间</span>
							<span>合约名称</span>
							<!--<span>交易所</span>-->
							<span>开/平</span>
							<!--<span>平/开</span>-->
							<span>成交价</span>
							<span>手数</span>
							<!--<span>平仓盈亏</span>-->
							<span>交易手续费</span>
							<span>可用资金</span>
							<span>现有持仓</span>
						</li>
						<template v-for="k in this.endData">
							<li>
								<span v-for="i in k">{{i}}</span>
							</li>
						</template>
					</ul>
				</div>
			</div>
	</div>
</template>

<script>
	export default{
		name:"backHistory",
		data(){
			return{
				endData:[]
			}
		},
		computed:{
			backtestIndexArr:function(){
				return this.$store._modules.root.state.account.backtestIndexArr
			}
		},
		mounted:function(){
			this.endData = this.backtestIndexArr.tradeInfo
		}
	}
</script>

<style scoped lang="scss">
	@import "../../assets/css/common.scss";
	#historyRecords{
			width: 7.5rem;
			.list_title{
				width: 100%;
				overflow-x: scroll;
				border-bottom: 1px solid #12141a;
				ul{
					width: 18.6rem;
					display: block;
					padding: 0 0.3rem;
					
					li{
						border-bottom: 1px solid #12141a;
						text-align: center;
						line-height: 0.4rem;
						height: 0.8rem;
						&:nth-child(1){
							line-height: 0.8rem;
							span{
								color: $fontBlue;
							}
						}
						span{
							color: $white;
							float: left;
							width: 2rem;
							display: block;
							overflow: hidden;
							label{
								color:$fontBlue;
							}
						}
					}
				}
			}
		}
</style>
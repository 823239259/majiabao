<template>
	
		<div class="wrap" ref="viewBox1">
			<h2>{{startTime}} {{getWeekDay(today)}}</h2>
			<ul class="discover_list">
				<mt-loadmore :bottom-method="loadBottom"  :auto-fill="false" :top-method="loadTop" ref="loadmore">
						<template >
							<li class="list" v-for="k in newsInfo" >
								<p class="time_text"><span class="time">{{k.createdAt | changTime }}</span></p>
								<div class="box">
									<p :class="{textHeight:k.zhankai}" :style="{color:k.importance!=1?'#ff5533':''}">{{k.liveTitle}}</p>
									<div class="icon_box" v-if="k.liveTitle.length>70" @click="showAll1(k)">
										<i class="display_icon"></i>	
									</div>
									<div class="hr30"></div>
								</div>
							</li>
						</template>
				</mt-loadmore> 
				<!-- <p @click="test1">加载跟多</p> -->
			</ul>
		</div>
</template>

<script>
	import pro from '../../assets/js/common'
	export default {
		name: "discover7x24",
		data() {
			return {
				tabSelected: 'discover',
				startTime: '',
				endTime: '',
				pageNum:0,
				newsInfo: [],
				zhankai: false,
				today: null,
			}
		},
		computed: {
			
		},
		methods: {
			getWeekDay (time) {
				const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				return weekList[time.getDay()]
			},
			getNewsInfo (pageNo) {
		    	var data = {
		    		pageSize:20,
		    		pageNo:pageNo,
		    		minTime:this.startTime,
					maxTime:this.endTime,
		    		keyword:""
		    	}
		    	this.$pro.fetch("post","/news/get7_24Live",data,"").then((res)=>{
					//console.log(res)
		    		if(res.code == 1 && res.success == true){
						if(res.data){
								res.data.forEach((k) => {
								if(k.liveTitle.length>70){
									//console.log(k.liveTitle.length)
									k.zhankai = true
								}							
							})
							let newList = res.data;
							//判断 是下拉加载 还是上来刷新操作
							if (this.pageNum == 0) {
								this.newsInfo = res.data;
							}else{
								this.newsInfo = this.newsInfo.concat(newList)
							}
						}
						
		    			
		    		}
		    	}).catch((err) => {
                    var data = err.data;
                    console.log(err)
                    if (data === undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后再试",
                            duration: 1000
                        });
                    } else {
                        if (data.code == -9999) {
                            this.$toast({
                                message: "认证失败，请重新登录",
                                duration: 1000
                            });
                            this.$router.push({
                                path: "/login"
                            });
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 1000
                            });
                        }
                    }
                })
			},
			showAll1 (item) {
				item.zhankai = !item.zhankai
			},
			loadTop () {
				this.pageNum = 0;
				this.getNewsInfo(this.pageNum);
				this.$refs.loadmore.onTopLoaded();
			},
			loadBottom () {
				this.pageNum++
				this.getNewsInfo(this.pageNum)
				this.$refs.loadmore.onBottomLoaded();
			},
			test1 () {
				this.pageNum++
				this.getNewsInfo(this.pageNum)
			}
		},
		filters:{
			changTime:function(e){
				return  pro.getDate(e*1000,"h:m");
				
			},
		},
		created () {
			let today = new Date()
			let tomorrow = (Date.parse(new Date())/1000+24*60*60)*1000;
			this.today = today;
			this.startTime = this.$pro.getDate(Date.parse(today),"y-m-d")
			this.endTime = this.$pro.getDate(tomorrow,"y-m-d")
			this.getNewsInfo(0);			
		},
		
		
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.wrap{
		h2{
			@include font($fs24,0.64rem,$graySimple);
			background-color: $bgDeep;
			border-bottom: 1px solid $bgDeep;
		}	
		.discover_list{
			padding: 0.25rem 0.3rem
		}
		.list{
			padding: 0 0 0 0.25rem;
			.time_text{
				position: relative;
				text-align: left;
				&::before {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					content: '';
					width: 0.16rem;
					height: 0.16rem;
					background-color: $blueBall;
					border-radius: 50%;
				}
			}
			.time{
				display: inline-block;
				width: 1rem;
				height: 0.4rem;
				margin-left: 0.3rem;
				@include font($fs24,0.4rem,$graySimple);
				background-color: $bgGray;
				border-radius: 0.2rem;
			}
			.box{
				position: relative;
				border-left: 0.04rem dashed #dadae6;
				padding: 0.3rem 0  0.3rem 0.2rem;
				margin: 0 0.05rem;
				.textHeight{
					height: 1.4rem;
					overflow: hidden;
					
				}
				p{
					@include font($fs30,0.46rem,$blcakThin,left);
				}
				.hr30{
					height: 1px;
					margin-top: 0.3rem;
					background-color: $bgDeep
				}
			}
			.icon_box{
				position: relative;
				text-align: right;
				padding-top: 0.1rem;

			}
			.display_icon{
				display: inline-block;
				width: 0.32rem;
				height: 0.32rem;
				background: url('../../assets/images/discover/display_icon_up.png') center no-repeat;
				background-size: cover;

			}
		}
	}
	
</style>
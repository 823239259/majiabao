<template>
		<div class="wrap animated fadeInLeft" ref="viewBox1">
			<ul class="discover_list">
				<mt-loadmore :bottom-method="loadBottom"  :auto-fill="false" :top-method="loadTop" ref="loadmore">
						<template >
							<li class="list" :class="{'show': showItem[index]}" v-for="(k,index) in newsInfo" v-isShow="'#datas'">
								<p class="time_text">
									<span class="time">{{k.createdAt | changTime }}</span>
									<span class="time_day">{{startTime}} {{getWeekDay(today)}}</span>
								</p>
								<div class="box">
									<p :class="{textHeight:k.zhankai}">{{k.liveTitle}}</p>
									<div class="icon_box" v-if="k.liveTitle.length>70" @click="showAll1(k)">
										<i class="display_icon"></i>	
									</div>
									<!-- <div class="hr30"></div> -->
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
				showItem: [true,true,true,true],
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


		.discover_list{
			padding: 0.25rem 0.3rem;
		}
		.list{
			padding: 0.2rem 0 0 0.25rem;
			background-color: #edf6ff;
			border-radius: 0.1rem;
			margin-top: 0.16rem; 
			box-shadow: 0 0 5px 1px #ccc;
			.time_text{
				position: relative;
			}
			.time{
				display: inline-block;
				width: 0.7rem;
				height: 0.4rem;
				margin-left: -0.2rem;
				@include font($fs24,0.4rem,$blcakThin,left);
			}
			.time_day{
				display: inline-block;
				height: 0.4rem;
				@include font($fs24,0.4rem,$aaa);
				//background-color: $bgDeep;
				
			}
			.box{
				position: relative;
				border-left: 1px solid #dbdee1;
				padding: 0.3rem 0.2rem;
				margin: 0 0.05rem;
				.textHeight{
					height: 1.4rem;
					overflow: hidden;
					transition: all 0.5s;
					
				}
				p{
					@include font($fs30,0.46rem,$blcakThin,left);
					transition: all 0.5s;
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
	.show{
			opacity: 1 !important;
		}
	
</style>
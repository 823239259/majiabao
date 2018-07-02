<template>
	<div class="calendar_wrap animated fadeInRight">
		<!-- <h2>{{showTime}}</h2> -->
		
		<Calendar ref="Calendar" 
			v-on:choseDay="clickDay" 
			v-on:changeMonth="changeDate"></Calendar>
		<h2 class="time_text">{{showTime }}</h2>
		<ul class="my_list">
			<li class="item" :class="{'show': showItem[index]}" v-for="(item,index) in list"  :key="item.createdAt"  >
				<div class="title_box">
					<div class="left">
						<span class="time">{{$pro.getDate(item.timestamp*1000, 'h:m')}}</span>
						<div class="star_box">
							<i v-for="t in Number(item.importance)" class='star_icon'  :class="item.importance==3?'star_red':'star_yellow'"></i>
							<i v-for="t in (3-Number(item.importance))" class='star_icon' :class="item.importance==3?'star_red':''"></i>
						</div>
						<span class="time">{{item.country}}</span>
					</div>
					<p class="text">{{item.title}}</p>
					<div class="right">
						<div class="number_box">
							<p>今值: <span>{{item.actual||'---'}}</span></p>
							<p>预期: <span>{{item.forecast||'---'}}</span></p>
							<p>前值: <span>{{item.previous||'---'}}</span></p>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="noInfo" v-show="showNoInfo">
			暂无内容
		</div>
	</div>
</template>

<script>
 import Calendar from 'vue-calendar-component';
	export default {
		name: "calendarNews",
		props: ['newDate'],
		components: {
			 Calendar
		},
		data() {
			return {
				tabSelected: 'datas',
				selected: "1",
				today: '',
				weekday: ['日', '一', '二', '三', '四', '五', '六'],
				weekDayList: [],
				showTime: '',
				list: [],
                showNoInfo: false,
				datePosition: '',
				showItem: [true,true,true],
				
			}
		},
		methods: {
			goto(...pathObj) {
				if (pathObj.length == 1) {
					this.$router.push({
						path: pathObj[0]
					})
				} else if (pathObj.length == 2) {
					this.$router.push({
						path: pathObj[0],
						query: {
							id: 1,
							title: '比特币再现巨大跌幅，自高位跌去七成 这次还能爬起来吗？',
							time: '2018-02-10'
						}
					})
				}
	
			},
			getWeekDay (time) {
				const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				return weekList[time]
			},
			mouthList (setTime= null) {
				/* 
					1. 取到当天时间的 年, 月, 日
					2. 判断本年,本月的天数
					3. 设置本月每天的星期数
					4. 渲染到页面
				*/
				let today;
				if (setTime) {
					today = new Date(setTime);
				}else{
					today = new Date();
				}
				
				let year = today.getFullYear();
				let mouth = today.getMonth();
				let date = today.getDate();
				let weekday = today.getDay();
				let mouthDayList = [];
				const mouthDayLength = [31,28,31,30,31,30,31,31,30,31,30,31]
				//判断当月的天数
				//处理闰年二月
				if (year%4 === 0 ) {
					mouthDayLength[1] = 29
				}
				let mouthDay = mouthDayLength[mouth];
				//当月第一天 
				for (let index = 1; index <= mouthDay; index++) {
					//循环遍历 得到每天的星期数   星期数 = (天数差%7 + 当天星期数)%7   如果为负数加7 解决周六问题
					let indexDayWeekday = ((index - date)%7 + weekday)%7;
					if(indexDayWeekday<0) {
						indexDayWeekday = indexDayWeekday + 7
					}
					let indexDay = {
						time: year + '-' + (mouth + 1) + '-' + index,
						day: index,
						weekday: this.getWeekDay (indexDayWeekday),
					}
					mouthDayList.push(indexDay)
					 	
				}
                this.showTime = mouthDayList[date - 1].time
                //this.getPosition(date)
				return mouthDayList
            },
            //定位日历选中居中
            // getPosition (date) {
            //     //定位当前天数在中间
            //     const ratio = parseFloat(document.getElementsByTagName('html')[0].style.fontSize)
            //     const liWidth =  ratio*1.07 //1.07是li的宽度 (340行)
            //     let calendar_date = document.getElementsByClassName('calendar_date')[0]
            //     this.datePosition = (date-4)*liWidth
            //     calendar_date.scrollLeft = this.datePosition
            //     //传值给父组件
            //     this.$emit('datePosition',this.datePosition);
            // },
			getTomorrow (todayString) {
				let todayList = todayString.split('-');
				todayList[2] = todayList[2]*1 + 1;
				return todayList.join("-");
				
			},
			changeDate (item) {
				if(item.time == this.showTime) return;
				//console.log(item.time)
				this.showTime = item.time
				let tomorrow = this.getTomorrow(this.showTime)				
				this.getInfoList(item.time, tomorrow)
                //this.getPosition(item.day)

			},
			getInfoList (startTime,endTime) {
				var startTime = startTime|| this.$pro.getDate(Date.parse(new Date()),"y-m-d")
				var endTime = endTime||this.getTomorrow(startTime)
				let url,headers
				const data = {
					startTime:startTime,
					endTime:endTime
				}
				if(this.userInfo) {
					headers = {
						token : this.userInfo.token,
						secret : this.userInfo.secret
					}
					url = "/news/getCalendar"
				}else{
					headers = ''
					url = "/news/getCalendarNoToken"
				}
				 
				this.$pro.fetch("post",url,data,headers).then((res)=>{
//					console.log("res======"+JSON.stringify(res));
					if(res.success == true && res.code == 1){
						this.list = res.data;
						if(!this.list){
							this.showNoInfo = true
						}else{
							this.showNoInfo = false
						}
					}
				}).catch((err) => {
                    var data = err.data;
                    console.log(err)
                    if (data == undefined) {
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
			//订阅功能
			subscription:function(item){
				var timestampNow = Date.parse(new Date())/1000;
				//console.log(timestampNow)
				if(!this.userInfo){
					this.$toast({message:"您还未登录，请先登录，方可订阅",duration: 2000});
					this.$router.push({path:"/login"});
				}else{
					if(timestampNow-item.timestamp > 0){
						this.$toast({message:"该事件已经发生，不可订阅",duration: 2000});
					}else{
						const data = {
							calendarId:item.calendarId,
							previous:item.previous,
							actual:item.actual,
							forecast:item.forecast,
							title:item.title,
							timestamp:item.timestamp
						}
						const data1 = {
							calendarId:item.calendarId
						}
						const headers = {
							token : this.userInfo.token,
							secret : this.userInfo.secret
						}
						
						if(item.status == '1'){
							this.delSubscription(data1,headers);
							item.status =  '0'
						}else{
							this.addSubscription(data,headers);
							item.status =  '1'
						}
					}
				}
			},
			//添加订阅
			addSubscription (data,headers) {
				this.$pro.fetch("post","/news/subscibeCalendar",data,headers).then((res)=>{
					if(res.success == true && res.code == 1){
						this.$toast({message:"订阅成功",duration: 1000});
					}
				}).catch((err)=>{
					this.err(err)
				})
			},
			// 删除订阅不成功
			delSubscription (data,headers) {
				this.$pro.fetch("post","/news/removeSubscibeCalendar",data,headers).then((res)=>{
					if(res.success == true && res.code == 1){
						this.$toast({message:"删除成功！",duration: 1000});
					}
				}).catch((err)=>{
					this.err(err)
				})
			},
			err (err) {
				var data = err.data;
				if(data == undefined){
					this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
				}else{
					if(data.code == -9999){
						this.$toast({message:"认证失败，请重新登录",duration: 1000});
						this.$router.push({path:"/login"});
					}
					else{
						this.$toast({message:data.message,duration: 1000});
					}
				}
			},
			clickDay(data) {
				//处理格式
				data = data.toString().replace(/\//g,'-');
				if(data == this.showTime) return;
				//console.log(item.time)
				this.showTime = data
				let tomorrow = this.getTomorrow(this.showTime)				
				this.getInfoList(data, tomorrow)
                //this.getPosition(item.day)
			},
			clickToday(data) {
				
				console.log('跳到了本月今天', data); //跳到了本月
			},
			changeDate(data) {
				data = data.toString().replace(/\//g,'-');
				if(data == this.showTime) return;
				//console.log(item.time)
				this.showTime = data
				let tomorrow = this.getTomorrow(this.showTime)				
				this.getInfoList(data, tomorrow)
				//console.log('左右点击切换月份', data); //左右点击切换月份
			},

		},
		watch: {
			// newDate (newValue, oldValue) {
			// 	if (newValue&&newValue !== oldValue) {
			// 		this.weekDayList = this.mouthList(newValue);
			// 		//console.log(Date(newValue))
			// 		let tomorrow = this.getTomorrow(newValue);
			// 		this.getInfoList(newValue, tomorrow)
			// 	}
			// }	
		},
		mounted () {
			const local = this.$pro.local;
			this.userInfo = local.get('user');
			let today = new Date();
			this.today = today;
            this.weekDayList = this.mouthList();
			this.getInfoList()
		},	
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
.calendar_wrap{
		h2{
			@include font($fs24,0.64rem,$graySimple);
		}
		.calendar_date{
			width: 7.5rem;
			overflow: scroll;
			 -webkit-overflow-scrolling: touch;
		}
		.time_text{
				position: relative;
				@include font($fs24,0.7rem,#ffffff);
				background-color: #5534ff;
			}
		.item{
			background-color: $bgWhite;
			padding: 0.3rem;
			box-shadow: 0 0 5px 1px #ccc;
			border-radius: 0.1rem;
			.title_box{
				@include flex(center,space-between);
				font-size: 0;
				flex-direction: column;
			}
			.left{
				//flex: 0 0 1.2rem;
				@include flex(space-between);
				.time,.country{
					display: block;
					@include font($fs24,0.3rem,$grayMiddle);
					
				}
				.star_box{

					text-align: center;
				}
				img{
					display: block;
					width: 0.45rem;
					height: 0.3rem;
					//margin: 0.16rem auto;

				}
				.star_icon{
					display: inline-block;
					width: 0.22rem;
					height: 0.2rem;	
					background: url('../../assets/images/message/star_gray.png') center no-repeat;
					background-size: 100%;
				}
				.star_red{
					background: url('../../assets/images/message/star_red.png') center no-repeat;
					background-size: 100%;
				}
				.star_yellow{
					background: url('../../assets/images/message/star_yellow.png') center no-repeat;
					background-size: 100%;
				}
			}
			.right{
				flex: 1
			}
		}
		.noInfo{
			color: #7a8599;
			text-align: center;
			font-size: .36rem;
			margin-top: 50%;
		}
		
		.text{
			@include font($fs30,0.3rem,#e44f34,left);
			padding: 0.3rem 0;
		}
		.text_red{
			color: $redDeep
		}
		.number_box{
			@include flex(space-between);
			p{
				@include font($fs24,0.3rem,$graySimple,left);
				span{
					color:$blcakThin
				}
			}
		}
		.wh_content_all{
			background: red ;
		}
		.wh_content_item .wh_isToday{
			background: red;
		}
		.show{
			opacity: 1 !important;
		}
	}
	
</style>
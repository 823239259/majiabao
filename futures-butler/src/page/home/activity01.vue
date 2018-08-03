<template>
  <div id="activity01">
    <div class="wrap">
            <div class="box" >
                <img :src="currentItem.img" alt="01">
                <p>{{currentItem.text}}</p>
            </div>
            <div class="calendar_list_wrap">
              <ul class="calendar_list">
                <li :class="['item',{'active':today.getDate()===item.day}]" v-for="(item, index) in weekList"  :key="index">
                  <div class="weekday">{{item.weekday}}</div>
                  <div class="date">{{item.day}}</div>
                </li>
              </ul>
              <div class="Sign_in_wrap">
                  <div class="left_box">
                      <span class="number">{{(signInfo.signDay||0)+'.00'}}</span>
                      <div>当前管家币丨累计签到<span class="color1">{{signInfo.signDay||0}}</span>天</div>
                  </div>
                  <div class="right_box">
                      <button @click="SignIn">{{signText}}</button>
                  </div>
              </div>
          </div>
     </div>     
    <AlertMessage v-if="isShow" :type="type" :text="text" :comfirm="draggleShow" />
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  import AlertMessage from '../../components/AlertMessage'
  const local = pro.local;
  
  export default {
    name: "activity01",
    components: {
      AlertMessage,
      
    },
    props: ['id'],
    data() {
      return {
        user: {},
        isLogin: false,
        isShow: false,
        text:'',
        type: 1,
        idList: [],
        weekList:[],
        today: new Date(),
        signInfo:{
          signDay: 0,
          signList: []
        },
        imgList: [{
            img: require('../../assets/images/home/activity01_banner.jpg'),
            id: 1,
            text: '管家币可用作后期管家推出活动模拟金使用'
        },
        {
            img: require('../../assets/images/home/activity02_banner.jpg'),
            id: 2,
            text: '管家大赛可配合管家币提高中奖几率'
        }]
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      currentItem () {
        return this.imgList.find((item)=>{
          return item.id == this.id
        })
      },
      signText () {
        return this.isSign?`再签${7 - this.signInfo.signDay}天有礼`:'签到领管家币'
      },
      isSign () {
        let today = pro.getDate(this.today,'y-m-d')
        if (!this.signInfo.signList) return false;
        return this.signInfo.signList.includes(today)
      }
      
    },
    methods: {
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      goto(path) {
        this.$router.push({
          path: path
        });
      },
      askServer () {
        this.text = '连续签到7天后可联系客服领取礼包'
        this.type = 1
        this.draggleShow()
      },
      draggleShow () {
        this.isShow = !this.isShow
      },
      setSignInfo () {
         this.signInfo.signDay++
         this.signInfo.signList.push(pro.getDate(this.today,'y-m-d'))
         pro.local.set('signInfo', this.signInfo)
      },
      SignIn () {
         if (this.user) {
           if(!this.isSign){
              this.type = 0
              this.draggleShow()
              this.setSignInfo()
              this.text = this.signInfo.signDay
           }else{
             this.$toast({
                message: '您已签过到了',
                duration: 1000
            })
           }
         }else{
           this.toLogin()
         }
      },
      toLogin () {
        this.$messagebox.confirm('签到需登录哦',{
          title: '提示',
          confirmButtonText: '去登录'

        }).then(action => {
          this.$router.push({path:'/login',query:{back:'back'}})
           
        }).catch(action => {
           
        })
      },
      getWeekDay (time) {
				const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				return weekList[time]
			},
      setWeekList () {
        let today  = new Date();
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
				for (let index = 1; index <= 7; index++) {
          //循环遍历 得到每天的星期数   星期数 = (天数差%7 + 当天星期数)%7   如果为负数加7 解决周六问题

          //放大处理当天为周日的情况
          if(weekday == 0 ){
            weekday = 7
          }
          let differIndex = index - weekday;
          let indexDate =  date + differIndex;
          //每月最后几天
          if (indexDate>mouthDay) {
            indexDate = differIndex - 1; //index是从1开始取的
          }
          if (indexDate<=0) {
            indexDate = mouthDayLength[mouth-1]+ differIndex + date;//处理每月开始那几天
          }
					let indexDay = {
						day: indexDate,
						weekday: this.getWeekDay (index%7),
					}
					this.weekList.push(indexDay)
					 	
        }
      }
    },
    created() {
      this.setWeekList()
    },
    activated() {
      this.signInfo = pro.local.get('signInfo')||this.signInfo
      this.user = pro.local.get('user')
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #welfare_details {
    width: 7.5rem;
    padding-top: 0.96rem;
    background-color: $bgButler;
  }
  .wenhao{
    display: inline-block;
    width: 0.5rem;
	  height: 0.5rem;
    background: url('../../assets/images/home/wenhao.png') center no-repeat;
    background-size: 0.16rem 0.27rem;
  }
  .box{
    
    margin-bottom: 0.16rem; 
  }
  p{
    padding: 0 0.3rem;
    @include font($fs28,0.8rem,$blackNormal,left);
    background-color: $white;

  }

.calendar_list_wrap{
  width: 6.9rem;
  margin: 0 auto;
  border-radius: 0.1rem;
  box-shadow: 1px 1px 10px #ccc;
}
.calendar_list{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .item{
    flex: 1;
    text-align: center;
    padding: 0.24rem 0;
    border: solid 1px #bbf6ec;
    margin-left: 0.03rem;
  }
  .item:first-child{
    margin-left: 0;
  }
  .item.active{
    background-color: $bgButler;
  }
  .weekday{
    @include font($fs24,0.32rem,#788b87);
    padding-bottom: 0.1rem;
  }
  .date{
    @include font($fs28,0.32rem,#283835);
  }
}
.Sign_in_wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.24rem;
  .left_box,.right_box{
    text-align: left;
  }
  .left_box{
    flex: 2;
    @include font(0.28rem,0.32rem,#283835,left);
    .number{
      @include font(0.68rem,1rem,#169781,left);
    }
    .color1{
      color: #de8c22;
      padding: 0 0.1rem;
    }
  }
  .right_box{
    flex: 1;
    button{
      width: 2.4rem;
      height: 0.8rem;
      background-color: #169781;
      border-radius: 0.1rem;
      @include font(0.28rem,0.8rem,#ffffff);
    }
  }
}
</style>
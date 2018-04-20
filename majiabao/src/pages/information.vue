<template>
  <div>
    <header class="header">
      <span :class="{'checked': ischeck}" @click="changeClick">财经</span>
      <span :class="{'checked': !ischeck}" @click="changeClick">直播</span>
    </header>
    <!-- 财经部分 -->
    <div class="list-wrap" v-show="ischeck">
       <div class="list-box">
          <h3>2018年3月29日  星期四</h3>
          <ul class="news-list">
            <li class="title-item" v-for="(item,index) in newsList" :key="index + item.time">
              <div class="top-time">
                <span class="yuan"></span>
                <span class="time">{{item.time}}</span>
              </div>
              <div class="content-box">
                <p v-html="item.text"></p>
              </div>
            </li>
          </ul>
        </div>
    </div>
    <!-- 直播部分 -->
   <div class="list-wrap" v-show="!ischeck">
     <div class="list-box">
          <h3>2018年3月</h3>
          <div class="week">
            <div class="day-box" v-for="n in weekList" :key="n.day">
              <span class="day">{{n.day}}</span>
              <span class="date" :class="today==n.date?'checked':''">{{n.date}}</span>
            </div>
          </div>
          <ul class="online-list">
            <li class="online-item" v-for="item in onlineList" :key="item.title">
              <h2><span>{{item.time}}</span>{{item.title}}</h2>
              <div class="content-box">
                <div class="left">
                  <img class="img" :src="item.img" :alt="item.img">
                </div>
                <div class="right">
                  <p class="text">
                    <span>今值：{{item.nowMark}}</span>
                    <span>预期：{{item.expectMark}}</span>
                    <span>前值：{{item.lastMark}}</span>
                  </p>
                  <p class="star-box">
                    <span class="star" :class="item.importance==3?'star_yellow':'star_blue'" v-for="t in Number(item.importance)" ></span>
									  <span class="star" :class="item.importance==3?'star_blue':''" v-for="t in (3-Number(item.importance))" ></span>                        
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
   </div>
    
    <!-- 选项卡 -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="index">
        <span class="icon icon1" slot="icon"></span>
        首页
      </mt-tab-item>
      <mt-tab-item id="quotation">
        <span class="icon icon2" slot="icon"></span>        
        行情
      </mt-tab-item>
      <mt-tab-item id="classroom">
        <span class="icon icon3" slot="icon"></span>
        学堂
      </mt-tab-item>
      <mt-tab-item id="information">
        <span class="icon icon4 icon-checked" slot="icon"></span>
        资讯
      </mt-tab-item>
      <mt-tab-item id="my">
        <span class="icon icon5" slot="icon"></span>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import pro from '../assets/common'
let today = new Date().getDate();
export default {
  
  data () {
    return {
      selected: 'information',
      ischeck: true,
      today: today,
      newsList: [
        {
          time: '14:55',
          text: '彭博：贸易紧张局势缓和令日元连续第三周下挫，澳元走高<br>在中美两国领导人纷纷缓和表态后，有关全球贸易战的担忧缓解，日元连续第三周下跌，澳元则有望连续第二周上涨。特朗普暗示存在美国官员研究重新加入跨太平洋伙伴关系协定(TPP)的可能性，并表示中美两国最终可能不会互相征收新的关税。习近平本周则重申开放中国市场的承诺。'
        },
        {
          time: '14:54',
          text: 'IEA月报：预计欧佩克原油需求在年内剩余时间将维持在约3250万桶/日的水平欧佩克原油减产执行率达163%。'
        },
        {
          time: '14:35',
          text: '中国3月M0货币供应年率∶6.0% 前值∶13.5% 预估值∶7.8%'
        },
        {
          time: '14:35',
          text: '三菱日联摩根士丹利证券：特朗普在叙利亚和TPP问题上的评论消除了一些担忧，带来了一些利好美元的因素，这些因素推高了股市、打击了日元。'
        },
      ],
      onlineList: [
        {
          time: '14:55',
          title: '新西兰3月制造业表现指数',
          img: require('../assets/img/us_flag.png'),
          nowMark: '1.50%',
          expectMark: '1.50%',
          lastMark: '1.50%',
          importance: '3'
        },
        {
          time: '14:54',
          title: '澳储行公布半年度金融稳定报告',
          img: require('../assets/img/us_flag.png'),
          nowMark: '1.50%',
          expectMark: '1.50%',
          lastMark: '1.70%',
          importance: '2'
        },
        {
          time: '14:51',
          title: '中国3月贸易帐（按人民币计）',
          img: require('../assets/img/us_flag.png'),
          nowMark: '1.50%',
          expectMark: '1.50%',
          lastMark: '1.40%',
          importance: '1'
        },
        {
          time: '14:51',
          title: '中国3月贸易帐（按美元计）',
          img: require('../assets/img/us_flag.png'),
          nowMark: '1.50%',
          expectMark: '1.50%',
          lastMark: '1.40%',
          importance: '2'
        },
        {
          time: '14:51',
          title: '中国3月出口年率（按人民币计）',
          img: require('../assets/img/us_flag.png'),
          nowMark: '1.54%',
          expectMark: '1.50%',
          lastMark: '1.40%',
          importance: '3'
        }
        

      ],
      weekList: []
    }  
  },
  methods: {
    goBack () {       
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    
    },
    goto (id) {
      //this.$router.push({path: `/contract-item/${id}`})
      this.$router.push({path: `/information_item`})
    },
    changeClick (event) {
      let hasclass =  event.target.classList.contains('checked');
      if(!hasclass){
        this.ischeck = !this.ischeck
      }      
    },
    getDayList:function(){				
				var timec = new Date()/1000;
				var today = pro.getDate("y-m-d",timec*1000);
				var aaa = [];
				var arr = ["日", "一", "二", "三", "四", "五", "六"];
				for(let i=-3;i<4;i++){
					var millisecond = timec*1000+i*24*60*60*1000;
					var newDay = pro.getDate("d",millisecond);
					var weekDay = arr[new Date(millisecond).getDay()];
					var obj = {
						day: weekDay,
						date: newDay
					}
					aaa.push(obj)
				}
			   	this.weekList = aaa;
		},
    
  },
  watch: {
    selected (value, oldvalue) {
      this.$router.push({path: `/${value}`})
      console.log(value)
    }
  },
  created () {
    this.getDayList()
  }
  
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.header{
  position: fixed;
  display: flex;
  width: 7.5rem;
  height: 0.88rem;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 10;
  span{
    width: 0.88rem;
    @include font(0.28rem, 0.56rem, #508cee);
    border: #508cee 2px solid;
  }
  span:nth-child(1) {
    border-radius: 0.1rem 0 0 0.1rem;
    border-right: none;

  }
  span:nth-child(2) {
    border-radius: 0 0.1rem 0.1rem 0;
    border-left: none;
    
  }
  .checked{
    background-color: #508cee;
    color: #ffffff;
  }
  
}
.list-wrap{
  width: 7.5rem;
  padding: 0.88rem 0 56px;
}
.news-list{
  padding-top: 0.24rem;
  li:nth-last-child(1){
    .content-box{
      padding-bottom: 0.3rem;
    }
  }
}
.list-box{
  h3{
    @include font(0.28rem, 0.8rem, #333, left);
    text-indent: 0.25rem;
    border-top: #e9e9e9 1px  solid;
    border-bottom: #e9e9e9 1px  solid;
    background-color: #f8f9fc;
  }
}
.title-item{
  .top-time{
    text-align: left;
    padding: 0 0 0 0.25rem;
    font-size: 0;
    .yuan{
      display: inline-block;
      width: 0.24rem;
      height: 0.24rem;
      margin-right: 0.32rem;
      background: url('../assets/img/yuan.png') center center no-repeat;
      background-size: cover;
      vertical-align: middle;
    }
    .time{
      position: relative;
      @include font(0.20rem, 0.24rem, #5d718c);
      padding: 0 0.14rem;
      background-color: #d9e6fb;
      border-radius: 0.12rem;
      vertical-align: middle;
      &::before{
        position: absolute;
        content: '';
        width: 0.32rem;
        height: 1px;
        background-color: #d9e6fb;
        left: -0.32rem;
        top: 50%;
        transform: translateY(-50%);        
      }
    }
  }
  .content-box{
    width: 7.13rem;
    margin-left: 0.37rem; 
    padding: 0.22rem 0.26rem 0.54rem 0.44rem;
    border-left: 1px solid #4e8bee;
    p{     
      @include font(0.28rem, 0.48rem, #333,left); 
      &::after{
        position: relative;
        bottom: -0.3rem;
        display: block;
        content: '';
        height: 1px;
        background-color: #e9e9e9;
      }
    }
  }
}
.week{
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  .day-box{
    padding: 0.25rem 0;
   
    .day,.date{
      display: block;
    }
    .day{
      @include font(0.28rem, 0.48rem, #8b8b8b); 
    }
    .date{
      @include font(0.28rem, 0.56rem, #333); 
    }
    .checked{
      width: 0.56rem;
      height: 0.56rem;
      border: 1px solid #508cee;
      border-radius: 50%;
      background-color: #f5f8fd;
    }
  }
}
.online-list{
  padding: 0.1rem 0 0 0;
  background-color: #f8f9fc;
  @at-root .online-item{
    border-bottom: 1px solid #e9e9e9;
    margin-bottom:0.1rem; 
    background-color: #fff;
    h2{
      @include font(0.32rem, 0.74rem, #333,left); 
      span{
        @include font(0.24rem, 0.74rem, #8b8b8b,left); 
        padding: 0 0.4rem 0 0.25rem;
      }
    }
  }
  @at-root .content-box{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left{
      flex:  0 0 1.24rem;
      .img{
        display: block;
        width: 0.4rem;
        margin: auto;
      }
    }
    .right{
      .text span{
        @include font(0.28rem, 0.48rem, #8b8b8b,left);
        padding-right: 0.4rem;
      }
      .text span:nth-last-child(1){
        padding-right: 0        
      }
      .star-box{
        text-align: left;
        padding: 0.2rem 0;
        font-size: 0;
      }
      .star{
        display: inline-block;
        width: 0.25rem;
        height: 0.25rem;
        background: url('../assets/img/star_gray.png') center center no-repeat;
        background-size: cover;
      }
      .star_yellow{
        background-image: url('../assets/img/star_yellow.png')
      }
      .star_blue{
        background-image: url('../assets/img/star_blue.png')
      }
    }
  }
}

.icon{
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: url('../assets/img/icon_colour.png') top center no-repeat;
  background-size: cover;
}
@for $i from 1 through 5 {
  $background-position-y: (0,-0.72rem,-1.4rem,-2.1rem,-2.8rem);

  .icon#{$i}{
    background-position-y:nth($background-position-y,$i);
    @media screen and (min-width: 320px) and (max-width: 320px) {
    $background-position-y: (0,-0.72rem,-1.39rem,-2.09rem,-2.8rem);
    background-position-y:nth($background-position-y,$i) 
  }
  }
} 
.icon-checked{
  background-image: url('../assets/img/icon_check.png');
  background-position-y:-2.12rem;

}

</style>

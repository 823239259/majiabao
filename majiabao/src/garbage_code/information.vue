<template>
  <div>
    
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

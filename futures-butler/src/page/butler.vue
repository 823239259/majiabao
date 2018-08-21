<template>
  <div id="butler" >
    <mt-header fixed title="管家"></mt-header>
    <div class="butler_wrap">
      <p class="note"><span>管家提示：</span>左右滑动弹出按钮，解锁后可用。</p>
      <ul class="butler_list">
        <li class="item" v-for="(item, index) in butlerList" :key="index + 'abcde'">
          <!-- <div class="left" :class="{'two_times':index%2===0,'all_times':item.leftShow}"  @touchmove="moveTab(item,index,'left')" @touchstart="setCoordinate"> -->
          <div class="left"   @touchmove="moveTab(item,index,'left')" @touchstart="setCoordinate">
             <template v-if="!item.leftShow">
                  {{item.leftName}}
             </template>          
             <template v-else>
               <div class="show_after">
                 {{item.leftName}}
               </div>
                <div class="show_after">
                  <span :class="{'margin1':item.marginShow}" @click="btnback(item,index,'left')">返回</span>
                  <span :class="{'margin1':item.marginShow}" @click="goto(item.leftPath)">解锁</span>
                </div>
             </template>
          </div>
          <!-- <div class="right" :class="{'two_times':index%2!==0,'all_times':item.rightShow}" @touchmove="moveTab(item,index,'right')" @touchstart="setCoordinate">
            <template v-if="!item.rightShow">
                  {{item.rightName}}
             </template>          
             <template v-else>
                <div class="show_after">
                 {{item.rightName}}
               </div>
               <div class="show_after">
                  <span :class="{'margin1':item.marginShow}" @click="goto(item.rightPath)">解锁</span>
                 <span :class="{'margin1':item.marginShow}" @click="btnback(item,index,'right')">返回</span>
                </div>
                  
             </template>
          </div> -->
        </li>
      </ul>
      
    </div>
    <bottomTab :tabSelect="tabSelected"></bottomTab>
    
   
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import bottomTab from '../components/bottom_tab'
  import scrollMsg from '../components/scrollMsg'
  import Cube from '../components/Cube'
  import pro from '../assets/js/common'
  
  const local = pro.local;
  
  
  
  export default {
    name: "butler",
    components: {
      bottomTab,
      scrollMsg,
      Cube
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
        tabSelected: 'butler',
        isLogin: false,
        isShow: false,
        idList: [],
        butlerList: [
          // {
          //   leftName: "新手入门",
          //   rightName: "高手进阶",
          //   leftPath: '/rumen_list/0',
          //   rightPath: '/rumen_list/1',
          //   leftShow: false,
          //   rightShow: false,
          //   marginShow: false
          // },
          {
            leftName: "新手入门",
            rightName: "高手进阶",
            leftPath: '/rumen_list/0',
            rightPath: '/rumen_list/1',
            leftShow: false,
            rightShow: false,
            marginShow: false
          },
          {
            leftName: "高手进阶",
            rightName: "高手进阶",
            leftPath: '/rumen_list/1',
            rightPath: '/rumen_list/0',
            leftShow: false,
            rightShow: false,
            marginShow: false
          },
          {
            leftName: "基础知识",
            rightName: "期货学堂",
            leftPath: '/knowledge/0',
            rightPath: '/knowledge/1',
            leftShow: false,
            rightShow: false,
            marginShow: false
          },
          {
            leftName: "期货学堂",
            rightName: "期货学堂",
            leftPath: '/knowledge/1',
            rightPath: '/knowledge/1',
            leftShow: false,
            rightShow: false,
            marginShow: false
          },
          {
            leftName: "新闻公告",
            rightName: "汇率计算",
            leftPath: '/rumen_list/2',
            rightPath: '/exchange_calc',
            leftShow: false,
            rightShow: false,
            marginShow: false
          },
          {
            leftName: "汇率计算",
            rightName: "汇率计算",
            leftPath: '/exchange_calc',
            rightPath: '/exchange_calc',
            leftShow: false,
            rightShow: false,
            marginShow: false
          },
          {
            leftName: "期货计算",
            rightName: "合约查询",
            leftPath: '/futures_calc',
            rightPath: '/contract_search',
            leftShow: false,
            rightShow: false,
            marginShow: false
          },
          {
            leftName: "合约查询",
            rightName: "合约查询",
            leftPath: '/contract_search',
            rightPath: '/contract_search',
            leftShow: false,
            rightShow: false,
            marginShow: false
          },
          {
            leftName: "资讯直播",
            rightName: "系统公告",
            leftPath: '/discover7x24',
            rightPath: '/rumen_list/3',
            leftShow: false,
            rightShow: false,
            marginShow: false
          },
          {
            leftName: "系统公告",
            rightName: "系统公告",
            leftPath: '/rumen_list/3',
            rightPath: '/rumen_list/3',
            leftShow: false,
            rightShow: false,
            marginShow: false
          }
        ],
        userInfo: {},
        lastPath: '/',
        userList: [],
        startCoordinate: {},
        moveFlag: false,
        moveData: {}
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      allMoney() {
        if (this.accountInfo.balance && this.accountInfo.freeze) {
          return (this.accountInfo.balance * 1 + this.accountInfo.freeze * 1).toString();
        }
      },
      accountInfo() {
        return this.$store.state.accountInfo;
      },
      isNew() {
        return this.$store.state.newsList.some(item => item.isRead == false)
      }
    },
    methods: {
      goLast() {
        this.$router.push(this.lastPath);
      },
      goto(path) {
        this.$router.push({
          path: path
        });
      },
      moveTab (item,index,type) {
          //console.log(event.touches[0])
          if (!this.moveFlag) return;
          let currentPoint = event.touches[0];
          if (type === 'left') {
            if (currentPoint.pageX - this.startCoordinate.startX > 20) {
                  //console.log('向右滑动了')
                  if (!item.rightName) return; 
                  this.moveFlag = false;
                  setTimeout(() => {
                  item.leftShow = true
                }, 10);
                setTimeout(() => {
                  item.marginShow = true
                }, 100);

              }  
          }
          if (type === 'right') {
            if (currentPoint.pageX - this.startCoordinate.startX < -20) {
                if (!item.leftName) return; 
                //console.log('向左滑动了')
                this.moveFlag = false;
                this.moveData['left'+index] = item.leftName
                item.leftName = ''
                setTimeout(() => {
                  item.rightShow = true
                }, 10); //显示相对慢一点
                setTimeout(() => {
                  item.marginShow = true
                }, 100); //最后执行btn分离
                
            }
          }
      },
      setCoordinate () {
          let startPoint = event.touches[0]; //触摸点
          this.moveFlag = true;
          this.startCoordinate = {
              startX: startPoint.pageX,
              startY: startPoint.pageY,
          }
      },
      btnback (item,index,type) {
          
          if(type === 'left') {
            item.leftShow = false;
            //  setTimeout(() => {
            //   item.rightName = this.moveData['right'+index]
            // }, 190);
            setTimeout(() => {
                  item.marginShow = false
                }, 100);
          }
          if (type === 'right') {
            item.rightShow = false;
              setTimeout(() => {
                item.leftName = this.moveData['left'+index]
              }, 190)
              setTimeout(() => {
                  item.marginShow = false
                }, 100);
          }
         

      },
    },
    
  };
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";
  #butler {
    width: 7.5rem;
    padding: 0.98rem 0;
    //background-color: $bg;
    
  }
  
  .butler_list{
    
    
    .item{
      @include flex();
      height: 2rem;
      padding: 0.16rem 0 0 0;
      text-align: center;
      @include font($fs36,2rem,$white);
      overflow: hidden;
      .left{
        flex: 1;
        height: 2rem;
        margin-right: 0.1rem;
        transition: all 0.5s;
        @include flex();
        flex-direction: column;
        span:nth-child(1){
          border-right: 1px solid #fff;
        }
      }
      .right{
        flex: 1;
        height: 2rem;
        transition: all 0.5s;
        @include flex();
        flex-direction: column;
         span:nth-child(1){
          border-right: 1px solid #fff;
        }
      }
      .show_after{
          //flex: 1;
          //width: 7.5rem;
          transition: all 0.5s;
          @include flex(space-around);
          line-height: 0.8rem;
         
        }
      .two_times{
        flex: 2
      }
      span{
        width: 1.6rem;
        border-radius: 0.1rem;
        @include font($fs36,0.8rem,$white);
        transition: all 0.5s;
        border: solid 0.02rem #ffffff;
        
      }
      .margin1{
        margin: 0 1rem;
      }
      .all_times{
        flex: 0 0 7.5rem
      }
      
     
    }
    @for $i from 1 through 10 {
      $background_color: (#e46c0a, #9bbb59, #f44234, #93cddd,#77933c,#a43b39,#e2c607,#04a2dc,#e18683,#f79646);
      .item:nth-child(#{$i}) {
        .left {
          $bg: nth($background_color, $i);
          background-color: $bg;
          
        }
        // .right{
        //   $bg: nth($background_color, 2*$i);
        //   background-color: $bg;
        // }
      }
    }
    

  }
  .cube_wrap{
    padding: 0.5rem 0;
  }
  .message_box{
    position: fixed;
    bottom: 1.38rem;
    right: 0.3rem;
    width: 0.8rem;
    height: 0.64rem;
    background: url('../assets/images/home/msg_icon.png') center no-repeat;
    background-size: 100%;
  }
.note{
  @include font($fs24,0.8rem,#788b87);
  span{
    color: #c6c5cc
  }
}














  
</style>
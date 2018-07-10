
<template>
    <div id="tools_item" >
        <mt-header fixed :title="title">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        <div class="iframe1" :class="{'iframe5':id==5}">
            <iframe :class="[{'inherit-height':!isIphone},'iframeSpecial']" :src="iframe" frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
        </div>
        <!-- <footer class="footer"></footer> -->
    </div>
</template>

<script>

import {mapMutations} from 'vuex'
import pro from '../../assets/js/common'
const local = pro.local;
export default {
  name: "tools",
  data() {
    return {
      tabSelected: 'tools',
      isLogin: false,
      isShow: false,
      userInfo: {},
      lastPath: '/',
      userList: [],
      titleList: ['黄金','白银','钯金','铂金','数据']
      
    };
  },
  props: ['id'],
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
    title () {
      return this.titleList[this.id -1] + '详情'
    },
    iframe () {
        switch (this.id) {
          case '1':
            return 'http://m.yn.com/quotes/XAU.html'
            break;
           case '2':
            return 'http://m.yn.com/quotes/XAG.html';
            break;
           case '3':
            return 'http://m.yn.com/quotes/XPD.html'
            break;    
          case '4':
            return 'http://m.yn.com/quotes/XPT.html'
            break;  
          case '5':
            //return 'http://m.yn.com/data/'
            return 'mydata.html'
            break;  
        
          default:
            break;
        } 
    },
    //ios iframe处理
    isIphone () {
      const isIphone = window.navigator.userAgent.toLowerCase().indexOf('iphone');
      console.log(window.navigator.userAgent.toLowerCase())
      return isIphone>-1
    },
    iframeHeight () {
      const ratio = parseFloat(document.documentElement.style.fontSize)
      // return (document.documentElement.clientHeight - (2.4+0.98+0.96)*ratio) 
      return (document.documentElement.clientHeight - 0.96*ratio) + 'px'
    },
       
  },
   methods: {
      goBack() {
          this.$router.replace('/discover')
          //window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
       shareSystem () {
          var test1 = {
            content: '快来看啦',
            href: 'https://www.baidu.com'
          }
          pro.shareSystem(test1)
        }  
    },

  activated () {   
    
    this.userInfo = local.get('user')
    this.userList = local.get('userList')||[]
    this.idList = local.get('idList')||[] 
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common.scss";
#tools_item {
  width: 7.5rem;
  background-color: $bg;
 
}

.iframe1{
  width: 100%;
  // padding-top: 0.96rem;
  height:10.17rem;
  overflow: hidden;
  @media only screen and (min-width: 414px ) and (max-width: 414px) {
      height: 9.67rem;
  }
  @media only screen and (min-width: 320px ) and (max-width: 320px) {
      height: 11.17rem;
  }
  iframe{
    width: 1px;
    min-width: 100%;
    
  }
  .iframeSpecial{
    height: inherit
  }
}
.iframe5{
  height: 100vh;
   overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.inherit-height{
		height: inherit
	}
.footer{
  position: fixed;
  bottom: 0;
  width: 7.5rem;
  height: 1.04rem;
  background-color: #fff;
}
</style>
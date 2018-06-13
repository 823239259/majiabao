
<template>
    <div id="tools_item" :style="{height:clientHeight}">
        <mt-header fixed title="工具箱">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        <div class="iframe1">
            <iframe :class="{'inherit-height':!isIphone,'iframeSpecial': id=='1'}" :src="iframe" frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
        </div>
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
      
    };
  },
  props: ['id'],
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
    iframe () {
        switch (this.id) {
          case '1':
            return 'http://exchangecalc.dktai.cn'
            break;
           case '2':
            return 'http://contractsearch.dktai.cn';
            break;
           case '3':
            return 'http://futurecalc.dktai.cn'
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
          this.$router.replace('/tools')
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
  padding-top: 0.96rem;
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  iframe{
    width: 1px;
    min-width: 100%;
    
  }
  .iframeSpecial{
    height: inherit
  }
}
.inherit-height{
		height: inherit
	}

</style>
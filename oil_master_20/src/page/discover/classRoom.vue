<template>
    <div id="classRoom" :style="{height:clientHeight}">
         <mt-header fixed title="学堂">           
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
            <!-- <mt-button slot="right" @click="shareSystem">分享</mt-button> -->
        </mt-header>
        <div class="warp1">
            <div class="iframe1">
                <iframe :class="{'inherit-height':!isIphone}" src='http://player.youku.com/embed/XMzY1NTAwMTE0OA==' frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
            </div>
             <div class="iframe1">
                <iframe :class="{'inherit-height':!isIphone}" src='http://player.youku.com/embed/XMzY2MjI1MjQ2NA==' frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
            </div>
             <div class="iframe1">
                <iframe :class="{'inherit-height':!isIphone}" src='http://player.youku.com/embed/XMzY2MTc3NDAxMg==' frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
            </div>
             <div class="iframe1">
                <iframe :class="{'inherit-height':!isIphone}" src='http://player.youku.com/embed/XMzY2MTc5OTg2OA==' frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
            </div>
             <div class="iframe1">
                <iframe :class="{'inherit-height':!isIphone}" src='http://player.youku.com/embed/XMzY2MjA2MDkyMA==' frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
            </div>
             <div class="iframe1">
                <iframe :class="{'inherit-height':!isIphone}" src='http://player.youku.com/embed/XMzY2MjE0NTQ1Ng==' frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
            </div>
             <div class="iframe1">
                <iframe :class="{'inherit-height':!isIphone}" src='http://player.youku.com/embed/XMzY2MjE3ODA2MA==' frameborder="0" :scrolling="isIphone?'no':'yes'"></iframe>
            </div>
        </div>
    </div>
</template>

<script>

import {mapMutations} from 'vuex'
import bottomTab from '../../components/bottom_tab'
import pro from '../../assets/js/common'
const local = pro.local;
export default {
  name: "classRoom",
  components: {
    bottomTab
  },
  mixins:[pro.mixinsToCustomer],
  data() {
    return {
      tabSelected: 'classRoom',
      isLogin: false,
      isShow: false,
      userInfo: {},
      lastPath: '/',
      userList: [],
    };
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
    isIphone () {
      const isIphone = window.navigator.userAgent.toLowerCase().indexOf('iphone');
      console.log(window.navigator.userAgent.toLowerCase())
      return isIphone>-1
    },
  },
  methods: {
    ...mapMutations({
      setAccountInfo: 'ACCOUNT_INFO',
      clearUserInfo: 'INFO_CLEAR',
    }),
    goBack() {
      this.$router.replace('/discover')
      //window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
      //history.go(-1);
    },
    goto(path) {
      this.$router.push({ path: path });
    },
  }, 
  activated () {   
    
  },
  beforeRouteEnter: (to, from, next) => {
    //console.log(from)
    next(vm => {
      // 通过 `vm` 访问组件实例
      //console.log(from.path)
      const lastPathArr = ['/home', '/quote', '/match', '/discover', '/trade']
      if(lastPathArr.includes(from.path)){        
        vm.lastPath = from.path
      }
  })
    // ...
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common.scss";
#tools {
  width: 7.5rem;
  background-color: $bgPink;
  overflow: hidden;
}

.tools_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.08rem;
  .tools_item{
    flex: 1;
    height: 11.4rem;
    h3{
      @include font($fs36,2.36rem,#008aa6);
      font-weight: bold;
    }
    .wathet{
      color: #006bbb;
    }
    .blue{
      color: #003cb6;
    }
    .icon{
      display: block;
      margin: 1rem auto 0;
      width: 0.88rem;
      height: 0.88rem;
      background-color: #b41b02;
    }
    p{
      @include font($fs28,1.14rem,#333);
    }

  }
  @for $i from 1 through 3 {
    $background_img: (
      "jisuanqi",
      "heyuechaxun",
      "jiagejisuan",
    );
    .tools_item:nth-child(#{$i}) {
        $img: nth($background_img, $i);
        //background: url("../../assets/images/tools/#{$img}_bg.jpg") center no-repeat;
        background-size: cover;
        .icon{
         // background: url("../../assets/images/tools/#{$img}_icon.png") center no-repeat;
          background-size: cover;
        }
      
    }
  }
}
.iframe1{
  width: 100%;
  padding-top: 0.2rem;
  //overflow: scroll;
  //-webkit-overflow-scrolling: touch;
  iframe{
    width: 1px;
    min-width: 100%;
    
  }
}  
.warp1{
  margin-top: 1.08rem;
}
</style>
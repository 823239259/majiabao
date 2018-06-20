<template>
    <div id="tools" :style="{height:clientHeight}">
         <mt-header fixed title="工具箱">           
            <mt-button slot="left"  @click="callCustomer">客服</mt-button>
            <mt-button slot="right" @click="shareSystem">分享</mt-button>
        </mt-header>
        <div class="scroll_x">
             <!-- <div class="tools_item" v-for="(item, index) in toolsList" :key="item.id" @click="goto(item.path)">
                <h3 :class="index ==">{{item.title}}</h3>
                <span class="icon icon1"></span>
                <p>{{item.name}}</p>
              </div> -->
            <ul class="tools_wrap">
                <li class="tools_item" @click="goto('/tools_item/1')">
                <h3>币种计算</h3>
                <span class="icon icon1"></span>
                <p>汇率计算</p>
              </li>
              <li class="tools_item" @click="goto('/tools_item/2')">
                <h3 class="wathet">规则查询</h3>
                <span class="icon icon2"></span>
                <p>期货合约查询</p>
              </li>
              <li class="tools_item" @click="goto('/tools_item/3')">
                <h3 class="blue">价格计算</h3>
                <span class="icon icon3"></span>
                <p>期货价格计算</p>
              </li>
              <li class="tools_item" @click="goto('/classRoom')">
                <h3 class="cyan">教学视频</h3>
                <span class="icon icon3"></span>
                <p>期货视频</p>
              </li>
            </ul>
            
        </div>
        <bottomTab :tabSelect="tabSelected"></bottomTab>
         <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
                </mt-actionsheet>
    </div>
</template>

<script>

import {mapMutations} from 'vuex'
import bottomTab from '../components/bottom_tab'
import pro from '../assets/js/common'
const local = pro.local;
export default {
  name: "tools",
  components: {
    bottomTab
  },
  mixins:[pro.mixinsToCustomer],
  data() {
    return {
      tabSelected: 'tools',
      isLogin: false,
      isShow: false,
      userInfo: {},
      lastPath: '/',
      userList: [],
      toolsList: [{
        title: '币种计算',
        name: '汇率计算',
        id: 1,
        path: '/tools_item/1'
      },
      {
        title: '规则查询',
        name: '期货合约查询',
        id: 2,
        path: '/tools_item/2'
      },
      {
        title: '价格计算',
        name: '期货价格计算',
        id: 3,
        path: '/tools_item/3'
      }]
    };
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
    allMoney () {
      if(this.accountInfo.balance &&this.accountInfo.freeze) {
       return (this.accountInfo.balance*1 + this.accountInfo.freeze*1).toString();
      }
    },
    accountInfo () {
      return this.$store.state.accountInfo;
    },
    isNew () {
        return this.$store.state.newsList.some(item => item.isRead == false)
    }
  },
  methods: {
    ...mapMutations({
      setAccountInfo: 'ACCOUNT_INFO',
      clearUserInfo: 'INFO_CLEAR',
    }),
    
    goLast() {
      this.$router.push(this.lastPath);
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
@import "../assets/css/common.scss";
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
  width: 133%;
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
    .cyan{
      color: #0091b5
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
  @for $i from 1 through 4 {
    $background_img: (
      "jisuanqi",
      "heyuechaxun",
      "jiagejisuan",
      "shipin"
    );
    .tools_item:nth-child(#{$i}) {
        $img: nth($background_img, $i);
        background: url("../assets/images/tools/#{$img}_bg.jpg") center no-repeat;
        background-size: cover;
        .icon{
          background: url("../assets/images/tools/#{$img}_icon.png") center no-repeat;
          background-size: cover;
        }
      
    }
  }
}
</style>
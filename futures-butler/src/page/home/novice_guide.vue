
<template>
    <div id="novice_guide" :style="{height:clientHeight}">
        <mt-header fixed title="新手指南">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        <div class="guide_wrap">
            <div class="wrap_box">
                <div class="center">
                    <span class="bg_icon"></span>
                    <p>管家小助手</p>
                    <p>为您排忧解难</p>
                </div>
                <div class="left_top" @click="goto('guide_details/1')">
                  <span>1</span>
                </div>
                <div class="right_top">
                  <span>2</span>
                </div>
                <div class="left_bottom">
                    <span>3</span>
                </div>
                <div class="right_bottom">
                  <span>4</span>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>

import {mapMutations} from 'vuex'
import pro from '../../assets/js/common'
const local = pro.local;
export default {
  name: "novice_guide",
  data() {
    return {
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
        
    },
   
       
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
      
    },

  activated () {   
    
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common.scss";
#novice_guide{
  //position: relative;
  width: 7.5rem;
  background-color: $bgButler;
  padding-top: 0.96rem;
  
}
.wrap_box{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 6.02rem;
  height: 6.02rem;
	background-color: #e5f9f6;
}
.center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
  
  
}
.bg_icon{
  display: block;
  width: 2.3rem;
	height: 2.31rem;
  margin-bottom: 0.2rem;
	background: #169781 url('../../assets/images/home/zhinan_bg.png') center no-repeat;
  background-size: 1.16rem  1.89rem;
  border-radius: 100%;

}
p{
  @include font($fs36,0.48rem,$blackNormal)
}
.left_top,.right_top,.left_bottom,.right_bottom{
  position: absolute;
  width: 3rem;
  height: 3rem;
  &::before{
    display: block;
    content: '';
    width: 0;
    height: 0;
    border: 1.5rem transparent solid;
  }
   span{
    position: absolute;
    @include font($fs64,0.64rem,$white);
  }
}
.left_top{
  left: 0;
  top: 0;
  &::before{
    border-left-color: #f79646;
    border-top-color: #f79646;
  }
  span{
    left: 0.87rem;
    top: 0.6rem;
  }
}
.right_top{
  right: 0;
  top: 0;
  &::before{
    border-right-color: #d99694;
    border-top-color: #d99694;
  }
  span{
    right: 0.87rem;
    top: 0.6rem;
  }
}
.left_bottom{
  left: 0;
  bottom: 0;
  &::before{
    border-left-color: #93cddd;
    border-bottom-color: #93cddd;
  }
  span{
    left: 0.87rem;
    bottom: 0.6rem;
  }
}
.right_bottom{
  right: 0;
  bottom: 0;
  &::before{
    border-right-color: #9bbb59;
    border-bottom-color: #9bbb59;
  }
  span{
    right: 0.87rem;
    bottom: 0.6rem;
  }
}
</style>
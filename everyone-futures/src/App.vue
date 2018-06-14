<template>
  <div id="app">
       <transition  :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <keep-alive>
          <router-view  v-if="!$route.meta.notKeepAlive"></router-view>
        </keep-alive>
     </transition>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view  v-if="$route.meta.notKeepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from "vue"
import pro from './assets/js/common'
export default {
  name: 'App',
  computed:{
      ...mapState(['direction'])
    },
}
</script>

<style lang="scss" scoped>
@import "./assets/css/common.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 7.5rem;
	width: 7.5rem;
	height: auto;
	//overflow: hidden;
	background: $bg;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: transform 500ms;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
body {
  background-color: #fbf9fe;
}
</style>

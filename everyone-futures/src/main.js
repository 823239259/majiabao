// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import axios from 'axios'
import 'babel-polyfill'
Vue.prototype.$http = axios
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import "./assets/css/my-mint.scss";
import router from './router'
import store from './store'
import pro from './assets/js/common'

/* 
  用于区分打包 及开发时的依赖 begin

*/
if (process.env.NODE_ENV === 'development') {
  Vue.use(Mint);
  require('mint-ui/lib/style.css')
}
/* 
  用于区分打包 及开发时的依赖 end

*/


















Vue.prototype.$pro = pro;
const history = window.sessionStorage;
let historyCount = history.getItem('count') * 1;
router.beforeEach(function (to, from, next) {

  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    } else {
      store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1];
    window.location.href = `http${url}`
  } else {
    next()
  }
});
//const shouldUseTransition = !/transition=none/.test(location.href)
FastClick.attach(document.body)
Vue.directive('isShow', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,binding) {
    // 聚焦元素
    let offset = 0,
    animateClass = ['animated', 'fadeInRight'];
    var parent = document.querySelector(binding.value);


    //console.log(binding.value)
    //是否在屏幕上
    var _inView = function(el) {
        var coords = el.getBoundingClientRect();
        if (coords.top == 0) return false;
        return ((coords.top >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
    }; 
    // 监听函数
    function isOnScreen(e) {
      clearTimeout(timer);
      var timer;
      timer = setTimeout(function(){
          if(_inView(el)){
            el.classList.add(...animateClass)
            el.style.opacity = 1;
            parent.removeEventListener('scroll',isOnScreen)
          }else{
            return
          }
      }.bind(this),20)
      
    }
    //未出现在屏幕上,加上监听
    
    if(!_inView(el)){
      el.style.opacity = 0;
      //console.log(123)
      parent.addEventListener('scroll',isOnScreen)
    }else{
      //console.log(1232)
    }
    
  }
})


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})


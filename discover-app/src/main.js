// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import fastClick from 'fastclick'
import Mint from 'mint-ui';
import "./assets/css/my-mint.scss";
import pro from './assets/js/common';
Vue.use(Mint);
//import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$pro = pro;
fastClick.attach(document.body)
//Vue.use(Toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

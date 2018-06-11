// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import fastClick from 'fastclick'
import store from './store'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.baseURL = process.env.API_HOST1;
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
axios.interceptors.response.use((res) =>{
    if(res.data.status === 'ok'){
        return res.data;      
    }
    return Promise.reject(res);
}, (error) => {
    return Promise.reject(error);
});

import { Toast, Button  } from 'mint-ui'
//import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.prototype.$axios = axios
Vue.prototype.$toast = Toast


Vue.component('test-button', Button)
//Vue.use(Toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

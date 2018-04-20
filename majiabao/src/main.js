// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index.1'
import qs from 'qs'
import mint from 'mint-ui'
import './assets/css/my-mint.scss'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = process.env.API_HOST1;
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
axios.interceptors.response.use((res) =>{
    if(res.data.msg === 'success'){
        return res;      
    }
    return Promise.reject(res);
}, (error) => {
    return Promise.reject(error);
});

//import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.use(mint)


//Vue.use(Toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

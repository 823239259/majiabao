import Vue from 'vue'
import Router from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(Router)
Vue.use(VueQuillEditor)
const load = (...p)=>resolve => require([`@/${p[1]||'page'}/${p[0]}.vue`], resolve);
const router = new Router({
  //mode: 'history',
  routes:[
  	{
      path: '/',
      redirect:{
      	name:"tools"
      }
    },
    {
    	path:"/quote",
    	name:"quote",
    	component:load('quote')
    },
    {
      path: '/my',
      name: 'my',
   		component: load('my')
    },
    {
      path: '/tools',
      name: 'tools',
   		component: load('tools')
    },
    {
      path: '/datas',
      name: 'datas',
   		component: load('datas')
    },
  ],

})

export default router

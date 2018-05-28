import Vue from 'vue'
import Router from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(Router)
Vue.use(VueQuillEditor)
const load = (...p)=>resolve => require([`@/${p[1]||'pages'}/${p[0]}.vue`], resolve);

const router = new Router({
  //mode: 'history',
  routes: [ 
    {
      path: '/',
      redirect:{
      	name:"discover"
      }
    },
    {
      path: '/discover',
      name: 'discover',
      component: load('discover'),
    },
    /* discover页面的路由配置 begin */
    {
      path:"/discoverSearch",
    	name:"discoverSearch",
    	component:load("discover/discover_search")
    },
    {
      path:"/importantDetails",
    	name:"importantDetails",
    	component:load("discover/importantDetails")
    },
    /* discover页面的路由配置 end */
    {
      path:"/test",
    	name:"test",
    	component:load("discover/calendarNews")
    }
  ]
})
export default router
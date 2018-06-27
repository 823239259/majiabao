import Vue from 'vue'
import Router from 'vue-router'
import VueQuillEditor from 'vue-quill-editor'
//Vue.use(Router)
if (process.env.NODE_ENV === 'development') {
  Vue.use(Router)
}


Vue.use(VueQuillEditor)
const load = (...p)=>resolve => require([`@/${p[1]||'page'}/${p[0]}.vue`], resolve);
const router = new Router({
  //mode: 'history',
  routes:[
  	{
      path: '/',
      redirect:{
      	name:"home"
      }
    },
    {
    	path:"/home",
    	name:"home",
    	component:load('home')
    },
    {
    	path:"/butler",
    	name:"butler",
    	component:load('butler')
    },

    /* home 内页 */
    {
    	path:"/novice_guide",
    	name:"novice_guide",
    	component:load('home/novice_guide')
    },
    {
    	path:"/guide_details/:id",
    	name:"guide_details",
      component:load('home/guide_details'),
      props: true
    },
     {
    	path:"/butler_welfare",
    	name:"butler_welfare",
    	component:load('home/butler_welfare')
    },
    {
    	path:"/welfare_details/:id",
    	name:"welfare_details",
      component:load('home/welfare_details'),
      props: true
    },
    {
    	path:"/butler_community",
    	name:"butler_community",
    	component:load('home/butler_community')
    },
    {
    	path:"/recommend/:id",
    	name:"recommend",
      component:load('home/recommend'),
      props: true
    },
    {
    	path:"/list_details/:id",
    	name:"list_details",
      component:load('home/list_details'),
      props: true
    },
    /* butler 内页 */
    {
    	path:"/rumen_list/:id",
    	name:"rumen_list",
      component:load('butler/rumen_list'),
      props: true
    },
    {
    	path:"/rumen_details/:id",
    	name:"rumen_details",
      component:load('butler/rumen_details'),
      props: true
    },
    {
    	path:"/knowledge/:id",
    	name:"knowledge",
      component:load('butler/knowledge'),
      props: true
    },
    {
    	path:"/tools_item/:id",
    	name:"tools_item",
      component:load('butler/tools_item'),
      props: true
    },
    {
    	path:"/discover7x24",
      name:"discover7x24",
      meta: {
        notKeepAlive: true
      },
    	component:load('butler/discover7x24')
    },
    /* my 内页 */
    {
    	path:"/about_us",
    	name:"about_us",
    	component:load('account/my/about_us')
    },
    {
    	path:"/tell_us",
    	name:"tell_us",
    	component:load('account/my/tell_us')
    },
    {
    	path:"/my_collection",
    	name:"my_collection",
    	component:load('account/my/my_collection')
    },
    /* contract_search */
    {
    	path:"/contract_item/:id",
    	name:"contract_item",
      component:load('contract_search/contract_item'),
      props: true
    },
    {
    	path:"/contract_search",
    	name:"contract_search",
    	component:load('contract_search/search')
    },
    /* exchange_calculator */
    {
    	path:"/exchange_calc",
    	name:"exchange_calc",
    	component:load('exchange_calculator/exchange_calc')
    },
    /* futures_calculator */
    {
    	path:"/futures_calc",
    	name:"futures_calc",
    	component:load('futures_calculator/futures_calc')
    },
    {
    	path:"/pta",
    	name:"PTA",
    	component:load('futures_calculator/PTA')
    },
    {
    	path:"/corn",
    	name:"corn",
    	component:load('futures_calculator/corn')
    },
    {
    	path:"/wheat",
    	name:"wheat",
    	component:load('futures_calculator/corn')
    },
    {
    	path:"/other",
    	name:"other",
    	component:load('futures_calculator/other')
    },
    { 
      path: '/gold/:id', 
      name: 'silver',
      component: load('futures_calculator/gold'),
      props: true
    },
    



    {
    	path:"/quote",
    	name:"quote",
    	component:load('quote')
    },
    {
    	path:'/quoteDetails',
    	name:'quoteDetails',
    	component:load('quote/quoteDetails')
    },
    {
      path: '/my',
      name: 'my',
   		component: load('my')
    },
  
    
    {
      path: '/login',
      name: 'login',
   		component: load('account/login/login')
    },
    {
      path: '/service_online',
      name: 'service_online',
      component: load('account/my/service_online')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: load('account/my/feedback')
    },
    {
      path: '/news_info',
      name: 'news_info',
      component: load('account/my/news_info')
    },
    {
      path: '/news_info_details/:id',
      component: load('account/my/news_info_details'),
      props:true
    },
    {
      path: '/help_info',
      component: load('account/my/help_info'),
    },
    {
      path: '/help_info_details/:id',
      component: load('account/my/help_info_details'),
      props:true
    },
    {
      path: '/service_online',
      name: 'service_online',
      component: load('account/my/service_online')
    },
    {
      path: '/register',
      name: 'register',
      component: load('account/login/register')
    },{
      path: '/WXregister',
      name: 'WXregister',
     component: load('account/login/WXregister')
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: load('account/login/forgetPassword')
    },
     {
      path: '/resetPassword',
      name: 'resetPassword',
     component: load('account/login/resetPassword')
    },
    {
      path: '/userRegistrationProtocol',
      name: 'userRegistrationProtocol',
     component: load('account/login/userRegistrationProtocol')
    },
    {
      path: '/tools_item/:id',
      name: 'toolsItem',
      component: load('tools/tools_item'),
      props: true
    },
    /* 
      v1.20 ����
    */
   {
      path: '/classRoom',
      name: 'classRoom',
      component: load('tools/classRoom')
    },
    {
    	path:'/type',
    	name:'type',
    	component:load('quote/type')
    },
    {
    	path:'/search',
    	name:'search',
    	component:load('quote/search')
    }
  ],

})

export default router

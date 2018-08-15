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
      	name:"kline"
      }
    },
    {
    	path:"/fensline",
    	name:"fensline",
    	component:load('fensline')
    },
    {
    	path:"/barline",
    	name:"barline",
    	component:load('barline')
    },
    {
    	path:"/lightline",
    	name:"lightline",
    	component:load('lightline')
    },
 		{
    	path:"/selefChoose",
    	name:"selefChoose",
    	component:load('selefChoose')
    },
    /* home 内页 */
    {
    	path:"/news_details/:id",
    	name:"news_details",
      component:load('home/news_details'),
      props: true
    },
    {
    	path:"/home_search",
    	name:"home_search",
    	component:load('home/home_search')
    },
    {
    	path:"/list/:id",
    	name:"list",
      component:load('home/list'),
      props: true
    },
    {
    	path:"/list_details/:id",
    	name:"list_details",
      component:load('home/list_details'),
      props: true
    },
    {
    	path:"/activity_list",
    	name:"activity_list",
      component:load('home/activity_list'),
    },
    {
    	path:"/activity_details/:id",
    	name:"activity_details",
      component:load('home/activity_details'),
      props: true
    },
    /* discover 内页 */
    {
    	path:"/tools_item/:id",
    	name:"tools_item",
      component:load('discover/tools_item'),
      props: true
    },
    {
    	path:"/class_room",
    	name:"class_room",
      component:load('discover/classRoom'),
      props: true
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
    	path:"/service_online",
    	name:"service_online",
    	component:load('account/my/service_online')
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
    	path:"/teach",
    	name:"teach",
    	component:load('account/my/teach')
    },

    {
    	path:"/focusNews",
    	name:"focusNews",
    	component:load('datas/focusNews')
    },
    {
    	path:"/kline",
    	name:"kline",
    	component:load('kline')
    },
    {
    	path:"/klineDetails",
    	name:'klineDetails',
    	component:load('quote/klineDetails')
    },
    {
    	path:"/barlineDetails",
    	name:'barlineDetails',
    	component:load('quote/barlineDetails')
    },
    {
    	path:"/fenslineDetails",
    	name:'fenslineDetails',
    	component:load('quote/fenslineDetails')
    },
    {
    	path:"/lightDetails",
    	name:'lightDetails',
    	component:load('quote/lightDetails')
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

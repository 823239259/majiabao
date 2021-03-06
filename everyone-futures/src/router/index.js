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
      	name:"quote"
      }
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
      path: '/tools',
      name: 'tools',
   		component: load('tools')
    },
    {
      path: '/datas',
      name: 'datas',
      component: load('datas'),
    
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
      path: '/strategy',
      name: 'strategy',
      component: load('strategy')
    },
	{
   	path:"/backProbe",
   	name:"backProbe",
   	component:load('quote/backProbe')
   },
   {
   	path:'/backPresentation',
   	name:'backPresentation',
   	component:load('quote/backPresentation')
   }
  ],

})

export default router

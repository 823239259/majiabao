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
  routes: [
    // golden-cheetah
    {
      path: "/",
      redirect:'home'
      //   {
      //   name: "quote"
      // }
    },
    {
      path: "/more",
      name: "more",
      component: load("more")
    },
    {
      path: "/chat-room",
      name: "ChatRoom",
      component: load("ChatRoom")
    },
    {
      path: "/contrast",
      name: "Contrast",
      component: load("contrast")
    },
    {
      path: "/home",
      name: "Home",
      component: load("home")
    },
    {
      path: "/back-test",
      name: "BackTest",
      component: load("BackTest")
    },
    // 对比页面更多数据入口
    {
      path: "/contrast_more_data",
      name: "ContrastMoreData",
      component: load('account/components/contrast_more')
    },
    //对比页面合约介绍入口
    {
      path: "/agreement",
      name: "Agreement",
      component: load('account/components/agreement')
    },
    // 新闻详情页入口
    {
      path: "/new_son",
      name: "NewSon",
      component: load('account/components/new_son')
    },




    // 原油router 无用
    {
      path: "/oil_online",
      name: "oil_online",
      component: load("oil_online")
    },
    {
      path: "/quote_strategy",
      name: "quote_strategy",
      component: load("quote_strategy"),
      meta:{
        notKeepAlive: true
      }
    },
    {
      path: "/quote",
      name: "quote",
      component: load("quote"),
      meta: {
        notKeepAlive: true
      }
    },
    {
      path: "/strategy",
      name: "strategy",
      component: load("strategy")
    },
    /* strategy 内页 begin */
   {
     path: "/backProbe",
     name: "backProbe",
     component: load('strategy/backProbe')
   },
    {
     path: '/backPresentation',
     name: 'backPresentation',
     component: load('strategy/backPresentation')
   },
    /* strategy 内页 end */


    /* quote 内页 begin */
    {
      path: "/recommend/:id",
      name: "recommend",
      component: load("quote/recommend"),
      props: true
    },
    /* quote 内页 end */

    /* oil_online 内页 begin */
    {
      path: "/oil_online_details/:id",
      name: "oil_online_details",
      component: load("oil_online/oil_online_details"),
      props: true
    },
    /* oil_online 内页 end */

    /* my 内页 begin */
    {
      path: "/about_us",
      name: "about_us",
      component: load("account/my/about_us")
    },
    {
      path: "/tell_us",
      name: "tell_us",
      component: load("account/my/tell_us")
    },
    {
      path: "/activity_list",
      name: "activity_list",
      component: load("account/my/activity_list")
    },
    {
      path: "/activity_details/:id",
      name: "activity_details",
      component: load("account/my/activity_details"),
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: load('account/login/login')
    },
    {
      path: '/register',
      name: 'register',
      component: load('account/login/register')
    },
    /* my 内页 end */

    /* 组件工具集 begin */

    /* contract_search */
    {
      path: "/contract_item/:id",
      name: "contract_item",
      component: load("contract_search/contract_item"),
      props: true
    },
    {
      path: "/contract_search",
      name: "contract_search",
      component: load("contract_search/search")
    },
    /* exchange_calculator */
    {
      path: "/exchange_calc",
      name: "exchange_calc",
      component: load("exchange_calculator/exchange_calc")
    },
    /* futures_calculator begin */
    {
      path: "/futures_calc",
      name: "futures_calc",
      component: load("futures_calculator/futures_calc")
    },
    {
      path: "/pta",
      name: "PTA",
      component: load("futures_calculator/PTA")
    },
    {
      path: "/corn",
      name: "corn",
      component: load("futures_calculator/corn")
    },
    {
      path: "/wheat",
      name: "wheat",
      component: load("futures_calculator/corn")
    },
    {
      path: "/other",
      name: "other",
      component: load("futures_calculator/other")
    },
    {
      path: "/gold/:id",
      name: "silver",
      component: load("futures_calculator/gold"),
      props: true
    },
    /* futures_calculator  end*/
    /* 组件工具集 end */
  ]
});

export default router

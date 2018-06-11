import Vue from 'vue'
import Router from 'vue-router'

import Search  from '@/pages/search'
import kDetails  from '@/pages/k-details'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    { 
      path: '/kDetails/:id', 
      name: 'kDetails',
      component: kDetails,
      props:true,
    },
    {
      path: '/',
      name: 'Search',
      component: Search
    },
  ]
})

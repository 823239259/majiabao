import Vue from 'vue'
import Router from 'vue-router'

import Search  from '@/pages/search'
import contractDetails  from '@/pages/contract-item'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    
    { 
      path: '/contract-item/:id', 
      name: 'contractDetails',
      component: contractDetails,
      props:true,
    },
    {
      path: '/',
      name: 'Search',
      component: Search
    },
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

import index  from '@/pages/index'
import gold  from '@/components/gold'
import corn  from '@/components/corn'
import PTA  from '@/components/PTA'
import other  from '@/components/other'


Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [ 
    { 
      path: '/pta', 
      name: 'PTA',
      component: PTA,
    },  
    { 
      path: '/corn', 
      name: 'corn',
      component: corn,
    },
    { 
      path: '/wheat', 
      name: 'wheat',
      component: corn,
    },
    { 
      path: '/other', 
      name: 'other',
      component: other,
    },
    { 
      path: '/:id', 
      name: 'silver',
      component: gold,
      props: true
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
  ]
})

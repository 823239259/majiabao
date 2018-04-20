import Vue from 'vue'
import Router from 'vue-router'
import index  from '@/pages/index'
import information_item  from '@/pages/informations/information_item'
import quotation  from '@/pages/quotation'
import classRoom  from '@/pages/class_room'
import room_item from '@/pages/class_room/room_item'
import information from '@/pages/information'
import my from '@/pages/my'
import about_us from '@/pages/my/about_us'
import news from '@/pages/my/news'
import basic from '@/pages/my/basic'
import tell_us from '@/pages/my/tell_us'
Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    
    // { 
    //   path: '/contract-item/:id', 
    //   name: 'contractDetails',
    //   component: contractDetails,
    //   props:true,
    // },
    {
      path: '/',
      component: index
    },
    {
      path: '/information_item',
      name: 'information_item',
      component: information_item
    },
    {
      path: '/quotation',
      name: 'quotation',
      component: quotation
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/information',
      name: 'information',
      component: information,
    },
    {
      path: '/classroom',
      name: 'classRoom',
      component: classRoom,
    },
    {
      path: '/help/:name',
      component: room_item,
      props: true,
    },
    {
      path: '/my',
      name: 'my',
      component: my,
    },
    {
      path: '/about_us',
      name: 'about_us',
      component: about_us,
    },
    {
      path: '/news',
      name: 'news',
      component: news,
    },
    {
      path: '/basic',
      name: 'basic',
      component: basic,
    },
    {
      path: '/tell_us',
      name: 'tell_us',
      component: tell_us,
    },

  ]
})

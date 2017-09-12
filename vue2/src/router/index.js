import Vue from 'vue'
import Router from 'vue-router'
import Hi from '@/components/Hi'
import Hi1 from '@/components/hi1'
import Hi2 from '@/components/hi2'
import Hi3 from '@/components/hi3'
Vue.use(Router)

export default new Router({
    routes:[{
      path: '/', component: require('../components/pos/pos.vue')
    },{
      path: '/hello', component: require('../components/Hello.vue')
    },{
      path: '/vip', component: require('../components/vip/vip.vue')
    },{
      path: '/shop', component: require('../components/shop/shop.vue')
    },{
      path:'/hi',name:'Hi',
      component:Hi,
      children:[
        {path:'/',component:Hi1},
        {path:'hi1',component:Hi1},
        {path:'hi2',component:Hi2},
        {path:'hi3',component:Hi3}
      ]
    },{
      path:'*',redirect:'/'
    }]
})

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Register from '@/components/Register'
import Suspects from '@/components/Suspects'
import Zones from '@/components/Zones'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/suspects/:status',
      name: 'Suspects',
      component: Suspects
    },
    {
      path: '/zones',
      name: 'Zones',
      component: Zones
    }
  ]
})

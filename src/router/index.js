import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Form from '../views/Form.vue'
import Login from '../views/Login.vue'
import LoginRegister from '../views/LoginRegister.vue'
import AssocieateRegister from '../views/AssocieateRegister.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: List
  },
  {
    path: '/form',
    name: 'form',
    component: Form
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/loginRegister',
    name: 'loginRegister',
    component: LoginRegister
  },{
    path: '/associeateRegister',
    name: 'associeateRegister',
    component: AssocieateRegister
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const isLoggedIn = () => {
  return localStorage.getItem('token')
}

const protectedRoutes = [
  "form",
  "list"
]
router.beforeEach((to, from, next) => {
  const isProtected = protectedRoutes.includes(to.name)
  if(isProtected && !isLoggedIn()){
      next({
          path: '/login'
      })
  }else next()
})

export default router

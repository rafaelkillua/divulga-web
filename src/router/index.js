import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About.vue')
const NewBusiness = () => import('../views/NewBusiness.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cadastrar',
    name: 'NewBusiness',
    component: NewBusiness
  },
  {
    path: '/quem-somos',
    name: 'About',
    component: About
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

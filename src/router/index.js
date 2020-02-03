import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/createCourse',
        component: resolve => require(['../views/CreateCourse.vue'], resolve)
      },
      {
        path: '/selectCourse',
        name: 'selectCourse',
        component: resolve => require(['../views/SelectCourse.vue'], resolve)
      },
      {
        path: '/createLesson',
        name: 'createLesson',
        component: resolve => require(['../views/CreateLesson.vue'], resolve)
      },
      {
        path: '/selectLesson',
        name: 'selectLesson',
        component: resolve => require(['../views/SelectLesson.vue'], resolve)
      },
      {
        path: '/message',
        name: 'message',
        component: resolve => require(['../views/Message.vue'], resolve)
      },
      {
        path: '/contact',
        name: 'message',
        component: resolve => require(['../views/Contact.vue'], resolve)
      },
      {
        path: '/',
        redirect: '/createCourse'
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/registered',
    name: 'registered',
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/',
    redirect: '/page'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
export default router

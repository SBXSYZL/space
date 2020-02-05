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
        component: resolve => require(['../views/SelectCourse.vue'], resolve)
      },
      {
        path: '/createLesson',
        component: resolve => require(['../views/CreateLesson.vue'], resolve)
      },
      {
        path: '/selectLesson',
        component: resolve => require(['../views/SelectLesson.vue'], resolve)
      },
      {
        path: '/message',
        component: resolve => require(['../views/Message.vue'], resolve)
      },
      {
        path: '/contact',
        component: resolve => require(['../views/Contact.vue'], resolve)
      },
      {
        path: '/uploadFiles',
        component: resolve => require(['../views/UploadFiles.vue'], resolve)
      },
      {
        path: '/documentList',
        component: resolve => require(['../views/DocumentList.vue'], resolve)
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
    path:'/Register',
    name:'Register',
    component: () => import( '../views/Register.vue')
  },
  // {
  //   path:'/documentlist',
  //   name:'documentlist',
  //   component: () => import( '../views/DocumentList.vue')
  // }

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

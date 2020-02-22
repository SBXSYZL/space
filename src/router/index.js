import Vue from 'vue'
import VueRouter from 'vue-router'
import teacherHome from '../views/teacher/Home.vue'
import studentHome from '../views/student/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/teacher',
    name: 'teacherHome',
    component: teacherHome,
    children: [
      {
        path: '/createCourse',
        component: resolve => require(['../views/teacher/CreateCourse.vue'], resolve)
      },
      {
        path: '/selectCourse',
        component: resolve => require(['../views/teacher/SelectCourse.vue'], resolve)
      },
      {
        path: '/createLesson',
        component: resolve => require(['../views/teacher/CreateLesson.vue'], resolve)
      },
      {
        path: '/selectLesson',
        component: resolve => require(['../views/teacher/SelectLesson.vue'], resolve)
      },
      {
        path: '/message',
        component: resolve => require(['../views/teacher/Message.vue'], resolve)
      },
      {
        path: '/contact',
        component: resolve => require(['../views/teacher/Contact.vue'], resolve)
      },
      {
        path: '/uploadFiles',
        component: resolve => require(['../views/teacher/UploadFiles.vue'], resolve)
      },
      {
        path: '/documentList',
        component: resolve => require(['../views/teacher/DocumentList.vue'], resolve)
      },
      {
        path: '/electiveList',
        component: resolve => require(['../views/teacher/ElectiveList.vue'], resolve)
      },
      {
        path: '/submissionsList',
        component: resolve => require(['../views/teacher/SubmissionsList.vue'], resolve)
      },
      {
        path: '/isSend',
        component: resolve => require(['../views/teacher/isSend.vue'], resolve)
      },
      {
        path: '/',
        redirect: '/createCourse'
      }
    ]
  },

  {
    path: '/student',
    name: 'studentHome',
    component: studentHome,
    children: [
      {
        path: '/StuSelectCourse',
        component: resolve => require(['../views/student/SelectCourse.vue'], resolve)
      },
      {
        path: '/StuSelectLesson',
        component: resolve => require(['../views/student/SelectLesson.vue'], resolve)
      },
      {
        path: '/StuMessage',
        component: resolve => require(['../views/student/Message.vue'], resolve)
      },
      {
        path: '/StuContact',
        component: resolve => require(['../views/student/Contact.vue'], resolve)
      },

      {
        path: '/StuIsSend',
        component: resolve => require(['../views/student/isSend.vue'], resolve)
      },
      {
        path: '/StuCourseList',
        component: resolve => require(['../views/student/CourseList.vue'], resolve)
      },
      {
        path: '/StuDocumentList',
        component: resolve => require(['../views/student/DocumentList.vue'], resolve)
      },
      {
        path: '/',
        redirect: '/StuCourseList'
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
    component: () => import( '../views/teacher/Login.vue')
  },
  {
    path:'/Register',
    name:'Register',
    component: () => import( '../views/teacher/Register.vue')
  },
  {
    path:'/test',
    name:'test',
    component: () => import( '../views/test.vue')
  },
  {
    path: '/',
    redirect: '/login'
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

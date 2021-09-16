import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/front/Home.vue'
import VideoPlayer from '../components/front/study/VideoPlayer.vue'
import Practice from '../components/front/study/Practice.vue'
import AdminHome from '../components/admin/AdminHome.vue'
import TeacherHome from '../components/teacher/TeacherHome.vue'
import TeacherCourse from '../components/teacher/course/TeacherCourse.vue'
import VideoDetail from '../components/teacher/course/VideoDetail.vue'
import CourseList from '../components/teacher/course/CourseList.vue'
import CourseInfoStudent from '../components/front/study/index.vue'
import CollectionList from '../components/teacher/question/CollectionList.vue'
import CollectionDetail from '../components/teacher/question/CollectionDetail.vue'
import AddQuestions from '../components/teacher/question/AddQuestions.vue'

import AddPractice from '../components/teacher/course/AddPractice.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Home',
      component: Home
    },
    {
      path: '/study/index',
      name: 'CourseInfoStudent',
      component:CourseInfoStudent
    },
    {
      path: '/study/video',
      name: 'Video',
      component: VideoPlayer
    },
    {
      path: '/practice',
      name: 'Practice',
      component: Practice
    },
    {
      path: '/admin/index',
      name: 'AdminHome',
      component: AdminHome
    },
    {
      path: '/teacher/index',
      name: 'TeacherHome',
      component: TeacherHome
    },
    {
      path: '/teacher/course/detail',
      name: 'TeacherCourseDetail',
      component: TeacherCourse
    },
    {
      path: '/teacher/video/detail',
      name: 'VideoDetail',
      component: VideoDetail
    },
    {
      path: '/teacher/course',
      name: 'TeacherCourseList',
      component: CourseList
    },
    {
      path: '/teacher/collections',
      name: 'TeacherCollections',
      component:CollectionList
    },
    {
      path: '/teacher/collection/detail',
      name: 'CollectionDetail',
      component:CollectionDetail
    },
    {
      path: '/teacher/question/add',
      name: 'AddQuestions',
      component:AddQuestions
    },
    {
      path: '/teacher/practice/add',
      name: 'AddPractice',
      component:AddPractice
    }
  ]
})

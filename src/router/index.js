import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'

Vue.use(Router)

const components = {
  login: () => import('@/views/login'),
  layout:() => import('@/views/layout'),
  index:() => import('@/components/AppMain')
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@/views/login')
    },
    {
      path: '/layout',
      name: 'layout',
      component: components.layout,
      redirect: '/layout/index',
      children: [
        {
          path: 'index',
          name: 'home',
          component: () => import('@/views/index/index')
        },
        {
          path: 'userList',
          name: 'userlist',
          meta: {
            title: '管理员列表'
          },
          component: () => import('@/views/user/list')
        },
        {
          path: 'userAdd',
          name: 'userAdd',
          meta: {
            title: '添加管理员'
          },
          component: () => import('@/views/user/add')
        },
        {
          path: 'userEdit',
          name: 'userEdit',
          meta: {
            title: '编辑信息'
          },
          component: () => import('@/views/user/add')
        },
        {
          path: 'newsList',
          name: 'newsList',
          meta: {
            title: '新闻管理'
          },
          component: () => import('@/views/news/list')
        },
        {
          path: 'newsAdd',
          name: 'newsAdd',
          meta: {
            title: '新闻管理'
          },
          component: () => import('@/views/news/add')
        },
        {
          path: 'swiperList',
          name: 'swiperList',
          meta: {
            title: '轮播图列表'
          },
          component: () => import('@/views/swiper/swiperList')
        },
        {
          path: 'swiperAdd',
          name: 'swiperAdd',
          meta: {
            title: '添加轮播图'
          },
          component: () => import('@/views/swiper/add')
        },
        {
          path: 'swiperEdit',
          name: 'swiperEdit',
          meta: {
            title: '编辑轮播图'
          },
          component: () => import('@/views/swiper/add')
        },
        {
          path: 'topicList',
          name: 'topicList',
          meta: {
            title: '互动主题列表'
          },
          component: () => import('@/views/interactive/list')
        },
        {
          path: 'topicAdd',
          name: 'topicAdd',
          meta: {
            title: '添加互动主题'
          },
          component: () => import('@/views/interactive/Add')
        },
      ]
    }
  ]
})

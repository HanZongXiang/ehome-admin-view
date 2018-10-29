import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import "nprogress/nprogress.css"

Vue.use(Router)

const components = {
  login: () => import('@/views/login'),
  layout:() => import('@/views/layout'),
  index:() => import('@/components/AppMain')
}

let router = new Router({
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
          meta: {
            title: '首页'
          },
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
          path: 'userDetail/:id',
          name: 'userDetail',
          meta: {
            title: '详细信息'
          },
          component: () => import('@/views/user/detail')
        },
        {
          path: 'newsList',
          name: 'newsList',
          meta: {
            title: '新闻列表'
          },
          component: () => import('@/views/news/list')
        },
        {
          path: 'newsAdd',
          name: 'newsAdd',
          meta: {
            title: '新闻添加'
          },
          component: () => import('@/views/news/add')
        },
        {
          path: 'newsDetail/:id',
          name: 'newsDetail',
          meta: {
            title: '新闻详情'
          },
          component: () => import('@/views/news/detail')
        },
        {
          path: 'newsEdit/:id',
          name: 'newsEdit',
          meta: {
            title: '新闻编辑'
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
          component: () => import('@/views/interactive/add')
        },
        {
          path: 'topicEdit/:id',
          name: 'topicEdit',
          meta: {
            title: '编辑主题信息'
          },
          component: () => import('@/views/interactive/edit')
        },
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  Nprogress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to,from) => {
  Nprogress.done()
})
export default router
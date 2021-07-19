import {
  createRouter,
  createWebHistory
} from 'vue-router'

const News = () => import('views/News/News')
const AdminNews = () => import('views/Admin/News/News')
const AdminGov = () => import('views/Admin/Gov/Gov')

const routes = [{
    path: '/',
    redirect: '/news'
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    meta: {
      title: "政府公告-彼思瀚默"
    }
  },
  {
    path: '/admin',
    redirect: '/admin/news'
  },
  {
    path: '/admin/news',
    name: 'AdminNews',
    component: AdminNews,
    meta: {
      title: "管理后台-政府公告-彼思瀚默"
    }
  },
  {
    path: '/admin/gov',
    name: 'AdminGov',
    component: AdminGov,
    meta: {
      title: "管理后台-政府部门-彼思瀚默"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) { //如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})

export default router

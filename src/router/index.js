import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import myLayout from '@/components/Layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },

  {
    path: '/UserLogin',
    component: () => import('@/views/blog/Login/Login'),
    hidden: true
  },

  {
    path: '/UserInfo',
    component: () => import('@/views/blog/User/UserInfo'),
    hidden: true
  },
  {
    path: '/LikeCollect',
    component: () => import('@/views/blog/LikeCollect/LikeCollect'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: myLayout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '博客首页', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/index',
  //   component: () => import('@/views/index/index'),
  //   hidden: false
  // },
  {
    path: '/blog',
    hidden: true,
    component: myLayout,
    redirect: '/blog/DetailShare',
    name: 'Blog',
    meta: { title: 'Blog', icon: 'example' },
    children: [
      {
        path: 'write',
        name: 'write',
        component: () => import('@/views/blog/write/index'),
        meta: { title: 'Blog', icon: 'table' },
        hidden: true
      },
      {
        path: 'DetailShare',
        name: 'DetailShare',
        component: () => import('@/views/blog/query/DetailShare'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'Share',
        name: 'Share',
        component: () => import('@/views/blog/share/Share'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'Friendslink',
        name: 'Friendslink',
        component: () => import('@/views/blog/Friends/Friends'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'Message',
        name: 'Message',
        component: () => import('@/views/blog/Message/Message'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'Aboutme',
        name: 'Aboutme',
        component: () => import('@/views/blog/About/About'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'Login',
        name: 'Login',
        component: () => import('@/views/blog/Login/Login'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/test1',
    name: 'test',
    meta: { title: '常用功能', icon: 'example', roles: ['admin1', 'editor'] },
    children: [
      {
        path: 'test1',
        name: 'test1',
        component: () => import('@/views/test/test1'),
        meta: { title: '新增规则', icon: 'table', roles: ['admin1', 'editor'] }
      },
      {
        path: 'test2',
        name: 'test2',
        component: () => import('@/views/test/test2'),
        meta: { title: '规则查询(含修改、删除）', icon: 'tree', roles: ['admin1', 'editor'] }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    hidden: true,
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外部链接(github)', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

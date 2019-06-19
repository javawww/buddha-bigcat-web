import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  // 自定义菜单配置################################################
  { // 权限管理
    path: '/permissionManage',
    component: Layout,
    children: [
      {
        path: 'systemRoles',
        component: () => import('@/views/permissionManage/systemRoles'),
        name: 'systemRoles',
        meta: { title: '角色管理', icon: 'documentation', affix: true }
      }, {
        path: 'systemResources',
        component: () => import('@/views/permissionManage/systemResources'),
        name: 'systemResources',
        meta: { title: '菜单管理', icon: 'documentation', affix: true }
      },{
        path: 'SystemAdmin',
        component: () => import('@/views/permissionManage/SystemAdmin'),
        name: 'SystemAdmin',
        meta: { title: '管理员列表', icon: 'documentation', affix: true }
      }
    ]
  },
  { // 营销管理
    path: '/marketManage',
    component: Layout,
    children: [
      {
        path: 'bussinessCard',
        component: () => import('@/views/marketManage/bussinessCard'),
        name: 'bussinessCard',
        meta: { title: '个人名片', icon: 'documentation', affix: true }
      }, {
        path: 'websiteDesign',
        component: () => import('@/views/marketManage/websiteDesign'),
        name: 'websiteDesign',
        meta: { title: '官网设计', icon: 'documentation', affix: true }
      }
    ]
  },
  { // 圈子管理
    path: '/CircleManage',
    component: Layout,
    children: [
      {
        path: 'TopicInfo',
        component: () => import('@/views/CircleManage/TopicInfo'),
        name: 'TopicInfo',
        meta: { title: '话题标签', icon: 'documentation', affix: true }
      }
    ]
  },
  { // 会员管理
    path: '/MemberManage',
    component: Layout,
    children: [
      {
        path: 'MemberInfo',
        component: () => import('@/views/MemberManage/MemberInfo'),
        name: 'MemberInfo',
        meta: { title: '会员列表', icon: 'documentation', affix: true }
      },{
        path: 'MemberLogsInfo',
        component: () => import('@/views/MemberManage/MemberLogsInfo'),
        name: 'MemberLogsInfo',
        meta: { title: '日志列表', icon: 'documentation', affix: true }
      }
    ]
  },
  { // 应用管理
    path: '/ApplicationManage',
    component: Layout,
    children: [
      {
        path: 'AppConfigInfo',
        component: () => import('@/views/ApplicationManage/AppConfigInfo'),
        name: 'AppConfigInfo',
        meta: { title: 'APP设置', icon: 'documentation', affix: true }
      },{
        path: 'AppShareInfo',
        component: () => import('@/views/ApplicationManage/AppShareInfo'),
        name: 'AppShareInfo',
        meta: { title: 'APP共享申请', icon: 'documentation', affix: true }
      },{
        path: 'AppShareInfoAudit',
        component: () => import('@/views/ApplicationManage/AppShareInfoAudit'),
        name: 'AppShareInfoAudit',
        meta: { title: 'APP共享审核', icon: 'documentation', affix: true }
      },{
        path: 'MarketCarouselInfo',
        component: () => import('@/views/ApplicationManage/MarketCarouselInfo'),
        name: 'MarketCarouselInfo',
        meta: { title: '轮播图', icon: 'documentation', affix: true }
      },{
        path: 'MarketDynamicInfo',
        component: () => import('@/views/ApplicationManage/MarketDynamicInfo'),
        name: 'MarketDynamicInfo',
        meta: { title: '动态内容', icon: 'documentation', affix: true }
      },{
        path: 'MarketHelpInfo',
        component: () => import('@/views/ApplicationManage/MarketHelpInfo'),
        name: 'MarketHelpInfo',
        meta: { title: '帮助内容', icon: 'documentation', affix: true }
      },{
        path: 'MarketMarqueeInfo',
        component: () => import('@/views/ApplicationManage/MarketMarqueeInfo'),
        name: 'MarketMarqueeInfo',
        meta: { title: '滚动字幕', icon: 'documentation', affix: true }
      },{
        path: 'MarketNewsInfo',
        component: () => import('@/views/ApplicationManage/MarketNewsInfo'),
        name: 'MarketNewsInfo',
        meta: { title: '新闻资讯', icon: 'documentation', affix: true }
      }
    ]
  },
  { // 贷超管理
    path: '/LoanManage',
    component: Layout,
    children: [
      {
        path: 'LoanMarketProduct',
        component: () => import('@/views/LoanManage/LoanMarketProduct'),
        name: 'LoanMarketProduct',
        meta: { title: '贷超产品', icon: 'documentation', affix: true }
      },{
        path: 'LoanApplyProduct',
        component: () => import('@/views/LoanManage/LoanApplyProduct'),
        name: 'LoanApplyProduct',
        meta: { title: '贷超申请', icon: 'documentation', affix: true }
      }
    ]
  },
  { // 在线交流
    path: '/MessageManage',
    component: Layout,
    children: [
      {
        path: 'MessageRoomInfo',
        component: () => import('@/views/MessageManage/MessageRoomInfo'),
        name: 'MessageRoomInfo',
        meta: { title: '进入房间', icon: 'documentation', affix: true }
      }
    ]
  }
  // 自定义菜单配置################################################
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []
export const asyncRoutes2 = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
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

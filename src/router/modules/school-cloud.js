import Layout from '@/layout/index'

/**
 *h5页面比较零碎，麻烦写好页面注释
 * */
export default [
  {
    path: '/school-cloud',
    name: 'school-cloud',
    component: Layout,
    meta: {
      title: '学校云管理',
      icon: 'el-icon-s-tools',
      affix: true,
      breadcrumb: true,
    },
    alwaysShow: true,
    children: [
      {
        path: 'area-manage',
        name: 'area-manage.vue',
        component: () => import('@/views/school-cloud/area-manage.vue'),
        meta: {
          title: '区域管理',
          affix: true,
        },
      },
      {
        path: 'shool-manage',
        name: 'shool-manage',
        component: () => import('@/views/school-cloud/shool-manage.vue'),
        meta: {
          title: '学校管理',
          affix: true,
        },
      },
    ],
  },
]

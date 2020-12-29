import Layout from "@/layout/index";

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
      breadcrumb: false
    },
    alwaysShow: true,
    children: [
      {
        path: 'area-manage',
        name: 'area-manage',
        component: () => import('@/views/school-cloud/area-manage.vue'),
        meta: {
          title: '区域管理',
          affix: true
        }
      },
      {
        path: 'updateArea',
        name: 'updateArea',
        component: () => import('@/views/school-cloud/updateArea.vue'),
        meta: {
          title: '新建区域主页',
          affix: true,
          breadcrumbs:[{path:'/school-cloud/area-manage',title:'区域管理'}],//面包屑部分，面包屑中自动补充dashboard，以及自身，此处填写中间的部分，*注意必须按照顺序填写
          activeMenu:'/school-cloud/area-manage' //菜单激活部分 为区域管理
        },
       hidden:true
      },
      {
        path: 'shool-manage',
        name: 'shool-manage',
        component: () => import('@/views/school-cloud/shool-manage.vue'),
        meta: {
          title: '学校管理',
          affix: true
        },
      },
    ]
  },
];

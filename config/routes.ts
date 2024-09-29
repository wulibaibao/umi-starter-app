export default [
    {
        path: '/',
        exact: true,
        hideInMenu: true,
        component: './Home',
    },
    {
        path: '/login',
        layout: false,
        hideInMenu: true,
        component: './auth/login',
    },
    {
        path: '/register',
        layout: false,
        hideInMenu: true,
        component: './auth/register',
    },
    {
        path: '/access',
        name: '权限',
        component: './Access',
    },
    {
        path: '/table',
        name: '列表',
        component: './Table',
    },
    {
        path: '/404',
        layout: false,
        hideInMenu: true,
        component: './404',
    },
    {
        path: '/*',
        redirect: '/404',
    },
];

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
        path: '/page1',
        name: 'table1',
        component: './Table',
    },
    {
        path: '/page2',
        name: 'table2',
        component: './Table',
    },
    {
        path: '/p',
        name: 'p',
        routes: [
            {
                path: '/p/child1',
                name: 'child1',
                component: './Home/page1',
            },
            {
                path: '/p/child2',
                name: 'child2',
                component: './Home/page2',
            },
        ],
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

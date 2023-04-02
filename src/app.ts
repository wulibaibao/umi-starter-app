import { queryUserInfo } from './services/users/auth';
// 运行时配置
import logo from '@/assets/img/logo.png';
import type { RequestConfig, RuntimeConfig } from '@umijs/max';
import UnAccessible from './pages/UnAccessible';
import ErrorComponent from './pages/ErrorComponent';
import { history } from '@umijs/max';

const fetchUserInfo = async () => {
    const { success, data } = await queryUserInfo();
    if (!success) {
        /* 未登录跳转 */
        history.push(`/login`);
        return undefined;
    }
    return data;
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
const authIgnorePath = ['/login', '/sigup', '/404', '/500', '/403'];

export async function getInitialState(): Promise<any> {
    const { pathname, search } = history.location;
    const baseInitialState = {
        name: 'starter-web',
        fetchUserInfo,
        auth: undefined,
    };
    if (authIgnorePath.includes(pathname)) {
        return baseInitialState;
    }
    try {
        const data = await fetchUserInfo();
        return {
            ...baseInitialState,
            auth: data,
        };
    } catch (err) {
        console.log(err);
    }
    return baseInitialState;
}

export const layout: RuntimeConfig['layout'] | any = (props: { initialState: any }) => {
    const { initialState } = props;
    return {
        logo,
        title: 'starter-web',
        pure: true,
        menu: {
            locale: false,
        },
        unAccessible: UnAccessible,
        ErrorComponent,
        layout: 'top',
        onPageChange: (_props: any) => {
            const { pathname } = _props;
            // 如果没有登录，重定向到 login
            if (!authIgnorePath.includes(pathname) && !initialState?.auth) {
                history.push('/login');
            }
        },
    };
};

export const request: RequestConfig = {
    timeout: 10000,
    // other axios options you want
    errorConfig: {
        errorHandler() {},
        errorThrower() {},
    },
    requestInterceptors: [],
    responseInterceptors: [],
};

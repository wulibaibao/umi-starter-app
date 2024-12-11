import { queryUserInfo } from './services/users/auth';
// 运行时配置
import type { RequestConfig, RuntimeConfig } from '@umijs/max';
import UnAccessible from './pages/UnAccessible';
import ErrorComponent from './pages/ErrorComponent';
import { history } from '@umijs/max';
import { authIgnorePath } from './constants';
import { ConfigProvider } from 'antd';

const fetchUserInfo = async () => {
  const { success, data } = await queryUserInfo();
  if (!success) {
    /* 未登录跳转 */
    if (!location.pathname.includes('/login')) history.push(`/login`);
    return undefined;
  }
  return data;
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export async function getInitialState(): Promise<any> {
  const { pathname, search } = location;
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

export const rootContainer: RuntimeConfig['rootContainer'] = (dom) => {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
      }}
    >
      {dom}
    </ConfigProvider>
  );
};

export const layout: RuntimeConfig['layout'] | any = () => {
  return {
    // logo,
    title: 'starter-web',
    pure: true,
    menu: {
      locale: false,
    },
    UnAccessible: <UnAccessible />,
    ErrorBoundary: <ErrorComponent />,
  };
};

export const onRouteChange: RuntimeConfig['onRouteChange'] = ({ clientRoutes, location }) => {
  // console.log(clientRoutes);
  const { pathname } = location;
  // 如果没有登录，重定向到 login
  /* if (!authIgnorePath.includes(pathname)) {
    history.push('/login');
  } */
  /* const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  if (route) {
    document.title = route.title || '';
  } */
};

export const render: RuntimeConfig['render'] = async (oldRender) => {
  oldRender();
};

export const request: RequestConfig = {
  timeout: 30 * 1000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [],
  responseInterceptors: [],
};

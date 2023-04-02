import { defineConfig } from '@umijs/max';
import routes from './routes';
import proxy from './proxy';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: 'starter-web',
    },
    routes,
    proxy,
    npmClient: 'pnpm',
    tailwindcss: {},
    valtio: {},
    styledComponents: {},
    reactQuery: {},
});

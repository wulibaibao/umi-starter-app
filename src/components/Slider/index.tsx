import React from 'react';
import { Divider, Menu } from 'antd';
import { useAppData, history, useAccess, useMatch, useLocation } from '@umijs/max';
import type { MenuProps } from 'antd';
// import logo from '@/assets/img/logo.png';

const menuIgnorePath = ['/login', '/sigup', '/~demos/:uuid', '/~docs', '/_demos/:uuid'];

const ignorePathFilter = (i: any) => !menuIgnorePath.includes(i.path);
const accessRouteFilter = (i: any) => !i.unaccessible;
const isHideInMenu = (i: any) => i.hideInMenu !== true;
const hideUnLayout = (i: any) => !i.layout;

const filterRouteData = (routes: any) =>
    routes?.filter(ignorePathFilter).filter(hideUnLayout).filter(isHideInMenu).filter(accessRouteFilter);

const SliderComponent: React.FC = () => {
    const appData = useAppData();
    const access = useAccess();
    const { pathname } = useLocation();
    const match = useMatch(pathname);

    const { clientRoutes } = appData;
    const { routes }: any = clientRoutes.filter((p: any) => p.path === '/')?.[0].routes?.[0];

    const baseRoutes = filterRouteData(routes);

    const activeKeys = React.useMemo(() => {
        if (!appData?.routes) return;
        return Object.entries(appData.routes).reduce((pre: any, cur: any) => {
            const [$key, data] = cur;
            const { parentId } = data;
            if (data.path === match?.pathname) return pre.concat($key, parentId);
            return pre;
        }, []);
    }, [appData.routes, match]);

    const [openKeys, setOpenKeys] = React.useState<React.Key[]>([]);

    React.useEffect(() => {
        setOpenKeys(activeKeys);
    }, [activeKeys]);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        setOpenKeys(keys);
    };

    const onClick: MenuProps['onClick'] = (e) => {
        const { path } = appData?.routes[e.key];
        if (path) history.push(path);
    };

    return (
        <div className="h-full w-[241px] p-5 flex flex-col border-r border-r-slate-200 border-solid border-y-transparent border-l-transparent">
            <div className="flex items-center justify-center w-full h-[128px]">
                <img /* src={logo} */ className="inline-block w-[135.5px] h-[60px]" />
            </div>
            <Divider className="m-0" />
            <Menu
                className="!border-0 !border-transparent"
                items={baseRoutes?.reduce((pre: any, cur: any) => {
                    const { routes, parentId, id, name } = cur;
                    const $item: any = {
                        label: name,
                        key: id,
                    };
                    if (routes && routes.length > 0) {
                        const $children = filterRouteData(routes);
                        if ($children.length > 0) {
                            // $item['popupClassName'] = styles['headerMenuPopupCls'];
                            $item['children'] = $children.map((i: any) => ({
                                label: i.name,
                                key: i.id,
                            }));
                            $item['label'] = name;
                        }
                    }
                    return pre.concat($item);
                }, [])}
                mode="inline"
                openKeys={openKeys as any}
                onOpenChange={onOpenChange}
                selectedKeys={activeKeys}
                onClick={onClick}
            />
        </div>
    );
};

export default SliderComponent;

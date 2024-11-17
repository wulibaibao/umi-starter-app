import React from 'react';
import { Divider, Menu } from 'antd';
import { useAppData, history, useAccess, useRouteProps } from '@umijs/max';
import type { MenuProps } from 'antd';
import { filterRouteData } from '@/utils/routes';

const SliderComponent: React.FC = () => {
  const appData = useAppData();
  const routeProps = useRouteProps();
  const access = useAccess();

  const { clientRoutes } = appData;
  const { routes }: any = clientRoutes.filter((p: any) => p.path === '/')?.[0].routes?.[0];

  const baseRoutes = filterRouteData(routes);

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
          const { routes, id, name } = cur;
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
        openKeys={[routeProps?.parentId] as any}
        selectedKeys={[routeProps?.id, routeProps?.parentId]}
        onClick={onClick}
      />
    </div>
  );
};

export default SliderComponent;
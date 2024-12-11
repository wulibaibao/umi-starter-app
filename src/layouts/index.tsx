import { Outlet, useRouteProps, useAppData } from '@umijs/max';
import React from 'react';
import SliderComponent from '@/layouts/components/Slider';
import HeaderComponent from '@/layouts/components/Header';
import clsx from 'clsx';

const baseLayoutClassNames = `fixed h-screen w-screen inset-0`;

const BasicLayout: React.FC = () => {
  const routeProps = useRouteProps();

  // console.log(routeProps);

  return (
    <div className={clsx(baseLayoutClassNames, 'flex flex-col')}>
      {/* <div className="w-full h-14 items-center flex-shrink-0 sticky z-50 top-0 shadow-md">
        <SliderComponent />
      </div> */}
      <div className="flex flex-col w-full h-full">
        <div className="flex-shrink-0 w-full">
          <HeaderComponent />
        </div>
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;

import { Outlet } from '@umijs/max';
import React from 'react';
import SliderComponent from '@/layouts/components/Slider';
import HeaderComponent from '@/layouts/components/Header';
import PageLoading from '@/loading';

const BasicLayout: React.FC = () => {
  return <PageLoading />;
  return (
    <div className="flex flex-row fixed w-full h-[100vh] left-0 right-0 top-0 bottom-0">
      <div className="w-[240px] h-full flex-shrink-0 sticky z-50 top-0 shadow-md">
        <SliderComponent />
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="flex-shrink-0">
          <HeaderComponent />
        </div>
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;

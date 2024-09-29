import { Outlet } from '@umijs/max';
import React from 'react';
import SliderComponent from '@/components/Slider';
import HeaderComponent from '@/components/Header';

const BasicLayout: React.FC = () => {

    return (
        <div className="w-full h-full flex flex-row grow">
            <div className="w-[240px] h-full flex-shrink-0 sticky z-50 top-0 shadow-md">
                <SliderComponent />
            </div>
            <div className="h-full flex flex-col w-full">
                <HeaderComponent />
                <Outlet />
            </div>
        </div>
    );
};

export default BasicLayout;

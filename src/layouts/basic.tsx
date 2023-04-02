import { Outlet } from '@umijs/max';
import React from 'react';
import SliderComponent from '@/components/Slider';
import HeaderComponent from '@/components/Header';

const BasicLayout: React.FC = (props) => {
    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-[240px] h-full">
                <SliderComponent />
            </div>
            <div className="h-full flex flex-col" style={{ width: 'calc(100% - 240px)' }}>
                <HeaderComponent />
                <Outlet />
            </div>
        </div>
    );
};

export default BasicLayout;

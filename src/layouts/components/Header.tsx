import React from 'react';
import { useModel, useAppData } from '@umijs/max';
import { Typography } from 'antd';
import { filterRoutes } from '@/utils/routes';

const HeaderComponent: React.FC = () => {
  const {
    initialState: { auth },
  } = useModel('@@initialState');

  const appData = useAppData();
  const { routes } = appData;

  console.log(filterRoutes(routes));

  return (
    <div className="w-full h-[80px] flex justify-end pr-[60px] shadow-sm items-center bg-white">
      <Typography.Text>{auth?.nickname}</Typography.Text>
    </div>
  );
};

export default HeaderComponent;

import React from 'react';
import { useModel } from '@umijs/max';
import { Typography } from 'antd';

const HeaderComponent: React.FC = () => {
  const {
    initialState: { auth },
  } = useModel('@@initialState');

  return (
    <div className="w-full h-[80px] flex justify-end pr-[60px] shadow-sm items-center">
      <Typography.Text>{auth?.nickname}</Typography.Text>
    </div>
  );
};

export default HeaderComponent;

import React from 'react';
import { useModel } from '@umijs/max';
import { Avatar, Space, Typography } from 'antd';
import { ReactComponent as HeaderMessage } from '@/assets/svg/header_message.svg';
import { ReactComponent as VIP } from '@/assets/svg/VIP.svg';

const HeaderComponent: React.FC = () => {
  const {
    initialState: { auth },
  } = useModel('@@initialState');

  return (
    <div className="w-full h-[80px] flex justify-end pr-[60px] shadow-sm items-center">
      <Space size={34}>
        <HeaderMessage />
        <VIP />
        <Typography.Text>{auth?.nickname}</Typography.Text>
      </Space>
    </div>
  );
};

export default HeaderComponent;
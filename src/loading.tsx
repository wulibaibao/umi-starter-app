import { Spin } from 'antd';
import React from 'react';
import clsx from 'clsx';

const PageLoading: React.FC = () => {
  return (
    <div className={clsx('flex flex-row items-center justify-center fixed left-0 top-0 right-0 bottom-0')}>
      <Spin />
    </div>
  );
};

export default PageLoading;

import { Typography } from 'antd';
import React from 'react';

type ToolbarProps = {
  [k: string]: any;
};

const TableToolbal: React.FC<ToolbarProps> = () => {
  return (
    <div className="flex flex-row gap-4 items-center justify-end">
      <Typography.Link>筛选</Typography.Link>
    </div>
  );
};

export default TableToolbal;

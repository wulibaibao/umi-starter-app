import React from 'react';
import { Table } from 'antd';

const TablePage: React.FC = () => {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'color',
      dataIndex: 'color',
    },
  ];

  return <Table />;
};

export default TablePage;

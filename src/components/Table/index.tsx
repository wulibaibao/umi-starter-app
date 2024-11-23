import React from 'react';
import { Pagination, Table } from 'antd';
import type { PaginationProps, TableProps } from 'antd';
import { useRequest } from '@umijs/max';
import { TableRef } from 'antd/es/table';
import TableFilter from './Filter';
import TableToolbal from './Toolbar';

type CustomProTableProps = {
  tableProps: TableProps & any;
  paginationProps: Partial<PaginationProps>;
  api: (query: any) => any;
};

const DEFAULT_FETCH_QUERY = { page_size: 20, page_num: 1 };

const CustomProTable: React.ForwardRefRenderFunction<any, CustomProTableProps> = (props, ref) => {
  const { tableProps, paginationProps, api } = props;
  const { columns } = tableProps;
  const [fetchQuery, setFethQuery] = React.useState(DEFAULT_FETCH_QUERY);
  const [filterShow, setFilterShow] = React.useState(false);
  const { data, loading, run, refresh } = useRequest(api, { ready: !!api, refreshDeps: [fetchQuery] });
  const tableRef = React.useRef<TableRef>(null);

  React.useImperativeHandle(ref, () => ({
    ...tableRef.current,
    refresh,
    run,
  }));

  const toolbarProps = {
    refresh,
    columns,
    filterShow,
    setFilterShow,
  };

  return (
    <div className="flex flex-col gap-0 w-full">
      <div className="flex-shrink-0 py-5 flex flex-row justify-between">
        <div className=""></div>
        <div className="toolbar">
          <TableToolbal {...toolbarProps} />
        </div>
      </div>

      {filterShow && (
        <div className="flex-shrink-0">
          <TableFilter columns={columns} onOk={(vals: any) => setFethQuery({ ...fetchQuery, ...vals, page_num: 1 })} />
        </div>
      )}

      <div className="h-full w-full gap-5 flex flex-col">
        <div className="w-full h-full">
          <Table
            ref={tableRef}
            dataSource={loading ? [] : data}
            loading={loading}
            rowKey={'id'}
            size="small"
            {...tableProps}
          />
        </div>
        <div className="flex-shrink-0 w-full">
          <Pagination
            onChange={(page_num, page_size) => setFethQuery({ ...fetchQuery, page_num, page_size })}
            {...paginationProps}
          />
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(CustomProTable);

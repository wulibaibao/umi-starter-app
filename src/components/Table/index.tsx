import React from 'react';
import { Pagination, Table, Typography } from 'antd';
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

type IFetchQuery = { data?: any[]; page_size: number; page_num: number; total?: number };

const DEFAULT_FETCH_QUERY: IFetchQuery = {
  page_size: 20,
  page_num: 1,
};

const CustomProTable: React.ForwardRefRenderFunction<any, CustomProTableProps> = (props, ref) => {
  const { tableProps, paginationProps, api } = props;
  const { columns, ...restTableProps } = tableProps;

  const [fetchQuery, setFethQuery] = React.useState(DEFAULT_FETCH_QUERY);
  const [filterShow, setFilterShow] = React.useState(false);

  const tableRef = React.useRef<TableRef>(null);

  const {
    data: dataSource,
    loading,
    run,
    refresh,
  } = useRequest(api, { ready: !!api, refreshDeps: [fetchQuery], debounceInterval: 300 });

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

  const { page_num, page_size, total, data } = dataSource;

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
          <TableFilter
            columns={columns}
            onOk={(vals: any) => setFethQuery((prev) => ({ ...prev, ...vals, page_num: 1 }))}
          />
        </div>
      )}

      <div className="h-full w-full gap-5 flex flex-col">
        <div className="w-full h-full">
          <Table
            ref={tableRef}
            dataSource={data || []}
            columns={(columns || []).map((ctx: any) => ({
              width: 100,
              ellipsis: { showTitle: false },
              render(record: any) {
                return <Typography.Text ellipsis={{ tooltip: true }}>{record || '-'}</Typography.Text>;
              },
              ...ctx,
            }))}
            loading={loading}
            rowKey={'id'}
            size="small"
            pagination={{
              total: total || 0,
              current: page_num,
              pageSize: page_size,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange(page, pageSize) {
                setFethQuery((prev) => ({ ...prev, page_num: page, page_size: pageSize }));
              },
            }}
            {...restTableProps}
          />
        </div>
        <div className="flex-shrink-0 w-full">
          <Pagination
            onChange={(page_num, page_size) => setFethQuery((prev) => ({ ...prev, page_num, page_size }))}
            {...paginationProps}
          />
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(CustomProTable);

import { Input, TableColumnProps, Typography } from 'antd';
import React from 'react';
import { Radio, Select } from 'antd';
import { FilterFilled } from '@ant-design/icons';

const CFilterDom: React.FC = (props) => {
  const { searchType, params, dataIndex, onOk, ...rest } = props;

  const [val, setVal] = React.useState();

  let children: JSX.Element = <Input allowClear />;

  if (searchType === 'select') {
    children = <Select />;
  }

  if (searchType === 'radio') {
    children = <Radio.Group />;
  }

  return (
    <div className="flex flex-col gap-2 divide-y divide-solid divide-black/15 bg-white p-3 rounded">
      {React.createElement(children, {
        value: params?.[dataIndex],
        onChange(val) {
          setVal(val);
        },
        onSearch(val) {
          setVal(val);
        },
        ...rest,
      })}
      <div className="grid grid-cols-2 items-center divide-solid divide-x divide-black/15">
        <div
          className="flex justify-center items-center col-span-1"
          onClick={() => {
            onOk(val);
          }}
        >
          搜索
        </div>
        <div
          className="flex justify-center items-center col-span-1"
          onClick={() => {
            onOk(undefined);
          }}
        >
          重置
        </div>
      </div>
    </div>
  );
};

class ColumnFilters {
  params: Record<string, any>;
  setParams: (val: any) => void;

  constructor(params: Record<string, any>, setParams: any) {
    this.params = params;
    this.setParams = setParams;
  }

  baseProps(props: TableColumnProps<Record<string, any>>) {
    const { dataIndex } = props;
    return {
      ellipsis: {
        showTitle: false,
      },
      filterIcon: <FilterFilled style={{ color: this.params?.[dataIndex] ? '#1890ff' : undefined }} />,
      render(record, row) {
        return <Typography.Text ellipsis={{ tooltip: true }}>{row?.[dataIndex] || '-'}</Typography.Text>;
      },
      ...props,
    };
  }

  getFilterProps(props: TableColumnProps<Record<string, any>>) {
    const { dataIndex, title, ...rest } = props;

    return {
      ...this.baseProps(props),
      filterDropdown: ({ confirm }: any) => (
        <CFilterDom
          {...props}
          params={this.params}
          onOk={(val) => {
            this.setParams((prev) => ({ ...prev, [dataIndex]: val, page_num: 1 }));
          }}
        />
      ),
      ...props,
    };
  }
}

export default ColumnFilters;

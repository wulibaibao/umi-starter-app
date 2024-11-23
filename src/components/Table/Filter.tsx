import { Button, Form, Input, Select } from 'antd';
import type { SelectProps, InputProps } from 'antd/lib';
import React from 'react';

type searchPropsType = Partial<SelectProps> | Partial<InputProps>;

type TableFilterProps = {
  columns: { searchProps?: searchPropsType } & Record<string, any>[];
  onOk: (values: any) => void;
};

const TableFilter: React.FC<TableFilterProps> = (props) => {
  const { columns, onOk } = props;
  const [form] = Form.useForm();

  const handleFilter = async () => {
    const values = await form.validateFields();
    onOk?.(values);
  };

  const handleRest = async () => {
    form.resetFields();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-6 items-center flex-wrap ">
        <Form form={form} layout={'inline'} preserve>
          {columns
            .filter((ctx: any) => 'searchProps' in ctx)
            .map((ctx: any) => {
              const { searchProps } = ctx || {};
              const { searchType } = searchProps || {};
              let children = <Input placeholder={ctx.title} allowClear {...searchProps} />;
              if (searchType === 'select') {
                children = <Select allowClear placeholder={`全部${ctx.title}`} {...searchProps} />;
              }
              return (
                <Form.Item key={ctx.dataIndex} name={ctx.dataIndex} label={ctx.title}>
                  {children}
                </Form.Item>
              );
            })}
        </Form>
      </div>
      <div className="flex justify-end gap-2 items-center">
        <Button type="primary" onClick={() => handleFilter()}>
          过滤
        </Button>
        <Button onClick={handleRest}>重置</Button>
      </div>
    </div>
  );
};

export default TableFilter;

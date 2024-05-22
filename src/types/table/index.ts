import Table from 'antd/es/table/Table';

type EditableTableProps = Parameters<typeof Table>[0];
export type EditableTableColumnTypes = Exclude<
  EditableTableProps['columns'],
  undefined
>;

export type DefaultTableProps = EditableTableColumnTypes[number] & {
  dataIndex: string;
};

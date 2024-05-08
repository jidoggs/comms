import dayjs from 'dayjs';
import { TabsProps } from 'antd/es/tabs';
import TableRowAction from '../components/TableRowAction';
import { mergeClassName } from '@/common/utils';
import { User, BasicTypeSet } from '../types';

export const tabItemList: TabsProps['items'] = [
  {
    key: 'roles-permissions',
    label: 'Roles & Permissions',
  },
  {
    key: 'users',
    label: 'Users',
  },
];

export const personKeys = [
  'full_name',
  'role',
  'email',
  'title',
  'office',
  'parastatal',
  'last_seen',
  'created_at',
  '',
];

export const defaultColumns: {
  dataIndex: string;
}[] = [
  {
    title: 'Person',
    className: '!pl-5',
    dataIndex: '',
    width: 180,
    ellipsis: true,
    render: (_: any, record: User) => {
      return (
        <>
          <span>{`${record?.firstname} ${record?.surname || ''}`}</span>
        </>
      );
    },
  },
  {
    title: 'Role',
    className: 'capitalize',
    dataIndex: 'role',
    ellipsis: true,
    width: 200,
    render: (value: any) => {
      return <>{value?.name.replace(/_/g, ' ')}</>;
    },
  },
  {
    title: 'Email',
    className: '',
    dataIndex: 'email',
    ellipsis: true,
    width: 200,
  },
  {
    title: 'Title',
    className: '',
    dataIndex: 'title',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Office',
    className: '',
    dataIndex: 'office',
    ellipsis: true,
    width: 150,
    render: (value: BasicTypeSet) => {
      return <>{value?.name}</>;
    },
  },
  {
    title: 'Parastatal',
    className: '',
    dataIndex: 'parastatal',
    ellipsis: true,
    width: 150,
    render: (value: BasicTypeSet) => {
      return <>{value?.name}</>;
    },
  },
  {
    title: 'Last active',
    className: '',
    dataIndex: 'last_seen',
    ellipsis: true,
    width: 150,
    render: (value: any) => {
      return <>{dayjs(value).format('DD-MMM-YYYY HH:mm:ss')}</>;
    },
  },
  {
    title: 'Date added',
    className: '',
    dataIndex: 'created_at',
    ellipsis: true,
    width: 80,
    render: (value: any) => {
      return <>{dayjs(value).format('DD-MMM-YYYY')}</>;
    },
  },
  {
    title: 'Date sent',
    className: '',
    dataIndex: 'updated_at',
    ellipsis: true,
    width: 150,
    render: (value: any) => {
      return <>{dayjs(value).format('DD-MMM-YYYY')}</>;
    },
  },
  {
    title: 'Actions',
    className: '!pr-3 !text-center',
    dataIndex: '',
    ellipsis: true,
    width: 150,
    render: (_: any, record: any) => {
      return <TableRowAction data={record} />;
    },
  },
].map((itm) => ({
  ...itm,
  className: mergeClassName('!py-4 text-sm font-medium', itm.className),
}));

export const initialNewRole = { name: '', _id: 0 };

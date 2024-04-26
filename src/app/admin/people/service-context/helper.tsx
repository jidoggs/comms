import { mergeClassName } from '@/common/utils';
import TableRowAction from '../components/TableRowAction';
import { TabsProps } from 'antd';
import { EditableTableColumnTypes } from '../types';

export const defaultColumns: (EditableTableColumnTypes[number] & {
  dataIndex: string;
})[] = [
  {
    title: 'Person',
    className: '!pl-5',
    dataIndex: 'full_name',
    width: 180,
    ellipsis: true,
    render: (value: any) => {
      return (
        <>
          {value ? (
            <div className="flex items-center gap-x-2.5">
              <div className="size-7 rounded-full bg-red-500" />
              <span>{value}</span>
            </div>
          ) : null}
        </>
      );
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
  },
  {
    title: 'Parastatal',
    className: '',
    dataIndex: 'parastatal',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Last active',
    className: '',
    dataIndex: 'last_active',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Date added',
    className: '',
    dataIndex: 'date_created',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Date sent',
    className: '',
    dataIndex: 'date_sent',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Actions',
    className: '!pr-3',
    dataIndex: '',
    ellipsis: true,
    width: 150,
    render: (_: any, __: any, record: any) => {
      return <TableRowAction data={record} />;
    },
  },
].map((itm) => ({
  ...itm,
  className: mergeClassName('!py-4 text-sm font-medium', itm.className),
}));

export const tabItemList: TabsProps['items'] = [
  {
    key: 'pending',
    label: 'Pending onboarding',
  },
  {
    key: 'onboarded',
    label: 'Onboarded',
  },
  {
    key: 'approved',
    label: 'Approved',
  },
  {
    key: 'declined',
    label: 'Declined',
  },
];

export const onboardingKeys = [
  'email',
  'full_name',
  'title',
  'parastatal',
  'date_sent',
  '',
];
export const personKeys = [
  'full_name',
  'email',
  'title',
  'office',
  'parastatal',
  'last_active',
  'date_created',
  '',
];

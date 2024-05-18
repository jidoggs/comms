import dayjs from 'dayjs';
import { mergeClassName } from '@/common/utils';
import TableRowAction from '../components/TableRowAction';
import { TabItemProps } from '@/common/components/CustomTab';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import Profile from '@/common/components/icons/Profile';
import { EditableTableColumnTypes } from '@/types';

export const defaultColumns: (EditableTableColumnTypes[number] & {
  dataIndex: string;
})[] = [
  {
    title: 'Person',
    className: '!pl-5',
    dataIndex: 'fullname',
    width: 180,
    ellipsis: true,
    render: (value: any, record: any) => {
      return (
        <>
          {value ? (
            <div className="flex items-center gap-x-2.5">
              <CustomAvatar
                src={record?.img}
                size={28}
                icon={
                  <span className="flex h-full flex-1 items-center justify-center">
                    <Profile size="22" className="stroke-white" />
                  </span>
                }
              />
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
    render: (record: any) => {
      return <>{record?.name}</>;
    },
  },
  {
    title: 'Parastatal',
    className: '',
    dataIndex: 'parastatal',
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      return <>{record?.name}</>;
    },
  },
  {
    title: 'Last active',
    className: '',
    dataIndex: 'last_seen',
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      return <>{dayjs(record).format('DD-MMM-YYYY')}</>;
    },
  },
  {
    title: 'Date added',
    className: '',
    dataIndex: 'created_at',
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      return <>{dayjs(record).format('DD-MMM-YYYY')}</>;
    },
  },
  {
    title: 'Date sent',
    className: '',
    dataIndex: 'updated_at',
    ellipsis: true,
    width: 150,
    render: (record: any) => {
      return <>{dayjs(record).format('DD-MMM-YYYY')}</>;
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

export const tabItemList: TabItemProps = [
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
  'fullname',
  'title',
  'parastatal',
  'date_sent',
  '',
];
export const personKeys = [
  'fullname',
  'email',
  'title',
  'office',
  'parastatal',
  'last_seen',
  'date_created',
  '',
];

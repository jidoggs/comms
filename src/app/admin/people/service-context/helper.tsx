import dayjs from 'dayjs';
import TableRowAction from '../components/TableRowAction';
import { TabItemProps } from '@/common/components/CustomTab';
import { DefaultTableProps } from '@/types';
import { arrangeColumnsAndFilter, mergeClassName } from '@/common/utils';
import CustomUser from '@/common/components/CustomUser';
import { TabKeysType } from '../types';

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

export const defaultColumns: DefaultTableProps[] = [
  {
    title: 'Person',
    className: '!pl-5',
    dataIndex: 'fullname',
    width: 180,
    ellipsis: true,
    render: (_: any, record: any) => {
      return (
        <>
          {record?.firstname ? (
            <CustomUser
              data={record}
              avatarSize={28}
              className={{
                container: 'px-0',
              }}
            />
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
    dataIndex: 'actions',
    ellipsis: true,
    width: 150,
    render: (_: any, record: any) => {
      return <TableRowAction data={record} />;
    },
  },
];

export const pendingKeys = [
  'email',
  'fullname',
  'title',
  'parastatal',
  'date_sent',
  'actions',
];
export const personKeys = [
  'fullname',
  'email',
  'title',
  'office',
  'parastatal',
  'last_seen',
  'date_created',
  'actions',
];

export const columnHelper = (currentTab: TabKeysType) => {
  const columns = arrangeColumnsAndFilter(
    defaultColumns,
    currentTab === 'pending' ? pendingKeys : personKeys
  );
  return columns.map((itm) => {
    if (currentTab === 'pending' && itm.dataIndex === 'email') {
      return {
        ...itm,
        className: mergeClassName(
          '!py-4 text-sm font-medium !pl-5',
          itm.className
        ),
        render: (value: string) => {
          return (
            <>
              {value ? (
                <CustomUser
                  data={value}
                  avatarSize={28}
                  className={{
                    container: 'px-0',
                  }}
                />
              ) : null}
            </>
          );
        },
      };
    }
    return {
      ...itm,
      className: mergeClassName(
        '!py-4 text-sm font-medium last:!pr-5',
        itm.className
      ),
    };
  });
};

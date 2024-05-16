import CustomUser from '@/common/components/CustomUser';
import Document from '@/common/components/icons/Document';
import { lastRoute, mergeClassName } from '@/common/utils';
import TableRowAction from '../components/TableRowAction';
import { TabItemProps } from '@/common/components/CustomTab';
import { EditableTableColumnTypes } from '@/types';

export const defaultColumns: (EditableTableColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
})[] = [
  {
    title: 'Sender - Who sent it',
    className: '!pl-5',
    dataIndex: 'sender',
    width: 180,
    ellipsis: true,
    editable: true,
  },
  {
    title: 'Recipient (Primary)',
    className: '',
    dataIndex: 'creator',
    ellipsis: true,
    editable: true,
    width: 200,
    render: (value: any) => {
      return <>{value?.firstname ? <CustomUser data={value} /> : null}</>;
    },
  },
  {
    title: 'Subject',
    className: '',
    dataIndex: 'subject',
    ellipsis: true,
    width: 150,
    editable: true,
  },
  {
    title: 'Ref. No',
    className: '',
    dataIndex: 'reference_number',
    ellipsis: true,
    width: 150,
    editable: true,
  },
  {
    title: 'Document',
    className: '',
    dataIndex: 'documents',
    ellipsis: true,
    editable: true,
    width: 330,
    render: (value: string[]) => {
      return (
        <>
          {value.length
            ? value.map((item) => (
                <div key={item} className="flex items-center gap-x-2.5">
                  <Document />
                  <span>{lastRoute(item)}</span>
                </div>
              ))
            : null}
        </>
      );
    },
  },
  {
    title: 'Minute',
    dataIndex: 'minute',
    ellipsis: true,
    editable: true,
    width: 450,
    className: '!text-wrap !max-w-full !break-words',
  },
  {
    title: 'Date of correspondence',
    dataIndex: 'created_at',
    ellipsis: true,
    width: 180,
  },
  {
    title: 'Action',
    className: '!pr-3',
    dataIndex: '',
    ellipsis: true,
    width: 135,
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
    key: 'draft',
    label: 'Draft',
  },
  {
    key: 'archive',
    label: 'Archive',
  },
  {
    key: 'sent',
    label: 'Sent',
  },
];

import CustomTable from '@/common/components/CustomTable';
import React, { useContext } from 'react';
import PageTitle from './components/PageTitle';
import TableActions from './components/TableActions';
import AddCorrespondence from './components/AddCorrespondence';
import {
  EditableCell,
  EditableRow,
} from '../components/EditTable/EditableTable';
import { CorrespondenceContextNew } from './service-context/NewCorrespondenceContext';

function PageContent() {
  const contextInfo = useContext(CorrespondenceContextNew);
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  return (
    <div className="pt-4">
      <CustomTable
        tableTitle={<PageTitle />}
        searchPanel={<TableActions />}
        className={{
          table: 'cursor-pointer',
          tableWrapper: 'h-max [&_.ant-empty-normal]:h-max',
        }}
        columns={contextInfo?.columns}
        components={components}
        dataSource={contextInfo?.dataSource}
        onRow={(row, id) => ({ ...row, id: id?.toString(), help: 'jide' })}
        size="large"
        rowClassName="group"
        rowSelection={{ columnWidth: 56 }}
        footer={() => <AddCorrespondence />}
      />
    </div>
  );
}

export default PageContent;

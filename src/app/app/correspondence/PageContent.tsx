'use client';
import React, { useContext, useState } from 'react';
import CustomTable from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
import TableActions from './components/TableActions';
import {
  EditableCell,
  EditableRow,
} from './components/EditTable/EditableTable';
import { CorrespondeceListContext } from './service-context/CorrespondeceListContextWrapper';
import AddCorrespondence from './components/AddCorrespondence';
import CustomModal from '@/common/components/CustomModal';
import NewCorrespondenceForm from './components/ExpandData/Form';
import { useForm } from 'antd/es/form/Form';
import { messageHandler } from '@/common/utils/notification';
import { useSession } from '@/common/hooks';
import { UploadFile } from 'antd';
import useCorrespondence from '../hooks/useCorrespondence';
import { removeNullOrUndefinedProperties } from '@/common/utils';

const CorrespondencePage = () => {
  const [form] = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [currentCorr, setCurrentCorr] = useState<any>();
  const { data: user } = useSession();
  const parastatalId = user.parastatal?.[0]?._id;
  const contextInfo = useContext(CorrespondeceListContext);
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const { createCorrSwr } = useCorrespondence({
    can_create: true,
  });

  const openModalHandler = () => setOpenModal(true);
  const closeModalHandler = () => setOpenModal(false);
  const correspondenceFormSubmitHandler = async (values: any) => {
    // console.log('values', values);

    // const allCorrespondence = values.correspondences;
    const backendData = removeNullOrUndefinedProperties({
      ...values,
      files: values?.files?.map((item: UploadFile<any>) => item.originFileObj),
      status: 'sent', // Assuming the status for sent correspondences is "sent"
    });
    const data = {
      ...backendData,
      parastatal: parastatalId,
    };
    createCorrSwr
      .trigger({ data })
      .then(() => {
        closeModalHandler();
        form.resetFields();
      })
      .catch((error) => {
        messageHandler('error', error.message);
      });
  };

  // console.log('currentCorr', currentCorr);

  return (
    <div className="pt-4">
      <CustomTable
        tableTitle="Correspondence management"
        tabs={
          <CustomTab
            onChange={contextInfo?.handleTabChange}
            defaultKey={contextInfo?.currentTab}
            items={contextInfo?.tabItemList}
          />
        }
        searchPanel={<TableActions />}
        className={{
          table: 'cursor-pointer',
          tableWrapper:
            'relative h-[calc(100vh-148px)] [&_.ant-table-container]:h-[calc(100vh-199px)] [&_.ant-table-container]:overflow-scroll  [&_.ant-table]:!relative',
        }}
        columns={contextInfo?.columns}
        components={components}
        dataSource={contextInfo?.dataSource}
        loading={contextInfo?.loading}
        onRow={(row, id) => ({
          ...row,
          id: id?.toString(),
          help: 'jide',
          onClick: () => {
            setCurrentCorr(row);
            openModalHandler();
          },
        })}
        size="large"
        rowClassName="group"
        rowSelection={{ columnWidth: 56 }}
        footer={() => {
          if (contextInfo?.currentTab === 'sent') return;
          return <AddCorrespondence />;
        }}
      />
      <CustomModal
        title="Edit correspondence"
        open={openModal}
        onCancel={closeModalHandler}
        width={800}
      >
        <NewCorrespondenceForm
          form={form}
          currentCorr={currentCorr}
          handleSubmit={correspondenceFormSubmitHandler}
        />
      </CustomModal>
    </div>
  );
};

export default CorrespondencePage;

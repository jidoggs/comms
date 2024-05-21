import { useSession } from '@/common/hooks';
import { useRouter } from 'next/navigation';
import React, { forwardRef, useState } from 'react';
import useCorrespondence from '../../hooks/useCorrespondence';
import { UploadFile } from 'antd/lib/upload/interface';
import { messageHandler } from '@/common/utils/notification';
import CustomButton from '@/common/components/CustomButton';
import Plus from '@/common/components/icons/Plus';
import CustomModal from '@/common/components/CustomModal';
import CorrespondenceForms from '../forms/CreateCorrespondence/CorrespondenceForms';
import CorresponcenceCreated from '../forms/CreateCorrespondence/CorresponcenceCreated';
import { useForm } from 'antd/es/form/Form';
import { removeNullOrUndefinedProperties } from '@/common/utils';

interface Props {
  type?: 'full';
  className?: string;
}

export const hasData = (corrData: any) => {
  return (
    corrData?.sender &&
    corrData?.recipient &&
    corrData?.subject &&
    corrData?.reference_number
  );
};

const CreateCorrespondence = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { data: user } = useSession();
    const [form] = useForm();
    const parastatalId = user.parastatal?.[0]?._id;
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const openModalHandler = () => setOpenModal(true);
    const closeModalHandler = () => setOpenModal(false);
    const closeConfirmModalHandler = () => setOpenConfirmModal(false);

    const { createCorrSwr } = useCorrespondence({
      can_create: true,
    });

    const correspondenceFormSubmitHandler = async (values: any) => {
      const allCorrespondence = values.correspondences;
      try {
        const createPromises = allCorrespondence.map(async (eachCorr: any) => {
          const backendData = removeNullOrUndefinedProperties({
            ...eachCorr,
            files: eachCorr?.files?.map(
              (item: UploadFile<any>) => item.originFileObj
            ),
            status: 'sent',
          });
          const data = {
            ...backendData,
            parastatal: parastatalId,
          };

          return createCorrSwr.trigger({ data });
        });

        await Promise.all(createPromises);
        closeModalHandler();
        form.resetFields();
      } catch (error: any) {
        messageHandler(
          'error',
          `Some correspondences failed to create. Error: ${error.message}`
        );
      }
    };

    const handleSaveDraft = async (values: any) => {
      const allCorrespondence = values.correspondences.map((corr: any) => ({
        ...corr,
        status: 'draft',
      }));
      try {
        const draftPromises = allCorrespondence.map(async (eachCorr: any) => {
          const backendData = removeNullOrUndefinedProperties({
            ...eachCorr,
            files: eachCorr?.files?.map(
              (item: UploadFile<any>) => item.originFileObj
            ),
          });
          const data = {
            ...backendData,
            parastatal: parastatalId,
          };

          return createCorrSwr.trigger({ data });
        });
        await Promise.all(draftPromises);
      } catch (error: any) {
        messageHandler(
          'error',
          `Some drafts failed to save. Error: ${error.message}`
        );
      }
    };

    const handleArchive = async () => {
      const values = form.getFieldsValue();
      const allCorrespondence = values.correspondences;

      try {
        const archivePromises = allCorrespondence.map(async (eachCorr: any) => {
          const backendData = removeNullOrUndefinedProperties({
            ...eachCorr,
            files: eachCorr?.files?.map(
              (item: UploadFile<any>) => item.originFileObj
            ),
            status: 'archive',
          });
          const data = {
            ...backendData,
            parastatal: parastatalId,
          };

          return createCorrSwr.trigger({ data });
        });
        await Promise.all(archivePromises);
        closeModalHandler();
        messageHandler('success', 'Correspondence(s) Archived successfully');
        form.resetFields();
      } catch (error: any) {
        // Handle errors if archiving fails
        messageHandler('error', 'Failed to archive some correspondences.');
      }
    };

    const closeModalHandlerWithDraftSave = () => {
      const values = form.getFieldsValue();
      if (values.correspondences.some((corr: any) => hasData(corr))) {
        handleSaveDraft(values);
      }
      messageHandler('success', 'Correspondence(s) saved to draft');
      closeModalHandler();
    };

    const viewCorrespondenceHandler = () => {
      closeConfirmModalHandler();
      router.push('correspondence/export_of_brewery_products');
    };

    const newCorrespondenceHandler = () => {
      closeConfirmModalHandler();
    };
    return (
      <>
        <CustomButton
          size="small"
          type={props.type === 'full' ? 'text' : 'primary'}
          icon={<Plus />}
          description="Create Correspondence"
          onClick={openModalHandler}
          ref={ref}
          className={props.className}
        >
          {props.type === 'full' ? 'Add correspondence' : null}
        </CustomButton>
        <CustomModal
          title="New correspondence"
          open={openModal}
          // onCancel={closeModalHandler}
          onCancel={closeModalHandlerWithDraftSave}
          width={800}
          style={{ top: 20 }}
          destroyOnClose
        >
          <CorrespondenceForms
            handleSubmit={correspondenceFormSubmitHandler}
            form={form} // Pass down the form instance
            handleArchive={handleArchive}
          />
        </CustomModal>
        <CorresponcenceCreated
          newCorrespondence={newCorrespondenceHandler}
          viewCorrespondence={viewCorrespondenceHandler}
          onCancel={closeConfirmModalHandler}
          open={openConfirmModal}
        />
      </>
    );
  }
);

CreateCorrespondence.displayName = 'CreateCorrespondence';

export default CreateCorrespondence;

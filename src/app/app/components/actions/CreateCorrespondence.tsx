import { useSession } from '@/common/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import useCorrespondence from '../../hooks/useCorrespondence';
import { UploadFile } from 'antd/lib/upload/interface';
import { messageHandler } from '@/common/utils/notification';
import CustomButton from '@/common/components/CustomButton';
import Plus from '@/common/components/icons/Plus';
import CustomModal from '@/common/components/CustomModal';
import CorrespondenceForms from '../forms/CreateCorrespondence/CorrespondenceForms';
import CorresponcenceCreated from '../forms/CreateCorrespondence/CorresponcenceCreated';
import { useForm } from 'antd/es/form/Form';

type Props = {
  type?: 'full';
};
export const removeNullOrUndefinedProperties = (obj: Record<string, any>) => {
  let newObj: Record<string, any> = {};
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== '') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

function CreateCorrespondence(props: Props) {
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

  // Define hasData function here
  const hasData = (corrData: any) => {
    return (
      corrData?.sender ||
      corrData?.subject ||
      corrData?.minute ||
      corrData?.file ||
      corrData?.date_of_correspondence ||
      corrData?.recipient
    );
  };

  //eslint-disable-next-line
  const correspondenceFormSubmitHandler = async (values: any) => {
    const allCorrespondence = values.correspondences;

    try {
      // Create all correspondences and collect promises
      const createPromises = allCorrespondence.map(async (eachCorr: any) => {
        const backendData = removeNullOrUndefinedProperties({
          ...eachCorr,
          files: eachCorr?.files?.map(
            (item: UploadFile<any>) => item.originFileObj
          ),
          status: 'sent', // Assuming the status for sent correspondences is "sent"
        });
        const data = {
          ...backendData,
          parastatal: parastatalId,
        };

        return createCorrSwr.trigger({ data });
      });

      // Wait for all promises to resolve
      await Promise.all(createPromises);

      // Close modal and show success message
      closeModalHandler();
      // Reset the form after submission
      form.resetFields();
    } catch (error: any) {
      // Handle errors, potentially with more specific messages
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
      // Create all draft correspondences and collect promises
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

      // Wait for all draft promises to resolve
      await Promise.all(draftPromises);

      // Show a success message (if desired)
      // messageHandler('success', 'Draft saved successfully.');
    } catch (error: any) {
      // Handle errors if saving drafts fails
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
      // Archive all correspondences and collect promises
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

      // Wait for all promises to resolve
      await Promise.all(archivePromises);
      closeModalHandler();
      // Reset the form after submission
      form.resetFields();

      // Show a success message (if desired)
      // messageHandler('success', 'All correspondences archived successfully.');
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

export default CreateCorrespondence;

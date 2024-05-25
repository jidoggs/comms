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

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'full';
  disabled?: boolean;
}

export const hasData = (corrData: any) => {
  return (
    corrData?.sender ||
    corrData?.recipient ||
    corrData?.subject ||
    corrData?.reference_number
  );
};

const CreateCorrespondence = forwardRef<HTMLButtonElement, Props>(
  ({ type, disabled, ...props }, ref) => {
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

    const serviceHandler = async (status: 'sent' | 'draft' | 'archive') => {
      const values = form.getFieldsValue();
      const allCorrespondence = values.correspondences;
      try {
        const corrsPromises = allCorrespondence.map(async (eachCorr: any) => {
          const backendData = removeNullOrUndefinedProperties({
            ...eachCorr,
            files: eachCorr?.files?.map(
              (item: UploadFile<any>) => item.originFileObj
            ),
            recipient: eachCorr?.recipient?.value,
            recipient_type: eachCorr?.recipient?.title,
            status,
          });
          const data = {
            ...backendData,
            parastatal: parastatalId,
          };

          return createCorrSwr.trigger({ data });
        });
        await Promise.all(corrsPromises);
        closeModalHandler();
        let message = '';
        if (status === 'sent') {
          message = 'Created';
        }
        if (status === 'draft') {
          message = 'Drafted';
        }
        if (status === 'archive') {
          message = 'Archived';
        }

        messageHandler('success', `Correspondence(s) ${message} successfully`);

        form.resetFields();
      } catch (error: any) {
        let type = '';
        if (status === 'sent') {
          type = 'create';
        }
        if (status === 'draft') {
          type = 'save';
        }
        if (status === 'archive') {
          type = 'archive';
        }
        messageHandler(
          'error',
          `Some correspondences failed to ${type}. Error: ${error.message}`
        );
      }
    };

    const correspondenceFormSubmitHandler = () => {
      serviceHandler('sent');
    };

    const handleArchive = async () => {
      const values = form.getFieldsValue();
      if (values.correspondences.some((corr: any) => hasData(corr))) {
        serviceHandler('archive');
      }
    };

    const closeModalHandlerWithDraftSave = () => {
      const values = form.getFieldsValue();
      if (values.correspondences.some((corr: any) => hasData(corr))) {
        serviceHandler('draft');
      } else {
        closeModalHandler();
      }
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
          {...props}
          size="small"
          type={type === 'full' ? 'text' : 'primary'}
          icon={<Plus />}
          description="Create Correspondence"
          onClick={openModalHandler}
          ref={ref}
          disabled={disabled}
        >
          {type === 'full' ? 'Add correspondence' : null}
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

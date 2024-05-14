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

type Props = {
  type?: 'full';
};

function CreateCorrespondence(props: Props) {
  const { data: user } = useSession();
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

  const removeNullOrUndefinedProperties = (obj: Record<string, any>) => {
    let newObj: Record<string, any> = {};
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (obj[key] !== undefined && obj[key] !== '') {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  };

  //eslint-disable-next-line
  const correspondenceFormSubmitHandler = async (values: any) => {
    const allCorrespondence = values.correspondences;
    // console.log('allCorrespondence', allCorrespondence);

    const results = [];

    try {
      for (const eachCorr of allCorrespondence) {
        const backendData = removeNullOrUndefinedProperties({
          ...eachCorr,
          // files: eachCorr.files?.map((file: any) => ({
          //   file: file.originFileObj,
          //   name: file.originFileObj.name,
          // })),

          files: eachCorr?.files?.map(
            (item: UploadFile<any>) => item.originFileObj
          ),
        });
        const data = {
          ...backendData,
          parastatal: parastatalId,
        };

        // console.log(data);

        try {
          await createCorrSwr.trigger({ data });
          results.push({
            success: true,
            message: 'Correspondence created successfully',
          });
        } catch (error: any) {
          results.push({ success: false, message: error.message });
        }

        // createCorrSwr
        //   .trigger({ data })
        //   .then(() =>
        //     messageHandler('success', 'Correspondence created successfully')
        //   );
      }
      // } catch (error: any) {
      //   messageHandler('error', error.message);
      // }
    } catch (overallError: any) {
      messageHandler(
        'error',
        `An unexpected error occurred: ${overallError.message}`
      );
      return; // Exit early if there's a major issue
    }

    // Summarize results and craft a single message
    const successCount = results.filter((r) => r.success).length;
    const errorCount = results.filter((r) => !r.success).length;

    let message = '';
    if (successCount === allCorrespondence.length) {
      message = 'All correspondences created successfully.';
    } else if (errorCount === allCorrespondence.length) {
      const firstErrorMessage =
        results.find((r) => !r.success)?.message || 'Unknown error';
      message = `All correspondences failed. First error: ${firstErrorMessage}`;
    } else {
      message = `${successCount} correspondence(s) created successfully. ${errorCount} failed.`;
      if (errorCount > 0) {
        const firstErrorMessage =
          results.find((r) => !r.success)?.message || 'Unknown error';
        message += ` First error: ${firstErrorMessage}`;
      }
    }

    // Determine the overall message type based on the outcome
    const messageType = errorCount > 0 ? 'error' : 'success';
    messageHandler(messageType, message);
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
        onCancel={closeModalHandler}
        width={800}
        style={{ top: 20 }}
      >
        <CorrespondenceForms handleSubmit={correspondenceFormSubmitHandler} />
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

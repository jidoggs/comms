'use client';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import Plus from '@/common/components/icons/Plus';
import Search from '@/common/components/icons/Search';
import ThreeDots from '@/common/components/icons/ThreeDots';
import CreateCorrespondence from './CreateCorrespondence';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { CorrespondenceData } from '../types';
import CustomModal from '@/common/components/CustomModal';
// import Form from './forms/Form';
import CorrespondenceForms from './forms/CorrespondenceForms';
import useCorrespondence from '../../hooks/useCorrespondence';
import { messageHandler } from '@/common/utils/notification';
import { useSession } from '@/common/hooks';
import { UploadFile } from 'antd/lib/upload/interface';

type SectionHeaderCardProps = {
  title: string;
  count: number;
  newData?: boolean;
  searchHandler?: () => void;
  moreHandler?: () => void;
};

const SectionHeaderCard = ({
  title,
  count,
  newData,
  moreHandler,
  searchHandler,
}: SectionHeaderCardProps) => {
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
  const correspondenceFormSubmitHandler = (values: any) => {
    const allCorrespondence = values.correspondences;
    // console.log('allCorrespondence', allCorrespondence);

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

        createCorrSwr
          .trigger({ data })
          .then(() =>
            messageHandler('success', 'Correspondence created successfully')
          );
      }
    } catch (error: any) {
      messageHandler('error', error.message);
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
    <div className="flex w-full items-center justify-between rounded-md bg-white p-2 font-semibold shadow-wordBox">
      <div className="flex items-center gap-x-2.5">
        <Title semibold className="text-base text-custom-gray_200">
          {title}
        </Title>
        {newData ? (
          <div className="size-1 rounded-full bg-custom-red_100" />
        ) : null}
        <div className="rounded-10 border border-gray-400 px-2 py-0.5 text-center">
          <Title tag="span">{count}</Title>
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        <CustomButton
          size="small"
          type="text"
          icon={<Search />}
          description="Search"
          onClick={searchHandler}
        />
        <CustomButton
          size="small"
          type="text"
          icon={<Plus />}
          description="Create Correspondence"
          onClick={openModalHandler}
        />
        <CustomButton
          size="small"
          type="text"
          icon={<ThreeDots />}
          description="More"
          onClick={moreHandler}
        />
        <CustomModal
          title="New correspondence"
          open={openModal}
          onCancel={closeModalHandler}
          width={800}
          style={{ top: 20 }}
        >
          <CorrespondenceForms handleSubmit={correspondenceFormSubmitHandler} />
        </CustomModal>
        <CreateCorrespondence
          newCorrespondence={newCorrespondenceHandler}
          viewCorrespondence={viewCorrespondenceHandler}
          onCancel={closeConfirmModalHandler}
          open={openConfirmModal}
        />
      </div>
    </div>
  );
};

export default SectionHeaderCard;

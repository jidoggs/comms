import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import CorrepondenceTabs from './CorrepondenceTabs';
import { DetailContext } from '../service-context/DetailContextWrapper';
import CustomButton from '@/common/components/CustomButton';
import CreateProject from '@/app/app/components/actions/CreateProject';
import CreateMeeting from '@/app/app/components/actions/CreateMeeting';
import Title from '@/common/components/Title';

import { mergeClassName } from '@/common/utils';
import Search from '@/common/components/icons/Search';
import CloseCircled from '@/common/components/icons/CloseCircled';
import Send from '@/common/components/icons/Send';
import CloseCircle from '@/common/components/icons/CloseCircle';

const CorrrespondenceMenu = () => {
  const detailsData = useContext(DetailContext);

  return (
    <div className="flex !h-[50px] justify-between border-b border-custom-gray_400 bg-custom-white_100">
      <motion.div
        animate={detailsData?.contentControls}
        transition={{
          duration: 0.2,
        }}
        className="flex w-full items-end justify-between pl-5"
      >
        {detailsData?.multiSelect.isMultiSelectMode ? (
          <Title semibold className="self-center">
            Push items
          </Title>
        ) : (
          <CorrepondenceTabs />
        )}
        <div
          className={mergeClassName(
            'flex h-full items-center gap-x-2.5',
            detailsData?.openCorrespondenceDetails ? 'pr-2.5' : 'pr-5'
          )}
        >
          <CustomButton
            description="Search"
            type="primary"
            icon={<Search size={18} />}
          />
          {detailsData?.multiSelect.isMultiSelectMode ? (
            <div className="flex h-full items-center gap-x-2.5 border-l border-custom-gray_500 p-2.5 pr-0">
              <CustomButton
                description="Cancel"
                size="small"
                type="primary"
                icon={<CloseCircled size={18} />}
                onClick={detailsData?.turnMultiSelectOFFHandler}
              />
            </div>
          ) : (
            <>
              <div className="flex h-full items-center gap-x-2.5 border-x border-custom-gray_500 p-2.5">
                <CreateProject />
                <CreateMeeting />
              </div>
              <CustomButton
                description="Push multiple"
                type="primary"
                size="small"
                icon={<Send size={18} />}
                onClick={detailsData?.turnMultiSelectOnHandler}
              />
            </>
          )}
        </div>
      </motion.div>
      {detailsData?.openCorrespondenceDetails ? (
        <motion.div
          initial={{
            x: 200,
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="flex w-2/6 items-center justify-between border-l border-custom-gray_500 bg-custom-white_100 px-5 py-2.5"
        >
          <Title
            tag="h6"
            semibold
            className="leading-[20.24px] text-custom-gray_200"
          >
            Details
          </Title>
          <CustomButton
            type="text"
            size="small"
            icon={<CloseCircle size={30} />}
            onClick={detailsData?.closeDetailsHandler}
          />
        </motion.div>
      ) : null}
    </div>
  );
};

export default CorrrespondenceMenu;

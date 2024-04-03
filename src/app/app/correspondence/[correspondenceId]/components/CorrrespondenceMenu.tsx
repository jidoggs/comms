import { mergeClassName } from '@/common/utils';
import React, { useContext } from 'react';
import CorrepondenceTabs from './CorrepondenceTabs';
import {
  Briefcase,
  Close,
  Search,
  Send,
  Users,
} from '@/common/components/icons';
import { motion } from 'framer-motion';
import Title from '@/common/components/Title';
import { StateDispatch } from '@/types';
import CustomButton from '@/common/components/CustomButton';
import { DetailContext } from '../PageContent';

type Props = {
  activeTab: string;
  setActiveTab: StateDispatch<string>;
};

const CorrrespondenceMenu = ({ activeTab, setActiveTab }: Props) => {
  const detailsData = useContext(DetailContext);

  return (
    <div className="flex !h-[50px] flex-row justify-between border-b border-custom-gray_500 bg-custom-white_100">
      <div
        className={mergeClassName(
          'flex w-full flex-row items-end justify-between pl-5',
          detailsData?.openCorrespondenceDetails && 'w-4/6'
        )}
      >
        <div>
          <CorrepondenceTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="left flex h-full flex-row items-center gap-1 px-1">
          <CustomButton
            description="Search"
            type="primary"
            icon={<Search size={18} />}
          />
          <div className="flex h-full flex-row items-center gap-1 border-x border-custom-gray_500 px-1">
            <CustomButton
              description="Create project"
              type="primary"
              icon={<Briefcase size={18} />}
            />
            <CustomButton
              description="Create a meeting"
              type="primary"
              icon={<Users size={18} />}
            />
          </div>
          <CustomButton
            description="Push"
            type="primary"
            icon={<Send size={18} />}
          />
        </div>
      </div>
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
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className="flex w-2/6 flex-row items-center justify-between border-l border-custom-gray_500 bg-custom-white_100"
        >
          <Title
            type="h5"
            className="circular ml-3 font-[500] leading-[20.24px] text-custom-gray_200"
          >
            Details
          </Title>
          <Close
            className="mr-3 cursor-pointer rounded-full bg-custom-gray_100"
            onClick={detailsData?.closeDetailsHandler}
          />
        </motion.div>
      ) : null}
    </div>
  );
};

export default CorrrespondenceMenu;

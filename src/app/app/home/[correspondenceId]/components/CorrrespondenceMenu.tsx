import { mergeClassName } from '@/common/utils';
import React from 'react';
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
import { Tooltip } from 'antd';
import { StateDispatch } from '@/types';

type Props = {
  openCorrespondence?: boolean;
  setOpenCorrespondence?: StateDispatch<boolean>;
  activeTab: string;
  setActiveTab: StateDispatch<string>;
};

const CorrrespondenceMenu = ({
  openCorrespondence,
  activeTab,
  setActiveTab,
  setOpenCorrespondence,
}: Props) => {
  const handleCloseClick = () => {
    if (setOpenCorrespondence) {
      setOpenCorrespondence(false);
    }
  };

  return (
    <div className="mt-3 flex !h-[50px] flex-row justify-between border-b border-custom-gray_500 bg-custom-white_100 px-5">
      <div
        className={mergeClassName(
          'flex w-full flex-row items-end justify-between',
          openCorrespondence ? 'w-4/6' : ''
        )}
      >
        <div>
          <CorrepondenceTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="left flex h-full flex-row items-center">
          <Tooltip placement="top" title={'Search'} className="mx-2 my-3">
            <Search className="mx-3 cursor-pointer" size={18} />
          </Tooltip>
          <div className="flex h-full flex-row items-center border-x border-custom-gray_500">
            <Tooltip
              placement="top"
              title={'Create project'}
              className="mx-2 my-3"
            >
              <Briefcase className="mx-3 cursor-pointer" size={18} />
            </Tooltip>
            <Tooltip
              placement="top"
              title={'Create meeting'}
              className="mx-2 my-3"
            >
              <Users className="mx-3 cursor-pointer" size={18} />
            </Tooltip>
          </div>
          <Tooltip placement="top" title={'Push'} className="mx-2 my-3">
            <Send className="mx-3 cursor-pointer" size={18} />
          </Tooltip>
        </div>
      </div>
      {openCorrespondence && (
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
          className="flex w-2/6 flex-row items-center justify-between border-l border-custom-gray_500 bg-custom-white_100 px-5"
        >
          <Title type="h1" className="text-[#585A69]">
            Correspondence
          </Title>
          <Close
            className="cursor-pointer rounded-full bg-[#F2F2F2]"
            onClick={handleCloseClick}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CorrrespondenceMenu;
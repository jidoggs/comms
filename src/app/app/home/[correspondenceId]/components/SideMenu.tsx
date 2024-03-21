import { Briefcase, Document, Users } from '@/common/components/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { motion } from 'framer-motion';

const SideMenu = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
      translate="yes"
      className="border-custom-gray_500 bg-custom-white_100 rounded-xl border px-1"
    >
      <div className="flex cursor-pointer flex-col items-center justify-center py-1">
        <div className="flex w-full flex-col items-center justify-center">
          <Tooltip placement="right" title={'Add note'} className="mx-2 my-3">
            <Document
              size={18}
              //   onClick={() => setOpenCorrespondence(true)}
            />
          </Tooltip>
          <div className="bg-custom-gray_500 h-px w-full" />
          <Tooltip
            placement="right"
            title={'Create a meeting'}
            className="mx-2 my-3"
          >
            <Users
              size={18}
              //   onClick={() => setOpenCorrespondence(true)}
            />
          </Tooltip>
          {/* <div className="bg-custom-gray_500 h-px w-full" /> */}
          <Tooltip
            placement="right"
            title={'Create Project'}
            className="mx-2 my-3"
          >
            <Briefcase
              size={18}
              //   onClick={() => setOpenCorrespondence(true)}
            />
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
};

export default SideMenu;

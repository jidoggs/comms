'use client';
import React, { useState } from 'react';
import Minutes from '../../../../common/components/correspondence/pages/Minutes';
import Timelines from '../../../../common/components/correspondence/pages/Timelines';
import Documents from '../../../../common/components/correspondence/pages/Documents';
import CorrespondentDocument from '../../../../common/components/correspondence/correspondenceDocument/CorrespondentDocument';
import { mergeClassName } from '@/common/utils';
import { motion } from 'framer-motion';
import CorrespondenceHeader from '../../../../common/components/correspondence/CorrespondenceHeader';
import CorrrespondenceMenu from '../../../../common/components/correspondence/CorrrespondenceMenu';

// type Props = {};

const PageContent = () => {
  const [activeTab, setActiveTab] = useState('minutes');
  const [openCorrespondence, setOpenCorrespondence] = useState(false);
  const [correspondenceFile, setCorrespondenceFile] = useState<FileList | null>(
    null
  );

  // console.log('activeTab', activeTab);

  return (
    <div className="flex w-full flex-col">
      <CorrespondenceHeader setOpenCorrespondence={setOpenCorrespondence} />
      <CorrrespondenceMenu
        openCorrespondence={openCorrespondence}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setOpenCorrespondence={setOpenCorrespondence}
      />
      <div className="flex flex-row justify-between px-5">
        <div
          className={mergeClassName(
            'flex w-full flex-row items-center justify-between',
            openCorrespondence && 'w-4/6'
          )}
        >
          {activeTab === 'minutes' ? (
            <Minutes
              correspondenceFile={correspondenceFile}
              setCorrespondenceFile={setCorrespondenceFile}
              setOpenCorrespondence={setOpenCorrespondence}
            />
          ) : activeTab === 'timelines' ? (
            <Timelines />
          ) : (
            activeTab === 'documents' && <Documents />
          )}
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
            className="border-custom-gray_500 flex w-2/6 flex-row items-center justify-center border-l"
          >
            <CorrespondentDocument correspondenceFile={correspondenceFile} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PageContent;

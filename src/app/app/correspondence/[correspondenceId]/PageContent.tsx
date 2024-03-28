'use client';
import React, { useState } from 'react';
import Minutes from './components/pages/Minutes';
import Timelines from './components/pages/Timelines';
import Documents from './components/pages/Documents';
// import CorrespondentDocument from './components/corrDocument/CorrespondentDocument';
import { mergeClassName } from '@/common/utils';
import { motion } from 'framer-motion';
import CorrespondenceHeader from './components/CorrespondenceHeader';
import CorrrespondenceMenu from './components/CorrrespondenceMenu';

// type Props = {};

const PageContent = () => {
  const [activeTab, setActiveTab] = useState<string>('minutes');
  // const [openCorrespondence, setOpenCorrespondence] = useState<boolean>(false);
  const [openCorrespondenceDetails, setOpenCorrespondenceDetails] =
    useState<boolean>(false);
  const [correspondenceFile, setCorrespondenceFile] = useState<FileList | null>(
    null
  );

  // console.log('correspondenceFile', correspondenceFile);

  return (
    <div className="flex w-full flex-col">
      <CorrespondenceHeader
        // setOpenCorrespondence={setOpenCorrespondence}
        setOpenCorrespondenceDetails={setOpenCorrespondenceDetails}
      />
      <CorrrespondenceMenu
        openCorrespondenceDetails={openCorrespondenceDetails}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        // setOpenCorrespondence={setOpenCorrespondence}
        setOpenCorrespondenceDetails={setOpenCorrespondenceDetails}
      />
      <div className="flex h-[calc(100vh_-_146px)] flex-row justify-between px-5">
        <div
          className={mergeClassName(
            'flex w-full flex-row items-center justify-between',
            openCorrespondenceDetails && 'w-4/6'
          )}
        >
          {activeTab === 'minutes' ? (
            <Minutes
              correspondenceFile={correspondenceFile}
              setCorrespondenceFile={setCorrespondenceFile}
              // setOpenCorrespondence={setOpenCorrespondence}
              setOpenCorrespondenceDetails={setOpenCorrespondenceDetails}
            />
          ) : activeTab === 'timelines' ? (
            <Timelines />
          ) : (
            activeTab === 'documents' && <Documents />
          )}
        </div>
        {openCorrespondenceDetails && (
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
            className="flex w-2/6 flex-row items-center justify-center border-l border-custom-gray_500"
          >
            {/* <CorrespondentDocument correspondenceFile={correspondenceFile} /> */}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PageContent;

'use client';
import React, { useState } from 'react';
import Minutes from './components/pages/Minutes';
import Timelines from './components/pages/Timelines';
import Documents from './components/pages/Documents';
import { mergeClassName } from '@/common/utils';
import { motion } from 'framer-motion';
import CorrespondenceHeader from './components/CorrespondenceHeader';
import CorrrespondenceMenu from './components/CorrrespondenceMenu';
import MinuteDetails from './components/MinuteDetails';
import dayjs from 'dayjs';
// import CorrespondentDocument from './components/corrDocument/CorrespondentDocument';

type DetailContextType = {
  openCorrespondenceDetails: boolean;
  openDetailsHandler: VoidFunction; //eslint-disable-line
  closeDetailsHandler: VoidFunction; //eslint-disable-line
  correspondenceFile: FileList | null;
  handleUpdateFile: (files: FileList) => void; //eslint-disable-line
};

export const DetailContext = React.createContext<DetailContextType | null>(
  null
);

const PageContent = () => {
  const [activeTab, setActiveTab] = useState<string>('minutes');
  const [openCorrespondenceDetails, setOpenCorrespondenceDetails] =
    useState<boolean>(false);
  const [correspondenceFile, setCorrespondenceFile] = useState<FileList | null>(
    null
  );

  const openDetailsHandler = () => {
    setOpenCorrespondenceDetails(true);
  };
  const closeDetailsHandler = () => {
    setOpenCorrespondenceDetails(false);
  };

  const handleUpdateFile = (files: FileList) => {
    if (files) {
      // Check if any file is selected
      if (!files.length) {
        return; // Handle the case where no file is selected (optional)
      }
      openDetailsHandler();
      setCorrespondenceFile(files);
    }
  };

  const demoDetails = {
    name: 'Export of Brewery Products',
    from: 'Nigerian Breweries',
    to: {
      name: 'Adbul Jabar',
      office: 'string',
      date: dayjs('30 Jan 2024, 4:22pm', 'DD MMM YYYY, h:mmA'),
    },
    createdBy: {
      name: 'Adbul Jabar',
      office: 'string',
      date: dayjs('30 Jan 2024, 4:22pm', 'DD MMM YYYY, h:mmA'),
    },
    dateCreated: '30-01-2024',
  };

  return (
    <DetailContext.Provider
      value={{
        openCorrespondenceDetails,
        openDetailsHandler,
        closeDetailsHandler,
        correspondenceFile,
        handleUpdateFile,
      }}
    >
      <div className="flex w-full flex-col">
        <CorrespondenceHeader />
        <CorrrespondenceMenu
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="flex h-[calc(100vh_-_146px)] flex-row justify-between">
          <div
            className={mergeClassName(
              'flex w-full flex-row items-center justify-between',
              openCorrespondenceDetails && 'w-4/6'
            )}
          >
            {activeTab === 'minutes' ? <Minutes /> : null}
            {activeTab === 'timelines' ? <Timelines /> : null}
            {activeTab === 'documents' ? <Documents /> : null}
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
              <MinuteDetails corrMinuteDetails={demoDetails} />
            </motion.div>
          )}
        </div>
      </div>
    </DetailContext.Provider>
  );
};

export default PageContent;

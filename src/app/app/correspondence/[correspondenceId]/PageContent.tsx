'use client';
import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Minutes from './components/pages/Minutes';
import Timelines from './components/pages/Timelines';
import Documents from './components/pages/Documents';
import CorrespondenceHeader from './components/CorrespondenceHeader';
import CorrrespondenceMenu from './components/CorrrespondenceMenu';
import MinuteDetails from './components/MinuteDetails';
import { DetailContext } from './service-context/DetailContextWrapper';
import { mergeClassName } from '@/common/utils';

const PageContent = () => {
  const detailsData = useContext(DetailContext);
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
    <div className="flex w-full flex-col">
      <CorrespondenceHeader />
      <CorrrespondenceMenu />
      <div className="flex h-[calc(100vh_-_146px)] flex-row justify-between">
        <div
          className={mergeClassName(
            'flex w-full flex-row items-center justify-between',
            detailsData?.openCorrespondenceDetails && 'w-4/6'
          )}
        >
          {detailsData?.activeTab === 'minutes' ? <Minutes /> : null}
          {detailsData?.activeTab === 'timelines' ? <Timelines /> : null}
          {detailsData?.activeTab === 'documents' ? <Documents /> : null}
        </div>
        {detailsData?.openCorrespondenceDetails && (
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
  );
};

export default PageContent;

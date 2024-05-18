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
// import useCorrespondence from '../../hooks/useCorrespondence';
// import { useParams } from 'next/navigation';

const PageContent = () => {
  // const params = useParams();
  // const correspondenceId = params.correspondenceId; // Access the _id as params.id
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

  // const { getCorrMinListSwr } = useCorrespondence({
  //   can_get_all: true,
  //   _id: correspondenceId.toString(),
  // });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  // const minuteData = getCorrMinListSwr?.data?.data || [];

  // console.log('minuteData', minuteData);
  // console.log('correspondenceId', correspondenceId);

  return (
    <div className="flex w-full flex-col">
      <CorrespondenceHeader />
      <CorrrespondenceMenu />
      <div className="flex h-[calc(100vh_-_140px)] justify-between">
        <motion.div
          animate={detailsData?.contentControls}
          transition={{
            duration: 0.2,
          }}
          className="flex w-full items-center justify-between"
        >
          {detailsData?.activeTab === 'minutes' ? (
            <Minutes minuteData={detailsData?.minuteData} />
          ) : null}
          {detailsData?.activeTab === 'timelines' ? <Timelines /> : null}
          {detailsData?.activeTab === 'documents' ? <Documents /> : null}
        </motion.div>

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
            exit={{
              x: -200,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="flex w-2/6 items-center justify-center border-l border-custom-gray_500"
          >
            <MinuteDetails corrMinuteDetails={demoDetails} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PageContent;

{
  /* <CorrespondentDocument correspondenceFile={correspondenceFile} /> */
}

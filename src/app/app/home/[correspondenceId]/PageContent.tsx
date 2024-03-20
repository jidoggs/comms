'use client';
import Title from '@/common/components/Title';
import React, { useState } from 'react';
import CorrepondenceTabs from './components/CorrepondenceTabs';
import {
  BackwardArrow,
  Briefcase,
  Close,
  Search,
  Send,
  Users,
} from '@/common/components/icons';
import Minutes from './components/Minutes';
import Timelines from './components/Timelines';
import Documents from './components/Documents';
import CorrespondentDocument from './components/correspondenceFile/CorrespondentDocument';
import { pdfjs } from 'react-pdf';
import { mergeClassName } from '@/common/utils';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

// type Props = {};

const PageContent = () => {
  const [activeTab, setActiveTab] = useState('Minutes');
  const [openCorrespondence, setOpenCorrespondence] = useState(false);
  const [correspondenceFile, setCorrespondenceFile] = useState<FileList | null>(
    null
  );

  // console.log('activeTab', activeTab);

  return (
    <div className="flex w-full flex-col">
      <div className="my-3 flex flex-row items-center justify-between px-5">
        <div className="flex flex-row items-center gap-3">
          <BackwardArrow size={34} />
          <Title type="h1" className="leading-[22.77px] text-[#11142D]">
            Export of Brewery Products
          </Title>
        </div>
        <div className="flex flex-row items-center gap-3 px-5">
          <div className="">Time Line</div>
          <div className="">File document</div>
        </div>
      </div>
      <div className="mt-3 flex !h-[50px] flex-row justify-between bg-white px-5">
        <div
          className={mergeClassName(
            'flex w-full flex-row items-center justify-between',
            openCorrespondence ? 'w-4/6' : ''
          )}
          // className="flex w-4/6 flex-row items-center justify-between"
        >
          <div className="h-full">
            <CorrepondenceTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="left flex h-full flex-row items-center">
            <Search className="mx-2" size={30} />
            <div className="flex h-full flex-row items-center border-x border-[#E0E0E0]">
              <Briefcase className="mx-2" size={30} />
              <Users className="mx-2" size={30} />
            </div>
            <Send className="mx-2" size={30} />
          </div>
        </div>
        {openCorrespondence && (
          <div className="flex w-2/6 flex-row items-center justify-between border-l border-[#E0E0E0] bg-white px-5">
            <Title type="h1" className="text-[#585A69]">
              Correspondence
            </Title>
            <Close
              className="cursor-pointer rounded-full bg-[#F2F2F2]"
              onClick={() => setOpenCorrespondence(false)}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between px-5">
        <div
          className={mergeClassName(
            'flex w-full flex-row items-center justify-between',
            openCorrespondence && 'w-4/6'
          )}
        >
          {activeTab === 'Minutes' ? (
            <Minutes
              correspondenceFile={correspondenceFile}
              setCorrespondenceFile={setCorrespondenceFile}
              setOpenCorrespondence={setOpenCorrespondence}
            />
          ) : activeTab === 'Timelines' ? (
            <Timelines />
          ) : (
            activeTab === 'Documents' && <Documents />
          )}
        </div>
        {openCorrespondence && (
          <div className="flex w-2/6 flex-row items-center justify-center border-l border-[#E0E0E0]">
            <CorrespondentDocument correspondenceFile={correspondenceFile} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageContent;

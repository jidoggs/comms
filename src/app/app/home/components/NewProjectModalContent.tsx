'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import CustomInput from '@/common/CustomInput';
import UploadCard from './UploadCard';
import { CustomButton } from '@/common/components';
import { File, Link } from '@/common/components/icons';

const NewProjectModalContent = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>();
  const [stage, setStage] = useState(1);

  const handleClick = () => {
    if (stage === 1) {
      setStage(2);
    } else {
      router.push('/app/home/projects');
    }
  };

  //   console.log('FILES', file);
  return (
    <>
      {stage === 1 ? (
        <>
          <CustomInput
            className="my-3 h-9 border-t-0 border-custom-gray_100"
            label="Name of Project"
          />
          <CustomInput
            type="textarea"
            className="my-2 h-9 border-t-0 border-custom-gray_100"
            label="Name of Project"
          />
          {file && <UploadCard fileName={file?.name} />}
          <div className="relative mt-4 flex w-full items-center justify-between">
            <CustomButton
              variant="noStyleButton"
              className="flex h-6 items-center gap-1 !px-2 hover:bg-custom-gray_100"
            >
              <Link />
              Insert Link
            </CustomButton>
            <CustomButton
              variant="noStyleButton"
              className="flex h-6 items-center gap-1 !px-2 hover:bg-custom-gray_100"
            >
              <File size={40} />
              Attach File
            </CustomButton>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="absolute right-0 w-1/3 cursor-pointer !px-2 opacity-0 hover:bg-custom-gray_100"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </div>
        </>
      ) : (
        <div>
          <p className="mb-2 text-lg">
            Define the progress status fot this project
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1">
              <input
                id="backlog"
                type="radio"
                name="status"
                value="backlog"
                className="size-5"
              />
              <label htmlFor="backlog" id="backlog">
                Backlog
              </label>
            </div>

            <div className="mt-1 flex items-center gap-1">
              <input
                id="progress"
                type="radio"
                name="status"
                value="progress"
                className="size-5"
              />
              <label htmlFor="progress" id="progress">
                In Progress
              </label>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <input
                id="review"
                type="radio"
                name="status"
                value="review"
                className="size-5"
              />
              <label htmlFor="review" id="review">
                In Review
              </label>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <input
                id="done"
                type="radio"
                name="status"
                value="done"
                className="size-5"
              />
              <label htmlFor="done" id="done">
                Done
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 flex h-8 w-full justify-end">
        <CustomButton className="bg-custom-main" onClick={handleClick}>
          Continue
        </CustomButton>
      </div>
    </>
  );
};

export default NewProjectModalContent;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { documents } from './data';
import { ArrowRight } from '@/common/components/icons';

interface Option {
  value: string | number;
  label: React.ReactNode;
  children?: Option[];
}

const Documents = () => {
  const [stepOne, setStepOne] = useState<any>(null);
  const [stepTwo, setStepTwo] = useState<any>(null);

  const handleStepOne = (doc: any) => {
    if (stepOne && stepOne.key === doc.key) {
      setStepOne(null);
      setStepTwo(null);
    } else {
      setStepOne(doc);
      setStepTwo(null);
    }
  };

  const handleStepTwo = (id: any) => {
    if (stepTwo === id) {
      setStepTwo(null);
    } else {
      setStepTwo(id);
    }
  };
// 
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
      }}
      className="relative flex size-full flex-col"
    >
      <div className="relative flex h-full gap-4 px-5">
        <div className="flex flex-col gap-4 border-r border-white  pr-4 pt-5">
          {documents.map((doc) => (
            <button
              key={doc.key}
              className={`flex min-w-[284px] items-center justify-between rounded-md px-3 py-2 text-left ${stepOne && stepOne.key === doc.key && !stepTwo ? 'bg-white' : stepOne && stepOne.key === doc.key && stepTwo ? 'bg-gray-200' : 'bg-transparent'}`}
              onClick={() => handleStepOne(doc)}
            >
              <span className="flex items-center gap-2">
                <doc.icon size={16} />
                {doc.value}
              </span>
              {doc.children.length && <ArrowRight size={12} />}
            </button>
          ))}
        </div>
        {stepOne && stepOne.children.length && (
          <div
            className={`flex flex-col gap-4 border-r border-white  pr-4 pt-5`}
          >
            {stepOne.children.map((el: any) => (
              <button
                key={el.id}
                className={`flex min-w-[284px] items-center justify-between whitespace-nowrap rounded-md px-3 py-2 text-left ${stepTwo === el.id ? 'bg-white' : 'bg-transparent'}`}
                onClick={() => handleStepTwo(el.id)}
              >
                <span className="flex items-center gap-2">
                  <el.icon size={16} />
                  {el.value}
                </span>
                <ArrowRight size={12} />
              </button>
            ))}
          </div>
        )}
        <div className="flex-1 pt-5">
          {stepTwo && (
            <div className="mx-auto min-h-full max-w-[80%] rounded-md bg-white p-5">
              {stepTwo}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Documents;

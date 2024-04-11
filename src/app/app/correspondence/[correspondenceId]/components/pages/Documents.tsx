import React, { useState } from 'react';
import { documents } from './data';
import DocumentsContainer from '../document/DocumentsContainer';

const Documents = () => {
  const [document, setDocument] = useState(documents);
  const stepTwo = document.find((itm) => itm.isActive)?.children || [];
  const stepThree = stepTwo?.find((itm) => itm?.isActive)?.value;

  const handleClick: any = (item: any, step: number) => {
    const temp: any[] = document.map((itm) => {
      if (step === 1) {
        if (itm.key === item.key) {
          return {
            ...itm,
            isActive: true,
            children: itm.children.map((child) => ({
              ...child,
              isActive: false,
            })),
          };
        }
        return { ...itm, isActive: false };
      }
      if (step === 2) {
        return {
          ...itm,
          children: itm.children.map((child: any) => {
            if (child.id === item.id) {
              return { ...child, isActive: true };
            }
            return { ...child, isActive: false };
          }),
        };
      }
    });

    setDocument([...temp]);
  };

  return (
    <div className="flex size-full">
      <DocumentsContainer
        itemClickHandler={handleClick}
        items={document}
        step={1}
      />
      {stepTwo.length ? (
        <DocumentsContainer
          itemClickHandler={handleClick}
          items={stepTwo}
          step={2}
        />
      ) : null}
      {stepThree ? (
        <div className="flex-1 shrink-0 py-5">
          <div className="mx-auto min-h-full w-9/12 flex-1 rounded-md bg-white p-5 ">
            {stepThree}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Documents;

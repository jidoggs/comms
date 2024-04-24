'use client';
import React from 'react';
import DepartmentItem from './DepartmentItem';
import Title from '@/common/components/Title';
import { ArrowRight, TickCircle } from '@/common/components/icons';
import { iHandleClick } from '@/types';
import { mergeClassName } from '@/common/utils';

type Props = {
  items: any[];
  title?: string;
  step?: string;
  clickHandler: iHandleClick;
  activeIdentifier: string;
};

function DepartmentsContainer({
  items,
  title,
  step,
  clickHandler,
  activeIdentifier,
}: Props) {
  return (
    <section className="flex max-w-[350px] flex-col border-r border-custom-gray_500 bg-custom-white_100 [&:last-child:not(:only-child)]:border-none">
      <Title className="flex h-12 items-center border-b border-custom-gray_500 bg-custom-gray_900 px-3 py-2.5">
        {title}
      </Title>
      <div className="flex flex-col ">
        {items?.map((item, index) => {
          return (
            <DepartmentItem
              key={index}
              className={
                item?.value === activeIdentifier
                  ? 'bg-custom-purple_500'
                  : 'hover:bg-custom-purple_500'
              }
              data-step={step}
              data-value={item?.value}
              onClick={clickHandler}
              hasChild={
                <span
                  className={mergeClassName(
                    'p-2',
                    item?.value === activeIdentifier ? 'visible' : 'invisible'
                  )}
                >
                  {item?.children !== undefined ? (
                    <ArrowRight size={18} />
                  ) : (
                    <TickCircle size={18} />
                  )}
                </span>
              }
            >
              {item?.value}
            </DepartmentItem>
          );
        })}
      </div>
    </section>
  );
}

export default DepartmentsContainer;

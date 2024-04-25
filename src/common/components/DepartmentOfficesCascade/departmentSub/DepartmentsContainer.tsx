'use client';
import React from 'react';
import DepartmentItem from './DepartmentItem';
import Title from '@/common/components/Title';
import { ArrowRight, TickCircle } from '@/common/components/icons';
import { iHandleClick } from '@/types';
import { mergeClassName } from '@/common/utils';
import SectionMoreOptions from '@/app/admin/departments/components/actions/SectionMoreOptions';

type Props = {
  items: any[];
  title?: string;
  step: 'parastatals' | 'office' | 'department' | 'person';
  clickHandler: iHandleClick;
  activeIdentifier?: string;
  isEditable?: boolean;
};

function DepartmentsContainer({
  items,
  title,
  step,
  clickHandler,
  activeIdentifier,
  isEditable,
}: Props) {
  return (
    <section className="flex max-w-[350px] flex-col border-r border-custom-gray_500 bg-custom-white_100">
      <header className="group/title flex h-12 items-center justify-between border-b border-custom-gray_500 bg-custom-gray_900 px-3 py-2.5">
        <Title>{title}</Title>
        <SectionMoreOptions />
      </header>
      <div className="flex flex-col ">
        {items?.map((item, index) => {
          return (
            <DepartmentItem
              key={index}
              className={
                item?.value === activeIdentifier
                  ? 'group-[.is-admin]:bg-custom-gray_500 group-[.is-onboard]:bg-custom-purple_500'
                  : 'group-[.is-admin]:hover:bg-custom-gray_500 group-[.is-onboard]:hover:bg-custom-purple_500'
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
                    <TickCircle
                      size={18}
                      className={mergeClassName(isEditable ? 'invisible' : '')}
                    />
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

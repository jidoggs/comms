'use client';
import React, { ReactNode } from 'react';
import DepartmentItem from './SectionItem';
import Title from '@/common/components/Title';
import { ArrowRight, TickCircle } from '@/common/components/icons';
import { iHandleClick } from '@/types';
import { mergeClassName } from '@/common/utils';

type Props = {
  items: any[];
  title?: string;
  step: 'parastatals' | 'office' | 'department' | 'person';
  clickHandler: iHandleClick;
  activeIdentifier?: string;
  hasChild?: boolean;
  showTick?: boolean;
  moreOptions?: ReactNode;
};

function SectionContainer({
  items,
  title,
  step,
  clickHandler,
  activeIdentifier,
  hasChild,
  showTick,
  moreOptions,
}: Props) {
  return (
    <section className="flex max-w-[350px] flex-col border-r border-custom-gray_500 bg-custom-white_100">
      <header className="group/title flex h-12 items-center justify-between border-b border-custom-gray_500 bg-custom-gray_900 px-3 py-2.5">
        <Title>{title}</Title>
        {moreOptions}
      </header>
      <div className="flex flex-col ">
        {items?.map((item, index) => {
          return (
            <DepartmentItem
              key={index}
              className={
                item?.name === activeIdentifier
                  ? 'group-[.is-admin]:bg-custom-gray_500 group-[.is-onboard]:bg-custom-purple_500'
                  : 'group-[.is-admin]:hover:bg-custom-gray_500 group-[.is-onboard]:hover:bg-custom-purple_500'
              }
              data-step={step}
              data-value={item?.name}
              onClick={clickHandler}
              hasChild={
                <span
                  className={mergeClassName(
                    'p-2',
                    item?.name === activeIdentifier ? 'visible' : 'invisible'
                  )}
                >
                  {hasChild ? (
                    <ArrowRight size={18} />
                  ) : (
                    <TickCircle
                      size={18}
                      className={mergeClassName(showTick ? '' : 'invisible')}
                    />
                  )}
                </span>
              }
            >
              {item?.name}
            </DepartmentItem>
          );
        })}
      </div>
    </section>
  );
}

export default SectionContainer;

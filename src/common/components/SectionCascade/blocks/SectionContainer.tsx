'use client';
import React, { ReactNode } from 'react';
import SectionItem from './SectionItem';
import Title from '@/common/components/Title';
import { ArrowRight, SpinLoader, TickCircle } from '@/common/components/icons';
import { iHandleClick } from '@/types';
import { mergeClassName } from '@/common/utils';

type Props = {
  items: any[];
  title?: string;
  step: 'parastatals' | 'office' | 'department' | 'person';
  clickHandler?: iHandleClick;
  activeIdentifier?: string;
  hasChild?: boolean;
  showTick?: boolean;
  moreOptions?: ReactNode;
  loader?: boolean;
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
  loader,
}: Props) {
  return (
    <section className="flex h-full w-[350px] min-w-[350px] max-w-[350px] flex-col border-r border-custom-gray_500 bg-custom-white_100">
      <header className="group/title flex h-12 items-center justify-between border-b border-custom-gray_500 bg-custom-gray_900 px-3 py-2.5">
        <div className="flex items-center gap-x-1">
          <Title>{title}</Title>
          {loader ? <SpinLoader /> : null}
        </div>
        {moreOptions}
      </header>
      <div className="flex h-full flex-1 flex-col overflow-y-scroll">
        {items?.map((item) => {
          return (
            <SectionItem
              key={item?._id}
              className={
                item?._id === activeIdentifier
                  ? 'group-[.is-admin]:bg-custom-gray_500 group-[.is-onboard]:bg-custom-purple_500'
                  : 'group-[.is-admin]:hover:bg-custom-gray_500 group-[.is-onboard]:hover:bg-custom-purple_500'
              }
              data-step={step}
              data-value={item?.name}
              data-id={item?._id}
              onClick={clickHandler}
              hasChild={
                <span
                  className={mergeClassName(
                    'p-2',
                    item?._id === activeIdentifier ? 'visible' : 'invisible'
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
            </SectionItem>
          );
        })}
      </div>
    </section>
  );
}

export default SectionContainer;

import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import ActivitiesCard from './ActivitiesCard';
import Title from '@/common/components/Title';
import { activitiesMockData } from '@/common/mockData';
import { ArrowRight, Plus } from '@/common/components/icons';
import CustomButton from '@/common/components/CustomButton';

const ActivitiesSection = () => {
  return (
    <div className="flex w-full flex-col rounded bg-white text-gray-400 shadow-md">
      <div className="flex w-full items-center justify-between border-b border-custom-gray_500 py-2 pl-1 pr-2.5">
        <CustomButton
          type="text"
          size="small"
          className="flex items-center gap-x-1"
        >
          <Title tag="span" className="font-semibold text-custom-gray_200">
            Activities
          </Title>
          <ArrowRight />
        </CustomButton>
        <CustomButton
          size="small"
          type="text"
          icon={<Plus />}
          description="Add"
          borderLeft
        />
      </div>
      <div className="no-scrollbar size-full max-h-[calc(100vh_-_626px)]  overflow-y-scroll">
        {activitiesMockData?.map((activity, i, data) => {
          const prevDate = data[i - 1];
          const showDate =
            dayjs(prevDate?.date).format('DD-MM-YYYY') ===
            dayjs(activity?.date).format('DD-MM-YYYY');

          const today = new Date();

          const isToday =
            dayjs().format('DD-MM-YYYY') ===
            dayjs(activity?.date).format('DD-MM-YYYY');

          const isTomorrow =
            dayjs(today.setDate(today.getDate() + 1)).format('DD-MM-YYYY') ===
            dayjs(activity?.date).format('DD-MM-YYYY');

          return (
            <Fragment key={i}>
              {!showDate && (
                <div className="p-2.5">
                  <Title className="text-xs font-medium leading-4 text-custom-gray_850">
                    {isToday
                      ? 'Today'
                      : isTomorrow
                        ? 'Tomorrow'
                        : dayjs(activity?.date)?.format('DD, ddd MMM YYYY')}
                  </Title>
                </div>
              )}
              <ActivitiesCard title={activity?.title} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ActivitiesSection;

import React from 'react';
import dayjs from 'dayjs';

import ActivitiesCard from './ActivitiesCard';
import Title from '@/common/components/Title';
import CustomCalendar from './Calendar';
import { activitiesMockData } from '@/common/mockData';
import { Plus } from '@/common/components/icons';

const ActivitiesSection = () => {
  return (
    <>
      <CustomCalendar />
      <div className="mt-2 flex w-full flex-col gap-2 bg-white py-2 text-gray-400 shadow-md">
        <div className="flex w-full items-center justify-between gap-2 px-2 py-0">
          <Title className="font-semibold">Activities</Title>
          <Plus />
        </div>
        <hr />
        <div className="w-full px-2">
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
              <>
                {!showDate && (
                  <>
                    <div className="mt-2 w-full gap-2 pb-0">
                      <Title className="text-xs font-semibold">
                        {isToday
                          ? 'Today'
                          : isTomorrow
                            ? 'Tomorrow'
                            : dayjs(activity?.date)?.format('DD, ddd MMM YYYY')}
                      </Title>
                    </div>
                  </>
                )}
                <ActivitiesCard title={activity?.title} />
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ActivitiesSection;

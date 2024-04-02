import React from 'react';
import CustomCalendar from './Calendar';
import ActivitiesSection from './Activities/ActivitiesSection';
import RecentUpload from './RecentUpload';

function CalenderList() {
  return (
    <section className="space-y-2.5">
      <CustomCalendar />
      <ActivitiesSection />
      <RecentUpload />
    </section>
  );
}

export default CalenderList;

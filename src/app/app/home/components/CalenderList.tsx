import React from 'react';
import CustomCalendar from './Calendar';
import ActivitiesSection from './ActivitiesSection';

function CalenderList() {
  return (
    <section className="space-y-2.5">
      <CustomCalendar />
      <ActivitiesSection />
    </section>
  );
}

export default CalenderList;

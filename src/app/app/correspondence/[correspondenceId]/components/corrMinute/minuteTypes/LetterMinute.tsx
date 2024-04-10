import Title from '@/common/components/Title';
import React from 'react';

function LetterMinute() {
  return (
    <div className="flex flex-col gap-y-2.5 rounded border border-custom-gray_500 p-2.5">
      <Title tag="h6" semibold className="leading-[20.24px]">
        Executive Support Letter
      </Title>
      <Title className="text-custom-gray_750">Subtitle</Title>
      <Title small className="text-custom-gray_750">
        An Executive Support Letter is a formal document written by an
        individual, typically someone in a leadership or executive position, to
        express their support, endorse...
      </Title>
    </div>
  );
}

export default LetterMinute;

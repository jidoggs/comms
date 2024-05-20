import React from 'react';
import Title from '@/common/components/Title';
import MinuteForm from './MinuteForm';

const ExpandedMinuteForm = () => {
  return (
    <>
      <Title className="mb-6">New Minute</Title>
      <MinuteForm />
    </>
  );
};

export default ExpandedMinuteForm;

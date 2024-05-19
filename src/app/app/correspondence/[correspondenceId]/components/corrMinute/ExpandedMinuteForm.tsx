'use client';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React, { SetStateAction, useState } from 'react';
// import RichTextEditor, { EditorValue } from 'react-rte';
// import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
// import CustomMention from './Mentions';
// import Send from '@/common/components/icons/Send';
// import { User } from '@/types';
// import { CustomTextArea } from '@/common/components/CustomInput';
import MinuteForm from './MinuteForm';

const ExpandedMinuteForm = () => {
  // const [value, setValue] = useState('');

  // const [editorValue, setEditorValue] = React.useState(
  //   RichTextEditor.createValueFromString(value, 'markdown')
  // );

  // const handleTextChange = (value: SetStateAction<EditorValue>) => {
  //   setEditorValue(value);
  //   setValue(value?.toString('markdown'));
  // };
  return (
    <>
      <Title className="mb-6">New Minute</Title>
      <MinuteForm />
    </>
  );
};

export default ExpandedMinuteForm;

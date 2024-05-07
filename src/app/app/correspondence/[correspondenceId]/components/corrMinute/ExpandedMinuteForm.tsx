'use client';

import React, { SetStateAction, useState } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import CustomMention from './Mentions';
import { User } from '../../../types';
import Send from '@/common/components/icons/Send';


const ExpandedMinuteForm = () => {
  const [value, setValue] = useState('');

  const [editorValue, setEditorValue] = React.useState(
    RichTextEditor.createValueFromString(value, 'markdown')
  );

  const handleTextChange = (value: SetStateAction<EditorValue>) => {
    setEditorValue(value);
    setValue(value?.toString('markdown'));
  };

  const dummyData: Partial<User>[] = [
    {
      _id: '1',
      firstname: 'Ochade',
    },

    {
      _id: '2',
      firstname: 'Derek',
    },
  ];
  return (
    <>
      <>
        <Title className="mb-6">New Minute</Title>
        <CustomMention data={dummyData} />
        <RichTextEditor value={editorValue} onChange={handleTextChange} />
      </>

      <div className="mt-8 flex h-8 w-full justify-end">
        <CustomButton htmlType="submit" icon={<Send />} size="small">
          Push
        </CustomButton>
      </div>
    </>
  );
};

export default ExpandedMinuteForm;

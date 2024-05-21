'use client';
import React, { useState } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';

interface RichTextEditorProps {
  onChange?: (value: string) => void;
}

const CustomRichTextEditor: React.FC<RichTextEditorProps> = ({ onChange }) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  const handleChange = (newValue: EditorValue) => {
    setValue(newValue);
    onChange && onChange(newValue.toString('html'));
  };

  return <RichTextEditor value={value} onChange={handleChange} />;
};

export default CustomRichTextEditor;

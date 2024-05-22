'use client';
import React, { useEffect, useRef, useState } from 'react';
// import JoditEditor from 'jodit-react';
import JoditEditor from 'jodit-pro-react';

interface JoditProps {
  placeholder: string;
  onChange?: (value: string) => void;
}

interface JoditConfig {
  readonly?: boolean; // Make readonly optional
  placeholder?: string;
  // Add other Jodit configuration options here
}

const CustomJoditEditor = ({ placeholder, onChange }: JoditProps) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [config, setConfig] = useState<JoditConfig>({});

  useEffect(() => {
    setConfig({
      readonly: false,
      placeholder: placeholder || 'Start typings...',
    });
  }, [placeholder]);

  return (
    <>
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      //   tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      //   onChange={onChange}
      onChange={(newContent) => {
        onChange && onChange(newContent);
      }}
    />
    </>
  );
};

export default CustomJoditEditor;

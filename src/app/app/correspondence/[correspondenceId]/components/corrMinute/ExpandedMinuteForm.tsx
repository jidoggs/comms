'use client';

import React, { useState } from 'react';
import CustomInput from '@/common/CustomInput';
// import UploadCard from './UploadCard';
import {
  Link,
  Menu,
  PaperClip,
  Redo,
  Send,
  Stamp,
  Undo,
} from '@/common/components/icons';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';

interface ListItem {
  id: number;
  text: string;
}

const ExpandedMinuteForm = () => {
  // const router = useRouter();
  // const [file, setFile] = useState<File | null>();
  // const [stage, setStage] = useState(1);

  const [text, setText] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
   const [listItems] = useState<ListItem[]>([]);
  //  const [nextItemId, setNextItemId] = useState<number>(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newText = e.target.value;
    setText(newText);
    // Save the current state to history when text changes
    setHistory([...history.slice(0, currentIndex + 1), newText]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setText(history[currentIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setText(history[currentIndex + 1]);
    }
  };

  //  const handleAddItem = () => {
  //    const newItem: ListItem = { id: nextItemId, text };
  //    setListItems([...listItems, newItem]);
  //    setText('');
  //    setNextItemId(nextItemId + 1);
  //    setHistory([...history.slice(0, currentIndex + 1), listItems]);
  //    setCurrentIndex(currentIndex + 1);
  //  };

  //   console.log('FILES', file);
  return (
    <>
      <>
        <Title>New Minute</Title>
        <div
          className="!border-1 m-2 !border-custom-gray_200 p-2"
          style={{ border: '1px solid grey' }}
        >
          <CustomInput
            type="textarea"
            className="!focus:ring-0 !border-transparent"
            value={text}
            onChange={handleChange}
          />
          <ul>
            {listItems.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
          <div className="flex w-full justify-center p-1 shadow-md">
            <CustomButton
              size="small"
              type="text"
              icon={<Undo size={40} />}
              description="Undo"
              onClick={handleUndo}
              disabled={currentIndex <= 0}
            />
            <CustomButton
              size="small"
              type="text"
              icon={<Redo size={20} />}
              description="Redo"
              onClick={handleRedo}
              disabled={currentIndex >= history.length - 1}
            />
            <CustomButton
              size="small"
              type="text"
              icon={<Menu size={20} />}
              description="List"
              // onClick={handleAddItem}
            />
            <CustomButton
              size="small"
              type="text"
              icon={<Link size={20} />}
              description="Link"
            />
            <CustomButton
              size="small"
              type="text"
              icon={<PaperClip size={20} />}
              description=""
            />
            <CustomButton
              size="small"
              type="text"
              icon={<Stamp size={20} />}
              description="Stamp"
            />
          </div>
        </div>
        {/* {file && <UploadCard fileName={file?.name} />} */}
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

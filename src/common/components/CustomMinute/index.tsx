import TextArea from 'antd/es/input/TextArea';
import React, { useRef, useState } from 'react';
import CustomButton from '../CustomButton';
import Undo from '../icons/Undo';
import Redo from '../icons/Redo';
import ListUl from '../icons/ListUl';
import ListOl from '../icons/ListOl ';
import Link from '../icons/Link';
import PaperClip from '../icons/PaperClip';
import Edit from '../icons/Edit';
import Sticker from '../icons/Sticker';

interface CustomMinuteProps {
  onChange?: (value: string) => void;
}

const CustomMinute = ({ onChange }: CustomMinuteProps) => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // Ref for the TextArea
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newValue);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    onChange && onChange(newValue);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setValue(history[newIndex]);
      if (textAreaRef.current) {
        textAreaRef.current.focus(); // Keep focus on the TextArea
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setValue(history[newIndex]);
      if (textAreaRef.current) {
        textAreaRef.current.focus(); // Keep focus on the TextArea
      }
    }
  };

  return (
    <div className="rounded-md border border-custom-gray_400 !bg-custom-white_100">
      <div className="flex flex-col items-start gap-2 p-2 ">
        <TextArea
          ref={textAreaRef}
          className="!border-none"
          placeholder="Type minute"
          value={value}
          onChange={(e) => onValueChange(e)}
        />
        <div className="flex w-full flex-row gap-1 rounded-xl border border-custom-gray_500 p-2 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)]">
          <CustomButton
            type="text"
            icon={<Undo size="18" />}
            size="small"
            onClick={handleUndo}
            disabled={historyIndex === 0}
            description="Undo"
          />
          <CustomButton
            type="text"
            icon={<Redo size="18" />}
            size="small"
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
            description="Redo"
          />
          <div className="h-8 border border-custom-gray_100" />
          <CustomButton type="text" icon={<ListUl size="18" />} size="small" />
          <CustomButton type="text" icon={<ListOl size="18" />} size="small" />
          <div className="h-8 border border-custom-gray_100" />
          <CustomButton
            type="text"
            icon={<Link size="18" />}
            size="small"
            description="Link"
          />
          <CustomButton
            type="text"
            icon={<PaperClip size="18" />}
            size="small"
            description="Attach"
          />
          <div className="h-8 border border-custom-gray_100" />
          <CustomButton
            type="text"
            icon={<Sticker size="18" />}
            size="small"
            description="Stamp"
            title="Stamp"
          >
            Stamp
          </CustomButton>
          <CustomButton
            type="text"
            icon={<Edit size="18" />}
            size="small"
            title="Add Signature"
            description="Add Signature"
          >
            Add Signature
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CustomMinute;

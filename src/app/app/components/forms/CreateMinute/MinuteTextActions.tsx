import FormItem from 'antd/es/form/FormItem';
import React, { useRef, useState } from 'react';
import CustomButton from '../../../../../common/components/CustomButton';
import { CustomTextArea } from '../../../../../common/components/CustomInput';
import Undo from '../../../../../common/components/icons/Undo';
import Redo from '../../../../../common/components/icons/Redo';
import ListUl from '../../../../../common/components/icons/ListUl';
import ListOl from '../../../../../common/components/icons/ListOl ';
import Link from '../../../../../common/components/icons/Link';
import PaperClip from '../../../../../common/components/icons/PaperClip';
import Edit from '../../../../../common/components/icons/Edit';
import Sticker from '../../../../../common/components/icons/Sticker';
import { iHandleChange } from '@/types';
import { FormInstance } from 'antd/es/form/Form';

type Props = {
  updateUploadHandler: () => void;
  form: FormInstance<any>;
};

const MinuteTextActions = ({ updateUploadHandler, form }: Props) => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // Ref for the TextArea
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const onValueChange: iHandleChange<HTMLTextAreaElement> = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newValue);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const updateHelper = (newIndex: number) => {
    setHistoryIndex(newIndex);
    setValue(history[newIndex]);
    if (textAreaRef.current) {
      form.setFieldsValue({ minute: history[newIndex] });
      textAreaRef.current.focus(); // Keep focus on the TextArea
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      updateHelper(newIndex);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      updateHelper(newIndex);
    }
  };

  return (
    <div className="rounded-md border border-custom-gray_400 !bg-custom-white_100">
      <div className="flex flex-col items-start gap-2 p-2 ">
        <FormItem
          name="minute"
          rules={[{ required: true, message: 'Minute is required' }]}
          className="!mb-0 w-full [&_.ant-form-item-explain]:!hidden"
        >
          <CustomTextArea
            ref={textAreaRef}
            className="!border-none"
            placeholder="Type minute"
            onChange={onValueChange}
            classNames={{
              textarea: 'bg-transparent',
            }}
          />
        </FormItem>
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
            onClick={updateUploadHandler}
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

export default MinuteTextActions;

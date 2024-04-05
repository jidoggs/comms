import React, { useContext } from 'react';
import { Checkbox, Form } from 'antd';
import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { NoteContext } from '../../service-context/NotesContextWapper';
import { StickyNote } from '@/common/components/icons';
import { CreateNoteFormType } from './type';
import Colors from './Colors';

function CreateNote() {
  const noteContextInfo = useContext(NoteContext);
  return (
    <Form onFinish={noteContextInfo?.createNoteHandler}>
      <Form.Item<CreateNoteFormType>
        name="note"
        rules={[{ required: true, message: 'This Field is required' }]}
      >
        <CustomInput
          className="!bg-custom-cream_100"
          prefix={<StickyNote size={24} className="text-custom-gray_850" />}
          placeholder="Add note here"
        />
      </Form.Item>
      <div className="flex items-center justify-between">
        <Form.Item<CreateNoteFormType> name="isPrivate">
          <Checkbox>Make private</Checkbox>
        </Form.Item>
        <Form.Item<CreateNoteFormType> name="color">
          <Colors defaultValue={noteContextInfo?.color} />
        </Form.Item>
        <CustomButton htmlType="submit" size="small">
          Post
        </CustomButton>
      </div>
    </Form>
  );
}

export default CreateNote;

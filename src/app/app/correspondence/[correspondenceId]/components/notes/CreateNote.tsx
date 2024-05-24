import React, { useContext } from 'react';
import Checkbox from 'antd/es/checkbox/Checkbox';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import useForm from 'antd/es/form/hooks/useForm';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { NoteContext } from '../../service-context/NotesContextWapper';
import { CreateNoteFormType } from './type';
import Colors from './Colors';
import StickyNote from '@/common/components/icons/StickyNote';
import CloseCircled from '@/common/components/icons/CloseCircled';

function CreateNote() {
  const noteContextInfo = useContext(NoteContext);
  const [form] = useForm();

  const clearInputHandler = () => {
    const value = form.getFieldValue('note');
    if (value) {
      form.resetFields();
    } else {
      noteContextInfo?.deleteNoteHandler();
    }
  };

  return (
    <Form form={form} onFinish={noteContextInfo?.createNoteHandler}>
      <FormItem<CreateNoteFormType>
        name="note"
        rules={[{ required: true, message: 'This Field is required' }]}
      >
        <CustomInput
          className="!bg-custom-cream_100"
          prefix={<StickyNote size={24} className="text-custom-gray_850" />}
          placeholder="Add note here"
          suffix={
            <CustomButton
              size="small"
              type="text"
              icon={<CloseCircled />}
              onClick={clearInputHandler}
            />
          }
        />
      </FormItem>
      <div className="flex items-center justify-between">
        <FormItem<CreateNoteFormType> name="isPrivate">
          <Checkbox>Make private</Checkbox>
        </FormItem>
        <FormItem<CreateNoteFormType>
          name="color"
          initialValue={noteContextInfo?.color}
        >
          <Colors />
        </FormItem>
        <CustomButton htmlType="submit" size="small">
          Post
        </CustomButton>
      </div>
    </Form>
  );
}

export default CreateNote;

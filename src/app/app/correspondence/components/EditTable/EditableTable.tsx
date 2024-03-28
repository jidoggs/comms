/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef } from 'antd';
import { Form } from 'antd';
import { singleDummyCorrespondenceData } from '@/common/mockData';
import { mergeClassName } from '@/common/utils';
import EditableCellData from './EditableCell';

// type InputRef = GetRef<typeof Input> | any;
type FormInstance<T> = GetRef<typeof Form<T>>;
type ContextValue = {
  form: FormInstance<any>;
  selected: string;
};
export const EditableContext = React.createContext<ContextValue | null>(null);

type Point = typeof singleDummyCorrespondenceData;

export interface Item extends Point {
  id: number | string;
}

interface EditableRowProps {
  index: number;
}

export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  ...props
}) => {
  const [currentEnter, setcurrentEnter] = useState('');
  const [form] = Form.useForm();
  const properties = props as any;

  const onMouseEnterHandler = () => {
    setcurrentEnter(properties?.['data-row-key']);
  };
  const onMouseLeaveHandler = () => {
    setcurrentEnter('');
  };

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={{ form, selected: currentEnter }}>
        <tr
          {...props}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const { form } = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      if (inputRef.current?.focus) {
        inputRef.current!.focus();
      }
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') {
        toggleEdit();
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [editing]); //eslint-disable-line

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.error('Save failed:', errInfo); //eslint-disable-line
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <EditableCellData
          defaultValue={record?.[dataIndex]}
          ref={inputRef}
          save={save}
          name={dataIndex}
        />
      </Form.Item>
    ) : (
      <div
        className={mergeClassName(
          'editable-cell-value-wrap',
          record?.[dataIndex] ? '' : 'border'
        )}
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

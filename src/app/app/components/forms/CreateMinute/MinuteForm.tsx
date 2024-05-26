'use client';
import React, { ReactNode, useContext } from 'react';
import Title from '@/common/components/Title';
import dynamic from 'next/dynamic';
import MinuteRecipient from './MinuteRecipient';
import {
  CorrsInfoContext,
  DetailContext,
} from '../../../correspondence/[correspondenceId]/service-context/DetailContextWrapper';
import { useSearchParams } from 'next/navigation';
import Form, { FormInstance } from 'antd/es/form/Form';
import useMinute from '@/app/app/hooks/useMinute';
import { removeNullOrUndefinedProperties } from '@/common/utils';
import CustomButton from '@/common/components/CustomButton';
import Send from '@/common/components/icons/Send';
import Dragger from 'antd/es/upload/Dragger';
import CustomMinute from './MinuteTextActions';

const FormItem = dynamic(() => import('antd/es/form/FormItem'), { ssr: true });

type Props = {
  expandAction?: ReactNode;
  form: FormInstance<any>;
  isAttachmentOpen: boolean;
  isUploadOpen: boolean;
  toggleAttachment: () => void;
  toggleUpload: () => void;
};

const MinuteForm = ({
  expandAction,
  form,
  isAttachmentOpen,
  isUploadOpen,
  toggleAttachment,
  toggleUpload,
}: Props) => {
  const correspondenceData = useContext(CorrsInfoContext);
  const DetailContextInfo = useContext(DetailContext);
  const addToMinuteThread = DetailContextInfo?.addToMinuteThread;
  const minutesThread = DetailContextInfo?.minutesThread || [];
  const lastThreadItem = minutesThread?.[minutesThread.length - 1];
  const minuteData = correspondenceData?._id
    ? correspondenceData
    : lastThreadItem;
  const corrsId = useSearchParams().get('corrs') || correspondenceData?._id;

  const { createMinuteSwr } = useMinute({
    can_create: true,
    _id: corrsId,
  });

  const minuteFormSubmitHandler = async (values: any) => {
    const data = removeNullOrUndefinedProperties({
      ...values,
      last_minute: minuteData.last_minute?._id || minuteData._id,
      parastatal: minuteData?.parastatal?._id,
      recipient: values.recipient.value,
      recipient_type: values.recipient.title,
      attach: values?.attach?.map((item: any) => ({
        _id: item?.value,
        type: item?.title,
      })),
    });

    createMinuteSwr.trigger({ data }).then((res) => {
      if (addToMinuteThread) {
        addToMinuteThread(res.data);
      }
      form.resetFields();
    });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Title className="">New Minute</Title>
        {expandAction}
      </div>
      <Form
        className="flex flex-col gap-2"
        form={form}
        onFinish={minuteFormSubmitHandler}
      >
        {isUploadOpen ? (
          <div className="flex flex-row items-center justify-start gap-2 rounded-md border border-custom-gray_400 p-2 ">
            <Title className="pr-2">Upload:</Title>
            <FormItem name="upload" className="!m-0 flex flex-row">
              <Dragger
                beforeUpload={(_) => false} //eslint-disable-line
                accept={
                  'image/png, image/jpeg, image/jpg, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
                maxCount={2}
                multiple={true}
                className="flex flex-row items-center"
              >
                <button
                  type="button"
                  className=" flex-1 rounded border-2 border-custom-gray_400 p-1 uppercase text-custom-main sm:rounded-lg sm:px-2.5 sm:py-2 "
                >
                  Upload Document (Max: 2)
                </button>
              </Dragger>
            </FormItem>
          </div>
        ) : null}
        <div className="rounded-md border border-custom-gray_400 ">
          <MinuteRecipient
            actionHandler={toggleAttachment}
            name="recipient"
            title="Primary:"
            showAction={!isAttachmentOpen}
          />
          {isAttachmentOpen ? (
            <MinuteRecipient
              actionHandler={toggleAttachment}
              name="attach"
              title="Attach:"
              mode="multiple"
            />
          ) : null}
        </div>
        <CustomMinute form={form} updateUploadHandler={toggleUpload} />
        <div className="flex w-full justify-end">
          <CustomButton
            htmlType="submit"
            icon={<Send />}
            size="small"
            loading={createMinuteSwr.isMutating}
          >
            Push
          </CustomButton>
        </div>
      </Form>
    </>
  );
};

export default MinuteForm;

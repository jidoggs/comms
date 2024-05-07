'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Form, { FormProps } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { phoneNumberValidator } from '@/common/utils';
import ArrowRight from '@/common/components/icons/ArrowRight';

type Props = {
  onFinish: FormProps['onFinish'];
  isMutating: boolean;
};

const StepOneForm = ({ onFinish, isMutating }: Props) => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className="!w-full"
    >
      <FormItem
        label="First Name"
        name="firstname"
        rules={[{ required: true, message: 'Please input your first name' }]}
      >
        <CustomInput placeholder="Aa" disabled={isMutating} />
      </FormItem>
      <FormItem
        label="Surname"
        name="surname"
        rules={[{ required: true, message: 'Please input your surname' }]}
      >
        <CustomInput placeholder="Aa" disabled={isMutating} />
      </FormItem>
      <FormItem label="Middle name" name="middlename">
        <CustomInput placeholder="Aa" />
      </FormItem>
      <FormItem
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email', type: 'email' },
        ]}
        initialValue={email}
      >
        <CustomInput
          placeholder="name@email.ng"
          disabled={email.includes('@') || isMutating}
        />
      </FormItem>
      <FormItem
        label="Phone Number"
        name="phone"
        rules={[{ required: true, validator: phoneNumberValidator }]}
      >
        <CustomInput placeholder="Aa" disabled={isMutating} />
      </FormItem>

      <FormItem className="flex justify-end">
        <CustomButton loading={isMutating} htmlType="submit" block size="small">
          <span className="pr-1">Continue</span>
          {isMutating ? null : <ArrowRight />}
        </CustomButton>
      </FormItem>
    </Form>
  );
};

export default StepOneForm;

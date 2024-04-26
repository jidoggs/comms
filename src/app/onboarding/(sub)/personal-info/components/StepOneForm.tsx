'use client';
import React from 'react';
import { Form } from 'antd';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { ArrowRight } from '@/common/components/icons';
import { useRouter } from 'next/navigation';
import useOnboarding from '@/app/auth/hooks/useOnboarding';
import { formatPhoneNumber, phoneNumberValidator } from '@/common/utils';

const StepOneForm = () => {
  const [form] = Form.useForm();
  const { personalInfoTrigger, personalInfoIsMutating } = useOnboarding({
    personal_info: true,
  });
  const router = useRouter();

  const onFinish = (values: any) => {
    // const formatPhoneNumber = (phoneNumber: string) => {
    //   return phoneNumber.length === 10
    //     ? `+234${phoneNumber}`
    //     : phoneNumber.length === 11 && phoneNumber.startsWith('0')
    //       ? `+234${phoneNumber?.slice(1)}`
    //       : phoneNumber.length === 11
    //         ? `+234${phoneNumber?.slice(0, 10)}`
    //         : phoneNumber.length === 13 && phoneNumber.startsWith('+234')
    //           ? phoneNumber
    //           : phoneNumber.length === 14 && phoneNumber.startsWith('+234')
    //             ? phoneNumber
    //             : '';
    // };

    const allValues = {
      firstname: values.firstName,
      lastname: values.surname,
      othername: values.middleName && values.middleName,
      email: values.email,
      phoneNumber: formatPhoneNumber(values.phoneNumber),
    };

    // console.log('allValues', allValues);

    // router.push('/onboarding/office-info');
    personalInfoTrigger({ data: allValues, type: 'post' }).then(() => {
      router.push('/onboarding/office-info');
    });
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className="!w-full"
      style={{ width: '100%' }}
      form={form}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please input your first name' }]}
      >
        <CustomInput placeholder="Aa" disabled={personalInfoIsMutating} />
      </Form.Item>
      <Form.Item
        label="Surname"
        name="surname"
        rules={[{ required: true, message: 'Please input your surname' }]}
      >
        <CustomInput placeholder="Aa" disabled={personalInfoIsMutating} />
      </Form.Item>
      <Form.Item label="Middle name" name="middleName">
        <CustomInput placeholder="Aa" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email' },
          { type: 'email' },
        ]}
      >
        <CustomInput
          placeholder="name@email.ng"
          disabled={personalInfoIsMutating}
        />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, validator: phoneNumberValidator }]}
      >
        <CustomInput placeholder="Aa" disabled={personalInfoIsMutating} />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <CustomButton
          loading={personalInfoIsMutating}
          htmlType="submit"
          block
          size="small"
        >
          <span className="pr-1">Continue</span>
          {personalInfoIsMutating ? null : <ArrowRight />}
        </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default StepOneForm;

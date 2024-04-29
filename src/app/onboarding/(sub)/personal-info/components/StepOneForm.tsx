'use client';
import React from 'react';
import { Form } from 'antd';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { useRouter } from 'next/navigation';
import { formatPhoneNumber, phoneNumberValidator } from '@/common/utils';

const StepOneForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values: any) => {
    const allValues = {
      firstname: values.firstName,
      lastname: values.surname,
      othername: values.middleName && values.middleName,
      email: values.email,
      phoneNumber: formatPhoneNumber(values.phoneNumber),
    };

    // console.log(allValues);
    // create a localstorage object named onboardingData, then add allValues to the object
    localStorage.setItem('onboardingData', JSON.stringify(allValues));
    router.push('/onboarding/office-info');
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
        <CustomInput
          placeholder="Aa"
          // disabled={personalInfoIsMutating}
        />
      </Form.Item>
      <Form.Item
        label="Surname"
        name="surname"
        rules={[{ required: true, message: 'Please input your surname' }]}
      >
        <CustomInput
          placeholder="Aa"
          // disabled={personalInfoIsMutating}
        />
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
          // disabled={personalInfoIsMutating}
        />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, validator: phoneNumberValidator }]}
      >
        <CustomInput
          placeholder="Aa"
          // disabled={personalInfoIsMutating}
        />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <CustomButton
          // loading={personalInfoIsMutating}
          htmlType="submit"
          block
          size="small"
        >
          <span className="pr-1">Continue</span>
          {/* {personalInfoIsMutating ? null : <ArrowRight />} */}
        </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default StepOneForm;

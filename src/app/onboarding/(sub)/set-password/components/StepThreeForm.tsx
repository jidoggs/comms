'use client';
import React from 'react';
import { Form } from 'antd';
import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { ArrowRight } from '@/common/components/icons';
import useOnboarding from '@/app/auth/hooks/useOnboarding';
import { useRouter } from 'next/navigation';

type FieldType = {
  password?: string;
  // remember?: string;
};

type Validators = {
  form?: any;
  setPasswordIsMutating?: any;
};

const PasswordValidator = ({ setPasswordIsMutating }: Validators) => {
  const validatePassword = (_: any, value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_\-+=\\/?><{}|])[A-Za-z\d@!#$%^&*()_\-+=\\/?><{}|]{8,}$/;

    if (!regex.test(value)) {
      return Promise.reject(
        'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long'
      );
    }

    return Promise.resolve();
  };

  return (
    <Form.Item<FieldType>
      name="password"
      label="Set Password"
      rules={[
        { required: true, message: 'Please input your password!' },
        { validator: validatePassword },
      ]}
      hasFeedback
    >
      <CustomInput
        placeholder="Enter Password"
        type="password"
        disabled={setPasswordIsMutating}
      />
    </Form.Item>
  );
};

const StepThreeForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { setPasswordTrigger, setPasswordIsMutating } = useOnboarding({
    office_info: true,
  });

  const onFinish = (values: string[]) => {
    // router.push('/onboarding/success');
    setPasswordTrigger({ data: values, type: 'post' }).then(() => {
      router.push('/onboarding/success');
    });
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className="!w-full"
    >
      <PasswordValidator
        form={form}
        setPasswordIsMutating={setPasswordIsMutating}
      />
      <Form.Item
        name="confirm_password"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <CustomInput
          placeholder="Enter Password"
          type="password"
          disabled={setPasswordIsMutating}
        />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <CustomButton
          loading={setPasswordIsMutating}
          block
          size="small"
          htmlType="submit"
        >
          Set Password
          <ArrowRight />
        </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default StepThreeForm;

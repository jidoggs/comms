'use client';
import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { ArrowRight } from '@/common/components/icons';
import { useRouter } from 'next/navigation';
import useOnboarding from '@/common/hooks/useOnboarding';

type FieldType = {
  password?: string;
  // remember?: string;
};

type PasswordProps = {
  confirm_password: string;
  password: string;
};

type Validators = {
  form?: any;
  setPasswordIsMutating?: any;
};

type OnboardingProps = {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  phoneNumber: string;
  department: string;
  password: string;
  invite_code: string;
};

const PasswordValidator = ({ setPasswordIsMutating }: Validators) => {
  const validatePassword = (_: any, value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_\-+=\\/?><{}|])[A-Za-z\d@!#$%^&*()_\-+=\\/?><{}|]{8,}$/;

    if (!regex.test(value)) {
      return Promise.reject(
        <div>
          Password must contain: <br />
          At least one lowercase letter, <br />
          One uppercase letter, <br />
          One number, <br />
          One special character, and <br />
          Must be at least 8 characters long
        </div>
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
  const [onboardingData, setOnboardingdata] = useState<OnboardingProps>();

  useEffect(() => {
    const savedOnBoardingData = localStorage.getItem('onboardingData');
    if (savedOnBoardingData) {
      setOnboardingdata(JSON.parse(savedOnBoardingData));
    }
  }, []);

  const { createUserSwr } = useOnboarding({
    create_user: true,
  });

  const { trigger: createUserTrigger, isMutating: createUserIsMutating } =
    createUserSwr;

  const createNewUser = (values: PasswordProps) => {
    // console.log('values', values);

    createUserTrigger({
      data: {
        firstname: onboardingData && onboardingData.firstname,
        surname: onboardingData && onboardingData.lastname,
        middlename: onboardingData && onboardingData.middlename,
        email: onboardingData && onboardingData.email,
        phone: onboardingData && onboardingData.phoneNumber,
        department: onboardingData && onboardingData.department,
        password: values.password,
        invite_code: onboardingData && onboardingData.invite_code,
      },
      type: 'post',
    }).then(() => {
      message.success('User updated successfully');
      localStorage.removeItem('onboardingData');
      router.push('/onboarding/success');
    });
  };

  return (
    <Form
      name="basic"
      onFinish={createNewUser}
      autoComplete="off"
      layout="vertical"
      className="!w-full"
    >
      <PasswordValidator
        form={form}
        setPasswordIsMutating={createUserIsMutating}
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
          disabled={createUserIsMutating}
        />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <CustomButton
          loading={createUserIsMutating}
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

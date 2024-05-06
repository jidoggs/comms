'use client';
import React from 'react';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { useOnboarding } from '@/app/onboarding/hooks';
import { fetchOnboardUid } from '@/service/storage';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import {
  confirmPasswordValidator,
  passwordStrengthValidator,
} from '@/common/utils';
import { ArrowRight } from '@/common/components/icons';

type FieldType = {
  new_password: string;
  confirm_password: string;
};

const StepThreeForm = () => {
  const { authSwr } = useOnboarding({ step: 3 });

  const onFinish = (values: FieldType) => {
    const _id = fetchOnboardUid();
    const data = { password: values.new_password, _id };
    authSwr.trigger({ data, type: 'put' });
  };

  return (
    <Form
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className="w-100"
    >
      <FormItem<FieldType>
        label="New Password"
        name="new_password"
        rules={[{ required: true, validator: passwordStrengthValidator }]}
      >
        <CustomInput
          placeholder="Enter Password"
          type="password"
          name="new_password"
          disabled={authSwr.isMutating}
        />
      </FormItem>

      <FormItem
        name="confirm_password"
        label="Confirm Password"
        dependencies={['new_password']}
        rules={[confirmPasswordValidator]}
      >
        <CustomInput
          placeholder="Password"
          type="password"
          name="confirm_password"
          disabled={authSwr.isMutating}
        />
      </FormItem>

      <FormItem className="flex justify-end">
        <CustomButton
          loading={authSwr.isMutating}
          disabled={authSwr.isMutating}
          block
          size="small"
          htmlType="submit"
        >
          Reset Password
          {!authSwr.isMutating ? <ArrowRight /> : null}
        </CustomButton>
      </FormItem>
    </Form>
  );
};

export default StepThreeForm;

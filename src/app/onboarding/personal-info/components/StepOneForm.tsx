'use client';
import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
// import Link from 'next/link';
import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { ArrowRight } from '@/common/components/icons';

// import { apiErrorHandler } from "@/services";
// import { useRouter } from "next/navigation";
// import { setLocalStorageItem } from "@/util";
// import useAuth from "@/components/hooks/useAuth";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const StepOneForm = () => {
  const [clientReady, setClientReady] = useState<boolean>(false);
  // To disable submit button at the beginning.
  const [form] = Form.useForm();
  // const router = useRouter();

  // Watch all values
  // const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setClientReady(true);
      },
      () => {
        setClientReady(false);
      }
    );
  }, [form]);

  // const {
  //   loginSWR: { error, isMutating, trigger },
  // } = useAuth();

  // const onFinish = (values: any) => {
  // console.log("values", values);
  // trigger({
  //   data: values,
  // })
  //   .then((data) => {
  //     message.open({
  //       type: "success",
  //       content: "Successfully logged in",
  //     });
  //     setLocalStorageItem("user_details", data.data);
  //     router.push("/app/registrations");
  //   })
  //   .catch(() => {
  //     message.open({
  //       type: "error",
  //       content: apiErrorHandler(error),
  //     });
  //   });
  // };

  return (
    <Form
      name="basic"
      // onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className="!my-5 !w-full"
      style={{ width: '100%' }}
    >
      <Form.Item<FieldType>>
        <CustomInput label="Email" type="email" placeholder="user@gmail.com" />
      </Form.Item>

      <Form.Item<FieldType>>
        <CustomInput
          label="Password"
          placeholder="Enter Password"
          type="password"
        />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <CustomButton
          // isLoading={isMutating}
          disabled={!clientReady}
          block
          size="small"
          // icon={}
        >
          Continue
          <ArrowRight />
        </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default StepOneForm;

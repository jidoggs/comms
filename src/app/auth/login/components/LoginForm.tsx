'use client';
import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { CustomButton } from '@/common/components';
// import { apiErrorHandler } from "@/services";
// import { useRouter } from "next/navigation";
// import { setLocalStorageItem } from "@/util";
// import useAuth from "@/components/hooks/useAuth";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginForm = () => {
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
      <Form.Item<FieldType>
        label={
          <h3 className="text-[14px] font-medium leading-[17.71px]">Email</h3>
        }
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input
          className="!border-custom-gray_300 w-full"
          placeholder="Enter email"
          // disabled={isMutating}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label={
          <h3 className="text-[14px] font-medium leading-[17.71px]">
            Password
          </h3>
        }
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password
          placeholder="Enter password"
          className="!border-custom-gray_300 w-full"
          // disabled={isMutating}
        />
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Link
          href={'/auth/forgot-password'}
          className="!text-custom-black_200 !text-center !text-[14px] !font-bold !leading-[17.71px]"
        >
          Forgot Password?
        </Link>
      </Form.Item>

      <Form.Item>
        <CustomButton
          // isLoading={isMutating}
          disabled={!clientReady}
          className="text-white-100 w-full rounded-lg bg-black sm:w-auto md:w-full"
        >
          Login
        </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

"use client";
import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import Link from "next/link";
import { CustomButton } from "@/common/components";
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
      className="!w-full !my-5"
      style={{ width: "100%" }}
    >
      <Form.Item<FieldType>
        label={
          <h3 className="text-[14px] leading-[17.71px] font-medium">Email</h3>
        }
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          className="w-full !border-[#333333]"
          placeholder="Enter email"
          // disabled={isMutating}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label={
          <h3 className="text-[14px] leading-[17.71px] font-medium">
            Password
          </h3>
        }
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Enter password"
          className="w-full !border-[#333333]"
          // disabled={isMutating}
        />
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Link
          href={"/auth/forgot-password"}
          className="!text-[#121212] !text-[14px] !leading-[17.71px] !font-bold !text-center"
        >
          Forgot Password?
        </Link>
      </Form.Item>

      <Form.Item>
        <CustomButton
          // isLoading={isMutating}
          disabled={!clientReady}
          className="text-white-100 w-full md:w-full sm:w-auto bg-black rounded-lg"
        >
          Login
        </CustomButton>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

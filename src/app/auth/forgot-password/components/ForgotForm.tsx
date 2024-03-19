"use client";
import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import Link from "next/link";
// import { apiErrorHandler } from "@/services";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/common/components";
// import { useAuth } from "@/components/hooks";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const ForgotForm = () => {
  const [clientReady, setClientReady] = useState<boolean>(false);
  // To disable submit button at the beginning.
  const [form] = Form.useForm();
  const router = useRouter();

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    if (values?.email) {
      setClientReady(true);
    } else {
      setClientReady(false);
    }
    // form.validateFields({ validateOnly: true }).then(
    //   () => {
    //     setClientReady(true);
    //   },
    //   () => {
    //     setClientReady(false);
    //   }
    // );
  }, [form, values]);

  // const {
  //   forgotPasswordSWR: { error, isMutating, trigger },
  // } = useAuth();

  const onFinish = (values: any) => {
    // console.log("values", values);
    router.push(`/auth/verify?email=${values.email}`);
    // trigger({
    //   data: values,
    // })
    //   .then(() => {
    //     message.open({
    //       type: "success",
    //       content: "Reset email successfully sent",
    //     });
    //     router.push(`/auth/verify?email=${values.email}`);
    //   })
    //   .catch(() => {
    //     message.open({
    //       type: "error",
    //       content: apiErrorHandler(error),
    //     });
    //   });
  };

  // console.log("clientReady", clientReady);
  // console.log("values", values);

  return (
    <Form
      name="basic"
      onFinish={onFinish}
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
        <Input className="w-full !border-[#333333]" placeholder="Enter email" />
      </Form.Item>

      <Form.Item>
        <CustomButton
          // isLoading={isMutating}
          disabled={!clientReady}
          className={
            clientReady
              ? "bg-[#11142D] text-white-100 w-full md:w-full sm:w-auto"
              : "bg-[#BDBDBD] text-white-100 w-full md:w-full sm:w-auto"
          }
        >
          Continue
        </CustomButton>
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Link
          href={"/auth/login"}
          className="!text-[#11142D] !text-[14px] !leading-[17.71px] !font-bold !text-center"
        >
          Login
        </Link>
      </Form.Item>
    </Form>
  );
};

export default ForgotForm;

'use client';
import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import Link from 'next/link';
// import { apiErrorHandler } from "@/services";
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/common/components';
import CustomInput from '@/common/CustomInput';
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
      className="!my-5 !w-full"
      style={{ width: '100%' }}
    >
      <Form.Item<FieldType>
       
      >
        <CustomInput label='Email' type='email' placeholder='user@email.com' />
      </Form.Item>

      <Form.Item>
        <CustomButton
          // isLoading={isMutating}
          disabled={!clientReady}
          className={
            clientReady
              ? 'text-white-100 bg-custom-main w-full sm:w-auto md:w-full'
              : 'text-white-100 bg-custom-gray_400 w-full sm:w-auto md:w-full'
          }
        >
          Continue
        </CustomButton>
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Link
          href={'/auth/login'}
          className="!text-custom-main !text-center !text-[14px] !font-bold !leading-[17.71px]"
        >
          Login
        </Link>
      </Form.Item>
    </Form>
  );
};

export default ForgotForm;

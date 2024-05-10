import Form, { FormProps } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import CustomSelect from '@/common/components/CustomSelect';
import CustomButton from '@/common/components/CustomButton';
import CloseCircled from '@/common/components/icons/CloseCircled';
import { useSession } from '@/common/hooks';
import { useParastatals } from '@/app/admin/hooks';

type Props = {
  onFinish: FormProps['onFinish'];
  isLoading: boolean;
};

function InviteForm({ onFinish, isLoading }: Props) {
  const parastatal = useSession().data?.parastatal?.[0]?._id;
  const { getItemSwr } = useParastatals({
    can_get_by_id: true,
    _id: parastatal,
  });

  const acceptedDomains = getItemSwr.data?.data?.domains;

  const domainValidator = (_: any, values: string) => {
    if (!acceptedDomains) {
      return Promise.reject(
        'You cannot add any user to the parastatal you belong to. Please contact Admin'
      );
    }
    if (!values) {
      return Promise.reject('Please input the emails');
    }

    for (let index = 0; index < values.length; index++) {
      const value = values[index];

      if (!acceptedDomains.find((domain) => value.includes(domain))) {
        return Promise.reject(
          'Invite field contain at least 1 user that cannot be part of the parastatal you belong to'
        );
      }
    }

    return Promise.resolve();
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="flex items-start gap-x-2.5 !pb-44"
    >
      <FormItem
        name="emails"
        rules={[{ validator: domainValidator, required: true }]}
        className="flex-1"
      >
        <CustomSelect
          disabled={isLoading || getItemSwr.isLoading}
          mode="tags"
          placeholder="|Add by name or email. Type ',' to add, ‘⌫’ to remove"
          tokenSeparators={[',']}
          removeIcon={<CloseCircled className="text-white" />}
        />
      </FormItem>
      <CustomButton
        className={{
          button: '!m-0 !py-4 px-2',
          container: 'items-start',
        }}
        htmlType="submit"
        size="middle"
        loading={isLoading || getItemSwr.isLoading}
      >
        Invite
      </CustomButton>
    </Form>
  );
}

export default InviteForm;

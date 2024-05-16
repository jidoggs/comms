import Form, { FormProps } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React, { useContext } from 'react';
import CustomSelect from '@/common/components/CustomSelect';
import CustomButton from '@/common/components/CustomButton';
import CloseCircled from '@/common/components/icons/CloseCircled';
import { useSession } from '@/common/hooks';
import { useParastatals } from '@/app/admin/hooks';
import { CascadeContext } from '@/common/components/SectionCascade';

type Props = {
  onFinish: FormProps['onFinish'];
  isLoading: boolean;
};

function InviteForm({ onFinish, isLoading }: Props) {
  const cascadeContextInfo = useContext(CascadeContext);
  const cascadeDomains = cascadeContextInfo?.dataList.parastatal.data?.domains;
  const parastatal = useSession().data?.parastatal?.[0]?._id;
  const { getItemSwr } = useParastatals({
    can_get_by_id: cascadeDomains?.length ? false : true, // only fetch if there is no accepted domain
    _id: parastatal,
  });

  const domains = cascadeDomains || getItemSwr.data?.data?.[0].domains;

  const domainValidator = (_: any, values: string) => {
    if (!domains) {
      return Promise.reject(
        'You cannot add any user to the parastatal you belong to. Please contact Admin'
      );
    }
    if (!values) {
      return Promise.reject('Please input the emails');
    }

    for (let index = 0; index < values.length; index++) {
      const value = values[index];

      if (!domains.find((domain) => value.includes(domain))) {
        let lang = '';

        domains.forEach((domain: string, index) => {
          if (domains.length - 1 !== index && index !== 0) {
            lang += `, ${domain}`;
          }
          if (domains.length - 1 === index && index !== 0) {
            lang += ` or ${domain}`;
          }
          if (index === 0) {
            lang += `${domain}`;
          }
          if (domains.length - 1 === index) {
            lang += ` domain${index ? 's' : ''}`;
          }
        });

        return Promise.reject(
          `You can only send an invite to users with ${lang}`
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
          loading={getItemSwr.isLoading}
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

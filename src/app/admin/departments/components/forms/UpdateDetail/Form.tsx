import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { useSWRConfig } from 'swr';
import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { CascadeContext } from '@/common/components/SectionCascade';
import CustomButton from '@/common/components/CustomButton';
import CustomInput from '@/common/components/CustomInput';
import { CustomInputProps } from '@/common/components/CustomInput/types';
import Title from '@/common/components/Title';
import { MoreInfoContext } from '../../modals/MoreInformationModal';
import DeleteInformation from '../../actions/DeleteInformation';
import TickCircle from '@/common/components/icons/TickCircle';
import Close from '@/common/components/icons/Close';
import Building from '@/common/components/icons/Building';

type FieldRowProps = {
  label: string;
  name: string;
} & CustomInputProps;

const FieldRow = ({ label, name, ...props }: FieldRowProps) => {
  return (
    <FormItem
      label={label}
      name={name}
      className="!mb-0 border-b [&_.ant-form-item-row]:flex [&_.ant-form-item-row]:items-center"
    >
      <CustomInput
        className="!mb-0 !border-none !bg-transparent"
        name={name}
        {...props}
      />
    </FormItem>
  );
};

function MoreInformationForm() {
  const information = useContext(MoreInfoContext);
  const cascadeContextInfo = useContext(CascadeContext);
  const { mutate } = useSWRConfig();
  const data = information?.data;
  const type = information?.type;

  const submitHandler = (values: any) => {
    if (!information?.handleUpdate) return;
    information
      ?.handleUpdate({ data: values, type: 'put' })
      .then(() => {
        if (!cascadeContextInfo?.updateCascadeItemHandler || !type) return;
        mutate(cascadeContextInfo.dataList?.[type]?.key); // revalidate key
        cascadeContextInfo?.updateCascadeItemHandler({
          level: information.type,
          id: data?._id,
          title: values.name,
        }); //update state stored info
      })
      .finally(information?.handleCancel);
  };
  return (
    <div className="flex h-[calc(100vh-40px)] w-full justify-center pb-8">
      <Form className="w-2/4" onFinish={submitHandler}>
        <Title bold tag="h6" className="pb-5">
          Details
        </Title>
        <div className="flex gap-x-2.5  border-b pb-7">
          <div className="text-custom-main">
            <Building size={200} />
          </div>
          <div className="flex flex-col justify-end">
            <div className="flex items-center gap-x-1 px-2.5 py-1">
              <div className="size-2 rounded bg-custom-green_100" />
              <p>Active</p>
            </div>
            <div className="flex gap-2">
              <DeleteInformation />
              <CustomButton
                type="default"
                className="!border-custom-green_100 !bg-custom-gray_100 !px-6"
                icon={<TickCircle size={18} color="green" />}
                size="small"
                title="Update"
                htmlType="submit"
              />
              <CustomButton
                type="default"
                className="!border-custom-red_200 !bg-custom-gray_100 !px-6"
                icon={<Close size={32} color="green" />}
                size="small"
                title="Cancel"
                onClick={information?.handleCancel}
              />
            </div>
          </div>
        </div>
        <div>
          <FieldRow
            label="Name"
            name="name"
            defaultValue={data?.name as string}
          />
          <FieldRow
            label="Path"
            name="path"
            defaultValue={data?.path as string}
          />
          <FieldRow
            label="domains"
            name="domains"
            defaultValue={data?.domains?.join(', ') as string}
          />
          <FieldRow
            label="Number of members"
            name="count"
            defaultValue={data?.members_count}
            disabled
          />
        </div>
        <Title bold tag="h6" className="py-5">
          More details
        </Title>
        <div>
          <FieldRow
            label="Parastatal"
            name="parastatal"
            disabled
            defaultValue={data?.parastatal}
          />
          <FieldRow
            label="Date added"
            name="created_at"
            disabled
            defaultValue={dayjs(data?.created_at).format('DD-MMM-YYYY')}
          />
          <FieldRow
            label="Last updated"
            name="updated_at"
            disabled
            defaultValue={dayjs(data?.updated_at).format('DD-MMM-YYYY')}
          />
          <FieldRow
            label="Created by"
            name="creator"
            disabled
            defaultValue={data?.creator}
          />
          <FieldRow
            label="Role of creator"
            name="creator_role"
            disabled
            defaultValue={data?.creator}
          />
        </div>
      </Form>
    </div>
  );
}

export default MoreInformationForm;

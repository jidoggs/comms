import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';

import Form from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { CascadeContext } from '@/common/components/SectionCascade';
import CustomButton from '@/common/components/CustomButton';
import CustomInput from '@/common/components/CustomInput';
import { CustomInputProps } from '@/common/components/CustomInput/types';
import Title from '@/common/components/Title';
import { MoreInfoContext } from '../../modals/MoreInformationModal';
import DeleteInformation from '../../actions/DeleteInformation';
import Close from '@/common/components/icons/Close';
import Building from '@/common/components/icons/Building';
import Tick from '@/common/components/icons/Tick';
import CustomSelect from '@/common/components/CustomSelect';
import CloseCircled from '@/common/components/icons/CloseCircled';
import { messageHandler } from '@/common/utils/notification';
import { useRoles } from '@/app/admin/hooks';
import { useServiceConfig } from '@/service/swrHooks';

type FieldRowProps = {
  label: string;
  name: string;
} & CustomInputProps;

type SelectRowProps = {
  defaultValue: string[];
} & FieldRowProps;

const FieldRow = ({ label, name, ...props }: FieldRowProps) => {
  return (
    <FormItem
      label={label}
      name={name}
      className="!mb-0 border-b [&_.ant-form-item-row]:flex [&_.ant-form-item-row]:items-center"
    >
      <CustomInput
        {...props}
        className="!mb-0 !border-none !bg-transparent disabled:!text-custom-main"
        name={name}
      />
    </FormItem>
  );
};

const SelectFieldRow = ({ label, name, ...props }: SelectRowProps) => {
  const [isEditable, setIsEditable] = useState(false);

  const focusHandler = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div>
      <FormItem
        label={label}
        name={name}
        className="!mb-0 border-b [&_.ant-form-item-row]:flex [&_.ant-form-item-row]:items-center"
      >
        {isEditable ? (
          <CustomSelect
            {...props}
            mode="tags"
            placeholder="|Add by name or email. Type ',' to add, ‘⌫’ to remove"
            className="[&_.ant-select-arrow]:!hidden [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!bg-transparent"
            tokenSeparators={[',']}
            removeIcon={<CloseCircled className="text-white" />}
            onBlur={focusHandler}
          />
        ) : (
          <CustomInput
            {...props}
            className="!mb-0 !border-none !bg-transparent"
            name={name}
            defaultValue={props?.defaultValue?.join(', ')}
            onFocus={focusHandler}
          />
        )}
      </FormItem>
    </div>
  );
};

function MoreInformationForm() {
  const information = useContext(MoreInfoContext);
  const cascadeContextInfo = useContext(CascadeContext);
  const { revalidateRequest } = useServiceConfig();
  const data = information?.data;
  const type = information?.type;

  const { getRoleSwr } = useRoles({
    can_get_by_id: true,
    _id: data?.creator?.role,
  });

  const paths = [
    data?.parastatal?.[0]?.name,
    data?.office?.name,
    data?.department?.name,
  ]
    .filter((itm) => itm)
    .join('/');

  const submitHandler = (values: any) => {
    const updatedValues = Object.values(values).filter((itm) => itm);
    if (updatedValues.length === 0) {
      messageHandler('warn', 'You have not made any change');
      return;
    }
    if (!information?.handleUpdate) return;
    information
      ?.handleUpdate({ data: values, type: 'put' })
      .then(() => {
        if (!cascadeContextInfo?.updateCascadeItemHandler || !type) return;
        revalidateRequest(cascadeContextInfo.dataList?.[type]?.key); // revalidate key
        cascadeContextInfo?.updateCascadeItemHandler({
          level: information.type,
          id: data?._id,
          title: values.name,
        }); //update state stored info
      })
      .finally(information?.handleCancel);
  };
  return (
    <Form
      className="!mx-auto size-full min-w-[400px] max-w-4xl"
      onFinish={submitHandler}
    >
      <header>
        <Title tag="h6" bold className="py-5">
          Details
        </Title>
        <div className="flex gap-x-2.5  border-b pb-7">
          <div className="text-custom-main">
            <Building size={200} />
          </div>
          <div className="flex flex-col flex-wrap justify-end">
            <div className="flex items-center gap-x-1 px-2.5 py-1">
              <div className="size-2 rounded bg-custom-green_100" />
              <p>Active</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <DeleteInformation />
              <CustomButton
                type="default"
                className="!border-custom-green_100 !bg-custom-gray_100 !px-6"
                icon={
                  <span className="text-custom-green_100">
                    <Tick size={18} />
                  </span>
                }
                size="small"
                title="Update"
                htmlType="submit"
              />
              <CustomButton
                type="default"
                className="!border-custom-red_200 !bg-custom-gray_100 !px-6"
                icon={
                  <span className="text-custom-red_200">
                    <Close size={32} />
                  </span>
                }
                size="small"
                title="Cancel"
                onClick={information?.handleCancel}
              />
            </div>
          </div>
        </div>
      </header>
      <section className="h-[calc(100vh-372px)] overflow-y-scroll">
        <div>
          <FieldRow
            label="Name"
            name="name"
            defaultValue={data?.name as string}
          />
          <FieldRow label="Path" name="path" defaultValue={paths} disabled />
          {data?.domains?.length > 0 ? (
            <SelectFieldRow
              label="Domains"
              name="domains"
              defaultValue={data?.domains}
            />
          ) : null}
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
            defaultValue={
              data?.parastatal?.[0]?.name ||
              data?.parastatal?.name ||
              data?.parastatal
            }
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
            defaultValue={data?.creator?.firstname || data?.creator || 'N/A'}
          />
          <FieldRow
            label="Role of creator"
            name="creator_role"
            disabled
            defaultValue={getRoleSwr.data?.data.name || 'N/A'}
          />
        </div>
      </section>
    </Form>
  );
}

export default MoreInformationForm;

import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import Form, { FormProps } from 'antd/es/form/Form';
import { CascadeContext } from '@/common/components/SectionCascade';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { MoreInfoContext } from '../../modals/MoreInformationModal';
import DeleteInformation from '../../actions/DeleteInformation';
import Close from '@/common/components/icons/Close';
import Building from '@/common/components/icons/Building';
import Tick from '@/common/components/icons/Tick';
import { messageHandler } from '@/common/utils/notification';
import { useRoles } from '@/app/admin/hooks';
import { useServiceConfig } from '@/service/swrHooks';
import FieldRow, { SelectFieldRow } from './FieldRow';

function MoreInformationForm() {
  const information = useContext(MoreInfoContext);
  const cascadeContextInfo = useContext(CascadeContext);
  const [changes, setChanges] = useState<Record<string, any>>({});
  const { revalidateRequest } = useServiceConfig();
  const data = information?.data;
  const type = information?.type;

  const { getRoleSwr } = useRoles({
    can_get_by_id: true,
    _id: data?.creator?.role,
  });

  const paths = [
    data?.parastatal?.name,
    data?.office?.name,
    data?.department?.name,
    data?.name,
  ]
    .filter((itm) => itm)
    .join('/');

  const formChangeHandler: FormProps['onValuesChange'] = (value) => {
    setChanges((prev) => ({ ...prev, ...value }));
  };

  const submitHandler = () => {
    const updatedValues = Object.values(changes).filter((itm) => itm);
    if (updatedValues.length === 0) {
      messageHandler('warn', 'You have not made any change');
      return;
    }
    if (!information?.handleUpdate) return;
    information
      ?.handleUpdate({ data: changes, type: 'put' })
      .then(() => {
        if (!cascadeContextInfo?.updateCascadeItemHandler || !type) return;
        revalidateRequest(cascadeContextInfo.dataList?.[type]?.key); // revalidate key
        cascadeContextInfo?.updateCascadeItemHandler({
          level: information.type,
          data: {
            ...changes,
          },
        }); //update state stored info
      })
      .finally(information?.handleCancel);
  };
  return (
    <Form
      className="!mx-auto size-full min-w-[400px] max-w-4xl"
      onFinish={submitHandler}
      onValuesChange={formChangeHandler}
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
              {Object.keys(changes).length ? (
                <>
                  <CustomButton
                    type="default"
                    className="!border-custom-green_100 !bg-custom-gray_100 !px-6 !text-custom-green_100 disabled:!border-custom-gray_850 disabled:!text-custom-gray_850"
                    icon={
                      <span>
                        <Tick size={32} />
                      </span>
                    }
                    size="small"
                    title="Update"
                    htmlType="submit"
                    loading={information?.isUpdating}
                    disabled={information?.isUpdating}
                  />
                  <CustomButton
                    type="default"
                    className="!border-custom-red_200 !bg-custom-gray_100 !px-6 !text-custom-red_200 disabled:!border-custom-gray_850 disabled:!text-custom-gray_850"
                    icon={
                      <span>
                        <Close size={32} />
                      </span>
                    }
                    size="small"
                    title="Cancel"
                    onClick={information?.handleCancel}
                    disabled={information?.isUpdating}
                  />
                </>
              ) : null}
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
          {getRoleSwr.data?.data.name ? (
            <FieldRow
              label="Role of creator"
              name="creator_role"
              disabled
              className="capitalize"
              defaultValue={getRoleSwr.data?.data.name.replace(/_/g, ' ')}
            />
          ) : null}
        </div>
      </section>
    </Form>
  );
}

export default MoreInformationForm;

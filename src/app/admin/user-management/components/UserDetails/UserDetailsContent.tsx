import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import FieldRow, { SelectFieldRow } from '../../../components/FieldRow';
import TickCircle from '@/common/components/icons/TickCircle';
import Edit2 from '@/common/components/icons/Edit2';
import Close from '@/common/components/icons/Close';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import Profile from '@/common/components/icons/Profile';
import Form, { FormProps } from 'antd/es/form/Form';
import { User } from '@/types';
import useUsers from '@/app/admin/hooks/useUsers';
import { useOnboarding } from '@/app/onboarding/hooks';

type UserDetailsContentProps = {
  userData: User | null;
  closeHandler?: () => void;
};

const UserDetailsContent = ({
  userData,
  closeHandler,
}: UserDetailsContentProps) => {
  const [isEdit, setIsEdit] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [changes, setChanges] = useState<Partial<User>>({});
  const { updateUserSwr } = useUsers({ can_update_by_id: true });
  const [selectedOffice, setSelectedOffice] = useState('');
  const { getOfficeSwr } = useOnboarding({
    can_get_office: true,
    parastatal: userData?.parastatal?.[0]?._id,
  });
  const { getDepartmentSwr } = useOnboarding({
    can_get_department: true,
    office: userData?.office?.[0]?._id || selectedOffice,
    parastatal: userData?.parastatal?.[0]?._id,
  });

  const changesTracker = () => {
    const trackedChanges = Object.keys(changes) as Array<keyof User>;
    let actualChange = 0;
    trackedChanges.forEach((change) => {
      if (changes[change] !== userData?.[change]) {
        actualChange++;
      }
    });
    return actualChange;
  };

  const numberOfChanges = changesTracker();

  useEffect(() => {
    if (numberOfChanges === 0) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [numberOfChanges]);

  const valueChangeHandler: FormProps['onValuesChange'] = (value) => {
    setChanges((prev) => ({ ...prev, ...value }));
  };

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const editSubmitHandler = () => {
    if (numberOfChanges === 0) {
      return;
    }
    const data = { _id: userData?._id, ...changes };
    updateUserSwr.trigger({ data, type: 'put' }).finally(closeHandler);
  };

  return (
    <>
      <Form
        className="!mx-auto size-full min-w-[400px] max-w-4xl"
        onValuesChange={valueChangeHandler}
        // onFinish={editSubmitHandler}
      >
        <div className="mx-auto w-2/3">
          <header className="border-b">
            <Title className="font-semibold text-custom-gray_600">
              Personal
            </Title>
            <div className="flex gap-2 py-2">
              {userData?.img ? (
                <Image
                  width={140}
                  height={140}
                  style={{ objectFit: 'contain' }}
                  src={userData?.img || ''}
                  alt="User avatar"
                />
              ) : (
                <CustomAvatar
                  src={userData?.img}
                  size={140}
                  style={{
                    borderRadius: 0,
                  }}
                  icon={
                    <span className="flex h-full flex-1 items-center justify-center">
                      <Profile size="70" className="stroke-white" />
                    </span>
                  }
                />
              )}
              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded bg-custom-green_100" />
                  <p className="capitalize">Active</p>
                </div>
                <div className="flex gap-2">
                  {isEdit ? (
                    <>
                      <CustomButton
                        className="!border-custom-green_100 !bg-custom-gray_100 !px-6 !text-custom-green_100 disabled:!border-custom-gray_850 disabled:!text-custom-gray_850"
                        icon={<TickCircle size={18} />}
                        size="small"
                        title="Save"
                        htmlType="button"
                        onClick={editSubmitHandler}
                        loading={updateUserSwr.isMutating}
                        disabled={updateUserSwr.isMutating}
                      />
                      <CustomButton
                        className="!border-custom-red_200 !bg-custom-gray_100 !px-6 !text-custom-red_200 disabled:!border-custom-gray_850 disabled:!text-custom-gray_850"
                        icon={<Close size={32} />}
                        size="small"
                        title="Cancel Edit"
                        htmlType="button"
                        onClick={closeHandler}
                        disabled={updateUserSwr.isMutating}
                      />
                    </>
                  ) : (
                    <>
                      <CustomButton
                        className="!border-custom-green_100 !bg-custom-gray_100 !px-6 !text-custom-green_100 disabled:!border-custom-gray_850 disabled:!text-custom-gray_850"
                        icon={<Edit2 size={18} />}
                        size="small"
                        title="Edit Profile"
                        onClick={toggleEdit}
                        htmlType="button"
                      />
                      {/* <CustomButton
                        type="default"
                        className="!border-custom-red_200 !bg-custom-gray_100 !px-6 !text-custom-red_200 disabled:!border-custom-gray_850 disabled:!text-custom-gray_850"
                        icon={<Delete color="red" />}
                        size="small"
                        title="Delete Profile"
                        htmlType="button"
                        onClick={handleOpenModal}
                      /> */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>
          <section className="h-[calc(100vh-214px)] overflow-y-scroll">
            <div>
              <FieldRow
                label="Firstname"
                name="name"
                rules={[
                  { message: 'This field cannot be empty', required: true },
                ]}
                defaultValue={userData?.firstname}
              />
              <FieldRow
                label="Surname"
                name="surname"
                rules={[
                  { message: 'This field cannot be empty', required: true },
                ]}
                defaultValue={userData?.surname}
              />
              <FieldRow
                label="Middle"
                name="middlename"
                defaultValue={userData?.middlename}
              />
              <FieldRow
                label="Email"
                name="email"
                defaultValue={userData?.email}
                rules={[{ type: 'email', required: true }]}
              />
              {/* <FieldRow
                label="Phone Number"
                name="phone"
                defaultValue={userData?.phone}
                rules={[{ validator: phoneNumberValidator, required: true }]}
              /> */}
              <FieldRow
                label="Date Added"
                name="created_at"
                disabled
                defaultValue={dayjs(userData?.created_at)?.format(
                  'DD-MMM-YYYY'
                )}
              />
              <FieldRow
                label="Last Active"
                name="last_seen"
                disabled
                defaultValue={dayjs(userData?.last_seen)?.format('DD-MMM-YYYY')}
              />
            </div>
            <Title bold tag="h6" className="py-5">
              Office
            </Title>
            <div>
              <FieldRow
                label="Title"
                name="title"
                disabled
                defaultValue={userData?.title}
              />
              <SelectFieldRow
                label="Department"
                name="department"
                defaultValue={userData?.department?.[0]?.name}
                options={getDepartmentSwr.data?.data.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                loading={getDepartmentSwr.isLoading}
                defaultModeSelect
              />
              <SelectFieldRow
                label="Office"
                name="office"
                defaultValue={userData?.office?.[0]?.name}
                options={getOfficeSwr.data?.data.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                onSelect={(val) => setSelectedOffice(val)}
                loading={getOfficeSwr.isLoading}
                defaultModeSelect
              />
              <FieldRow
                label="Parastatal"
                name="parastatal"
                disabled
                defaultValue={userData?.parastatal?.[0]?.name}
              />
              <FieldRow
                label="Role"
                name="role"
                disabled
                className="capitalize"
                defaultValue={userData?.role?.name?.replace(/_/g, ' ')}
              />
            </div>
          </section>
        </div>
      </Form>
      {/* <DeleteModal
        warningText="Are you sure you want to delete this account?"
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        deleteRoleIsMutating={false}
        handleCancel={() => setIsModalOpen(false)}
      /> */}
    </>
  );
};

export default UserDetailsContent;

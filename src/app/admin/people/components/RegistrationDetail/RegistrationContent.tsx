import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useContext } from 'react';
import Form from 'antd/es/form/Form';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';
import FieldRow from '../../../components/FieldRow';
import Close from '@/common/components/icons/Close';
import Delete from '@/common/components/icons/Delete';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import Profile from '@/common/components/icons/Profile';
import { PeopleDataContext } from '../../service-context/PeopleListContextWrapper';
import Tick from '@/common/components/icons/Tick';

type Props = {
  approveHandler: () => void;
  declineHandler: () => void;
};

const RegistrationContent = ({ approveHandler, declineHandler }: Props) => {
  const contextInfo = useContext(PeopleDataContext);
  const registrationData = contextInfo?.userDetail as any;

  return (
    <Form className="!mx-auto size-full min-w-[400px] max-w-4xl">
      <header className="border-b">
        <Title className="font-semibold text-custom-gray_600">Personal</Title>
        <div className="flex gap-2 py-2">
          {registrationData?.img ? (
            <Image
              width={140}
              height={140}
              style={{ objectFit: 'contain' }}
              src={registrationData?.img || ''}
              alt="User avatar"
            />
          ) : (
            <CustomAvatar
              src={registrationData?.img}
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
              <p className="capitalize">{registrationData?.status}</p>
            </div>
            <div className="flex gap-2">
              <CustomButton
                type="default"
                className="!bg-custom-gray_100 !px-6 !text-custom-main"
                icon={<Delete size={18} />}
                size="small"
                description="Delete Profile"
              />
              {contextInfo?.currentTab !== 'pending' ? (
                <>
                  {contextInfo?.currentTab !== 'approved' ? (
                    <CustomButton
                      type="default"
                      className="!border-custom-green_100 !bg-custom-gray_100 !px-6 !text-custom-green_100 disabled:!border-custom-gray_850 disabled:!text-custom-gray_850"
                      icon={
                        <span>
                          <Tick size={32} />
                        </span>
                      }
                      size="small"
                      description="Approve Profile"
                      onClick={approveHandler}
                    />
                  ) : null}

                  {contextInfo?.currentTab !== 'declined' ? (
                    <CustomButton
                      type="default"
                      className="!border-custom-red_200 !bg-custom-gray_100 !px-6 !text-custom-red_200 disabled:!border-custom-gray_850 disabled:!text-custom-gray_850"
                      icon={<Close size={32} />}
                      size="small"
                      description="Decline Profile"
                      onClick={declineHandler}
                    />
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      <section className="h-[calc(100vh-214px)] overflow-y-scroll">
        <div>
          <FieldRow
            label="Name"
            name="name"
            disabled={contextInfo?.currentTab !== 'approved'}
            defaultValue={registrationData?.firstname}
          />
          <FieldRow
            label="Email"
            name="email"
            disabled={contextInfo?.currentTab !== 'approved'}
            defaultValue={registrationData?.email}
          />
          <FieldRow
            label="Phone Number"
            name="phone"
            disabled={contextInfo?.currentTab !== 'approved'}
            defaultValue={registrationData?.phone}
          />
          <FieldRow
            label="Date Added"
            name="created_at"
            disabled
            defaultValue={dayjs(registrationData?.created_at)?.format(
              'DD-MMM-YYYY'
            )}
          />
          <FieldRow
            label="Last Active"
            name="last_seen"
            disabled
            defaultValue={dayjs(registrationData?.last_seen)?.format(
              'DD-MMM-YYYY'
            )}
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
            defaultValue={registrationData?.title}
          />
          <FieldRow
            label="Department"
            name="department"
            disabled
            defaultValue={registrationData?.department?.name}
          />
          <FieldRow
            label="Office"
            name="office"
            disabled
            defaultValue={registrationData?.office?.name}
          />
          <FieldRow
            label="Parastatal"
            name="parastatal"
            disabled
            defaultValue={registrationData?.parastatal.name}
          />
          <FieldRow
            label="Role"
            name="role"
            disabled
            className="capitalize"
            defaultValue={registrationData?.role?.name?.replace(/_/g, ' ')}
          />
        </div>
      </section>
    </Form>
  );
};

export default RegistrationContent;

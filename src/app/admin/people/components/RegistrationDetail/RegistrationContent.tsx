import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { Close, Delete } from '@/common/components/icons';
import Image from 'next/image';
import React from 'react';
import FieldRow from '../../../components/FieldRow';
import dayjs from 'dayjs';
import Tick from '@/common/components/icons/Tick';
import { User } from '../../types';


type RegistrationContentProps = {
  registrationData: User | null;
};

const RegistrationContent = ({
  registrationData,
}: RegistrationContentProps) => {
  return (
    <div className="flex w-full justify-center pb-8">
      <div className="w-2/4">
        <Title className="font-semibold text-custom-gray_600">Personal</Title>
        <div className="flex gap-2 py-2">
          <Image
            width={200}
            height={100}
            style={{ objectFit: 'contain' }}
            src="/images/dummyUserImg.png"
            alt=""
          />
          <div className="flex flex-col justify-end">
            <div className="flex items-center gap-1">
              <div className="size-2 rounded bg-custom-green_100" />
              <p>Active</p>
            </div>
            <div className="flex gap-2">
              <CustomButton
                type="default"
                className="!bg-custom-gray_100 !px-6 !text-custom-main"
                icon={<Delete size={18} />}
                size="small"
                title="Delete Profile"
              />
              <CustomButton
                type="default"
                className="!border-custom-green_100 !bg-custom-gray_100 !px-6"
                icon={<Tick size={18} color="green" />}
                size="small"
                title="Delete Profile"
              />
              <CustomButton
                type="default"
                className="!border-custom-red_200 !bg-custom-gray_100 !px-6"
                icon={<Close size={32} color="green" />}
                size="small"
                title="Delete Profile"
              />
            </div>
          </div>
        </div>
        <hr />
        <FieldRow title="Name" value={registrationData?.firstname as string} />
        <FieldRow title="Email" value={registrationData?.email as string} />
        <FieldRow
          title="Phone Number"
          value={registrationData?.phone as string}
        />
        <FieldRow
          title="Date Added"
          value={dayjs(registrationData?.date_created).format('DD-MMM-YYYY')}
        />
        <FieldRow
          title="Last Active"
          value={dayjs(registrationData?.date_created).format('DD-MMM-YYYY')}
        />
        <div>
          <Title className="my-2 font-semibold text-custom-gray_600">
            Office
          </Title>
          <FieldRow title="Title" value={registrationData?.title} />
          <FieldRow title="Department" value={registrationData?.department} />
          <FieldRow
            title="Parastatal"
            value={registrationData?.parastatal as string}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationContent;

import React, { Fragment, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FormItem from 'antd/es/form/FormItem';
import {
  officeInfoInputs,
  personalInfoInputs,
  securityInfoInputs,
} from './formHelpers';
import CustomInput from '@/common/components/CustomInput';
import Title from '@/common/components/Title';
import CustomSelect from '@/common/components/CustomSelect';
import { useOnboarding } from '../hooks';
import { OfficelInfo, PersonalInfo, securityInfo } from '../types';

type Props = {
  loading?: boolean;
};

function OnboardingForm({ loading }: Props) {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const parastatal = searchParams.get('parastatal') || '';
  const office = searchParams.get('office') || '';
  const department = searchParams.get('department') || '';
  const [selectedOffice, setSelectedOffice] = useState('');

  const { getParastatalSwr } = useOnboarding({
    can_get_parastatal: true,
    _id: parastatal,
  });
  const { getOfficeSwr } = useOnboarding({
    can_get_office: true,
    parastatal,
  });
  const { getOfficeByIdSwr } = useOnboarding({
    can_get_office: true,
    _id: office,
  });
  const { getDepartmentSwr } = useOnboarding({
    can_get_department: true,
    parastatal,
    office: office || selectedOffice,
  });
  const { getDepartmentByIdSwr } = useOnboarding({
    can_get_department: true,
    _id: department,
  });

  const parastatalList = [getParastatalSwr.data?.data].map((item) => ({
    label: item?.name,
    value: item?._id,
  }));
  //we are quering by id so the users can also onboard themselves into an office or department
  // if user already has a predefined department or office they can only onboard to them
  const officeSwr = office ? getOfficeByIdSwr : getOfficeSwr;
  const departmentSwr = department ? getDepartmentByIdSwr : getDepartmentSwr;

  const officeList = officeSwr.data?.data.map((item) => ({
    label: item?.name,
    value: item?._id,
  }));
  const departmentList = departmentSwr.data?.data.map((item) => ({
    label: item?.name,
    value: item?._id,
  }));

  return (
    <>
      <section className="flex flex-col">
        <Title tag="h6" className="mb-4 text-custom-gray_600">
          Personal information
        </Title>
        {personalInfoInputs.map((item) => (
          <FormItem<PersonalInfo>
            {...item}
            key={item.name}
            initialValue={item.name === 'email' ? email : null}
          >
            <CustomInput
              placeholder={item.placeholder}
              disabled={
                loading || (item.name === 'email' && email.includes('@'))
              }
            />
          </FormItem>
        ))}
      </section>
      {parastatal ? (
        <section className="flex flex-col">
          <Title tag="h6" className="mb-4 text-custom-gray_600">
            Office information
          </Title>
          {officeInfoInputs.map((item) => (
            <Fragment key={item.name}>
              {item.name === 'parastatal' && parastatal ? (
                <FormItem<OfficelInfo> {...item}>
                  <CustomSelect
                    options={parastatalList}
                    placeholder={item.placeholder}
                  />
                </FormItem>
              ) : null}
              {item.name === 'office' && getOfficeSwr.data?.data.length ? (
                <FormItem<OfficelInfo> {...item}>
                  <CustomSelect
                    options={officeList}
                    placeholder={item.placeholder}
                    onSelect={(val) => setSelectedOffice(val)}
                  />
                </FormItem>
              ) : null}
              {item.name === 'department' &&
              getDepartmentSwr.data?.data.length ? (
                <FormItem<OfficelInfo> {...item}>
                  <CustomSelect
                    options={departmentList}
                    placeholder={item.placeholder}
                  />
                </FormItem>
              ) : null}
            </Fragment>
          ))}
        </section>
      ) : null}
      <section className="flex flex-col">
        <Title tag="h6" className="mb-4 text-custom-gray_600">
          Set Password
        </Title>
        {securityInfoInputs.map((item) => (
          <FormItem<securityInfo> {...item} key={item.name}>
            <CustomInput
              placeholder={item.placeholder}
              disabled={loading}
              type="password"
            />
          </FormItem>
        ))}
      </section>
    </>
  );
}

export default OnboardingForm;

import React, { Fragment } from 'react';
import {
  officeInfoInputs,
  personalInfoInputs,
  securityInfoInputs,
} from './formHelpers';
import FormItem from 'antd/es/form/FormItem';
import CustomInput from '@/common/components/CustomInput';
import { OfficelInfo, PersonalInfo, securityInfo } from '../types';
import { useSearchParams } from 'next/navigation';
import Title from '@/common/components/Title';
import CustomSelect from '@/common/components/CustomSelect';
import { useOnboarding } from '../hooks';

type Props = {
  loading?: boolean;
};

function OnboardingForm({ loading }: Props) {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const parastatal = searchParams.get('parastatal') || '';
  const office = searchParams.get('office') || '';
  const department = searchParams.get('department') || '';

  const permissons = {
    can_get_parastatal: true,
    can_get_office: true,
    can_get_department: true,
  };

  const query = {
    parastatal,
    office,
  };

  const { getParastatalSwr, getOfficeSwr, getDepartmentSwr } = useOnboarding({
    ...permissons,
    ...query,
  });

  const parastatalList = [getParastatalSwr.data?.data].map((item) => ({
    label: item?.name,
    value: item?._id,
  }));
  const officeList = getOfficeSwr.data?.data.map((item) => ({
    label: item?.name,
    value: item?._id,
  }));
  const departmentList = [getDepartmentSwr.data?.data].map((item) => ({
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
              {item.name === 'office' && office ? (
                <FormItem<OfficelInfo> {...item}>
                  <CustomSelect
                    options={officeList}
                    placeholder={item.placeholder}
                  />
                </FormItem>
              ) : null}
              {item.name === 'department' && department ? (
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

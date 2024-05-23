import {
  confirmPasswordValidator,
  passwordStrengthValidator,
  phoneNumberValidator,
} from '@/common/utils';
import { FormItems } from '@/types';
import { OfficelInfo, PersonalInfo, securityInfo } from '../types';

export const personalInfoInputs: FormItems<PersonalInfo>[] = [
  {
    name: 'firstname',
    label: 'First Name',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'First Name is required' }],
  },
  {
    name: 'surname',
    label: 'Surname',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Please input your surname' }],
  },
  {
    name: 'middlename',
    label: 'Middle name',
    placeholder: 'Aa',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Aa',
    rules: [
      { required: true, message: 'Please input your email', type: 'email' },
    ],
  },

  {
    name: 'phone',
    label: 'Phone Number',
    placeholder: '1223456789',
    rules: [{ required: true, validator: phoneNumberValidator }],
  },
];

export const officeInfoInputs: FormItems<OfficelInfo>[] = [
  {
    name: 'parastatal',
    label: 'Parastatals',
    placeholder: 'Select a parastatal',
    rules: [{ required: true, message: 'Please select parastatal' }],
  },
  {
    name: 'office',
    label: 'Office',
    placeholder: 'Select an office',
    rules: [{ required: true, message: 'Please select Office' }],
  },
  {
    name: 'department',
    label: 'Departments',
    placeholder: 'Select a department',
    rules: [{ required: true, message: 'Please select Department' }],
  },
];
export const securityInfoInputs: FormItems<securityInfo>[] = [
  {
    name: 'password',
    label: 'New Password',
    placeholder: 'Enter Password',
    rules: [{ required: true, validator: passwordStrengthValidator }],
  },
  {
    name: 'confirm_password',
    label: 'Confirm Password',
    placeholder: 'Password',
    dependencies: ['password'],
    rules: [confirmPasswordValidator, { required: true }],
  },
];

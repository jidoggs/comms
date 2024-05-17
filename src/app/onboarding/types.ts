import { BaseDataModel, BasicTypeSet } from '@/types';

interface Invite extends BaseDataModel {
  email: string;
  invite_code: string;
  invited_by: string;
  office: BasicTypeSet;
  status: string;
  step: 'personal' | 'office' | 'password';
}
export interface InviteQuery {
  invite: Invite;
  token: string;
}

export type PersonalInfo = {
  firstname: string;
  surname: string;
  middlename: string;
  email: string;
  phone: string;
};

export type OfficelInfo = {
  parastatal: string;
  office: string;
  department: string;
};

export type securityInfo = {
  new_password: string;
  confirm_password: string;
};

export type OnboardingInfo = PersonalInfo | OfficelInfo | securityInfo;

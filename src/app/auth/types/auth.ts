import { BaseDataModel, UserRoles } from '@/types';

export interface SessionResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserRole extends BaseDataModel {
  name: UserRoles;
  permissions: string[];
}

export interface User extends BaseDataModel {
  firstname: string;
  lastname: string;
  othername: string;
  email: string;
  title: string;
  phone: string;
  office: string;
  parastatal: string;
  department: string;
  last_seen: string;
  date_created: string;
  img: string;
  role: UserRole;
}

export interface PersonalInfo {
  firstname?: string;
  lastname?: string;
  othername?: string;
  email?: string;
  phonenumber: string;
}

export interface OfficeInfo extends BaseDataModel {
  office?: string | null;
}

export interface PasswordDataInfo extends BaseDataModel {
  password?: string;
}

export type UserSession = User & SessionResponse;

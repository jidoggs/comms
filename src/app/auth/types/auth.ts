import { BaseDataModel, User } from '@/types';

export interface SessionResponse {
  access_token: string;
  refresh_token: string;
}
export interface ResetResponse {
  message: string;
}

export interface PersonalInfo {
  firstname?: string;
  surname?: string;
  middlename?: string;
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

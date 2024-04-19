import { BaseDataModel } from '@/types';

export interface SessionResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserRole extends BaseDataModel {
  name: string;
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
  roles: UserRole;
}

export type UserSession = User & SessionResponse;

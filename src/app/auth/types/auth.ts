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
  office: string;
  parastatal: string;
  last_seen: string;
  img: string;
  roles: UserRole;
}

export type UserSession = User & SessionResponse;

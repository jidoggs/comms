/* eslint-disable */
export interface RequestResponseData<T = unknown> {
  status: string;
  message: string;
  results: number;
  data: T;
}

export interface UserSession {
  accessToken: string;
  refreshToken: string;
  resetExpires?: number;
  resetCount?: string;
}

export interface UserSessionResponse {
  access_token: string;
  refresh_token: string;
}

export interface User {
  access_token: string;
  refresh_token: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  state_id: any;
  lga_id: any;
  role_id: any;
  source_id: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  reset_code: any;
  reset_expires: number;
  reset_count: any;
  "role.name":string;
}


export enum UserPreDefinedRole {
  SUPER_AMIN = "Super Admin",
  USER_MANAGER = "User Manager",
  VERIFIER = "Verifier",
  ACCOUNT_MANAGERS = "Account Managers",
  HOUSE_OF_REP_MEMBERS = "House of Rep Members",
  SENATORS = "Senators",
  STATE_GOVERNORS = "State Governors",
  PUBLIC_USER = "Public User",
  UPLOADER = "Uploader",
  HONORABLE_MINISTERS = "Honorable Ministers",
  NATIONAL_SMES = "National Association of SMEs",
}


export type UserRoles =
  | UserPreDefinedRole.SUPER_AMIN
  | UserPreDefinedRole.ACCOUNT_MANAGERS
  | UserPreDefinedRole.HONORABLE_MINISTERS
  | UserPreDefinedRole.HOUSE_OF_REP_MEMBERS
  | UserPreDefinedRole.PUBLIC_USER
  | UserPreDefinedRole.SENATORS
  | UserPreDefinedRole.UPLOADER
  | UserPreDefinedRole.USER_MANAGER
  | UserPreDefinedRole.VERIFIER
  | UserPreDefinedRole.STATE_GOVERNORS
  | UserPreDefinedRole.NATIONAL_SMES;

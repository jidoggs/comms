/* eslint-disable */
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

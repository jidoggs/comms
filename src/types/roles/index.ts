/* eslint-disable */
export enum UserPreDefinedRole {
  PRIMARYADMIN = 'primary_admin',
  SECONDARYADMIN = 'secondary_admin',
  BASICUSER = 'user',
}

export type UserRoles =
  | UserPreDefinedRole.PRIMARYADMIN
  | UserPreDefinedRole.SECONDARYADMIN
  | UserPreDefinedRole.BASICUSER;

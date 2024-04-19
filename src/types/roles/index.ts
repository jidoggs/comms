/* eslint-disable */
export enum UserPreDefinedRole {
  MAINADMIN = 'main_admin',
  SUPERADMIN = 'super_admin',
  PRIMARYADMIN = 'primary_admin',
  SECONDARYADMIN = 'secondary_admin',
  BASICUSER = 'basic_user',
}

export type UserRoles =
  | UserPreDefinedRole.MAINADMIN
  | UserPreDefinedRole.SUPERADMIN
  | UserPreDefinedRole.PRIMARYADMIN
  | UserPreDefinedRole.SECONDARYADMIN
  | UserPreDefinedRole.BASICUSER;

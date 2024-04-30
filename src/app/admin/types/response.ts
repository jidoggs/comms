import { BaseDataModel, User } from '@/types';
import { CreateParastatalRequestType, PermissionRequestType } from './request';

export type ParastatalType = BaseDataModel & CreateParastatalRequestType;
export type AllParastatalType = ParastatalType[];

export interface OfficeType extends BaseDataModel {
  parastatal: ParastatalType;
  creator: User;
  name: string;
}

export type AllOfficeType = OfficeType[];

export type PermissionType = BaseDataModel & PermissionRequestType;
export type AllPermissionType = PermissionType[];

export interface RoleType extends BaseDataModel {
  name: string;
  active: boolean;
  permissions: AllPermissionType;
}

export type AllRoleType = RoleType[];

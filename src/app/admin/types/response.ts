import { BaseDataModel, User } from '@/types';
import { CreateParastatalRequestType } from './request';

export interface ParastatalType extends BaseDataModel {
  name: string;
  domains: string[];
  creator: User;
  updated_by?: User;
  members_count?: number;
}

export interface OfficeType extends BaseDataModel {
  parastatal: ParastatalType;
  creator: User;
  name: string;
  members_count?: number;
}
export interface DepartmentType extends OfficeType {
  office: OfficeType;
}

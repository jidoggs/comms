import { BaseDataModel } from '@/types';
import { CreateParastatalRequestType } from './request';
import { User } from '@/app/auth/types/auth';

export type ParastatalType = BaseDataModel & CreateParastatalRequestType;
export type AllParastatalType = ParastatalType[];

export interface OfficeType extends BaseDataModel {
  parastatal: ParastatalType;
  creator: User;
  name: string;
}

export type AllOfficeType = OfficeType[];

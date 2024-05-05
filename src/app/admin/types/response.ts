import { BaseDataModel, User } from '@/types';
import { CreateParastatalRequestType } from './request';

export type ParastatalType = BaseDataModel & CreateParastatalRequestType;

export interface OfficeType extends BaseDataModel {
  parastatal: ParastatalType;
  creator: User;
  name: string;
}

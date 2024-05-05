import { BaseDataModel, BasicTypeSet } from '@/types';

export interface InviteQuery extends BaseDataModel {
  email: string;
  invite_code: string;
  invited_by: string;
  office: BasicTypeSet;
  status: string;
  step: 'personal' | 'office' | 'password';
  access_token: string;
}

import { BaseDataModel, BasicTypeSet } from '@/types';

interface Invite extends BaseDataModel {
  email: string;
  invite_code: string;
  invited_by: string;
  office: BasicTypeSet;
  status: string;
  step: 'personal' | 'office' | 'password';
}
export interface InviteQuery {
  invite: Invite;
  token: string;
}

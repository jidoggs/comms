import { BaseDataModel, BasicTypeSet } from '../api-response';
import { User } from '../user';

export interface CorrespondenceData extends BaseDataModel {
  creator: User;
  documents: string[];
  parastatal: BasicTypeSet;
  reference_number: string;
  sender: string;
  status: string;
  attached: string[];
  subject: string;
  comment: string;
}

type RecipientKeys = '_id' | 'firstname' | 'surname';

export type RecipientData = {
  user: Pick<User, RecipientKeys>[];
  department: BasicTypeSet[];
  office: BasicTypeSet[];
};

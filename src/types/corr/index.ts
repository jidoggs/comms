import { BaseDataModel, BasicTypeSet } from '../api-response';
import { BasicUser, User } from '../user';

export interface CorrespondenceData extends BaseDataModel {
  creator: User;
  documents: string[];
  parastatal: BasicTypeSet;
  reference_number: string;
  sender: string;
  status: string;
  attached: string[];
  subject: string;
  date_of_correspondence: Date;
  minute: string;
  result: string[];
}

export interface MinuteData extends BaseDataModel {
  parastatal: BasicTypeSet;
  minute: string;
  documents: string[]; // Array of document paths or URLs
  status: 'queue' | 'ongoing' | 'archive';
  last_minute?: {
    _id: string; // Reference to the previous minute (if any)
    minute: string;
  };
  correspondence: {
    _id: string;
    sender: string;
    documents: string[];
    subject: string;
  };
  recipient: BasicUser;
  hasAccess: BasicUser[]; // Array of users who have access
  from: BasicUser;
  attach: BasicUser[];
}

export type RecipientData = {
  user: Omit<BasicUser, 'role'>[];
  department: BasicTypeSet[];
  office: BasicTypeSet[];
};

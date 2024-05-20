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
  date_of_correspondence: Date;
  minute: string;
  result: string[];
}

export interface MinuteData extends BaseDataModel {
  parastatal: {
    _id: string;
    name: string;
  };
  minute: string;
  documents: string[]; // Array of document paths or URLs
  status: string;
  last_minute?: {
    _id: string; // Reference to the previous minute (if any)
  };
  correspondence: {
    _id: string;
    sender: string;
    documents: string[];
    subject: string;
  };
  recipient: {
    _id: string;
    firstname: string;
    surname: string;
    middlename?: string; // Make middlename optional
    role: string;
  };
  hasAccess: {
    _id: string;
    firstname: string;
    surname: string;
    middlename?: string; // Make middlename optional
    role: string;
  }[]; // Array of users who have access
  from: {
    _id: string;
    firstname: string;
    surname: string;
    middlename?: string; // Make middlename optional
    role: string;
  };
  attach: {
    _id: string;
    firstname: string;
    surname: string;
    middlename?: string; // Make middlename optional
    role: string;
  }[]; // Array of users attached to the minute
}

type RecipientKeys = '_id' | 'firstname' | 'surname';

export type RecipientData = {
  user: Pick<User, RecipientKeys>[];
  department: BasicTypeSet[];
  office: BasicTypeSet[];
};

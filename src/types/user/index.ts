import { BaseDataModel, BasicTypeSet } from '../api-response';
import { UserRoles } from '../roles';

export type UserRole = {
  name: UserRoles;
  _id: string;
};

export interface User extends BaseDataModel {
  firstname: string;
  surname: string;
  middlename: string;
  email: string;
  title: string;
  phone: string;
  office: BasicTypeSet[];
  parastatal: BasicTypeSet[];
  department: BasicTypeSet[];
  last_seen: string;
  date_created: string;
  img: string;
  status: string;
  role: UserRole;
  is_approved: boolean;
}

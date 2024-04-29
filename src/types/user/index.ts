import { BaseDataModel } from '../api-response';
import { UserRoles } from '../roles';

type BasicTypeSet = {
  name: string;
  _id: string;
};

export interface UserRole extends BaseDataModel {
  name: UserRoles;
  _id: string;
}

export interface User extends BaseDataModel {
  firstname: string;
  lastname: string;
  othername: string;
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
}

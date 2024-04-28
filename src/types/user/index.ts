import { BaseDataModel } from '../api-response';
import { UserRoles } from '../roles';

export interface UserRole extends BaseDataModel {
  name: UserRoles;
  permissions: string[];
}

export interface User extends BaseDataModel {
  firstname: string;
  lastname: string;
  othername: string;
  email: string;
  title: string;
  phone: string;
  office: string;
  parastatal: string;
  department: string;
  last_seen: string;
  date_created: string;
  img: string;
  role: UserRole;
}

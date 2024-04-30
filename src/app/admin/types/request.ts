export type CreateParastatalRequestType = {
  name: string;
  domains: string[];
};

export type UpdateParastatalRequestType = Partial<CreateParastatalRequestType>;

export type CreateOfficeRequestType = {
  name: string;
  parastatal: string;
};

export type UpdateOfficeRequestType = Partial<CreateOfficeRequestType>;

export type CreateDepartmentRequestType = {
  name: string;
  parastatal: string;
  office: string;
};

export type UpdateDepartmentRequestType = Partial<CreateDepartmentRequestType>;

export interface PermissionRequestType {
  _id: string;
  name: string;
  code: string;
}

export type UpdatePermissionsRequestType = Partial<PermissionRequestType>;

export interface RoleRequestType {
  _id: string;
  name: string;
  active: boolean;
  permissions: PermissionRequestType[];
  created_at?: string;
  updated_at?: string;
}

export type UpdateRoleRequestType = Partial<RoleRequestType>;

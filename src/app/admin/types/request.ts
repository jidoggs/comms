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

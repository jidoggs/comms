export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/refresh/token',
    FORGOT_PASSWORD: '/auth/forgot_password',
    RESET_PASSWORD: '/auth/reset_password',
    ONBOARD: '/auth/onboard',
  },
  USER: {
    GET_USER: '/user/profile',
    UPDATE_USER_PASSWORD: '/user/update/password',
    ADD_USER_TO_ROLE: (UID: string, RID: string) =>
      `/user/${UID}/add/role/${RID}`,
    DELETE_USER_TO_ROLE: (UID: string, RID: string) =>
      `/user/${UID}/revoke/role/${RID}`,
    GET_ALL: '/user/all',
  },
  PARASTATALS: {
    CREATE: '/parastatals',
    GET_ALL: '/parastatals/all',
    UPDATE: (query: string) => `/parastatals/${query}`,
    INVITE: '/invite/parastatal',
  },
  DEPARTMENT: {
    CREATE: '/departments',
    GET_ALL: '/departments/all',
    UPDATE: (query: string) => `/departments/${query}`,
    INVITE: '/invite/department',
  },
  OFFICE: {
    CREATE: '/offices',
    GET_ALL: '/offices/all',
    UPDATE: (query: string) => `/offices/${query}`,
    INVITE: '/invite/office',
  },
  ROLES: {
    CREATE: '/roles',
    GET_ALL_ROLES: '/roles/all',
    // ADD_PERMISSION_TO_ROLE: '/roles/',
    // GET_SPECIFIC_ROLE: (query: string) => `/roles/${query}`,
    DELETE_SPECIFIC_ROLE: (query: string) => `/roles/${query}`,
    UPDATE: '/roles/',
  },
  USERS: {
    GET_ALL_USERS: '/user/all',
    GET_SPECIFIC_USER: (query: string) => `/user/${query}`,
    DELETE_USER: (query: string) => `/user/${query}`,
    UPDATE_USER: (query: string) => `/user/${query}`,
  },
  PERMISSIONS: {
    CREATE: '/permissions',
    VIEW_ALL_PERMISSIONS: '/permissions/all',
    GET_ALL_LOCAL: '/permissions/local',
    GET_SPECIFIC_PERMISSION: (query: string) => `/permissions/${query}`,
    DELETE_SPECIFIC_PERMISSION: (query: string) => `/permissions/${query}`,
    UPDATE: (query: string) => `/permissions/${query}`,
  },
};

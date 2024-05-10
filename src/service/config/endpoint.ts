export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/refresh/token',
    FORGOT_PASSWORD: '/auth/forgot_password',
    RESET_PASSWORD: '/auth/reset_password',
    ONBOARD: '/auth/onboard',
    ONBOARD_STATUS: (email: string) => `/invite?email=${email}`,
  },
  USER: {
    GET_USER: '/user/profile',
    UPDATE_USER_PASSWORD: '/user/update/password',
    ADD_USER_TO_ROLE: (UID: string, RID: string) =>
      `/user/${UID}/add/role/${RID}`,
    DELETE_USER_TO_ROLE: (UID: string, RID: string) =>
      `/user/${UID}/revoke/role/${RID}`,
    GET_ALL: '/user/all',
    UPDATE: '/user/update',
    SPECIFIC_USER: (UID: string) => `/user/${UID}`,
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
  PEOPLE: {
    GET_ALL_INVITE_BY_STATUS: (query: string) => `/invite/all${query}`,
    APPROVE_REQUEST: '/auth/approve',
    DECLINE_REQUEST: '/auth/decline',
  },
  ROLES: {
    CREATE: '/roles',
    GET_ALL_ROLES: '/roles/all',
    SPECIFIC_ROLE: (query: string) => `/roles/${query}`,
    UPDATE: '/roles/',
  },
  CORRESPONDENCE: {
    CREATE: '/correspondence',
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

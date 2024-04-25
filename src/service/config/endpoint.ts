export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    GET_USER: '/user/profile',
    UPDATE_USER_PASSWORD: '/user/update/password',
    REFRESH_TOKEN: '/auth/refresh/token',
    FORGOT_PASSWORD: '/auth/forgot_password',
    RESET_PASSWORD: '/auth/reset_password',
  },
  ONBOARDING: {
    PERSONAL_INFO: '/auth/personal-info',
    OFFICE_INFO: '/auth/office-info',
    SET_PASSWORD: '/user/set-password',
    // UPDATE_USER_PASSWORD: '/user/update/password',
    // REFRESH_TOKEN: '/refresh/token',
    // FORGOT_PASSWORD: '/auth/forgot_password',
    // RESET_PASSWORD: '/auth/reset_password',
  },
  PARASTATALS: {
    CREATE: '/parastatals',
    GET_ALL: '/parastatals/all',
    UPDATE: (query: string) => `/parastatals/${query}`,
  },
  DEPARTMENT: {
    CREATE: '/departments',
    GET_ALL: '/departments/all',
    UPDATE: (query: string) => `/departments/${query}`,
  },
  OFFICE: {
    CREATE: '/offices',
    GET_ALL: '/offices/all',
    UPDATE: (query: string) => `/offices/${query}`,
  },
};

type RequestType =
  | 'login'
  | 'user'
  | 'user_password'
  | 'refresh'
  | 'forgot_password'
  | 'reset_password';

export type AuthParams = Partial<Record<RequestType, boolean>>;

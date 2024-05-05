import { Rule } from 'antd/es/form';

const PASSWORD_VALIDATION_RULES = [
  {
    title: '1 uppercase character',
    regex: '^(?=.*?[A-Z])',
  },
  {
    title: '1 lowercase character',
    regex: '^(?=.*?[a-z])',
  },
  { title: '1 numeric character', regex: '(?=.*?[0-9])' },
  {
    title: '1 special character',
    regex: '(?=.*[!@#$%^&_])',
  },
  { title: '8 characters', regex: '.{8,}' },
];

export const validationRules = {
  string: /(.|\s)*\S(.|\s)*/,
  email:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  phone: /^\+?[1-9][0-9]{7,14}$/,
  number: /^\d+$/,
  website:
    /^http:\/\/localhost|https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, //eslint-disable-line
};

export const emailValidator = (_: any, value: string) => {
  if (!value) {
    return Promise.reject('Email is required');
  }
  const validated = value.match(validationRules.email);
  if (!validated) {
    return Promise.reject('Email is not valid');
  }
  return Promise.resolve();
};
export const phoneNumberValidator = (_: any, value: string) => {
  if (!value) {
    return Promise.reject('Please input your phone number');
  }
  const validated = value.match(validationRules.number);
  const hasPrefix = value.startsWith('234');
  const invalidLength =
    (value.length > 11 && value.length < 13) ||
    (value.length === 13 && hasPrefix === false) ||
    value.length < 3;
  if (!validated || invalidLength) {
    return Promise.reject('Phone number is not valid');
  }
  if (hasPrefix && value.length < 13) {
    return Promise.reject('Phone number should not be less than 14 character');
  }
  if (value.length < 11) {
    return Promise.reject('Phone number should not be less than 11 character');
  }
  if (value.length > 13 || (hasPrefix && value.length < 13)) {
    return Promise.reject('Phone number should not be more than 14 character');
  }
  return Promise.resolve();
};

export const passwordStrengthValidator = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(
      'Password must contain lowercase, upppercase, number, symbols and a min. of 8 Characters'
    );
  }
  const error = [];
  for (let index = 0; index < PASSWORD_VALIDATION_RULES.length; index++) {
    const rule = PASSWORD_VALIDATION_RULES[index];
    const validated = value.match(rule.regex);
    if (!validated) {
      error.push(rule.title);
    }
  }

  if (error.length > 0) {
    const lang = `Password should have at least ${error.join(', ')}`;
    return Promise.reject(lang);
  }

  return Promise.resolve();
};

export const confirmPasswordValidator: Rule = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('new_password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error('The new password that you entered do not match!')
    );
  },
  required: true,
});

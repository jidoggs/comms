const VALIDATION_RULES = [
  {
    id: 1,
    title: "1 Capital Letter",
    passed: false,
    regex: "^(?=.*?[A-Z])",
  },
  { id: 2, title: "1 Number", passed: false, regex: "(?=.*?[0-9])" },
  {
    id: 3,
    title: "1 Special Character from !@#$%^&_",
    passed: false,
    regex: "(?=.*[!@#$%^&_])",
  },
  { id: 4, title: "8 Characters", passed: false, regex: ".{8,}" },
];

export const CheckPasswordStrength = (
  password: string
): { count: number; total: number } => {
  if (!password) return { count: 0, total: VALIDATION_RULES.length };

  let count = 0;

  VALIDATION_RULES.forEach((rule) => {
    if (password.match(rule.regex)) count += 1;
  });

  return { count, total: VALIDATION_RULES.length };
};

export const validationRules = {
  string: /(.|\s)*\S(.|\s)*/,
  email:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  phone: /^\+?[1-9][0-9]{7,14}$/,
  number: /^\d+$/,
  website:
    /^http:\/\/localhost|https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, //eslint-disable-line
};

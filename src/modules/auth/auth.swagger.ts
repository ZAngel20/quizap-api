export const SwBodyAuthSignUp = {
  schema: {
    type: 'object',
    properties: {
      userName: { example: '"null"' },
      email: { example: '"null"' },
      passwd: { example: '"null"' },
    },
  },
};

export const SwOperationAuthSignUp = {
  summary: 'Register new user',
  description:
    'Handles user registration, validating provided data and storing in the database.',
};

export const SwBodyAuthSignIn = {
  schema: {
    type: 'object',
    properties: {
      email: { example: '"null"' },
      passwd: { example: '"null"' },
    },
  },
};

export const SwOperationAuthSignIn = {
  summary: 'Login user',
  description:
    'Handles user sign-in process, validating credentials and generating a access token.',
};

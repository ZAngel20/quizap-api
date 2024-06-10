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

export const SwBodyAuthSignUpCode = {
  schema: {
    type: 'object',
    properties: {
      email: { example: '"null"' },
      token: { example: '"null"' },
    },
  },
};

export const SwOperationAuthSignUpCode = {
  summary: 'Register new user with token',
  description:
    'Handles user registration, validates the provided token and returns the user with the token.',
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

export const SwBodyAuthSendActivationMail = {
  schema: {
    type: 'object',
    properties: {
      email: { example: '"null"' },
    },
  },
};

export const SwOperationSendActivationMail = {
  summary: 'Resend activation token',
  description: 'Send the activation token to the email entered',
};

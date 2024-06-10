// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const {
  EMAIL_FROM,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURED,
  EMAIL_ENABLED,
} = process.env;

export const emailConfig = {
  from: EMAIL_FROM,
  host: EMAIL_HOST,
  port: parseInt(EMAIL_PORT),
  username: EMAIL_USERNAME,
  password: EMAIL_PASSWORD,
  secured: parseInt(EMAIL_SECURED) === 1,
  enabled: parseInt(EMAIL_ENABLED) === 1,
};

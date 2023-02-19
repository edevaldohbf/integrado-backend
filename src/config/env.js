import dotenv from 'dotenv';

dotenv.config({ silent: true });

export const nodeEnv = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 3000;
export const host = process.env.HOST || 'localhost';
export const jwtSecret = process.env.JWT_SECRET;
export const accessTokenTimeExp = parseInt(process.env.ACCESS_TOKEN_TIME_EXP);
export const refreshTokenTimeExp = parseInt(process.env.REFRESH_TOKEN_TIME_EXP);
export const resetPasswordTokenTimeExp = parseInt(process.env.RESET_PASSWORD_TOKEN_TIME_EXP);
export const userDb = process.env.USER_DB;
export const passwordDb = process.env.PASSWORD_DB;
export const userDbLocal = process.env.USER_DB_LOCAL;
export const passwordDbLocal = process.env.PASSWORD_DB_LOCAL;

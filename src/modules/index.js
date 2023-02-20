import AuthController from './auth/auth.controller.js';
import ResetPasswordController from './resetPassword/resetPassword.controller.js';
import UsersController from './users/users.controller.js'
import UniversitiesController from './universities/universities.controller.js';

export const auth = AuthController;
export const resetPassword = ResetPasswordController;
export const users = UsersController;
export const universities = UniversitiesController;
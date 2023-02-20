import ResetPasswordModel from './resetPassword.model.js';
import UsersModel from '../users/users.model.js';
import { success, badRequest } from '../utils/reponsePattern/responseStatusCode.js';
import message from '../utils/reponsePattern/responseMessage.js';
import { hashPassword, generatePassword } from '../utils/password.js'
import sendEmail from '../email/email.service.js';

class ResetPasswordService {
    async request (reqEmail) {
        if (!reqEmail) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        const resetPasswordUser = await UsersModel.findOne({ email: reqEmail });

        if (!resetPasswordUser) {
            throw {
                statusCode: badRequest,
                message: message[6]
            };
        }

        const token = await generatePassword();

        await ResetPasswordModel.create({
            userId: resetPasswordUser._id,
            isUsed: false,
            token: token,
            createdAt: new Date
        });

        await resetPasswordUser.update({
            password: await hashPassword(String(token)),
            isFirstAcess: true
        });

        await sendEmail([resetPasswordUser.email, ], token); // email estático pq os usuários ainda não possuem e-mails reais
        
        return true;
    }

    async action (oldPassword, newPassword) {
        if ((!oldPassword) || (!newPassword) || (oldPassword == newPassword)) {
            throw {
                statusCode: statusCode.unauthorized,
                message: message[0]
            };
        }

        const objResetPassword = await ResetPasswordModel.findOne({ token: oldPassword });

        if ((!objResetPassword) || (objResetPassword.isUsed)) {
            throw {
                statusCode: statusCode.unauthorized,
                message: message[7]
            };
        }

        if (newPassword) {
            newPassword = await hashPassword(String(newPassword));
        }

        const resetPasswordUser = await UsersModel.findByIdAndUpdate({ _id: objResetPassword.userId }, {
            password: newPassword,
            isFirstAcess: false,
            updatedAt: new Date
        }).select('-__v -password');

        await objResetPassword.update({
            isUsed: true,
            updatedAt: new Date
        });
            
        return 'Senha atualizada';
    }
}

export default new ResetPasswordService;
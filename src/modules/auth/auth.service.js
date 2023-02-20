import UsersModel from '../users/users.model.js';
import { success, badRequest, unauthorized } from '../utils/reponsePattern/responseStatusCode.js';
import message from '../utils/reponsePattern/responseMessage.js';
import { comparePassword } from '../utils/password.js';
import { generateToken, verifyRefresh } from '../utils/token.js';
import { accessTokenTimeExp, refreshTokenTimeExp } from '../../config/env.js'

class UniversitiesService {
    async accessToken (email, password) {
        const token = {};

        if ((!email) || (!password)) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        const authUser = await UsersModel.findOne({ email: email });

        if (!authUser) {
            throw {
                statusCode: unauthorized,
                message: message[1]
            };
        }

        if (!authUser.isActive) {
            throw {
                statusCode: unauthorized,
                message: message[1]
            };
        }

        const passwordCheck = await comparePassword(password, authUser.password);

        if (!passwordCheck) {
            throw {
                statusCode: unauthorized,
                message: message[1]
            };
        }

        token.id = authUser._id;
        token.name = authUser.name;
        token.isAdmin = authUser.isAdmin;
        token.isFirstAcess = authUser.isFirstAcess;

        if (authUser.isFirstAcess) {
            token.resetPasswordToken = await generateToken(authUser._id, authUser.email, authUser.isAdmin, 'reset', accessTokenTimeExp)
        }
        else {
            token.accessToken = await generateToken(authUser._id, authUser.email, authUser.isAdmin, 'access', accessTokenTimeExp);
            token.refreshToken = await generateToken(authUser._id, authUser.email, authUser.isAdmin, 'refresh', refreshTokenTimeExp);
        }
        
        return token;
    }

    async refreshToken (reqToken) {
        const token = {};

        if (!reqToken) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        const refreshCheck = await verifyRefresh(reqToken);

        if (!refreshCheck.status) {
            throw {
                statusCode: unauthorized,
                message: message[2]
            };
        }

        const refreshUser = await UsersModel.findOne({ _id: refreshCheck.data.id });

        if (!refreshUser?.isActive) {
            throw {
                statusCode: unauthorized,
                message: message[1]
            };
        }

        token.accessToken = await generateToken(refreshUser.id, refreshUser.email, refreshUser.isAdmin, 'access', accessTokenTimeExp);
        
        return token;
    }
}

export default new UniversitiesService;
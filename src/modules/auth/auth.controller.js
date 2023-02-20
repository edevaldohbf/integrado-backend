import AuthService from './auth.service.js';
import { success, badRequest } from '../utils/reponsePattern/responseStatusCode.js';
import message from '../utils/reponsePattern/responseMessage.js'

class AuthController {
    async accessToken (req, res) {
        try {
            const { email, password } = req.body;

            const auth = await AuthService.accessToken(email, password);
    
            return res.send({
                statusCode: success,
                data: auth
            });
        }
        catch (e) {
            return res.send({
                statusCode: e.statusCode,
                data: e.message
            });
        }
    }

    async refreshToken (req, res) {
        try {
            const { token } = await req.body;

            const auth = await AuthService.refreshToken(token);
    
            return res.send({
                statusCode: success,
                data: auth
            });
        }
        catch (e) {
            return res.send({
                statusCode: e.statusCode,
                data: e.message
            });
        }
    }
}

export default new AuthController;
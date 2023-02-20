import ResetPasswordService from './resetPassword.service.js';
import { success, badRequest } from '../utils/reponsePattern/responseStatusCode.js';
import message from '../utils/reponsePattern/responseMessage.js'

class ResetPasswordController {
    async request (req, res) {
        try {
            const { email } = req.body;
    
            await ResetPasswordService.request(email);
    
            return res.send({
                statusCode: success,
                data: 'Caso este endereço de e-mail esteja registrado no ssitema você receberá um e-mail com as próximas instruções'
            });
        }
        catch (e) {
            return res.send({
                statusCode: e.statusCode,
                data: e.message
            });
        }
    }

    async action (req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
    
            let aux = await ResetPasswordService.action(oldPassword, newPassword);
    
            return res.send({
                statusCode: success,
                data: aux
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

export default new ResetPasswordController;
import { unauthorized } from './reponsePattern/responseStatusCode.js';
import message from './reponsePattern/responseMessage.js';

export async function verifyAdmin(req, res, next) {
	if (req.isAdmin) {
		next();
	}
	else {
		return res.send({
            statusCode: unauthorized,
            data: message[2]
        });
	}
}
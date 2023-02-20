import UsersService from './users.service.js';
import { success, badRequest } from '../utils/reponsePattern/responseStatusCode.js';


class UsersController {
    async create (req, res) {
        try {
            let aux = await UsersService.create(req.body);

            if(!aux) {
                throw {
                    statusCode: badRequest,
                    message: message[0]
                };
            }
    
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

    async readAll (req, res) {
        try {
            const { page } = req.query;

            const filter = {};

            let aux = await UsersService.readAll(filter, page);

            if(!aux) {
                throw {
                    statusCode: badRequest,
                    message: message[0]
                };
            }
    
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

    async readById (req, res) {
        try {
            const { id } = req.params;

            let aux = await UsersService.readById(id);
    
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

    async update (req, res) {
        try {
            const { id } = req.params;

            if ((!id) || (req.body.password)){
                throw {
                    statusCode: badRequest,
                    message: message[0]
                };
            }

            let aux = await UsersService.update(id, req.body);
    
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

    async delete (req, res) {
        try {
            const { id } = req.params;

            if(!id) {
                throw {
                    statusCode: badRequest,
                    message: message[0]
                };
            }

            let aux = await UsersService.delete(id);
    
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

export default new UsersController;
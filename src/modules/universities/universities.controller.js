import { Router } from 'express';
import { success } from '../utils/reponsePattern/responseStatusCode.js';
import UniversitiesService from './universities.service.js';

class UniversitiesController {
    async create (req, res) {
        try {
            let aux = await UniversitiesService.create(req.body);

            if(!aux) {
                throw {
                    statusCode: statusCode.badRequest,
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
            const { country } = req.query;

            const filter = {};

            if(country) {
                filter.country = await country.charAt(0).toUpperCase() + await country.slice(1).toLowerCase();
            }

            let aux = await UniversitiesService.readAll(filter);

            if(!aux) {
                throw {
                    statusCode: statusCode.badRequest,
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

            let aux = await UniversitiesService.readById(id);
    
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


            if(!id) {
                throw {
                    statusCode: statusCode.badRequest,
                    message: message[0]
                };
            }

            let aux = await UniversitiesService.update(id, req.body);
    
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
                    statusCode: statusCode.badRequest,
                    message: message[0]
                };
            }

            let aux = await UniversitiesService.delete(id);
    
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

export default new UniversitiesController;
import { Router } from 'express';
import UniversitiesModel from './universities.model.js';
import { success, badRequest } from '../utils/reponsePattern/responseStatusCode.js';

class UniversitiesService {
    async create (reqUniversity) {
		const createdUniversity = await UniversitiesModel.create(reqUniversity);

        return createdUniversity;
    }

    async readAll (filter) {
        const readUniversities = await UniversitiesModel.find(filter).select('_id name stateProvince country');

        return readUniversities;
    }

    async readById (id) {
        const readUniversity = await UniversitiesModel.findOne({ _id: id }).select('-__v');

        if(!readUniversity) {
            throw {
                statusCode: statusCode.badRequest,
                message: message[0]
            };
        }

        return readUniversity;
    }

    async update (id, reqUniversity) {
        const updatedUniversity = await UniversitiesModel.findByIdAndUpdate({ _id: id }, reqUniversity).select('-__v');

        if(!updatedUniversity) {
            throw {
                statusCode: statusCode.badRequest,
                message: message[0]
            };
        }

        return { id: updatedUniversity._id };
    }

    async delete (id) {
        const deletedUniversity = await UniversitiesModel.findByIdAndDelete({ _id: id }).select('-__v');

        if(!deletedUniversity) {
            throw {
                statusCode: statusCode.badRequest,
                message: message[0]
            };
        }

        return { id: deletedUniversity._id };
    }
}

export default new UniversitiesService;
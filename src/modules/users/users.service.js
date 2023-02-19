import { Router } from 'express';
import UsersModel from './users.model.js';
import { success, badRequest } from '../utils/reponsePattern/responseStatusCode.js';

class UsersService {
    async create (reqUser) {
		const createdUser = await UsersModel.create({
            ...reqUser,
            createdAt: new Date
        });

        return createdUser;
    }

    async readAll (filter) {
        const readUsers = await UsersModel.find(filter).select('_id name email isActive');

        return readUsers;
    }

    async readById (id) {
        const readUser = await UsersModel.findOne({ _id: id }).select('-__v');

        if(!readUser) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        return readUser;
    }

    async update (id, reqUser) {
        const updatedUser = await UsersModel.findByIdAndUpdate({ _id: id }, {
            ...reqUser,
            updatedAt: new Date
    }).select('-__v');

        if(!updatedUser) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        return { id: updatedUser._id };
    }

    async delete (id) {
        const deletedUser = await UsersModel.findByIdAndDelete({ _id: id }).select('-__v');

        if(!deletedUser) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        return { id: deletedUser._id };
    }
}

export default new UsersService;
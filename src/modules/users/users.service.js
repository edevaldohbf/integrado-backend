import UsersModel from './users.model.js';
import { success, badRequest } from '../utils/reponsePattern/responseStatusCode.js';
import { hashPassword } from '../utils/password.js';

class UsersService {
    async create (reqUser) {
        const passwordDefault = Math.abs(Math.floor(Math.random() * 999999) + 100000);
        const hashedPassword = await hashPassword(String(passwordDefault));

		const createdUser = await UsersModel.create({
            ...reqUser,
            password: hashedPassword,
            isActive: true,
            isFirstAcess: true,
            createdAt: new Date
        });

        return {
            ...createdUser._doc,
            password: passwordDefault
        };
    }

    async readAll (filter, reqPage) {
        const perPage = 20;
        const page = Math.max(0, reqPage ? reqPage - 1 : 0);        

        const readUsers = await UsersModel
            .find(filter)
            .select('_id name email isActive')
            .limit(perPage)
            .skip(perPage * page)
            .sort({
                name: 'asc'
            });

        const totalItems = await UsersModel.count();

        const totalPages = Math.ceil(totalItems / perPage);

        if (page + 1 > totalPages) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        return {
            ...readUsers,
            meta: {
                totalItems: totalItems,
                itemPageCount: readUsers.length,
                maxItemsPerPage: perPage,
                totalPages: totalPages,
                currentPage: page + 1
            }
        };
    }

    async readById (id) {
        const readUser = await UsersModel.findOne({ _id: id }).select('-__v -password');

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
    }).select('-__v -password');

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
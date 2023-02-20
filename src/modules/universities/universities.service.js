import UniversitiesModel from './universities.model.js';
import { success, badRequest } from '../utils/reponsePattern/responseStatusCode.js';
import message from '../utils/reponsePattern/responseMessage.js';

class UniversitiesService {
    async create (reqUniversity) {
		const createdUniversity = await UniversitiesModel.create({
            ...reqUniversity,
            createdAt: new Date
        });

        return createdUniversity;
    }

    async readAll (filter, reqPage) {
        const perPage = 20;
        const page = Math.max(0, reqPage ? reqPage - 1 : 0);

        const readUniversities = await UniversitiesModel
            .find(filter)
            .select('_id name stateProvince country')
            .limit(perPage)
            .skip(perPage * page)
            .sort({
                name: 'asc'
            });

        const totalItems = await UniversitiesModel.count();

        const totalPages = Math.ceil(totalItems / perPage);

        if (page + 1 > totalPages) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        return {
            ...readUniversities,
            meta: {
                totalItems: totalItems,
                itemPageCount: readUniversities.length,
                maxItemsPerPage: perPage,
                totalPages: totalPages,
                currentPage: page + 1
            }
        };
    }

    async readById (id) {
        const readUniversity = await UniversitiesModel.findOne({
            _id: id
        }).select('-__v');

        if(!readUniversity) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        return readUniversity;
    }

    async update (id, reqUniversity) {
        const updatedUniversity = await UniversitiesModel.findByIdAndUpdate({ _id: id }, {
            ...reqUniversity,
            updatedAt: new Date
        }).select('-__v');

        if(!updatedUniversity) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        return { id: updatedUniversity._id};
    }

    async delete (id) {
        const deletedUniversity = await UniversitiesModel.findByIdAndDelete({ _id: id }).select('-__v');

        if(!deletedUniversity) {
            throw {
                statusCode: badRequest,
                message: message[0]
            };
        }

        return { id: deletedUniversity._id };
    }
}

export default new UniversitiesService;
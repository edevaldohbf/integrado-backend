import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UniversitiesSchema = new Schema({
	id: ObjectId,
	name: String,
	stateProvince: String,
	country: String,
	alphaTwoCode: String,
	domains: Array,
	webPages: Array,
	createdAt: Date,
	updatedAt: Date
});

const UniversitiesModel = mongoose.model('universities', UniversitiesSchema);

export default UniversitiesModel;
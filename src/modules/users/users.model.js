import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
	id: ObjectId,
	name: String,
	email: String,
	password: String,
	isActive: Boolean,
	isAdmin: Boolean,
	isFirstAcess: Boolean,
	createdAt: Date,
	updatedAt: Date
});

const UsersModel = mongoose.model('users', UsersSchema);

export default UsersModel;
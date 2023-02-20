import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
	id: ObjectId,
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: String,
	isActive: Boolean,
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isFirstAcess: Boolean,
	createdAt: Date,
	updatedAt: Date
});

const UsersModel = mongoose.model('users', UsersSchema);

export default UsersModel;
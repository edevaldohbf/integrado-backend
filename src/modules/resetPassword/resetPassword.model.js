import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ResetPasswordSchema = new Schema({
	id: ObjectId,
	userId: String,
	isUsed: Boolean,
	token: String,
	createdAt: Date,
	usedAt: Date
});

const ResetPasswordModel = mongoose.model('reset_password', ResetPasswordSchema);

export default ResetPasswordModel;
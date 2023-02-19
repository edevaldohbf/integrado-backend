import mongoose from 'mongoose';
import { nodeEnv, userDb, passwordDb, userDbLocal, passwordDbLocal } from './env.js';

const startDb = async () => {
	if (nodeEnv == 'production') {
		await mongoose.connect(`mongodb+srv://${userDb}:${passwordDb}@clusterintegrado.dlpuhqp.mongodb.net/test`);
	}
	else if (nodeEnv == 'local') {
		await mongoose.connect(`mongodb://${userDbLocal}:${passwordDbLocal}@0.0.0.0:27017/`);
	}
}

export default startDb;
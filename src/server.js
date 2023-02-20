import app from './config/app.js';
import { port, host } from './config/env.js';
import startDb from './config/mongoDb.js';

const server = app.listen(port, host, async () => {
	startDb();
	console.log(`\u001b[34m \nServer running at ${host}:${port}\n \u001b[0m`);
});

process.on('SIGINT', () => {
	server.close( () => {
		console.log(`\n\u001b[31mServer Ending\n\u001b[0m`);
		process.exit(0);
	})
});
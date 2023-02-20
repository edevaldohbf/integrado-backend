import app from './config/app.js';
import { port, host } from './config/env.js';
import startDb from './config/mongoDb.js';
import { CronJob } from 'cron';
import { importUniversities } from './modules/universities/universities.script.js'

const server = app.listen(port, host, async () => {
	startDb();
	console.log(`\u001b[34m \nServer running at ${host}:${port}\n \u001b[0m`);

	new CronJob (
		'0 0 3 * * *', 
		async function () {
			importUniversities(true);
		},
		null,
		true,
		'America/Sao_Paulo'
	);
});

process.on('SIGINT', () => {
	server.close( () => {
		console.log(`\n\u001b[31mServer Ending\n\u001b[0m`);
		process.exit(0);
	})
});
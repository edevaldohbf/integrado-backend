import express, { json } from 'express';
import router from './routes.js';
import modifyResponseBody from '../modules/utils/reponsePattern/response.js';

const app = express();

app.use(json());
app.use(modifyResponseBody)
app.use(router)

export default app;
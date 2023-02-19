import express, { Router } from 'express';
import { success } from '../modules/utils/reponsePattern/responseStatusCode.js'
import { universities } from '../modules/index.js';

const router = Router();

// Home
router.get('/', (req, res) => {
	return res.send({
		statusCode: success,
        data: 'API HOME'
	})
});

// University CRUD
router.post('/universities', universities.create)
router.get('/universities', universities.readAll)
router.get('/universities/:id', universities.readById)
router.put('/universities/:id', universities.update)
router.delete('/universities/:id', universities.delete)

export default router;
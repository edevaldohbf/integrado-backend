import express, { Router } from 'express';
import { success } from '../modules/utils/reponsePattern/responseStatusCode.js'
import { auth, users, universities } from '../modules/index.js';

const router = Router();

// Home
router.get('/', (req, res) => {
	return res.send({
		statusCode: success,
        data: 'API HOME'
	})
});

// Auth
router.post('/token/access', auth.accessToken)
router.post('/token/refresh', auth.refreshToken)

// User CRUD
router.post('/users', users.create)
router.get('/users', users.readAll)
router.get('/users/:id', users.readById)
router.put('/users/:id', users.update)
router.delete('/users/:id', users.delete)

// University CRUD
router.post('/universities', universities.create)
router.get('/universities', universities.readAll)
router.get('/universities/:id', universities.readById)
router.put('/universities/:id', universities.update)
router.delete('/universities/:id', universities.delete)

export default router;
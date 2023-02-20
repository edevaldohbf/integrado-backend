import express, { Router } from 'express';
import { success } from '../modules/utils/reponsePattern/responseStatusCode.js'
import { auth, resetPassword, users, universities } from '../modules/index.js';
import { verifyToken, verifyResetPassword } from '../modules/utils/token.js';
import { verifyAdmin } from '../modules/utils/roles.js'

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

// Reset Password
router.post('/reset-password/request', resetPassword.request)
router.put('/reset-password/action', verifyResetPassword, resetPassword.action)

// User CRUD
router.post('/users', verifyToken, verifyAdmin, users.create)
router.get('/users', verifyToken, verifyAdmin, users.readAll)
router.get('/users/:id', verifyToken, verifyAdmin, users.readById)
router.put('/users/:id', verifyToken, verifyAdmin, users.update)
router.delete('/users/:id', verifyToken, verifyAdmin, users.delete)

// University CRUD
router.post('/universities', verifyToken, universities.create)
router.get('/universities', verifyToken, universities.readAll)
router.get('/universities/:id', verifyToken, universities.readById)
router.put('/universities/:id', verifyToken, universities.update)
router.delete('/universities/:id', verifyToken, universities.delete)

export default router;
import express from 'express'
const router = express.Router()
import { authenticateUser } from '../controllers/UserController.js'

router.post('/login', authenticateUser)
// '/login' will be hooked to '/users'

export default router

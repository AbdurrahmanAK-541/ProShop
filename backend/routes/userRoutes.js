import express from 'express'
const router = express.Router()
import {
  authenticateUser,
  getUserProfile,
} from '../controllers/UserController.js'
import { protector } from '../middleware/AuthenticationMiddleware.js'

router.post('/login', authenticateUser)
// '/login' will be hooked to '/users'
router.route('/profile').get(protector, getUserProfile) //middleware implemented by passing it through as a first argument

export default router

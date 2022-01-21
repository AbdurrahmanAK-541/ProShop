import express from 'express'
const router = express.Router()
import {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/UserController.js'
import { protector } from '../middleware/AuthenticationMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authenticateUser)
// '/login' will be hooked to '/users'
router
  .route('/profile')
  .get(protector, getUserProfile)
  .put(protector, updateUserProfile)
//middleware implemented by passing it through as a first argument

export default router
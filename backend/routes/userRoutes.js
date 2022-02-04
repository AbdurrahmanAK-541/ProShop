import express from 'express'
const router = express.Router()
import {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAppUsers,
  deleteAppUser,
} from '../controllers/UserController.js'
import { protector, adminOnly } from '../middleware/AuthenticationMiddleware.js'

router.route('/').post(registerUser).get(protector, adminOnly, getAppUsers)
//pass in the protector and adminOnly middleWare --> only admin users can get appUsers information
router.post('/login', authenticateUser)
// '/login' will be hooked to '/users'
router
  .route('/profile')
  .get(protector, getUserProfile)
  .put(protector, updateUserProfile)
//middleware implemented by passing it through as a first argument

router.route('/:id').delete(protector, adminOnly, deleteAppUser)
//added the id route at the bottom to not mess up the router
//pass in the protector and adminOnly middleware as its a private and restricte route.
//set it to deleteAppUser --> only admin accounts can delete users.

export default router

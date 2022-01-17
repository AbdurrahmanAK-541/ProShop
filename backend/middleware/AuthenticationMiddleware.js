import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protector = asyncHandler(async (req, res, next) => {
  //middleware order, req, res, next
  let token
  //calling the 'Authorization' Key set in the header in Postman
  //makes sure it starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      //attains token by splitting at the space between 'Bearer' and the jwt
      const decode = jwt.verify(token, process.env.JWT_WEBTOKEN)

      req.user = await User.findById(decode.id).select('-password')
      //using decode to find the user Id. we do not want to include the password in the new req.user payload
      //req.user will now have access to all the protected routes

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      //if this fails = token failed = no authentication
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401) //responds with 401 status code: indicates lack of authentication for the requested resource
    throw new Error('Not Authorized, no token has been found')
  }
})

export { protector }

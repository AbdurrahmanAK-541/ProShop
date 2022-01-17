import asyncHandler from 'express-async-handler'
import generateWebToken from '../utils/generateWebToken.js'
import User from '../models/userModel.js'

//38 1.20
// @description  Authenticate User and attain token
// @route        POST /api/users/login
// @access       Public

const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body // gives us access to body data.
  //destructed the data to pull out the targeted information

  const user = await User.findOne({ email }) //function retreives an email that matches the email requested

  //check if user exists and if the inputed plain text password matches the encrypted one in DB
  //this is acheivable in userModel. no need to import Bycrypt
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateWebToken(user._id),
      //after we validation, if the user exists, it will be put in the 'user' variable
      //if it matches => we will return the data + web token thats generated that includes the user id embedded as the payload
    })
  } else {
    res.status(401)
    throw new Error(`Invalid user email or password`)
  }
})

/*
  res.send({ //access to the password and email being sent
    email,
    password,
  })
  */

// @description  Get the user's  Profile
// @route        GET /api/users/profile
// @access       Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  //whatever is passed in as the token contains the id which fetches the user in the middleware
  //and assigning it to req.user => able to use in any protected route we choose
  if (user) {
    //userDataAdmin in Postman
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User can not be found')
  }
})

export { authenticateUser, getUserProfile }

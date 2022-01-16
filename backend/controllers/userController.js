import asyncHandler from 'express-async-handler'
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
      token: null, // not introduced as of yet
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

export { authenticateUser }

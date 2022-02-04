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
    res.status(401) //401 means no valid authentication creditentials inputted
    throw new Error(`Invalid user email or password`)
  }
})

// @description  Register new users
// @route        POST /api/users
// @access       Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body // gives us access to body data.
  //destructed the data to pull out the targeted information

  const userExists = await User.findOne({ email }) //function retreives an email that matches the email requested

  //check if user exists and if the inputed plain text password matches the encrypted one in DB
  //this is acheivable in userModel. no need to import Bycrypt
  if (userExists) {
    res.status(400) //means the server cannot proccess the request due to client error (double username)
    throw new Error('This user already exists')
  }

  const user = await User.create({
    name,
    email,
    password, //hashed using middleware in the usermodel
  })

  if (user) {
    res.status(201).json({
      //201 means that response has been fulfilled and a new resource (user) has been created
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateWebToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

/*
  res.send({ //access to the password and email being sent
    email,
    password,
  })
  */

//first route that will be sent the token from the frontend
// @description  Get the user's  Profile
// @route        GET /api/users/profile
// @access       Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  //whatever is passed in as the token contains the id which fetches the user in the middleware
  //and assigning it to req.user => able to use in any protected route chosen
  if (user) {
    //userDataAdmin in Postman
    res.json({
      _id: user._id, //returns the user id
      name: user.name, //returns the user name
      email: user.email, //returns the user email
      isAdmin: user.isAdmin, //returns whether the user is an admin through a true/false option.
    })
  } else {
    //if no user is found...
    res.status(404) //respond with a HTTP 404 not found status code ==> cannot find requested resource.
    throw new Error('User can not be found') //message is displayed to the user.
  }
})

// @description  Update the user's Profile
// @route        PUT /api/users/profile
// @access       Private (need to be logged in)

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  //whatever is passed in as the token contains the id which fetches the user in the middleware
  //and assigning it to req.user => able to use in any protected route we choose
  if (user) {
    //if user is there
    user.name = req.body.name || user.name //set the user.name to the new request inputted (body) name or normal user name
    user.email = req.body.email || user.email //set the user.email to the new request inputted (body) email or normal user email
    if (req.body.password) {
      //check if a password has been sent
      user.password = req.body.password //set user.password to req.body.password (automatically encrypted due to the middleware added in userModel.js)
    }
    const updatedUserDetails = await user.save()

    res.json({
      _id: updatedUserDetails._id,
      name: updatedUserDetails.name,
      email: updatedUserDetails.email,
      isAdmin: updatedUserDetails.isAdmin,
      token: generateWebToken(updatedUserDetails._id),
      //after we validation, if the user exists, it will be put in the 'user' variable
      //if it matches => we will return the data + web token thats generated that includes the user id embedded as the payload
    })
  } else {
    res.status(404)
    throw new Error('User can not be found')
  }
})

// @description  Get all users
// @route        GET /api/users/profile
// @access       Private/protected + admin

const getAppUsers = asyncHandler(async (req, res) => {
  const AppUsers = await User.find({})
  res.json(AppUsers)
})

// @description  Delete a chosen user
// @route        DELETE /api/users/:id
// @access       Private/protected + admin

const deleteAppUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User Deleted' })
  } else {
    res.status(404)
    throw new Error('User Does Not Exist Or Cannot Be Found')
  }
  res.json(AppUsers)
})

export {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAppUsers,
  deleteAppUser,
}

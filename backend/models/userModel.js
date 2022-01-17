import mongoose from 'mongoose'
import bcrypt from 'bcryptjs/dist/bcrypt.js'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

//use bcrypt compare method to compare the plain text inputed password to the hashed password stored in the DB
userSchema.methods.matchPassword = async function (inputedPassword) {
  return await bcrypt.compare(inputedPassword, this.password)
  //pass in the inputed password and compare it to the password stored
}

//adding middleware. it automatically runs, no need to import to the userController
userSchema.pre('save', async function (next) {
  //algorithm is executed before saving to the database
  if (!this.isModified('password')) {
    //the algorithm below will only be triggered if the password is modified
    next() //if the password is not modified, it will move on
  }
  const salt = await bcrypt.genSalt(10) //a bcyrpt that generates a password "salt" for security reasons
  this.password = await bcrypt.hash(this.password, salt) //plain text password is hashed and the salt is added
})
const User = mongoose.model('User', userSchema)

export default User

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

const User = mongoose.model('User', userSchema)

export default User

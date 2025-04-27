import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

// Define the User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving it
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Don't hash if the password isn't modified
  
// Hash the password with salt rounds (number of times to apply hashing)
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if password matches the one in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with stored password
};

const UserModel = model("User", UserSchema);

export default UserModel;

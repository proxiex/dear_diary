import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = Schema({
  avatar: String,
  username: String,
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

export default User;

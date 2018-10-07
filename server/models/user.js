import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = Schema({
  avatar: String,
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;

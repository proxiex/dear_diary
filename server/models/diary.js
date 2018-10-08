import mongoose from 'mongoose';

const { Schema } = mongoose;
const diarySchema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Diary = mongoose.model('Diary', diarySchema);

export default Diary;

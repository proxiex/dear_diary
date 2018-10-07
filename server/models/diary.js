import mongoose from 'mongoose';

const { Schema } = mongoose;
const diarySchema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  text: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

diarySchema.method('update', (updates, callback) => {
  Object.assign(this, updates, { updatedAt: new Date() });
  this.save(callback);
});

const Diary = mongoose.model('Diary', diarySchema);

export default Diary;

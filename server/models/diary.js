import mongoose from 'mongoose';

const sortAnswers = (a, b) => {
  if (a.createdAt === b.createdAt) {
    return b.updatedAt - a.updatedAt;
  }
  return b.createdAt - a.createdAt;
};


const { Schema } = mongoose;
const diarySchema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  text: String,
  private: {
    type: Boolean,
    default: true
  },
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

diarySchema.pre('save', (next) => {
  this.answers.sort(sortAnswers);
  next();
});

const Diary = mongoose.model('Diary', diarySchema);

export default Diary;

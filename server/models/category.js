import mongoose from 'mongoose';

const { Schema } = mongoose;
const categorySchema = Schema({
  use: String,
  title: String,
  text: String,
  category: String
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

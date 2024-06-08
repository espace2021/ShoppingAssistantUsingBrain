const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String, 
  categories: [String],
  colors: [String],
  sizes: [String],
  // etc
});

module.exports = mongoose.model('Product', productSchema);
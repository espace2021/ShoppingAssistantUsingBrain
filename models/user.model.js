const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  dislikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}] 
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  note: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    required: true,
    set: value => value.toLowerCase().split(' ').map(
      word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
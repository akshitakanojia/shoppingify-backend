const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  status: String,
  items: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    quantity: {
      type: Number
    }
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

const List = mongoose.model('List', listSchema)

module.exports = List
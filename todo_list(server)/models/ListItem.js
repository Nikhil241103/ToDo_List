const mongoose = require('mongoose')

const listItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    start: {
      type: Date
    },
    end: {
      type: Date,
      default: null
    }
  }
)

module.exports = mongoose.model('ListItem', listItemSchema)
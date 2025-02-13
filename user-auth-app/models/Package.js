const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['SELF_NUMBER', 'RANDOM_NUMBER']
  },
  price: {
    type: Number,
    required: true
  },
  messageLimit: {
    type: Number,
    required: true,
    default: 100
  },
  active: {
    type: Boolean,
    default: true
  }
});


module.exports = mongoose.model("Package", packageSchema);
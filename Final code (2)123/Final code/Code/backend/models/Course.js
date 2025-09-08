const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  description: {
    type: String,
    trim: true
  },
  instructor: {
    type: String,
    trim: true
  },
  credits: {
    type: Number,
    default: 3,
    min: 1
  },
  duration: {
    type: Number,
    default: 12,
    min: 1
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);

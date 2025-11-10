// backend/models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  floor_no: {
    type: Number,
    required: true,
  },
  room_no: {
    type: String,
    required: true,
  },
  max_cap: {
    type: Number,
    required: true,
    min: 1,
  },
  time_duration: {
    type: Number,  // Representing duration in minutes (e.g., 120 for 2 hours)
    required: true,
    min: 1,        // Minimum duration should be at least 1 minute
  },
  date: {
    type: Date,
    required: true,
  },
  priority_no: {
    type: Number,
    default: 0,   // 0 is for normal priority, higher numbers for higher priority
  },
  waiting_no: {
    type: Number,
    default: 0,   // Default to 0 for no waiting
  },
  user_email: {
    type: String, // Email of the user making the booking
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Validation for email format
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Booking', bookingSchema);
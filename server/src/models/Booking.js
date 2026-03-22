const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    stayId: { type: String, required: true, trim: true },
    guests: { type: Number, required: true, min: 1 },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    contact: { type: String, required: true, trim: true },
    requests: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
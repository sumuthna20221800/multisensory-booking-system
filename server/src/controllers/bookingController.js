const Booking = require('../models/Booking');
const { sendBookingEmails } = require('../services/mailService');

const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const booking = await Booking.create(bookingData);

    // Send emails in the background so booking confirmation is never blocked by SMTP issues.
    sendBookingEmails(booking).catch((error) => {
      console.error(`Booking email dispatch failed for ${booking._id}:`, error.message);
    });

    res.status(201).json({
      success: true,
      message: 'Your eco-stay has been reserved!',
      booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createBooking };
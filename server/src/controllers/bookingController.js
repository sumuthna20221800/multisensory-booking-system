const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const booking = await Booking.create(bookingData);

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
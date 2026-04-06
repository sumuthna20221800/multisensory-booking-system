const Booking = require('../models/Booking');
const { sendMail } = require('../services/mailService');
const { buildBookingConfirmationMail } = require('../services/bookingMailTemplate');

const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const booking = await Booking.create(bookingData);

    let mailStatus = { sent: false, reason: 'not-attempted' };
    try {
      const { subject, text, html } = buildBookingConfirmationMail(booking);
      mailStatus = await sendMail({
        to: booking.email,
        subject,
        text,
        html,
      });
    } catch (mailError) {
      mailStatus = { sent: false, reason: 'mail-send-failed' };
      console.error('Booking confirmation email failed:', mailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your eco-stay has been reserved!',
      booking,
      mail: mailStatus,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createBooking };
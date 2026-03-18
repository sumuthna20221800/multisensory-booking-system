const createBooking = async (req, res) => {
    try {
      const bookingData = req.body;
      console.log("New Booking Received:", bookingData);
      
      // In a real app, you'd save to DB here. For now, we return success.
      res.status(201).json({
        success: true,
        message: "Your eco-stay has been reserved!",
        booking: bookingData
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  module.exports = { createBooking };
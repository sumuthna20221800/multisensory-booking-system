const submitFeedback = async (req, res) => {
    try {
      const feedbackData = req.body;
      console.log("New Feedback Received:", feedbackData);
  
      res.status(201).json({
        success: true,
        message: "Thank you for your sensory feedback!",
        feedback: feedbackData
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  module.exports = { submitFeedback };
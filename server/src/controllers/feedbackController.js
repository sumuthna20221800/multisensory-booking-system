const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;
    const feedback = await Feedback.create(feedbackData);

    res.status(201).json({
      success: true,
      message: 'Thank you for your sensory feedback!',
      feedback
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitFeedback };
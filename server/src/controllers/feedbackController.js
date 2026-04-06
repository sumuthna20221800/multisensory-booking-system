const Feedback = require('../models/Feedback');
const { sendFeedbackThankYouEmail } = require('../services/mailService');

const submitFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;
    const feedback = await Feedback.create(feedbackData);

    sendFeedbackThankYouEmail(feedback).catch((error) => {
      console.error(`Feedback email dispatch failed for ${feedback._id}:`, error.message);
    });

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
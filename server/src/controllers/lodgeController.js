const Lodge = require('../models/Lodge');

// @desc    Get all lodges
// @route   GET /api/lodges
const getLodges = async (req, res) => {
  try {
    const lodges = await Lodge.find({});
    res.json(lodges);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching lodges" });
  }
};

module.exports = { getLodges };
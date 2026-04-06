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

// @desc    Create a lodge
// @route   POST /api/lodges
const createLodge = async (req, res) => {
  try {
    const {
      id,
      name,
      location,
      description,
      price,
      image,
      panorama,
      sound,
      stories,
      contact,
    } = req.body;

    if (!name || !location || price === undefined || price === null || price === '') {
      return res.status(400).json({ message: 'Name, location, and price are required' });
    }

    const lodge = await Lodge.create({
      lodgeId: id,
      name,
      location,
      description,
      price: Number(price),
      image,
      panorama,
      sound,
      stories: Array.isArray(stories) ? stories.filter(Boolean) : [],
      contact,
      panoramaImage: panorama,
      soundscapeAudio: sound,
    });

    res.status(201).json({
      success: true,
      message: 'Eco-stay added successfully',
      lodge,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error creating lodge' });
  }
};

module.exports = { getLodges, createLodge };
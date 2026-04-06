const mongoose = require('mongoose');

const lodgeSchema = mongoose.Schema({
  lodgeId: { type: String, trim: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  panorama: { type: String },
  sound: { type: String },
  stories: [String],
  contact: { type: String, trim: true },
  panoramaImage: { type: String }, // URL to 360 image
  soundscapeAudio: { type: String }, // URL to mp3
  price: { type: Number, required: true },
  amenities: [String]
}, { timestamps: true });

module.exports = mongoose.model('Lodge', lodgeSchema);
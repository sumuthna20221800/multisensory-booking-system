/*const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set in environment variables');
  }

  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
*/
const mongoose = require('mongoose');

const maskCredentials = (uri) => uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:**@');

const isSrvLookupError = (error) => {
  const message = (error && error.message) || '';
  return message.includes('querySrv') || message.includes('ENOTFOUND') || message.includes('ECONNREFUSED');
};

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set in environment variables');
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    if (process.env.MONGO_URI_DIRECT && isSrvLookupError(error)) {
      console.warn('Primary MongoDB SRV URI failed. Retrying with MONGO_URI_DIRECT fallback...');
      console.warn(`Primary URI: ${maskCredentials(process.env.MONGO_URI)}`);

      const conn = await mongoose.connect(process.env.MONGO_URI_DIRECT);
      console.log(`MongoDB connected via direct URI: ${conn.connection.host}`);
      return;
    }

    const hints = [
      'MongoDB connection failed.',
      'If SRV DNS is blocked on this network, set MONGO_URI_DIRECT in .env and try again.',
      'You can also switch DNS to 1.1.1.1 / 8.8.8.8 and flush DNS cache.',
    ];

    throw new Error(`${hints.join(' ')} Original error: ${error.message}`);
  }
};

module.exports = connectDB;
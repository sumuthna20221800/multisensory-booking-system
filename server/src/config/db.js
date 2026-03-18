/*const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Eco-DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;*/

/*const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🍃 Nature is calling: Connected to Eco-DB");
  } catch (err) {
    console.error("Database Connection Failed! Details below:");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;*/
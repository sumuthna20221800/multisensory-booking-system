// server/src/server.js
/*const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Reference your config file


// ... rest of your code
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Basic Route for testing
app.get('/', (req, res) => res.send('EcoSenses API is purring...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/

// server/src/server.js
/*const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());

// --- DATABASE REMOVED ---
// No connectDB() here!

// Dummy Register Route
app.post('/api/auth/register', (req, res) => {
  console.log("Data received from Frontend:", req.body);
  res.status(201).json({ 
    message: "Connection Successful! Backend received your data.",
    user: req.body 
  });
});

// Dummy Login Route
app.post('/api/auth/login', (req, res) => {
  res.status(200).json({ message: "Login successful (Demo Mode)" });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
  console.log(`🔗 Point your frontend to http://localhost:${PORT}`);
});
*/

// server/src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());

// --- DATABASE REMOVED ---
// No connectDB() here!

// 1. Auth Routes (Existing)
app.post('/api/auth/register', (req, res) => {
  console.log("Auth Data received:", req.body);
  res.status(201).json({ 
    message: "Connection Successful! Backend received your data.",
    user: req.body 
  });
});

app.post('/api/auth/login', (req, res) => {
  res.status(200).json({ message: "Login successful (Demo Mode)" });
});

// 2. Booking Route (New)
// This matches the data structure in your BookingForm.jsx
app.post('/api/bookings', (req, res) => {
  const bookingData = req.body;
  console.log("New Booking Received:", bookingData);
  
  // Since there is no database, we return a success response immediately
  res.status(201).json({
    message: "Eco-stay reservation received successfully!",
    receivedData: bookingData
  });
});

// 3. Feedback Route (New)
// This will connect to your FeedbackQuiz.jsx
app.post('/api/feedback', (req, res) => {
  const feedbackData = req.body;
  console.log("New Feedback Received:", feedbackData);

  res.status(201).json({
    message: "Thank you for your sensory feedback!",
    receivedData: feedbackData
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
  console.log(`🔗 Point your frontend to http://localhost:${PORT}`);
});
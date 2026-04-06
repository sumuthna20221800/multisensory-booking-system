const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const lodgeRoutes = require('./routes/lodgeRoutes');
const mailRoutes = require('./routes/mailRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('EcoSenses API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/lodges', lodgeRoutes);
app.use('/api/mail', mailRoutes);

app.use((err, req, res, next) => {
	const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
	res.status(statusCode).json({ message: err.message || 'Server error' });
});

module.exports = app;

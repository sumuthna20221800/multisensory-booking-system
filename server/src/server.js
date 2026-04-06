require('dotenv').config();
const dns = require('node:dns');

dns.setDefaultResultOrder('ipv4first');

const app = require('./app');
const connectDB = require('./config/db');
const { initMailService, getMailServiceStatus } = require('./services/mailService');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await initMailService();

    app.listen(PORT, () => {
      const mailStatus = getMailServiceStatus();
      console.log(`Server running on port ${PORT}`);
      if (mailStatus.enabled) {
        console.log(`Mail service is enabled (mode: ${mailStatus.mode})`);
      } else {
        console.log('Mail service is disabled (set MAIL_ENABLED=true to enable)');
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
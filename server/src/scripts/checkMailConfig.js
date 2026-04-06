require('dotenv').config();

const { verifyMailConnection } = require('../services/mailService');

const run = async () => {
  try {
    const result = await verifyMailConnection();

    if (!result.ok) {
      if (result.reason === 'MAIL_DISABLED') {
        console.log('Mail check skipped: MAIL_ENABLED is false');
        process.exit(0);
      }

      console.log('Mail check result:', result);
      process.exit(1);
    }

    console.log('Mail check successful:', result.config);
    process.exit(0);
  } catch (error) {
    console.error('Mail check failed:', error.message);
    process.exit(1);
  }
};

run();

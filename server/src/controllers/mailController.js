const { verifyMailConnection } = require('../services/mailService');

const getMailHealth = async (req, res) => {
  try {
    const result = await verifyMailConnection();

    if (!result.ok) {
      return res.status(200).json({
        success: false,
        message: result.reason === 'MAIL_DISABLED'
          ? 'Mail service is disabled'
          : 'Mail service is not ready',
        reason: result.reason,
        missingConfig: result.missingConfig || []
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Mail service is configured and reachable',
      config: result.config
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Mail service verification failed',
      error: error.message
    });
  }
};

module.exports = { getMailHealth };

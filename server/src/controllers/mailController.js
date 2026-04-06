const { sendMail, getMailServiceStatus } = require('../services/mailService');

const sendTestMail = async (req, res) => {
  try {
    const to = req.body?.to || process.env.MAIL_TEST_TO;
    if (!to) {
      return res.status(400).json({
        success: false,
        message: 'Recipient email is required. Provide "to" in body or set MAIL_TEST_TO.',
      });
    }

    const result = await sendMail({
      to,
      subject: 'EcoSenses Mail Service Test',
      text: 'Mail service setup is working.',
      html: '<p><strong>EcoSenses</strong> mail service setup is working.</p>',
    });

    return res.status(200).json({
      success: true,
      message: 'Test mail request processed',
      mailStatus: getMailServiceStatus(),
      result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendTestMail };

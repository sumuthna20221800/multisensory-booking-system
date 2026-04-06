const nodemailer = require('nodemailer');
const {
  bookingConfirmationTemplate,
  adminBookingAlertTemplate,
  welcomeTemplate,
  feedbackThanksTemplate
} = require('./mailTemplates');

let transporter;

const isMailEnabled = () => process.env.MAIL_ENABLED === 'true';

const getMissingMailConfig = () => {
  const requiredKeys = ['SMTP_HOST', 'SMTP_PORT', 'MAIL_FROM'];
  const authKeys = ['SMTP_USER', 'SMTP_PASS'];

  const missingRequired = requiredKeys.filter((key) => !process.env[key]);
  const hasAnyAuthValue = authKeys.some((key) => Boolean(process.env[key]));
  const missingAuth = hasAnyAuthValue ? authKeys.filter((key) => !process.env[key]) : [];

  return [...missingRequired, ...missingAuth];
};

const getTransporter = () => {
  if (transporter) {
    return transporter;
  }

  const port = Number(process.env.SMTP_PORT || 587);

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER && process.env.SMTP_PASS
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      : undefined
  });

  return transporter;
};

const sendMail = async ({ to, subject, text, html }) => {
  if (!isMailEnabled()) {
    return { skipped: true, reason: 'MAIL_DISABLED' };
  }

  if (!to || !subject || (!text && !html)) {
    throw new Error('Invalid email payload');
  }

  const mailOptions = {
    from: process.env.MAIL_FROM || 'EcoSenses <no-reply@ecosenses.local>',
    to,
    subject,
    text,
    html
  };

  const activeTransporter = getTransporter();
  return activeTransporter.sendMail(mailOptions);
};

const verifyMailConnection = async () => {
  if (!isMailEnabled()) {
    return { ok: false, reason: 'MAIL_DISABLED' };
  }

  const missingConfig = getMissingMailConfig();
  if (missingConfig.length > 0) {
    return {
      ok: false,
      reason: 'MAIL_CONFIG_INCOMPLETE',
      missingConfig
    };
  }

  const activeTransporter = getTransporter();
  await activeTransporter.verify();
  return {
    ok: true,
    config: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      from: process.env.MAIL_FROM,
      adminRecipientCount: parseAdminEmails().length
    }
  };
};

const parseAdminEmails = () => {
  const envValue = process.env.ADMIN_NOTIFICATION_EMAILS || '';
  return envValue
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
};

const sendBookingEmails = async (booking) => {
  const guestEmail = booking?.email;
  const adminEmails = parseAdminEmails();

  const guestTemplate = bookingConfirmationTemplate(booking);
  const adminTemplate = adminBookingAlertTemplate(booking);

  const tasks = [];

  if (guestEmail) {
    tasks.push(sendMail({ to: guestEmail, ...guestTemplate }));
  }

  if (adminEmails.length > 0) {
    tasks.push(sendMail({ to: adminEmails.join(','), ...adminTemplate }));
  }

  const results = await Promise.allSettled(tasks);

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Email send failed for booking ${booking?._id} (task ${index + 1}):`, result.reason?.message || result.reason);
    }
  });

  return results;
};

const sendWelcomeEmail = async (user) => {
  if (!user?.email) {
    return { skipped: true, reason: 'MISSING_RECIPIENT' };
  }

  const template = welcomeTemplate(user);

  try {
    return await sendMail({ to: user.email, ...template });
  } catch (error) {
    console.error(`Welcome email send failed for user ${user?._id}:`, error.message);
    return { skipped: true, reason: 'SEND_FAILED' };
  }
};

const sendFeedbackThankYouEmail = async (feedback) => {
  if (!feedback?.email) {
    return { skipped: true, reason: 'MISSING_RECIPIENT' };
  }

  const template = feedbackThanksTemplate(feedback);

  try {
    return await sendMail({ to: feedback.email, ...template });
  } catch (error) {
    console.error(`Feedback email send failed for feedback ${feedback?._id}:`, error.message);
    return { skipped: true, reason: 'SEND_FAILED' };
  }
};

module.exports = {
  sendMail,
  sendBookingEmails,
  sendWelcomeEmail,
  sendFeedbackThankYouEmail,
  verifyMailConnection,
  getMissingMailConfig
};

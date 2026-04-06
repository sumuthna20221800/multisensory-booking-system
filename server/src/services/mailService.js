const nodemailer = require('nodemailer');

const toBoolean = (value) => String(value).toLowerCase() === 'true';

const isMailEnabled = () => toBoolean(process.env.MAIL_ENABLED);
const getMailTransportMode = () => (process.env.MAIL_TRANSPORT || 'smtp').toLowerCase();

const hasSmtpConfig = () => {
  return Boolean(process.env.MAIL_HOST && process.env.MAIL_PORT && process.env.MAIL_FROM);
};

const hasPlaceholderCredentials = () => {
  const user = process.env.MAIL_USER || '';
  const pass = process.env.MAIL_PASS || '';
  return user.includes('your-smtp-username') || pass.includes('your-smtp-password');
};

let transporter = null;
let activeMode = 'disabled';
let lastMailError = '';

const createConsoleTransport = () => {
  activeMode = 'console';
  return nodemailer.createTransport({ jsonTransport: true });
};

const createTransporter = () => {
  if (!isMailEnabled()) {
    lastMailError = '';
    return null;
  }

  const transportMode = getMailTransportMode();
  if (transportMode === 'console') {
    lastMailError = '';
    return createConsoleTransport();
  }

  if (!hasSmtpConfig()) {
    activeMode = 'smtp';
    lastMailError = 'SMTP settings are incomplete. Set MAIL_HOST, MAIL_PORT and MAIL_FROM.';
    return null;
  }

  if (hasPlaceholderCredentials()) {
    activeMode = 'smtp';
    lastMailError = 'Placeholder SMTP credentials detected. Set real MAIL_USER and MAIL_PASS.';
    return null;
  }

  lastMailError = '';
  activeMode = 'smtp';
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: toBoolean(process.env.MAIL_SECURE),
    auth: process.env.MAIL_USER && process.env.MAIL_PASS
      ? {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        }
      : undefined,
  });
};

const initMailService = async () => {
  transporter = createTransporter();

  if (!transporter) {
    if (!isMailEnabled()) {
      activeMode = 'disabled';
    }
    return { enabled: isMailEnabled(), mode: activeMode, error: lastMailError || undefined };
  }

  if (activeMode === 'smtp') {
    try {
      await transporter.verify();
      lastMailError = '';
      return { enabled: true, mode: activeMode, verified: true };
    } catch (error) {
      lastMailError = `SMTP verification failed: ${error.message}`;
      transporter = null;
      return { enabled: true, mode: activeMode, verified: false, error: lastMailError };
    }
  }

  return { enabled: true, mode: activeMode, verified: false };
};

const resolveFromAddress = () => {
  const configuredFrom = process.env.MAIL_FROM;
  const user = process.env.MAIL_USER;
  const isGmailHost = (process.env.MAIL_HOST || '').includes('gmail');

  if (isGmailHost && configuredFrom && configuredFrom.includes('ecosenses.local') && user) {
    return user;
  }

  return configuredFrom;
};

const sendMail = async ({ to, subject, text, html }) => {
  if (!transporter) {
    await initMailService();
  }

  if (!transporter) {
    return {
      sent: false,
      reason: 'mail-disabled-or-not-configured',
      error: lastMailError || undefined,
      mode: activeMode,
    };
  }

  try {
    const info = await transporter.sendMail({
      from: resolveFromAddress(),
      to,
      subject,
      text,
      html,
    });

    const response = { sent: true, messageId: info.messageId, mode: activeMode };

    if (activeMode === 'console' && info.message) {
      response.preview = String(info.message).slice(0, 500);
    }

    return response;
  } catch (error) {
    lastMailError = error.message;
    return {
      sent: false,
      reason: 'mail-send-failed',
      error: error.message,
      mode: activeMode,
    };
  }
};

const getMailServiceStatus = () => ({
  enabled: isMailEnabled(),
  mode: activeMode,
  configuredTransport: getMailTransportMode(),
  error: lastMailError || undefined,
});

module.exports = {
  isMailEnabled,
  initMailService,
  getMailServiceStatus,
  sendMail,
};

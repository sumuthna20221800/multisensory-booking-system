const formatDate = (dateValue) => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const bookingDetailsHtml = (booking) => `
  <ul>
    <li><strong>Booking ID:</strong> ${booking._id}</li>
    <li><strong>Stay ID:</strong> ${booking.stayId}</li>
    <li><strong>Guest Name:</strong> ${booking.fullName}</li>
    <li><strong>Guest Email:</strong> ${booking.email}</li>
    <li><strong>Guests:</strong> ${booking.guests}</li>
    <li><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</li>
    <li><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</li>
    <li><strong>Contact:</strong> ${booking.contact}</li>
    <li><strong>Special Requests:</strong> ${booking.requests || 'None'}</li>
  </ul>
`;

const bookingConfirmationTemplate = (booking) => {
  const subject = `Booking confirmation - ${booking.stayId}`;
  const text = [
    `Hi ${booking.fullName},`,
    '',
    'Your eco-stay booking has been received successfully.',
    `Booking ID: ${booking._id}`,
    `Stay ID: ${booking.stayId}`,
    `Guests: ${booking.guests}`,
    `Check-in: ${formatDate(booking.checkIn)}`,
    `Check-out: ${formatDate(booking.checkOut)}`,
    '',
    'We look forward to welcoming you.'
  ].join('\n');

  const html = `
    <h2>Your EcoSenses Booking Is Confirmed</h2>
    <p>Hi ${booking.fullName},</p>
    <p>Your eco-stay booking has been received successfully.</p>
    ${bookingDetailsHtml(booking)}
    <p>We look forward to welcoming you.</p>
  `;

  return { subject, text, html };
};

const adminBookingAlertTemplate = (booking) => {
  const subject = `New booking received - ${booking.stayId}`;
  const text = [
    'A new booking was created.',
    `Booking ID: ${booking._id}`,
    `Guest: ${booking.fullName} (${booking.email})`,
    `Stay ID: ${booking.stayId}`,
    `Guests: ${booking.guests}`,
    `Check-in: ${formatDate(booking.checkIn)}`,
    `Check-out: ${formatDate(booking.checkOut)}`,
    `Requests: ${booking.requests || 'None'}`
  ].join('\n');

  const html = `
    <h2>New Booking Alert</h2>
    <p>A new booking was created.</p>
    ${bookingDetailsHtml(booking)}
  `;

  return { subject, text, html };
};

const welcomeTemplate = ({ name }) => {
  const subject = 'Welcome to EcoSenses';
  const displayName = name || 'Traveler';

  const text = [
    `Hi ${displayName},`,
    '',
    'Welcome to EcoSenses.',
    'Your account is ready and you can now explore and book immersive eco-stays.',
    '',
    'Thank you for joining us.'
  ].join('\n');

  const html = `
    <h2>Welcome to EcoSenses</h2>
    <p>Hi ${displayName},</p>
    <p>Your account is ready and you can now explore and book immersive eco-stays.</p>
    <p>Thank you for joining us.</p>
  `;

  return { subject, text, html };
};

const feedbackThanksTemplate = (feedback) => {
  const subject = 'Thank you for your feedback';
  const displayName = feedback?.name || 'Traveler';

  const text = [
    `Hi ${displayName},`,
    '',
    'Thank you for sharing your sensory feedback with EcoSenses.',
    `Lodge ID: ${feedback?.lodgeId || '-'}`,
    `Rating: ${feedback?.rating || '-'}/5`,
    '',
    'Your comments help us improve each stay experience.'
  ].join('\n');

  const html = `
    <h2>Thank You for Your Feedback</h2>
    <p>Hi ${displayName},</p>
    <p>Thank you for sharing your sensory feedback with EcoSenses.</p>
    <ul>
      <li><strong>Lodge ID:</strong> ${feedback?.lodgeId || '-'}</li>
      <li><strong>Rating:</strong> ${feedback?.rating || '-'}/5</li>
      <li><strong>Comment:</strong> ${feedback?.comment || '-'}</li>
    </ul>
    <p>Your comments help us improve each stay experience.</p>
  `;

  return { subject, text, html };
};

module.exports = {
  bookingConfirmationTemplate,
  adminBookingAlertTemplate,
  welcomeTemplate,
  feedbackThanksTemplate
};

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const buildBookingConfirmationMail = (booking) => {
  const lines = [
    `Hello ${booking.fullName},`,
    '',
    'Your eco-stay booking has been confirmed.',
    `Stay ID: ${booking.stayId}`,
    `Guests: ${booking.guests}`,
    `Check-in: ${formatDate(booking.checkIn)}`,
    `Check-out: ${formatDate(booking.checkOut)}`,
    '',
    'Thank you for choosing EcoSenses.',
  ];

  return {
    subject: `Booking Confirmed - ${booking.stayId}`,
    text: lines.join('\n'),
    html: `
      <p>Hello ${booking.fullName},</p>
      <p>Your eco-stay booking has been confirmed.</p>
      <ul>
        <li><strong>Stay ID:</strong> ${booking.stayId}</li>
        <li><strong>Guests:</strong> ${booking.guests}</li>
        <li><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</li>
        <li><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</li>
      </ul>
      <p>Thank you for choosing EcoSenses.</p>
    `,
  };
};

module.exports = {
  buildBookingConfirmationMail,
};

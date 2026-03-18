// A simple structure for a Booking object
class Booking {
    constructor(data) {
      this.stayId = data.stayId;
      this.guests = data.guests;
      this.fullName = data.fullName;
      this.email = data.email;
      this.checkIn = data.checkIn;
      this.checkOut = data.checkOut;
      this.contact = data.contact;
      this.requests = data.requests;
      this.createdAt = new Date();
    }
  }
  module.exports = Booking;
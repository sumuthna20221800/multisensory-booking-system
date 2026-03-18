class Feedback {
    constructor(data) {
      this.userId = data.userId || 'anonymous';
      this.lodgeId = data.lodgeId;
      this.ratings = data.ratings; // e.g., { visual: 5, sound: 4 }
      this.comment = data.comment;
      this.createdAt = new Date();
    }
  }
  module.exports = Feedback;
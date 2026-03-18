/*function FeedbackQuiz() {
    return (
      <div className="feedback-quiz">
        <p>Rate your experience (1-5):</p>
        {[1,2,3,4,5].map((n) => (
          <button key={n}>{n}</button>
        ))}
      </div>
    );
  }
  
  export default FeedbackQuiz;*/
  import "../booking/bookingForm.css";

export default function FeedbackQuiz() {
  return (
    <section className="glass-bg">
      <div className="glass-card">
        <h2>Guest Feedback</h2>
        <p className="subtitle">
          Share your experience to help us improve our eco-lodges.
        </p>

        <form className="glass-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" />
          </div>

          <div className="form-group">
            <label>Lodge Visited</label>
            <input type="text" placeholder="Rainforest Eco Lodge" />
          </div>

          <div className="form-group">
            <label>Rating (1–5)</label>
            <input type="number" min="1" max="5" placeholder="5" />
          </div>

          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>Your Feedback</label>
            <textarea placeholder="Tell us about your stay..." />
          </div>

          <button className="primary-btn">Submit Feedback</button>
        </form>
      </div>
    </section>
  );
}

  
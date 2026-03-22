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
import { useState } from "react";
import { submitFeedback } from "../../services/feedbackService";

export default function FeedbackQuiz() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    lodgeId: "",
    rating: 5,
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitFeedback(formData);
      alert(response.message || "Feedback submitted successfully");
      setFormData({
        name: "",
        email: "",
        lodgeId: "",
        rating: 5,
        comment: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit feedback");
    }
  };

  return (
    <section className="glass-bg">
      <div className="glass-card">
        <h2>Guest Feedback</h2>
        <p className="subtitle">
          Share your experience to help us improve our eco-lodges.
        </p>

        <form className="glass-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Lodge ID</label>
            <input
              type="text"
              name="lodgeId"
              placeholder="LOD-001"
              value={formData.lodgeId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Rating (1–5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>Your Feedback</label>
            <textarea
              name="comment"
              placeholder="Tell us about your stay..."
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary-btn">Submit Feedback</button>
        </form>
      </div>
    </section>
  );
}

  
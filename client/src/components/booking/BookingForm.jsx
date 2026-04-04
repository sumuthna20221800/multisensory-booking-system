/*export default function BookingForm() {
    return (
      <section className="booking-section">
        <form className="booking-form">
          <div className="booking-header">
            <h2>Book Your Stay</h2>
            <p>
              Reserve your immersive eco-lodge experience in just a few steps.
            </p>
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Jane Perera" />
            </div>
  
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="jane@email.com" />
            </div>
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label>Guests</label>
              <input type="number" min="1" placeholder="2" />
            </div>
  
            <div className="form-group">
              <label>Contact Number</label>
              <input type="tel" placeholder="+94 77 123 4567" />
            </div>
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label>Check-in</label>
              <input type="date" />
            </div>
  
            <div className="form-group">
              <label>Check-out</label>
              <input type="date" />
            </div>
          </div>
  
          <div className="form-group full">
            <label>Special Requests (Optional)</label>
            <textarea placeholder="Dietary needs, arrival time, etc." />
          </div>
  
          <button className="btn-primary booking-btn" type="submit">
            Confirm Booking
          </button>
        </form>
      </section>
    );
  }*/
    /*import "./bookingForm.css";

    

    export default function BookingForm() {
      return (
        <section className="glass-bg">
          <div className="glass-card">
            <h2>Book Your Stay</h2>
            <p className="subtitle">
              Reserve your immersive eco-lodge experience in just a few steps.
            </p>
    
            <form className="glass-form">
              
              <div className="form-group">
                <label>Stay ID</label>
                <input
                  type="text"
                  placeholder="STAY-001"
                />
              </div>
    
              
              <div className="form-group">
                <label>Guests</label>
                <input
                  type="number"
                  min="1"
                  placeholder="2"
                />
              </div>
    
              
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Perera"
                />
              </div>
    
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="jane@email.com"
                />
              </div>
    
              
              <div className="form-group">
                <label>Check-in Date</label>
                <input
                  type="date"
                />
              </div>
    
              
              <div className="form-group">
                <label>Check-out Date</label>
                <input
                  type="date"
                />
              </div>
    
              
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  placeholder="+94 77 123 6667"
                />
              </div>
    
              
              <div className="form-group">
                <label>Special Requests</label>
                <input
                  type="text"
                  placeholder="Dietary needs, arrival time, accessibility"
                />
              </div>
    
              <button className="primary-btn">
                Confirm Booking
              </button>
            </form>
          </div>
        </section>
      );
    }
    */

    import React, { useState, useEffect } from "react";
  import { createBooking } from "../../services/bookingService";
import "./bookingForm.css";

export default function BookingForm({preSelectedId}) {
  // 1. Initialize state for all form fields
  const [formData, setFormData] = useState({
    stayId:preSelectedId || "",
    guests: 1,
    fullName: "",
    email: "",
    checkIn: "",
    checkOut: "",
    contact: "",
    requests: "",
  });

  // 2. Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBooking(formData);
      alert(response.message);
      setFormData({
        stayId: "",
        guests: 1,
        fullName: "",
        email: "",
        checkIn: "",
        checkOut: "",
        contact: "",
        requests: "",
      });
    } catch (err) {
      console.error("Connection Error:", err);
      alert(err.response?.data?.message || "Failed to submit booking");
    }
  };

  useEffect(() => {
    if (preSelectedId) {
      setFormData(prev => ({ ...prev, stayId: preSelectedId }));
    }
  }, [preSelectedId]);

  return (
    <section className="glass-bg">
      <div className="glass-card">
        <h2>Book Your Stay</h2>
        <p className="subtitle">
          Reserve your immersive eco-lodge experience in just a few steps.
        </p>

        {/* 4. Attach the handleSubmit function */}
        <form className="glass-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Stay ID*</label>
            <select
              name="stayId"
              value={formData.stayId}
              onChange={handleChange}
              required
              className="dropdown"
            >
              <option value="" disabled>
                Select Stay ID
              </option>
              <option value="LOD-001">LOD-001</option>
              <option value="LOD-002">LOD-002</option>
              <option value="LOD-003">LOD-003</option>
              <option value="LOD-004">LOD-004</option>
              <option value="LOD-005">LOD-005</option>
              <option value="LOD-006">LOD-006</option>
            </select>
          </div>

          <div className="form-group">
            <label>Guests*</label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Full Name*</label>
            <input
              type="text"
              name="fullName"
              placeholder="Jane Perera"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              name="email"
              placeholder="jane@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Check-in Date*</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Check-out Date*</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Number*</label>
            <input
              type="tel"
              name="contact"
              placeholder="+94 77 123 6667"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Special Requests</label>
            <input
              type="text"
              name="requests"
              placeholder="Dietary needs, arrival time, accessibility"
              value={formData.requests}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="primary-btn">
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import apiClient from "../services/apiClient";
import { toast } from 'react-toastify';
import "../components/booking/bookingForm.css"; // Ensure you create this CSS file

export default function AddEcoStay() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    location: "",
    price: "",
    image: "",
    description: "",
    panorama: "",
    sound: "",
    stories: [""],
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStoryChange = (index, value) => {
    const updatedStories = [...formData.stories];
    updatedStories[index] = value;
    setFormData({ ...formData, stories: updatedStories });
  };

  const addStoryField = () => {
    setFormData({ ...formData, stories: [...formData.stories, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/lodges", formData);
      toast.success(response.data?.message || "Eco-stay added successfully!");
      setFormData({
        id: "", name: "", location: "", price: "",
        image: "", description: "", panorama: "",
        sound: "", stories: [""], contact: "",
      });
    } catch (error) {
      console.error("Error adding eco-stay:", error);
      toast.error(error.response?.data?.message || "Failed to add eco-stay.");
    }
  };

  return (
    <section className="glass-bg add-stay-bg">
      <div className="glass-card">
        <h2>List Your Eco-Stay</h2>
        <p className="subtitle">Share your multisensory lodge with our community of travelers.</p>

        <form className="glass-form" onSubmit={handleSubmit}>
          {/* General Information */}
          

          <div className="form-group">
            <label>Lodge Name*</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Green Canopy Retreat" required />
          </div>

          <div className="form-group">
            <label>Location*</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Sinharaja" required />
          </div>

          <div className="form-group">
            <label>Price per Night (LKR)*</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="25000" required />
          </div>
          <div className="form-group">
            <label>WhatsApp Number*</label>
            <input
              type="tel"
              name="contact"
              placeholder="+94 77 123 6667"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          {/* Media Links */}
          
          <div className="form-group">
            <label>Description*</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the sensory experience..." required />
          </div>

          {/* Dynamic Stories Section */}
          <div className="form-group full-width">
            <label>Sensory Story Gallery</label>
            {formData.stories.map((story, index) => (
              <div key={index} className="story-input-wrapper">
                <input
                  type="text"
                  value={story}
                  onChange={(e) => handleStoryChange(index, e.target.value)}
                  placeholder={`Sensory Story ${index + 1} (e.g., "The scent of wild jasmine at dawn")`}
                  className="dynamic-input"
                />
              </div>
            ))}
            <button type="button" className="secondary-btn" onClick={addStoryField}>
              + Add Another Story
            </button>
          </div>

          <button type="submit" className="primary-btn full-width">Publish Eco-Stay</button>
        </form>
      </div>
    </section>
  );
}


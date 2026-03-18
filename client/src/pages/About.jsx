import React from "react";
import { motion } from "framer-motion";
import { Leaf, Eye, Wind, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Eye size={32} />,
      title: "Visual Immersion",
      text: "Every stay is presented through 360° panoramic views, allowing you to walk through your sanctuary before you arrive."
    },
    {
      icon: <Wind size={32} />,
      title: "Sensory Design",
      text: "We record authentic nature soundscapes from each location, bringing the rustle of leaves and bird songs to your screen."
    },
    {
      icon: <Leaf size={32} />,
      title: "Eco-Preservation",
      text: "A portion of every booking goes directly toward reforestation efforts in the Sinharaja rainforest."
    },
    {
      icon: <Heart size={32} />,
      title: "Local Roots",
      text: "We partner exclusively with lodges that employ local communities and respect indigenous architecture."
    }
  ];

  return (
    <div className="about-page">
      {/* Mini Hero Section */}
      <section className="about-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <span className="eco-badge">Our Mission</span><br/>
          
          <p className="hero-subtitle">
            EcoSenses was born from a simple belief: that travel should nourish both 
            the soul of the traveler and the health of the planet.
          </p>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="values-section">
        <div className="container">
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="value-card"
              >
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-split">
        <div className="story-image">
          <img src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80" alt="Nature" />
        </div>
        <div className="story-text">
          <h2>The EcoSenses Story</h2>
          <p>
            Founded in 2024, EcoSenses is Sri Lanka’s first multisensory booking platform. 
            We realized that static photos couldn't capture the magic of a rainforest at dawn 
            or the mist rolling over a mountain lodge.
          </p>
          <p>
            By combining high-definition panoramas with spatial audio, we help you find 
            not just a room, but a feeling.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
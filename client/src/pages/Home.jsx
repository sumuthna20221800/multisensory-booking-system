/*import LodgeCard from "../components/lodge/LodgeCard";

const lodges = [
  {
    id: 1,
    name: "Rainforest Eco Lodge",
    location: "Sinharaja, Sri Lanka",
  },
];

function Home() {
  return (
    <div>
      <h1>Eco-Tourism Experiences</h1>
      {lodges.map((l) => (
        <LodgeCard key={l.id} lodge={l} />
      ))}
    </div>
  );
}

export default Home;*/
/*import LodgeList from "../components/lodge/LodgeList";

const lodges = [
  { id: 1, name: "Rainforest Eco Lodge", location: "Sinharaja", image: "/src/assets/panoramas/image4.jpg" },
  { id: 2, name: "Mountain View Lodge", location: "Nuwara Eliya", image: "/src/assets/panoramas/image6.jpg" },
  { id: 3, name: "Beachside Retreat", location: "Bentota", image: "/src/assets/panoramas/image9.jpg" },
];

function Home() {
  return (
    <div className="home">
      <section className="landing">
        <h1>Experience Nature Like Never Before</h1>
        <center><p>Discover immersive eco-lodges with 360° views and natural soundscapes.</p></center>
      </section>

      <section className="lodges-section">
        <center><h2>Our Lodges</h2></center>
        <div className="lodge-grid">
          <LodgeList lodges={lodges} />
        </div>
      </section>
    </div>
  );
}

export default Home;*/
/*import lodges from "../data/lodges";
import LodgeCard from "../components/lodge/LodgeCard";

export default function Home() {
    
  return (
    <>
      <h1>Experience Nature Like Never Before</h1>
      <center><p className="hero-sub">
        Discover immersive eco-lodges with 360° views and natural soundscapes.
      </p></center>
        
      <section className="lodge-grid">
        {lodges.map((lodge) => (
          <LodgeCard key={lodge.id} lodge={lodge} />
        ))}
      </section>
      <section className="light">
        <center><h2>Who We Are</h2></center>
        <center><p className="section-text">
            We curate premium eco-lodge experiences across Sri Lanka, blending
            sustainability, comfort, and authentic nature encounters.
        </p></center>
        </section>
       
    </>
  );
}
*/
import { Link } from "react-router-dom";
import { TreePine, Wind, ShieldCheck, ArrowRight } from "lucide-react";
import lodges from "../data/lodges";
import LodgeCard from "../components/lodge/LodgeCard";

export default function Home() {
  return (
    <div className="home-container">
      {/* 1. HERO SECTION */}
      <section className="hero-v2">
        <div className="hero-content">
          <span className="badge">Welcome to the Wild</span>
          <h1>Reconnect with the <br /><span>Pulse of Nature</span></h1>
          <p>
            Escape the digital noise. Discover handpicked eco-lodges featuring 
            high-fidelity spatial audio and 360° immersive previews.
          </p>
          <div className="hero-btns">
            <a href="#lodges" className="btn-prm">Start Exploring</a>
            <Link to="/about" className="btn-sec">Our Philosophy</Link>
          </div>
        </div>
      </section>

      {/* 2. STATS / IMPACT BAR */}
      <section className="stats-bar">
        <div className="stat-item"><h3>12+</h3><p>Eco-Destinations</p></div>
        <div className="stat-item"><h3>100%</h3><p>Carbon Offset</p></div>
        <div className="stat-item"><h3>4.9/5</h3><p>Guest Rating</p></div>
        <div className="stat-item"><h3>50k+</h3><p>Trees Planted</p></div>
      </section>

      {/* 3. CORE VALUES SECTION */}
      <section className="values-sec">
        <div className="sec-header">
          <h2>Why Choose EcoSenses?</h2>
          <p>We believe travel should give back more than it takes.</p>
        </div>
        <div className="values-grid">
          <div className="val-card">
            <TreePine size={40} className="val-icon" />
            <h3>Bio-Acoustic Tech</h3>
            <p>Our lodges feature real-time natural soundscapes recorded on-site.</p>
          </div>
          <div className="val-card">
            <Wind size={40} className="val-icon" />
            <h3>Zero-Trace Stay</h3>
            <p>Every booking contributes directly to local reforestation projects.</p>
          </div>
          <div className="val-card">
            <ShieldCheck size={40} className="val-icon" />
            <h3>Curated Quality</h3>
            <p>Each stay is personally vetted for sustainability and comfort.</p>
          </div>
        </div>
      </section>

      {/* 4. THE LODGE GRID (Your original content) */}
      <section id="lodges" className="lodge-listing-sec">
        <div className="sec-header">
          <h2>Our Featured Sanctuaries</h2>
          <p>Immerse yourself in our most loved locations.</p>
        </div>
        <div className="lodge-grid">
          {lodges.map((lodge) => (
            <LodgeCard key={lodge.id} lodge={lodge} />
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER / CTA */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Get Nature in Your In-box</h2>
          <p>Join 5,000+ eco-travelers receiving monthly guides to Sri Lanka's hidden gems.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" />
            <button className="btn-prm">Join Now <ArrowRight size={18} /></button>
          </form>
        </div>
      </section>
    </div>
  );
}


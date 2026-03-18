/*import { useParams, Link } from "react-router-dom";
import PanoramaViewer from "../components/experience/PanoramaViewer";
import SoundscapePlayer from "../components/experience/SoundscapePlayer";
import StoryGallery from "../components/experience/StoryGallery";

const lodgesData = {
  1: { name: "Rainforest Eco Lodge", panorama: "/src/assets/panoramas/image4.jpg", sound: "/src/assets/audio/forest.mp3" },
  2: { name: "Mountain View Lodge", panorama: "/src/assets/panoramas/lodge2.jpg", sound: "/src/assets/audio/mountain.mp3" },
  3: { name: "Beachside Retreat", panorama: "/src/assets/panoramas/lodge3.jpg", sound: "/src/assets/audio/beach.mp3" },
  

};

function LodgeDetails() {
  const { id } = useParams();
  const lodge = lodgesData[id];

  return (
    <div className="lodge-details">
      <h2>{lodge.name}</h2>
      <div className="experience-section">
        <PanoramaViewer image={lodge.panorama} />
        <SoundscapePlayer sound={lodge.sound} />
      </div>
      <StoryGallery />
      <Link to="/booking">
        <button>Book Now</button>
      </Link>
    </div>
  );
}

export default LodgeDetails;
*/
import { useParams, Link } from "react-router-dom";
import lodges from "../data/lodges"; // Import your real data
import PanoramaViewer from "../components/experience/PanoramaViewer";
import SoundscapePlayer from "../components/experience/SoundscapePlayer";
import StoryGallery from "../components/experience/StoryGallery";

function LodgeDetails() {
  const { id } = useParams();
  
  // Find the specific lodge from your data file using the ID from the URL
  const lodge = lodges.find(l => l.id === id);

  if (!lodge) return <div>Lodge not found.</div>;

  return (
    <div className="lodge-details" style={{ padding: '2rem 10%' }}>
      <h1>{lodge.name}</h1>
      <center><p className="subtitle">{lodge.description}</p></center>
      
      <div className="panorama-container">
        <PanoramaViewer image={lodge.panorama} />
      </div>

      <div className="experience-controls" style={{ margin: '2rem 0', textAlign: 'center' }}>
        <h3>Ambient Soundscape</h3>
        <SoundscapePlayer sound={lodge.sound} />
      </div>

      <StoryGallery stories={lodge.stories} />

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link to="/booking">
          <button className="btn-prm">Book Your Stay</button>
        </Link>
      </div>
    </div>
  );
}

export default LodgeDetails;


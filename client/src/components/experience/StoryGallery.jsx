/*function StoryGallery() {
    const stories = [
      "/src/assets/images/story1.jpg",
      "/src/assets/images/story2.jpg",
      "/src/assets/images/story3.jpg",
    ];
  
    return (
      <div className="story-gallery">
        {stories.map((img, i) => (
          <img key={i} src={img} alt={`Story ${i}`} />
        ))}
      </div>
    );
  }
  
  export default StoryGallery;
  */
  export default function StoryGallery({ stories = [] }) {
    return (
      <section className="story-gallery">
        {stories.map((story, index) => (
          <div key={index} className="story-card">
            <h3>Chapter {index + 1}</h3>
            <p>{story}</p>
          </div>
        ))}
      </section>
    );
  }
    
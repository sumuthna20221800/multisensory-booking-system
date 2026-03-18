/*import { Link } from "react-router-dom";

function LodgeCard({ lodge }) {
  return (
    <div className="card">
      <h3>{lodge.name}</h3>
      <p>{lodge.location}</p>
      <Link to={`/lodge/${lodge.id}`}>Explore Experience</Link>
    </div>
  );
}

export default LodgeCard;*/
/*import { Link } from "react-router-dom";

function LodgeCard({ lodge }) {
  return (
    <div className="card">
      <img src={lodge.image} alt={lodge.name} className="card-image" />
      <h3>{lodge.name}</h3>
      <p>{lodge.location}</p>
      <Link to={`/lodge/${lodge.id}`}>
        <button>Explore</button>
      </Link>
    </div>
  );
}
*/


/*export default function LodgeCard({ lodge }) {
    return (
      <div className="card">
        <div className="card-img-wrapper">
          <img src={lodge.image} alt={lodge.name} />
        </div>
  
        <div className="card-content">
          <h3>{lodge.name}</h3>
          <p className="location">{lodge.location}</p>
  
          <p className="price">
            LKR {lodge.price.toLocaleString()} / night
          </p>
  
          <p className="lodge-id">Lodge ID: {lodge.id}</p>
          
          <button  className="btn-primary">
          
            Explore
          </button>
        </div>
      </div>
    );
  }
  
*/
import { useNavigate } from "react-router-dom";

export default function LodgeCard({ lodge }) {
    const navigate = useNavigate();

    return (
      <div className="card">
        <div className="card-img-wrapper">
          <img src={lodge.image} alt={lodge.name} />
        </div>
  
        <div className="card-content">
          <h3>{lodge.name}</h3>
          <p className="location">{lodge.location}</p>
          <p className="price">LKR {lodge.price.toLocaleString()} / night</p>
          <p className="lodge-id">Lodge ID: {lodge.id}</p>
          
          {/* Action: Use navigate to go to the specific lodge ID */}
          <button 
            className="btn-primary" 
            onClick={() => navigate(`/lodge/${lodge.id}`)}
          >
            Explore
          </button>
        </div>
      </div>
    );
}
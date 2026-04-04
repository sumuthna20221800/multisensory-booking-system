/*import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <h2>EcoBook</h2>
      <Link to="/">Home</Link>
    </nav>
  );
}

export default Navbar;*/
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

function Navbar() {
  return (
    <nav className="nav">
        
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      
        <h2 className="logo">EcoSenses</h2>
        
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/about">About</Link>
        <Link to="/add-stay">Add Eco Stay</Link>
        <Link to="/signin" className="nav-signin">
        Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;


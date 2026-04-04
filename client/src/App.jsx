/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/
/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LodgeDetails from "./pages/LodgeDetails";
import BookingPage from "./pages/BookingPage";
import FeedbackPage from "./pages/FeedbackPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lodge/:id" element={<LodgeDetails />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import LodgeDetails from "./pages/LodgeDetails";
import BookingPage from "./pages/BookingPage";
import FeedbackPage from "./pages/FeedbackPage";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";
import AddEcoStay from "./pages/AddEcoStay";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lodge/:id" element={<LodgeDetails />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/add-stay" element={<AddEcoStay />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

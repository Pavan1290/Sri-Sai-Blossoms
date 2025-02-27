import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Activities from './pages/Activities';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Facilities from './pages/Facilities';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/facilities" element={<Facilities />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import Home from './pages/home';
import About from './pages/about';
import ContactUs from './pages/contactUs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact-us" element={<ContactUs />}/>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import Home from './pages/home';
import About from './pages/about';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;

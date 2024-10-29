
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from './components/HeroPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Assignment from './components/Assignment';



function App() {
  return (

    <Router>
        <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignments/:email" element={<Assignment/>} />
        

        </Routes>
        
    </Router>
  
    
    
    
    
  );
}

export default App;

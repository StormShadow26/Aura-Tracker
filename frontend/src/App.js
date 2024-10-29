
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from './components/HeroPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Assignment from './components/Assignment';


import VerifyOtp from './components/VerifyOtp';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistrationSuccess = (userEmail) => {
    console.log("Registered Email(in app.js):", userEmail);
    setEmail(userEmail);
    setIsRegistered(true);
  };
  return (

    <Router>
        <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register onSuccess={handleRegistrationSuccess} />} />
        <Route path='/verify-otp' element={<VerifyOtp email={email}></VerifyOtp>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assignments/:email" element={<Assignment/>} />
        

        </Routes>
        
    </Router>
  
    
    
    
    
  );
}

export default App;

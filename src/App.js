
import "antd/es/style/reset.css";
import LoginPage from './LoginPage'
import SignupPage from "./SignupPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<SignupPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    
  );
}

export default App;

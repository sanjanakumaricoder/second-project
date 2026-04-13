import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import WorkerDash from './pages/WorkerDash';
import EmployerDash from './pages/EmployerDash';
import Login from './pages/Login';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/worker-dash" element={<WorkerDash />} />
          <Route path="/employer-dash" element={<EmployerDash />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
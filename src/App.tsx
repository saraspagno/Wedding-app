import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import RSVP from './pages/RSVP';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './i18n';

function App() {
  return (
    <Router>
      <div className="text-center">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

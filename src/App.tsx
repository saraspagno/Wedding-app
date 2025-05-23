import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './types/i18n';

function App() {
  return (
    <Router>
      <div className="text-center">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Home />} />
          <Route path="/venues" element={<Home />} />
          <Route path="/shuttles" element={<Home />} />
          <Route path="/shabbat" element={<Home />} />
          <Route path="/gifts" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          {/* Catch all other routes and redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

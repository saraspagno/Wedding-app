import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './types/i18n';

// Separate component to access location
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    
    // Only sign in anonymously if there's no existing user AND we're not on admin/login routes
    onAuthStateChanged(auth, (user) => {
      const isAdminRoute = location.pathname === '/admin' || location.pathname === '/login';
      
      if (!user && !isAdminRoute) {
        signInAnonymously(auth).catch((error) => {
          console.error('Anonymous sign-in failed', error);
        });
      }
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-center flex flex-col">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
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
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

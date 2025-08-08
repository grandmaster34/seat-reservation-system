// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import InternDashboard from './pages/InternDashboard';
import AdminDashboard from './pages/AdminDashboard';
// AdminSeatManagement removed as per task requirements
import { NavigationProvider } from './context/NavigationContext';

// Global styles to ensure black background
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background: #000000 !important;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
  }
  
  html {
    background: #000000 !important;
  }
  
  #root {
    background: #000000 !important;
    min-height: 100vh;
  }
`;

// Protected Route Component
const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Login Component with navigation
const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  
  const handleLogin = (userData) => {
    onLogin(userData);
    if (userData.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/intern');
    }
  };

  const handlePageChange = (page) => {
    if (page === 'register') {
      navigate('/register');
    }
  };

  return <Login onLogin={handleLogin} onPageChange={handlePageChange} />;
};

// Register Component with navigation
const RegisterPage = ({ onLogin }) => {
  const navigate = useNavigate();
  
  const handlePageChange = (page) => {
    if (page === 'login') {
      navigate('/login');
    }
  };

  return <Register onPageChange={handlePageChange} />;
};

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On mount, check if token exists and fetch user profile or decode token
    const token = localStorage.getItem('token');
    if (token) {
      // For simplicity, decode token or call backend to get user info
      // Here assuming token payload contains user info (use jwt-decode or your own logic)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload.user);
      } catch {
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  if (isLoading) {
    return (
      <div style={{ 
        background: '#000000', 
        color: '#ffffff', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <style>{globalStyles}</style>
      <NavigationProvider>
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? (
                user.role === 'admin' ? 
                  <Navigate to="/admin" replace /> : 
                  <Navigate to="/intern" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              user ? (
                user.role === 'admin' ? 
                  <Navigate to="/admin" replace /> : 
                  <Navigate to="/intern" replace />
              ) : (
                <RegisterPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/intern" 
            element={
              <ProtectedRoute user={user}>
                <InternDashboard user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/intern/reservations" 
            element={
              <ProtectedRoute user={user}>
                <InternDashboard user={user} initialPage="reservations" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/intern/seatmap" 
            element={
              <ProtectedRoute user={user}>
                <InternDashboard user={user} initialPage="seatmap" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/intern/history" 
            element={
              <ProtectedRoute user={user}>
                <InternDashboard user={user} initialPage="history" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/intern/settings" 
            element={
              <ProtectedRoute user={user}>
                <InternDashboard user={user} initialPage="settings" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user}>
                <AdminDashboard user={user} />
              </ProtectedRoute>
            } 
          />
          {/* AdminSeatManagement route removed as per task requirements */}
          <Route 
            path="/" 
            element={
              user ? (
                user.role === 'admin' ? 
                  <Navigate to="/admin" replace /> : 
                  <Navigate to="/intern" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </NavigationProvider>
    </Router>
  );
}

export default App;

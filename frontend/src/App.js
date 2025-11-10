import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserBooking from './pages/UserBooking';
import AdminDashboard from './pages/AdminDashboard';
import RoomSuggestion from './pages/RoomSuggestion';
import Status from './pages/Status';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="scrollable-content flex-1">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    <UserBooking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/suggestion"
                element={
                  <ProtectedRoute>
                    <RoomSuggestion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/status"
                element={
                  <ProtectedRoute>
                    <Status />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin_dashboard"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import { Home } from './pages/Home';
import { Boards } from './pages/Boards';
import { Standards } from './pages/Standards';
import { Contact } from './pages/Contact';
import { Login } from './components/Auth/Login';
import { Subjects } from './pages/Subjects';
import { Resources } from './pages/Resources';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/boards" 
        element={
          <ProtectedRoute>
            <Boards />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/boards/:boardId/standards" 
        element={
          <ProtectedRoute>
            <Standards />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/standards/:standardId/subjects" 
        element={
          <ProtectedRoute>
            <Subjects />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/subjects/:subjectId/resources" 
        element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes; 
// @ts-nocheck
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import { Home } from './pages/Home';
import { Boards } from './pages/Boards';
import { Standards } from './pages/Standards';
import { Subjects } from './pages/Subjects';
import { Login } from './components/Auth/Login';
import { BoardSelection } from './components/Boards/BoardSelection';
import { BoardsList } from './components/Boards/BoardsList';
import { UserProvider } from './context/UserContext';
import { Contact } from './pages/Contact';
import { Signup } from './components/Auth/Signup';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Resources } from './pages/Resources';
import { ResourceViewer } from './pages/ResourceViewer';
import {  SubscriptionSuccess } from './pages/SubscriptionSuccess';
import { ResourceDetails } from './components/Resources/ResourceDetails';


function App() {
  return (
    <ThemeProvider theme={theme}>
       <UserProvider>
      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/boards" element={
            <ProtectedRoute>
              <Boards />
            </ProtectedRoute>
          } />
          <Route path="/boards/:boardId/standards" element={
            <ProtectedRoute>
              <Standards />
            </ProtectedRoute>
          } />
          <Route path="/standards/:standardId/subjects" element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          } />
           <Route path="/subjects/:subjectId/resources" element={<Resources />} />
          <Route path="/resources/view/:resourceId" element={<ResourceViewer />} />
         
          <Route path="/resources" element={
            <ProtectedRoute>
              <ResourceDetails 
                open={false} 
                onClose={() => {}} 
                resource={{
                  id: '',
                  title: '',
                  description: '',
                  url: '',
                  type: '',
                  subjectId: '',
                  createdAt: new Date(),
                  updatedAt: new Date()
                }}
                onSubscribe={() => {}}
              />
            </ProtectedRoute>
          } />
          <Route path="/subscription/success" element={
            <ProtectedRoute>
              <SubscriptionSuccess />
            </ProtectedRoute>
          } />
   
          <Route path="/subscription/cancel" element={<Navigate to="/" />} />
        </Routes>
       
      </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box,
  Link,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { AuthContainer, AuthCard, AuthForm, ImageSection, SignupSection } from './styles';
import { StyledTextField } from '../../pages/Contact/styles';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });
  const [mobileError, setMobileError] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const validateMobile = (mobile: string) => {
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    setMobileError('Please enter a valid 10-digit mobile number');
    return false;
  }
  setMobileError('');
  return true;
};

const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
  setFormData(prev => ({
    ...prev,
    mobile: value
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await api.register(formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <AuthContainer>
      {/* Image Section (same as in the Login page, optional for Sign Up page) */}
      <ImageSection>
        <img  
          src="/images/undraw_sign_in_re_o58h.svg" 
          alt="Learning Illustration" 
          className="hero-image"
        />
        <Typography variant="h2" component="h1" sx={{
          color: '#6C63FF', 
          mb: 1, 
          pt: 3, 
          fontFamily: '"Source Serif Pro", "Noto Serif", serif',
          fontWeight: 400,
          fontSize: '36px',
          lineHeight: '40px',
        }}>
          Join EduHub
        </Typography>
        <Typography variant="h4" sx={{ color: '#6C63FF', mb: 2 }}>
          and start your learning journey
        </Typography>
        <Typography variant="h6" sx={{ color: 'black' }}>
          Create an account to get started!
        </Typography>
      </ImageSection>

      {/* Signup Form Section */}
      <SignupSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthCard>
            <Typography variant="h4" component="h1" gutterBottom sx={{
              fontFamily: '"Source Serif Pro", "Noto Serif", serif',
              fontWeight: 400,
              fontSize: '36px',
              lineHeight: '40px',
            }}>
              Sign Up
            </Typography>
            <Typography variant="body1"  gutterBottom
            sx={{ color: 'black',fontWeight: 500,
              fontSize: '16px', }}>
              Start your learning journey today
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <AuthForm onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
              />
              <StyledTextField
  fullWidth
  label="Mobile Number"
  name="mobile"
  value={formData.mobile}
  onChange={handleMobileChange}
  error={!!mobileError}
  helperText={mobileError}
  required
  inputProps={{
    maxLength: 10,
    pattern: '[0-9]*'
  }}
  margin="normal"
/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ backgroundColor: '#6C63FF', color: 'white', '&:hover': { backgroundColor: '#6C63FF' } }}
              >
                Sign Up
              </Button>
            </AuthForm>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'black',fontWeight: 400,
              fontSize: '16px', }}>
                Already have an account?{' '}
                <Link href="/login" underline="hover">
                  Login
                </Link>
              </Typography>
            </Box>
          </AuthCard>
        </motion.div>
      </SignupSection>
    </AuthContainer>
  );
};

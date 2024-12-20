import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box,
  Link,
  Alert,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../services/api';
import { AuthContainer, AuthCard, AuthForm, ImageSection, LoginSection } from './styles';
import { useUser } from '../../context/UserContext';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: userLogin } = useUser(); // Get login function from context
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  
  try {
    console.log('Submitting login with:', formData);
    const response = await api.login(formData);
    console.log('Login response:', response);

    if (response.success && response.data?.token) {
      // Store auth data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Update context
      await userLogin(response.data.token, response.data.user);
      
      // Navigate
      const from = (location.state as any)?.from || '/';
      navigate(from);
    } else {
      setError('Login failed - Invalid response format');
    }
  } catch (err: any) {
    console.error('Login error:', err);
    setError(err.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthContainer>
      <ImageSection>
        <img  
          src="/images/undraw_road_to_knowledge_m8s0.svg" 
          alt="Learning Illustration" 
          className="hero-image"
        />
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            color: '#6C63FF', 
            mb: 1, 
            pt: 3, 
            fontFamily: '"Source Serif Pro", "Noto Serif", serif',
            fontWeight: 400,
            fontSize: '36px',
            lineHeight: '40px',
          }}
        >
          Join EduHub
        </Typography>
        <Typography variant="h4" sx={{ color: '#6C63FF', mb: 2 }}>
          and learn with us
        </Typography>
        <Typography variant="h6" sx={{ color: 'black' }}>
          Log in to get started!
        </Typography>
      </ImageSection>

      <LoginSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthCard>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontFamily: '"Source Serif Pro", "Noto Serif", serif',
                fontWeight: 400,
                fontSize: '36px',
                lineHeight: '40px', 
              }}
            >
              Log in
            </Typography>

            {error && ( 
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <AuthForm onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email or username"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                disabled={loading}
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
                disabled={loading}
              />
              <Link 
                href="/forgot-password" 
                sx={{ alignSelf: 'flex-start', mb: 2 }}
              >
                Forgot password?
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  backgroundColor: '#6C63FF', 
                  color: 'white', 
                  '&:hover': { 
                    backgroundColor: '#6C63FF' 
                  } 
                }}
              >
                {loading ? 'Logging in...' : 'Log in'}
              </Button>
            </AuthForm>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'black',
                  fontWeight: 400,
                  fontSize: '15px' 
                }}
              >
                Don't have an account?{' '}
                <Link href="/signup" underline="hover">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </AuthCard>
        </motion.div>
      </LoginSection>
    </AuthContainer>
  );
};
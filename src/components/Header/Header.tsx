import React from 'react';
import { 
  Toolbar, 
  Button, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { 
  StyledAppBar, 
  LogoContainer, 
  NavLinks, 
  LoginButton,
  LogoText,
  NavButton,
  UserContainer
} from './styles';
import { AnimatedOpenBook  } from './AnimatedSVG';

export const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navItems = user 
    ? ['Home', 'Boards', 'Contact']
    : ['Home', 'Contact'];

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <StyledAppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <LogoContainer onClick={() => navigate('/')}>
<AnimatedOpenBook /> 
            <LogoText>
              <span className="edu">Edu</span>
              <span className="hub">Hub</span>
            </LogoText>
          </LogoContainer>

          {isMobile ? (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ color: '#333' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <NavLinks>
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavButton onClick={() => navigate(`/${item.toLowerCase()}`)}>{item}</NavButton>
                </motion.div>
              ))}
              {user ? (
                <UserContainer>
                  <Avatar
                    onClick={handleUserMenuClick}
                    sx={{ 
                      cursor: 'pointer',
                      bgcolor: theme.palette.primary.main
                    }}
                  >
                    {user.name[0]}
                  </Avatar>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                  >
                    <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </UserContainer>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
                </motion.div>
              )}
            </NavLinks>
          )}
        </Toolbar>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <List sx={{ width: 250 }}>
          {navItems.map((item) => (
            <ListItem 
              button 
              key={item}
              onClick={() => {
                navigate(`/${item.toLowerCase()}`);
                setMobileOpen(false);
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
          {user ? (
            <>
              <ListItem button onClick={() => navigate('/profile')}>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <ListItem button onClick={() => navigate('/login')}>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </motion.div>
  );
};
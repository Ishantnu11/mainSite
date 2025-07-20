import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Events', path: '/events' },
    { text: 'Team', path: '/team' },
    { text: 'News', path: '/news' },
    { text: 'TPO', path: '/tpo' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        GDG GUG
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemText 
              primary={item.text} 
              onClick={() => navigate(item.path)}
              sx={{ textAlign: 'center', cursor: 'pointer' }}
            />
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemText 
            primary={user ? 'Logout' : 'Login'} 
            onClick={user ? handleLogout : () => navigate('/login')}
            sx={{ textAlign: 'center', cursor: 'pointer' }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)',
        color: 'text.primary', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.06)'
      }}>
        <Toolbar sx={{ maxWidth: '1400px', mx: 'auto', width: '100%', py: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src="/images/t2k7QK3r_400x400.png"
                alt="GDG GUG Logo"
                style={{ height: '40px', width: '40px', objectFit: 'contain' }}
              />
            </RouterLink>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={() => navigate(item.path)}
                  sx={{ 
                    color: 'inherit', 
                    mx: 1,
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.04)',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Box>

          <Button
            variant={user ? 'outlined' : 'contained'}
            color="primary"
            onClick={user ? handleLogout : () => navigate('/login')}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.95rem',
              boxShadow: user ? 'none' : '0 4px 14px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: user ? '0 2px 8px rgba(0,0,0,0.1)' : '0 6px 20px rgba(25, 118, 210, 0.4)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {user ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
} 
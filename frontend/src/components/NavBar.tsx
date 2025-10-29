import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Meal Plan', path: '/meal-plan' },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', height: '100%' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'white', fontWeight: 700 }}>
        Kitchen Assistant
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link} 
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{ 
              textDecoration: 'none',
              color: location.pathname === item.path ? '#FFD700' : 'white',
              backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
              mx: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        <ListItem sx={{ justifyContent: 'center', mt: 2 }}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/login"
            onClick={handleDrawerToggle}
            sx={{ 
              backgroundColor: 'white',
              color: '#667eea',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              }
            }}
          >
            Login
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="absolute" 
        sx={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Change this line
            boxShadow: 'none',
            py: 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
            <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
                textDecoration: 'none', 
                color: 'white',
                fontWeight: 700,
                fontSize: '1.5rem',
                fontFamily: '"Raleway", sans-serif',
            }}
            >
            Kitchen Assistant
            </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                sx={{
                  color: location.pathname === item.path ? '#FFD700' : 'white',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: location.pathname === item.path ? '100%' : '0%',
                    height: '2px',
                    backgroundColor: '#FFD700',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                  '&:hover': {
                    color: '#FFD700',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
            <Button 
              variant="contained" 
              component={Link} 
              to="/login"
              sx={{ 
                ml: 2,
                px: 3,
                py: 1,
                backgroundColor: 'white',
                color: '#667eea',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 4px 15px rgba(255,255,255,0.2)',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(255,255,255,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Login
            </Button>
          </Box>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;
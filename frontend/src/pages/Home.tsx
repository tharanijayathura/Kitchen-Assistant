import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  Box, Container, Typography, Button, Card, CardContent,
  useMediaQuery, useTheme
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { toast } from 'react-toastify';

// Import your local images
import appleImage from '../assets/ava.png'; 
import tomatoImage from '../assets/tom.png'; 
/*import eggsImage from '../assets/egg.png'; */ 
import manImage from '../assets/man.png'; 

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      scrollTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const handleQuickStart = () => {
    toast.info('Starting your kitchen journey! (Demo toast)', { theme: 'dark' });
    if (localStorage.getItem('token')) {
      navigate('/inventory');
    } else {
      navigate('/login');
    }
  };

  const floatingImages = [
    {
      src: appleImage,
      alt: "Avacado",
      top: "20%",
      left: "5%",
      speed: 0.2,
      width: 220,
      height: 240
    },
    {
      src: tomatoImage, 
      alt: "Fresh Tomato",
      top: "15%",
      right: "8%",
      speed: 0.4,
      width: 110,
      height: 110
    },
    {
      src: manImage,
      alt: "Man Icon",
      bottom: "15%",
      right: "10%",
      speed: 0.4,
      width: 110,
      height: 110
    },
    {
      src: tomatoImage,
      alt: "Tomato",
      top: "55%",
      left: "20%",
      speed: 0.2,
      width: 120,
      height: 90
    },
    {
      src: manImage,
      alt: "Man Icon in Center",
      top: "50%",
      left: "40%",
      speed: 0.4,
      width: 130,
      height: 130
    },
    {
      src: tomatoImage,
      alt: "Tomato in Center",
      top: "65%",
      left: "55%",
      speed: 0.2,
      width: 250,
      height: 250
    },
    {
      src: manImage,
      alt: "Eggs in Center",
      top: "10%",
      left: "30%",
      speed: 0.5,
      width: 100,
      height: 120
    }
  ];

  const features = [
    {
      icon: <InventoryIcon sx={{ fontSize: 56 }} />,
      title: "Track Inventory",
      description: "Scan barcodes, monitor expiries, avoid duplicates—save $1,500/year.",
      path: '/inventory',
      buttonText: 'View Fridge',
      color: 'primary.main'
    },
    {
      icon: <RestaurantIcon sx={{ fontSize: 56 }} />,
      title: "Recipe Ideas",
      description: "Personalized suggestions from your ingredients—quick for after-work cooks.",
      path: '/recipes',
      buttonText: 'Explore',
      color: 'secondary.main'
    },
    {
      icon: <CalendarTodayIcon sx={{ fontSize: 56 }} />,
      title: "Meal Planner",
      description: "Weekly drag-drop schedules, smart shopping lists—family-friendly & budget-smart.",
      path: '/meal-plan',
      buttonText: 'Plan Week',
      color: 'primary.main'
    }
  ];

  return (
    <>
      {/* REMOVED THE DUPLICATE FLOATING IMAGES SECTION HERE */}

      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Background Image with Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1
            }
          }}
        />

        {/* Floating Food Images - Real PNGs (ONLY THIS SET REMAINS) */}
        {floatingImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute', // Changed from fixed to absolute
              top: image.top,
              left: image.left,
              right: image.right,
              bottom: image.bottom,
              width: image.width,
              height: image.height,
              zIndex: 2, // This should now be behind the content
              opacity: isScrolling ? 0.8 : 0.6,
              transform: `translateY(${isScrolling ? scrollY * image.speed : 0}px)`,
              transition: 'all 0.3s ease-out',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
              pointerEvents: 'none', // Add this to prevent interaction
              '&:hover': {
                opacity: 0.9,
                transform: `translateY(${isScrolling ? scrollY * image.speed : 0}px) scale(1.1)`,
              }
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        ))}

        <Container maxWidth="lg" sx={{ px: 4, position: 'relative', zIndex: 3 }}>
          <Box 
            sx={{ 
              textAlign: 'center',
              transform: `translateY(${scrollY * 0.3}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '3.5rem', md: '5rem', lg: '6rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.1,
                color: 'white',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              style={{ fontFamily: '"Raleway", sans-serif' }}
            >
              Smart Kitchen
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.4rem', md: '2rem' },
                mb: 6,
                color: 'white',
                opacity: 0.95,
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 300,
                lineHeight: 1.4,
              }}
              style={{ fontFamily: '"Raleway", sans-serif' }}
            >
              Reduce Waste, Save Money, Cook Effortlessly
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleQuickStart}
              sx={{
                px: 8,
                py: 3,
                fontSize: '1.3rem',
                borderRadius: 3,
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 700,
                '&:hover': { 
                  bgcolor: 'grey.100',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 30px rgba(255,255,255,0.3)'
                },
                boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              style={{ fontFamily: '"Raleway", sans-serif' }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 12, 
          backgroundColor: 'background.paper',
          position: 'relative',
          zIndex: 3
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
         
          {/* Video Section */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              component="video"
              autoPlay
              muted
              loop
              playsInline
              sx={{
                width: '100%',
                maxWidth: 500,
                height: 'auto',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <source src="src/assets/g video.mp4" type="video/mp4" />
              <source src="/path/to/your/video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </Box>
          </Box>

          {/* Features Content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{ 
                color: 'text.primary', 
                mb: 2,
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
              style={{ fontFamily: '"Raleway", sans-serif' }}
            >
              Your Kitchen, Smarter
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    bgcolor: 'background.default',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  <CardContent sx={{ py: 3, px: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: 3,
                          bgcolor: `${feature.color}15`,
                          color: feature.color,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          gutterBottom 
                          variant="h5" 
                          component="h3" 
                          sx={{ 
                            color: 'text.primary',
                            fontWeight: 600,
                            mb: 1
                          }}
                          style={{ fontFamily: '"Raleway", sans-serif' }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="text.secondary"
                          sx={{ 
                            lineHeight: 1.5,
                            mb: 2
                          }}
                          style={{ fontFamily: '"Raleway", sans-serif' }}
                        >
                          {feature.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="medium"
                          onClick={() => navigate(feature.path)}
                          sx={{ 
                            color: feature.color, 
                            borderColor: feature.color,
                            borderRadius: 2,
                            px: 3,
                            py: 0.5,
                            fontWeight: 500,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: feature.color,
                              bgcolor: `${feature.color}10`,
                              transform: 'translateY(-1px)'
                            }
                          }}
                          style={{ fontFamily: '"Raleway", sans-serif' }}
                        >
                            {feature.buttonText}
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8, 
            mt: 8, 
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'text.primary', 
              mb: 2,
              fontWeight: 600
            }}
            style={{ fontFamily: '"Raleway", sans-serif' }}
          >
            Join thousands reducing food waste daily.
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleQuickStart} 
            size={isMobile ? 'medium' : 'large'}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }
            }}
            style={{ fontFamily: '"Raleway", sans-serif' }}
          >
            Start Free Trial
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
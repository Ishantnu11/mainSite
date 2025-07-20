import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  FaMicrophone, 
  FaNetworkWired, 
  FaLightbulb, 
  FaPuzzlePiece,
  FaArrowRight 
} from 'react-icons/fa';


const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 12 }, pb: { xs: 10, md: 16 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center', gap: 6 }}>
          <Box sx={{ flex: 1 }}>
            <Stack spacing={4} sx={{ maxWidth: 600 }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 800,
                  color: '#1a1a1a',
                  lineHeight: 1.1,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  letterSpacing: '-0.02em'
                }}
              >
                Welcome to{' '}
                <Typography component="span" color="primary.main" sx={{ fontWeight: 800 }}>
                  GDG Gurugram University
                </Typography>
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ 
                fontWeight: 400,
                lineHeight: 1.6,
                opacity: 0.8
              }}>
                Join our vibrant community of developers, connect with Google Developer Experts, 
                and explore the latest in technology.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, pt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<FaArrowRight />}
                  onClick={() => navigate('/events')}
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Explore Events
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/team')}
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      borderWidth: 2
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Meet the Team
                </Button>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <img
              src="/images/HEROiMAGE.png"
              alt="GDG Community"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: '500px',
                objectFit: 'contain'
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 12, md: 20 } }}>
        <Container maxWidth="lg">
          <Stack spacing={8} sx={{ textAlign: 'center' }}>
            <Box>
              <Typography variant="h2" color="#1a1a1a" sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                letterSpacing: '-0.02em',
                mb: 2
              }}>
                What We Offer
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ 
                fontWeight: 400,
                lineHeight: 1.6,
                opacity: 0.8,
                maxWidth: 600,
                mx: 'auto'
              }}>
                Join our community and get access to exclusive events, workshops, and networking opportunities.
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
              {[
                {
                  icon: FaMicrophone,
                  title: 'Tech Talks',
                  description: 'Learn from industry experts and Google Developer Experts.',
                  color: '#2563eb'
                },
                {
                  icon: FaNetworkWired,
                  title: 'Networking',
                  description: 'Connect with like-minded developers and tech enthusiasts.',
                  color: '#dc2626'
                },
                {
                  icon: FaLightbulb,
                  title: 'Workshops',
                  description: 'Hands-on sessions to learn and practice new technologies.',
                  color: '#ea580c'
                },
                {
                  icon: FaPuzzlePiece,
                  title: 'Hackathons',
                  description: 'Collaborate and build innovative solutions together.',
                  color: '#16a34a'
                }
              ].map((feature, index) => (
                <Card key={index} sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  bgcolor: 'white',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.06)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    borderColor: 'rgba(25, 118, 210, 0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}>
                  <CardContent>
                    <Box sx={{ 
                      width: 56, 
                      height: 56, 
                      bgcolor: `${feature.color}08`,
                      color: feature.color,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${feature.color}20`,
                      mx: 'auto',
                      mb: 3
                    }}>
                      <feature.icon size={28} />
                    </Box>
                    <Typography variant="h5" color="#1a1a1a" sx={{ fontWeight: 700, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ 
                      lineHeight: 1.6,
                      opacity: 0.8
                    }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 12, md: 20 } }}>
        <Container maxWidth="lg">
          <Card sx={{ 
            bgcolor: 'white',
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: { xs: 6, md: 8 } }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'center' }}>
                <Stack spacing={4}>
                  <Typography variant="h3" color="#1a1a1a" sx={{ 
                    fontWeight: 800,
                    letterSpacing: '-0.02em'
                  }}>
                    Ready to Join Our Community?
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ 
                    lineHeight: 1.6,
                    opacity: 0.8
                  }}>
                    Get involved with GDG Gurugram University and be part of an amazing tech community.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<FaArrowRight />}
                    onClick={() => navigate('/events')}
                    sx={{
                      px: 4,
                      py: 2,
                      borderRadius: 3,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Join Upcoming Events
                  </Button>
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src="/images/t2k7QK3r_400x400.png"
                    alt="GDG Community"
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      maxHeight: '300px',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
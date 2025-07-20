import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
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
import { HeroSection } from '../components/sections/HeroSection';
import { FeatureCard } from '../components/ui/FeatureCard';
import { CTASection } from '../components/sections/CTASection';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'white' }}>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to GDG Gurugram University"
        subtitle="Join our vibrant community of developers, connect with Google Developer Experts, and explore the latest in technology."
        primaryButtonText="Explore Events"
        secondaryButtonText="Meet the Team"
        primaryButtonAction={() => navigate('/events')}
        secondaryButtonAction={() => navigate('/team')}
        imageSrc="/images/HEROiMAGE.png"
        imageAlt="GDG Community"
      />

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

            <Grid container spacing={4}>
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
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    color={feature.color}
                    delay={index * 0.1}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* CTA Section */}
      <CTASection
        title="Ready to Join Our Community?"
        subtitle="Get involved with GDG Gurugram University and be part of an amazing tech community."
        buttonText="Join Upcoming Events"
        buttonAction={() => navigate('/events')}
        imageSrc="/images/t2k7QK3r_400x400.png"
        imageAlt="GDG Community"
      />
    </Box>
  );
};

export default Home;
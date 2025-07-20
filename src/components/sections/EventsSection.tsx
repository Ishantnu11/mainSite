import React from 'react';
import {
  Box,
  Container,
  Typography,
  styled,
  keyframes,
  Button,
} from '@mui/material';
import { FaArrowRight } from 'react-icons/fa';
import EventCard from '../EventCard';
import { Event } from '../../types/event';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const SectionContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(20),
  backgroundColor: 'white',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.02) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.02) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  animation: `${slideInLeft} 0.8s ease-out`,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: '#1a1a1a',
  lineHeight: 1.1,
  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
  letterSpacing: '-0.02em',
  marginBottom: theme.spacing(3),
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  lineHeight: 1.6,
  opacity: 0.8,
  fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
  maxWidth: 600,
  margin: '0 auto',
  marginBottom: theme.spacing(4),
}));



const ViewAllButton = styled(Button)(({ theme }) => ({
  padding: '16px 32px',
  borderRadius: 16,
  fontWeight: 600,
  fontSize: '1.1rem',
  textTransform: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
  color: 'white',
  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
  
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 35px rgba(37, 99, 235, 0.4)',
    animation: `${pulse} 0.6s ease-in-out`,
  },
  
  '& svg': {
    transition: 'transform 0.3s ease',
  },
  
  '&:hover svg': {
    transform: 'translateX(4px)',
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8),
  animation: `${fadeInUp} 0.8s ease-out`,
}));

const EmptyStateIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  fontSize: '2rem',
}));

interface EventsSectionProps {
  title: string;
  subtitle: string;
  events: Event[];
  showViewAll?: boolean;
  onViewAll?: () => void;
  maxEvents?: number;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  title,
  subtitle,
  events,
  showViewAll = true,
  onViewAll,
  maxEvents = 6,
}) => {
  const displayedEvents = events.slice(0, maxEvents);

  return (
    <SectionContainer>
      <ContentContainer maxWidth="lg">
        <HeaderSection>
          <SectionTitle variant="h2">
            {title}
          </SectionTitle>
          <SectionSubtitle variant="h5" color="text.secondary">
            {subtitle}
          </SectionSubtitle>
        </HeaderSection>
        
        {displayedEvents.length > 0 ? (
          <>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              {displayedEvents.map((event, index) => (
                <Box key={event._id}>
                  <EventCard 
                    event={event}
                  />
                </Box>
              ))}
            </Box>
            
            {showViewAll && events.length > maxEvents && (
              <Box sx={{ textAlign: 'center' }}>
                <ViewAllButton onClick={onViewAll}>
                  View All Events
                  <FaArrowRight />
                </ViewAllButton>
              </Box>
            )}
          </>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              📅
            </EmptyStateIcon>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No events scheduled yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back soon for upcoming events and workshops!
            </Typography>
          </EmptyState>
        )}
      </ContentContainer>
    </SectionContainer>
  );
}; 
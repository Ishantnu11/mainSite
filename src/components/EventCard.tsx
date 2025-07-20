import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Link,
  Stack,
  IconButton,
  styled,
} from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { Event } from '../types/event';

// Styled components for modularity
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  overflow: 'hidden',
  backgroundColor: 'white',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(37, 99, 235, 0.3)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  '&:hover::before': {
    opacity: 1,
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  textTransform: 'capitalize',
  fontWeight: 600,
  fontSize: '0.75rem',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  backdropFilter: 'blur(10px)',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  
  '& img': {
    transition: 'transform 0.3s ease',
  },
  
  '&:hover img': {
    transform: 'scale(1.05)',
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  fontWeight: 500,
  padding: '4px 0',
  
  '& svg': {
    marginRight: 10,
    color: '#2563eb',
    fontSize: '1rem',
    transition: 'transform 0.2s ease',
  },
  
  '&:hover svg': {
    transform: 'scale(1.1)',
  },
}));

const ActionLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.95rem',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 16,
  textDecoration: 'none',
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease',
  
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    transform: 'translateX(4px)',
  },
}));

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const statusColors = {
    upcoming: 'primary',
    ongoing: 'success',
    past: 'default',
  };

  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'MMM d, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');

  const defaultImage = 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/GDG%20Cloud.png';

    return (
    <StyledCard>
      <ImageContainer>
        <img
          src={event.image || defaultImage}
          alt={event.title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover'
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.setAttribute('style', 'display: flex');
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: '200px',
            bgcolor: 'grey.100',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography color="grey.500">Loading image...</Typography>
        </Box>
        <StatusChip
          label={event.status}
          color={statusColors[event.status] as any}
          size="small"
        />
      </ImageContainer>

      <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={3} sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            color="#1a1a1a"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
              letterSpacing: '-0.01em'
            }}
          >
            {event.title}
          </Typography>

          <Typography 
            color="text.secondary" 
            variant="body1"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.6,
              opacity: 0.8
            }}
          >
            {event.description}
          </Typography>

          <Stack spacing={2}>
            <InfoItem>
              <FaCalendar />
              {formattedDate}
            </InfoItem>
            <InfoItem>
              <FaClock />
              {formattedTime}
            </InfoItem>
            {event.location && (
              <InfoItem>
                <FaMapMarkerAlt />
                {event.location}
              </InfoItem>
            )}
          </Stack>

          {event.link && (
            <ActionLink
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
              <OpenInNewIcon fontSize="small" />
            </ActionLink>
          )}
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default EventCard; 
import React from 'react';
import {
  Box,
  Typography,
  Stack,
  styled,
  keyframes,
} from '@mui/material';
import { IconType } from 'react-icons';

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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled components
const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: 24,
  border: '1px solid rgba(0, 0, 0, 0.06)',
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  
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
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.02) 0%, rgba(124, 58, 237, 0.02) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(37, 99, 235, 0.3)',
  },
  
  '&:hover::before': {
    opacity: 1,
  },
  
  '&:hover::after': {
    opacity: 1,
  },
  
  '&:hover .icon-container': {
    transform: 'scale(1.1) rotate(5deg)',
    boxShadow: '0 12px 30px rgba(37, 99, 235, 0.3)',
  },
  
  '&:hover .icon': {
    animation: `${pulse} 1s ease-in-out`,
  },
}));

const IconContainer = styled(Box)<{ color: string }>(({ theme, color }) => ({
  width: 64,
  height: 64,
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
  border: `1px solid ${color}20`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    background: `linear-gradient(135deg, ${color}40, ${color}20)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: -1,
  },
  
  '&:hover::before': {
    opacity: 1,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  color: 'inherit',
  fontSize: '2rem',
  transition: 'all 0.3s ease',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1a1a1a',
  fontSize: '1.25rem',
  marginBottom: theme.spacing(2),
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  opacity: 0.8,
  flex: 1,
}));

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  delay = 0,
}) => {
  return (
    <CardContainer
      sx={{
        animation: `${fadeInUp} 0.8s ease-out ${delay}s both`,
      }}
    >
      <IconContainer color={color} className="icon-container">
        <IconWrapper className="icon">
          <Icon size={32} />
        </IconWrapper>
      </IconContainer>
      
      <Stack spacing={2} sx={{ flex: 1 }}>
        <Title variant="h6">
          {title}
        </Title>
        <Description variant="body1">
          {description}
        </Description>
      </Stack>
    </CardContainer>
  );
}; 
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  styled,
  keyframes,
} from '@mui/material';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled components
const HeroContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(16),
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.03) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.03) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(8),
  
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  flex: 1,
  animation: `${fadeInLeft} 0.8s ease-out`,
}));

const ImageContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  animation: `${fadeInRight} 0.8s ease-out 0.2s both`,
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: '#1a1a1a',
  lineHeight: 1.1,
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  letterSpacing: '-0.02em',
  marginBottom: theme.spacing(3),
  animation: `${fadeInUp} 0.8s ease-out 0.1s both`,
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  lineHeight: 1.6,
  opacity: 0.8,
  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
  marginBottom: theme.spacing(4),
  animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
}));

const ButtonGroup = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(3),
  animation: `${fadeInUp} 0.8s ease-out 0.3s both`,
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const StyledButton = styled('button')(({ theme }) => ({
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
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    transition: 'transform 0.3s ease',
    transform: 'translateX(-100%)',
  },
  
  '&:hover::before': {
    transform: 'translateX(0)',
  },
  
  '& span': {
    position: 'relative',
    zIndex: 1,
    color: 'white',
  },
  
  '& svg': {
    position: 'relative',
    zIndex: 1,
    transition: 'transform 0.3s ease',
  },
  
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 35px rgba(37, 99, 235, 0.4)',
  },
  
  '&:hover svg': {
    transform: 'translateX(4px)',
  },
}));

const OutlineButton = styled(StyledButton)(({ theme }) => ({
  background: 'transparent',
  border: '2px solid #2563eb',
  color: '#2563eb',
  
  '&::before': {
    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
  },
  
  '& span': {
    color: '#2563eb',
    transition: 'color 0.3s ease',
  },
  
  '&:hover span': {
    color: 'white',
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  maxHeight: '500px',
  objectFit: 'contain',
  animation: `${float} 3s ease-in-out infinite`,
  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))',
}));

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonAction: () => void;
  secondaryButtonAction: () => void;
  imageSrc: string;
  imageAlt: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  imageSrc,
  imageAlt,
}) => {
  return (
    <HeroContainer maxWidth="lg">
      <ContentWrapper>
        <TextContent>
          <HeroTitle variant="h1">
            {title}
          </HeroTitle>
          <HeroSubtitle variant="h5" color="text.secondary">
            {subtitle}
          </HeroSubtitle>
          <ButtonGroup>
            <StyledButton onClick={primaryButtonAction}>
              <span>{primaryButtonText}</span>
              <FaArrowRight />
            </StyledButton>
            <OutlineButton onClick={secondaryButtonAction}>
              <span>{secondaryButtonText}</span>
            </OutlineButton>
          </ButtonGroup>
        </TextContent>
        <ImageContent>
          <HeroImage src={imageSrc} alt={imageAlt} />
        </ImageContent>
      </ContentWrapper>
    </HeroContainer>
  );
}; 
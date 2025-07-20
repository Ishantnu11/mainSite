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

// Styled components
const CTAContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(20),
}));

const CTACard = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: 24,
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 70%, rgba(37, 99, 235, 0.03) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 8),
  position: 'relative',
  zIndex: 1,
  
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 6),
  },
}));

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(6),
  alignItems: 'center',
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(4),
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  animation: `${fadeInUp} 0.8s ease-out`,
}));

const ImageContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: '#1a1a1a',
  lineHeight: 1.2,
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  letterSpacing: '-0.02em',
  marginBottom: theme.spacing(3),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.6,
  opacity: 0.8,
  fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
  marginBottom: theme.spacing(4),
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
    animation: `${pulse} 0.6s ease-in-out`,
  },
  
  '&:hover svg': {
    transform: 'translateX(4px)',
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  maxHeight: '300px',
  objectFit: 'contain',
  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))',
  transition: 'transform 0.3s ease',
  
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonAction: () => void;
  imageSrc: string;
  imageAlt: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonAction,
  imageSrc,
  imageAlt,
}) => {
  return (
    <CTAContainer maxWidth="lg">
      <CTACard>
        <ContentWrapper>
          <GridContainer>
            <TextContent>
              <Title variant="h3">
                {title}
              </Title>
              <Subtitle variant="h6" color="text.secondary">
                {subtitle}
              </Subtitle>
              <ButtonGroup>
                <StyledButton onClick={buttonAction}>
                  <span>{buttonText}</span>
                  <FaArrowRight />
                </StyledButton>
              </ButtonGroup>
            </TextContent>
            <ImageContent>
              <HeroImage src={imageSrc} alt={imageAlt} />
            </ImageContent>
          </GridContainer>
        </ContentWrapper>
      </CTACard>
    </CTAContainer>
  );
}; 
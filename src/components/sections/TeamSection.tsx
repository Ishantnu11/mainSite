import React from 'react';
import {
  Box,
  Container,
  Typography,
  styled,
  keyframes,
} from '@mui/material';
import { TeamCard } from '../ui/TeamCard';

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

// Styled components
const SectionContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(20),
  backgroundColor: '#f8fafc',
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
}));



interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  tags?: string[];
}

interface TeamSectionProps {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  title,
  subtitle,
  members,
}) => {
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
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 4 }}>
          {members.map((member, index) => (
            <Box key={member.id}>
              <TeamCard 
                member={member} 
                delay={index * 0.1}
              />
            </Box>
          ))}
        </Box>
      </ContentContainer>
    </SectionContainer>
  );
}; 
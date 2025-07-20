import React from 'react';
import {
  Box,
  Typography,
  Stack,
  styled,
  keyframes,
  Chip,
} from '@mui/material';
import { FaLinkedin, FaTwitter, FaGithub, FaGlobe } from 'react-icons/fa';

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
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
  alignItems: 'center',
  textAlign: 'center',
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
  
  '&:hover .avatar': {
    transform: 'scale(1.1)',
    boxShadow: '0 12px 30px rgba(37, 99, 235, 0.3)',
  },
  
  '&:hover .social-icons': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  marginBottom: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '4px solid rgba(37, 99, 235, 0.1)',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: -1,
  },
  
  '&:hover::before': {
    opacity: 1,
  },
}));

const Avatar = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
  transition: 'transform 0.3s ease',
}));

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1a1a1a',
  fontSize: '1.25rem',
  marginBottom: theme.spacing(1),
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
}));

const Role = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '0.95rem',
  marginBottom: theme.spacing(2),
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  opacity: 0.8,
  marginBottom: theme.spacing(3),
  flex: 1,
}));

const RoleChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  fontSize: '0.75rem',
  borderRadius: 12,
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(37, 99, 235, 0.2)',
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  opacity: 0,
  transform: 'translateY(10px)',
  transition: 'all 0.3s ease',
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    transform: 'scale(1.1)',
    animation: `${pulse} 0.6s ease-in-out`,
  },
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

interface TeamCardProps {
  member: TeamMember;
  delay?: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, delay = 0 }) => {
  const handleSocialClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <CardContainer
      sx={{
        animation: `${fadeInUp} 0.8s ease-out ${delay}s both`,
      }}
    >
      <AvatarContainer className="avatar">
        <Avatar src={member.avatar} alt={member.name} />
      </AvatarContainer>
      
      <Stack spacing={2} sx={{ flex: 1, width: '100%' }}>
        <Name variant="h6">
          {member.name}
        </Name>
        
        <Role variant="body2">
          {member.role}
        </Role>
        
        {member.tags && member.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {member.tags.map((tag, index) => (
              <RoleChip key={index} label={tag} size="small" />
            ))}
          </Box>
        )}
        
        <Description variant="body2">
          {member.description}
        </Description>
        
        {member.socialLinks && (
          <SocialIcons className="social-icons">
            {member.socialLinks.linkedin && (
              <SocialIcon onClick={() => handleSocialClick(member.socialLinks?.linkedin)}>
                <FaLinkedin size={16} />
              </SocialIcon>
            )}
            {member.socialLinks.twitter && (
              <SocialIcon onClick={() => handleSocialClick(member.socialLinks?.twitter)}>
                <FaTwitter size={16} />
              </SocialIcon>
            )}
            {member.socialLinks.github && (
              <SocialIcon onClick={() => handleSocialClick(member.socialLinks?.github)}>
                <FaGithub size={16} />
              </SocialIcon>
            )}
            {member.socialLinks.website && (
              <SocialIcon onClick={() => handleSocialClick(member.socialLinks?.website)}>
                <FaGlobe size={16} />
              </SocialIcon>
            )}
          </SocialIcons>
        )}
      </Stack>
    </CardContainer>
  );
}; 
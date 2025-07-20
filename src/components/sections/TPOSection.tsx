import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Stack,
  styled,
  keyframes,
} from '@mui/material';
import { FaEnvelope } from 'react-icons/fa';

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
  backgroundColor: 'white',
  position: 'relative',
  overflow: 'hidden',
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
  maxWidth: 800,
  margin: '0 auto',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  border: '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    color: '#1a1a1a',
    fontWeight: 700,
    fontSize: '0.95rem',
    borderBottom: '2px solid rgba(37, 99, 235, 0.1)',
  },
  
  '& .MuiTableCell-body': {
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    padding: theme.spacing(2),
  },
  
  '& .MuiTableRow-root:hover': {
    backgroundColor: 'rgba(37, 99, 235, 0.02)',
  },
}));

const EmailLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  borderRadius: 8,
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    transform: 'translateY(-1px)',
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  border: '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
  
  '&:hover': {
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
}));

interface TPOMember {
  name: string;
  designation: string;
  email: boolean;
}

interface TPOSectionProps {
  title: string;
  subtitle: string;
  members: TPOMember[];
  contactEmail: string;
}

export const TPOSection: React.FC<TPOSectionProps> = ({
  title,
  subtitle,
  members,
  contactEmail,
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

        <Stack spacing={6}>
          {/* Team Section */}
          <StyledCard sx={{ animation: `${fadeInUp} 0.8s ease-out 0.2s both` }}>
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: '#1a1a1a',
                mb: 4
              }}>
                TPO Team
              </Typography>
              
              <TableContainer>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell>NAME</TableCell>
                      <TableCell>DESIGNATION</TableCell>
                      <TableCell>CONTACT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                          {member.name}
                        </TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>
                          {member.designation}
                        </TableCell>
                        <TableCell>
                          {member.email && (
                            <EmailLink href={`mailto:${contactEmail}`}>
                              <FaEnvelope size={16} />
                              Email
                            </EmailLink>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </TableContainer>
            </CardContent>
          </StyledCard>

          {/* Contact Section */}
          <ContactCard>
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: '#1a1a1a',
                mb: 4
              }}>
                Contact Information
              </Typography>
              
              <Typography variant="body1" sx={{ 
                color: 'text.secondary',
                fontSize: '1.1rem',
                mb: 3
              }}>
                For placement related queries, please contact:
              </Typography>
              
              <EmailLink href={`mailto:${contactEmail}`} sx={{ fontSize: '1.1rem' }}>
                <FaEnvelope size={18} />
                {contactEmail}
              </EmailLink>
            </CardContent>
          </ContactCard>
        </Stack>
      </ContentContainer>
    </SectionContainer>
  );
}; 
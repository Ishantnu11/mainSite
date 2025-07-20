import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Stack,
  styled,
  keyframes,
} from '@mui/material';
import { FaCalendar, FaTag } from 'react-icons/fa';

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
  cursor: 'pointer',
  
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

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  height: 200,
  
  '& img': {
    transition: 'transform 0.3s ease',
  },
  
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
    pointerEvents: 'none',
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  fontWeight: 600,
  fontSize: '0.75rem',
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  backdropFilter: 'blur(10px)',
  zIndex: 2,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1a1a1a',
  fontSize: '1.25rem',
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const Content = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  opacity: 0.8,
  marginBottom: theme.spacing(3),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const MetaInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  
  '& svg': {
    marginRight: 8,
    color: '#2563eb',
    fontSize: '0.9rem',
  },
}));

const AuthorSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
}));

const AuthorInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const TagChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  height: 24,
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(37, 99, 235, 0.2)',
}));

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
}

interface NewsCardProps {
  article: NewsArticle;
  onClick?: (article: NewsArticle) => void;
  delay?: number;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'tech-insights':
      return '#2563eb';
    case 'gdg-events':
      return '#16a34a';
    case 'success-stories':
      return '#dc2626';
    case 'developer-news':
      return '#ea580c';
    default:
      return '#7c3aed';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'tech-insights':
      return 'Tech Insights';
    case 'gdg-events':
      return 'GDG Events';
    case 'success-stories':
      return 'Success Stories';
    case 'developer-news':
      return 'Developer News';
    default:
      return category;
  }
};

export const NewsCard: React.FC<NewsCardProps> = ({ 
  article, 
  onClick,
  delay = 0 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <StyledCard
      onClick={handleClick}
      sx={{
        animation: `${fadeInUp} 0.8s ease-out ${delay}s both`,
      }}
    >
      <ImageContainer>
        <img
          src={article.image || 'https://source.unsplash.com/random/800x600/?technology'}
          alt={article.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <CategoryChip
          label={getCategoryLabel(article.category)}
          sx={{
            backgroundColor: getCategoryColor(article.category),
            color: 'white',
          }}
          size="small"
        />
      </ImageContainer>

      <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={3} sx={{ flex: 1 }}>
          <Box>
            <Chip
              label={article.category}
              size="small"
              sx={{
                backgroundColor: `${getCategoryColor(article.category)}10`,
                color: getCategoryColor(article.category),
                border: `1px solid ${getCategoryColor(article.category)}30`,
                fontWeight: 600,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                marginBottom: 1,
              }}
            />
            <MetaInfo>
              <FaCalendar />
              {formatDate(article.createdAt)}
            </MetaInfo>
          </Box>

          <Title variant="h5">
            {article.title}
          </Title>

          <Content variant="body2">
            {article.content}
          </Content>

          <AuthorSection>
            <AuthorInfo>
              <Avatar
                src={article.author.avatar}
                alt={article.author.name}
                sx={{ 
                  width: 32, 
                  height: 32,
                  backgroundColor: '#2563eb',
                  fontSize: '0.8rem'
                }}
              >
                {article.author.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600} color="#1a1a1a">
                  {article.author.name}
                </Typography>
              </Box>
            </AuthorInfo>
            
            {article.tags && article.tags.length > 0 && (
              <TagChip
                label={`#${article.tags[0]}${article.tags.length > 1 ? ` +${article.tags.length - 1}` : ''}`}
                size="small"
              />
            )}
          </AuthorSection>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}; 
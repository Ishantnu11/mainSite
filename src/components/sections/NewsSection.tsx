import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  styled,
  keyframes,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { NewsCard } from '../ui/NewsCard';

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
  marginBottom: theme.spacing(6),
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  margin: '0 auto',
  marginBottom: theme.spacing(6),
  animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    
    '&:hover': {
      borderColor: 'rgba(37, 99, 235, 0.3)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    },
    
    '&.Mui-focused': {
      borderColor: '#2563eb',
      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.2)',
    },
  },
}));

const CategoryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: theme.spacing(6),
  animation: `${fadeInUp} 0.8s ease-out 0.3s both`,
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  borderRadius: 20,
  fontWeight: 600,
  fontSize: '0.9rem',
  padding: '8px 16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
  
  '&.Mui-selected': {
    backgroundColor: '#2563eb',
    color: 'white',
    borderColor: '#2563eb',
  },
}));

const NewsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: 4,
  animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
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

const ArticleDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    maxWidth: 800,
    width: '90%',
    maxHeight: '90vh',
  },
}));

const DialogImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 300,
  objectFit: 'cover',
  borderRadius: '20px 20px 0 0',
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4),
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

interface NewsSectionProps {
  title: string;
  subtitle: string;
  articles: NewsArticle[];
  showSearch?: boolean;
  showCategories?: boolean;
}

const categories = [
  { id: 'all', label: 'All Posts', color: '#1a1a1a', icon: '✦' },
  { id: 'tech-insights', label: 'Tech Insights', color: '#2563eb', icon: '💡' },
  { id: 'gdg-events', label: 'GDG Events', color: '#16a34a', icon: '🎯' },
  { id: 'success-stories', label: 'Success Stories', color: '#dc2626', icon: '🌟' },
  { id: 'developer-news', label: 'Developer News', color: '#ea580c', icon: '🔥' }
];

export const NewsSection: React.FC<NewsSectionProps> = ({
  title,
  subtitle,
  articles,
  showSearch = true,
  showCategories = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedArticle(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

        {showSearch && (
          <SearchContainer>
            <StyledTextField
              fullWidth
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch color="#2563eb" />
                  </InputAdornment>
                ),
              }}
            />
          </SearchContainer>
        )}

        {showCategories && (
          <CategoryContainer>
            {categories.map((category) => (
              <CategoryChip
                key={category.id}
                label={category.label}
                onClick={() => setSelectedCategory(category.id)}
                selected={selectedCategory === category.id}
                sx={{
                  backgroundColor: selectedCategory === category.id ? category.color : 'white',
                  color: selectedCategory === category.id ? 'white' : category.color,
                  borderColor: category.color,
                }}
              />
            ))}
          </CategoryContainer>
        )}

        {filteredArticles.length > 0 ? (
          <NewsGrid>
            {filteredArticles.map((article, index) => (
              <NewsCard
                key={article._id}
                article={article}
                onClick={handleArticleClick}
                delay={index * 0.1}
              />
            ))}
          </NewsGrid>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              📰
            </EmptyStateIcon>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No articles found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or category filters.
            </Typography>
          </EmptyState>
        )}

        <ArticleDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedArticle && (
            <>
              <DialogImage
                src={selectedArticle.image || 'https://source.unsplash.com/random/1200x600/?technology'}
                alt={selectedArticle.title}
              />
              <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                    {selectedArticle.title}
                  </Typography>
                  <IconButton onClick={handleCloseDialog} size="small">
                    <FaTimes />
                  </IconButton>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={categories.find(cat => cat.id === selectedArticle.category)?.label || selectedArticle.category}
                    size="small"
                    sx={{
                      backgroundColor: categories.find(cat => cat.id === selectedArticle.category)?.color || '#7c3aed',
                      color: 'white',
                      fontWeight: 600,
                      marginRight: 2,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    By {selectedArticle.author.name} • {formatDate(selectedArticle.createdAt)}
                  </Typography>
                </Box>
              </DialogTitle>
              <DialogContentStyled>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#1a1a1a', mb: 3 }}>
                  {selectedArticle.content}
                </Typography>
                
                {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {selectedArticle.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={`#${tag}`}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(37, 99, 235, 0.1)',
                          color: '#2563eb',
                          border: '1px solid rgba(37, 99, 235, 0.2)',
                        }}
                      />
                    ))}
                  </Box>
                )}
              </DialogContentStyled>
            </>
          )}
        </ArticleDialog>
      </ContentContainer>
    </SectionContainer>
  );
}; 
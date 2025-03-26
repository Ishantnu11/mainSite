import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Badge,

  Skeleton,
  HStack,
} from '@chakra-ui/react';

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  type: 'news' | 'internship';
  company?: string;
  location?: string;
  date: string;
}

// Removed unused NewsCard component

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching news from:', API_ENDPOINTS.news);
        const response = await fetch(API_ENDPOINTS.news);
        
        if (!response.ok) {
          console.error('News fetch failed with status:', response.status);
          throw new Error(`Failed to fetch news: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('News data received:', data);
        setNews(data);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Add fallback data for development/testing
        if (process.env.NODE_ENV !== 'production') {
          setNews([
            {
              _id: '1',
              title: 'GDG Gurugram University Launched',
              description: 'We are excited to announce the launch of Google Developer Group at Gurugram University!',
              type: 'news',
              date: new Date().toISOString()
            },
            {
              _id: '2',
              title: 'Summer Internship Opportunity',
              description: 'Great opportunity for students to gain practical experience in web development.',
              type: 'internship',
              company: 'Google',
              location: 'Remote',
              date: new Date().toISOString()
            }
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Box>
      <Container maxW="container.xl" py={{ base: 8, md: 12 }}>
        <VStack spacing={8} align="stretch">
          <Heading 
            size="2xl"
            bgGradient="linear(to-r, white, gray.400)"
            bgClip="text"
            filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))"
          >
            Latest Updates
          </Heading>

          {error && (
            <Text color="red.400" fontSize="lg">
              {error}
            </Text>
          )}

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <Box
                  key={i}
                  p={6}
                  bg="rgba(26, 32, 44, 0.7)"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.700"
                  backdropFilter="blur(12px)"
                >
                  <VStack align="stretch" spacing={4}>
                    <Skeleton height="24px" width="60%" />
                    <Skeleton height="16px" width="40%" />
                    <Skeleton height="80px" />
                  </VStack>
                </Box>
              ))
            ) : (
              news.map((item) => (
                <Box
                  key={item._id}
                  p={6}
                  bg="rgba(26, 32, 44, 0.7)"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.700"
                  backdropFilter="blur(12px)"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    borderColor: 'gray.600',
                  }}
                >
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" color="white">
                      {item.title}
                    </Heading>
                    <HStack spacing={4}>
                      <Badge
                        colorScheme={item.type === 'news' ? 'blue' : 'green'}
                        px={2}
                        py={1}
                        borderRadius="md"
                      >
                        {item.type === 'news' ? 'News' : 'Internship'}
                      </Badge>
                      {item.company && (
                        <Badge colorScheme="purple" px={2} py={1} borderRadius="md">
                          {item.company}
                        </Badge>
                      )}
                      {item.location && (
                        <Badge colorScheme="orange" px={2} py={1} borderRadius="md">
                          {item.location}
                        </Badge>
                      )}
                    </HStack>
                    <Text color="gray.400">
                      {item.description}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                  </VStack>
                </Box>
              ))
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default News; 
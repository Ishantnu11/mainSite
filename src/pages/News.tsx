import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={cardBg}
      p={6}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      shadow="md"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
    >
      <VStack align="start" spacing={3}>
        <Badge
          colorScheme={item.type === 'news' ? 'blue' : 'green'}
          fontSize="sm"
          px={2}
          py={1}
          borderRadius="full"
        >
          {item.type === 'news' ? 'News' : 'Internship'}
        </Badge>
        <Heading size="md">{item.title}</Heading>
        {item.type === 'internship' && (
          <Text color="gray.500" fontSize="sm">
            {item.company} • {item.location}
          </Text>
        )}
        <Text>{item.description}</Text>
        <Text fontSize="sm" color="gray.500">
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.news);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
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
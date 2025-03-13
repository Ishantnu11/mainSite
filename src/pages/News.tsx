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
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      console.log('Fetching from:', API_ENDPOINTS.news);
      const response = await fetch(API_ENDPOINTS.news);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      setNewsItems(data);
      setError(null);
      setErrorDetails(null);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news items');
      setErrorDetails(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxW="100%" py={12}>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Loading news...</AlertTitle>
        </Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="100%" py={12}>
        <Alert status="error">
          <AlertIcon />
          <VStack align="start" spacing={2}>
            <AlertTitle>{error}</AlertTitle>
            <AlertDescription>
              {errorDetails && (
                <Text fontSize="sm" as="pre" whiteSpace="pre-wrap">
                  {errorDetails.toString()}
                </Text>
              )}
            </AlertDescription>
          </VStack>
        </Alert>
      </Container>
    );
  }

  const filterItems = (type?: 'news' | 'internship') => {
    if (!type) return newsItems;
    return newsItems.filter(item => item.type === type);
  };

  return (
    <Box w="full">
      <Container maxW={{ base: "100%", lg: "80%" }} py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
        <Heading mb={8}>News & Opportunities</Heading>
        
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>All</Tab>
            <Tab>News</Tab>
            <Tab>Internships</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filterItems().map(item => (
                  <NewsCard key={item._id} item={item} />
                ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filterItems('news').map(item => (
                  <NewsCard key={item._id} item={item} />
                ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filterItems('internship').map(item => (
                  <NewsCard key={item._id} item={item} />
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default News; 
import React from 'react';
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
} from '@chakra-ui/react';

interface NewsItem {
  id: string;
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
  // Sample data - in a real app, this would come from your backend/state management
  const sampleNews: NewsItem[] = [
    {
      id: '1',
      type: 'news',
      title: 'GDG Gurugram Hosts Successful DevFest 2024',
      description: 'Over 500 developers gathered for our annual DevFest, featuring talks on AI, Cloud, and Mobile development.',
      date: '2024-02-15T00:00:00Z'
    },
    {
      id: '2',
      type: 'internship',
      title: 'Summer Internship Program 2024',
      description: 'Join our 3-month internship program focused on full-stack development with modern technologies.',
      company: 'Google',
      location: 'Gurugram',
      date: '2024-03-01T00:00:00Z'
    },
    {
      id: '3',
      type: 'news',
      title: 'New Flutter Workshop Series',
      description: 'Join us for a series of hands-on workshops covering Flutter development from basics to advanced topics.',
      date: '2024-03-10T00:00:00Z'
    }
  ];

  const filterItems = (type?: 'news' | 'internship') => {
    if (!type) return sampleNews;
    return sampleNews.filter(item => item.type === type);
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
                  <NewsCard key={item.id} item={item} />
                ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filterItems('news').map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filterItems('internship').map(item => (
                  <NewsCard key={item.id} item={item} />
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
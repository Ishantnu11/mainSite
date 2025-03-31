import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Button,
  Avatar,
  Stack,
  Card,
  CardBody,
  Badge,
  Divider,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { API_ENDPOINTS } from '../config/api';

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

const categories = [
  { id: 'all', label: 'All Posts', color: '#202124', icon: '✦' },
  { id: 'tech-insights', label: 'Tech Insights', color: '#4285F4', icon: '💡' },
  { id: 'gdg-events', label: 'GDG Events', color: '#0F9D58', icon: '🎯' },
  { id: 'success-stories', label: 'Success Stories', color: '#DB4437', icon: '🌟' },
  { id: 'developer-news', label: 'Developer News', color: '#F4B400', icon: '🔥' }
];

const NewsCard = ({ article, onOpen }: { article: NewsArticle; onOpen: (article: NewsArticle) => void }) => {
  return (
    <Card
      bg="gray.800"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 20px rgba(66, 133, 244, 0.2)',
      }}
      cursor="pointer"
      onClick={() => onOpen(article)}
      position="relative"
    >
      <Box position="relative" height="200px" width="100%">
        <Image
          src={article.image || 'https://source.unsplash.com/random/800x600/?technology'}
          alt={article.title}
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)"
          height="100px"
        />
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme={
            article.category === 'tech-insights' ? 'blue' :
            article.category === 'gdg-events' ? 'green' :
            article.category === 'success-stories' ? 'red' :
            article.category === 'developer-news' ? 'yellow' :
            'purple'
          }
          px={3}
          py={1}
          borderRadius="full"
        >
          {categories.find(cat => cat.id === article.category)?.label || article.category}
        </Badge>
      </Box>

      <CardBody>
        <VStack align="stretch" spacing={4}>
          <Heading size="md" noOfLines={2}>
            {article.title}
          </Heading>

          <Text color="gray.400" noOfLines={2}>
            {article.content}
          </Text>

          <Divider />

          <HStack justify="space-between" fontSize="sm" spacing={4}>
            <HStack spacing={3}>
              <Avatar 
                size="sm" 
                name={article.author.name} 
                src={article.author.avatar}
                bg="#4285F4"
              />
              <VStack spacing={0} align="start">
                <Text color="white" fontWeight="medium">
                  {article.author.name}
                </Text>
                {article.createdAt && (
                  <Text color="gray.500" fontSize="xs">
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                )}
              </VStack>
            </HStack>
            {article.tags && article.tags.length > 0 && (
              <Badge
                colorScheme="gray"
                variant="subtle"
                fontSize="xs"
              >
                #{article.tags[0]}
                {article.tags.length > 1 && ` +${article.tags.length - 1}`}
              </Badge>
            )}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const ArticleModal = ({ isOpen, onClose, article }: { 
  isOpen: boolean; 
  onClose: () => void; 
  article: NewsArticle | null;
}) => {
  if (!article) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent bg="gray.900" color="white">
        <ModalHeader p={0}>
          <Image
            src={article.image || 'https://source.unsplash.com/random/1200x600/?technology'}
            alt={article.title}
            width="100%"
            height="400px"
            objectFit="cover"
          />
          <Box p={6}>
            <Badge
              colorScheme={
                article.category === 'tech-insights' ? 'blue' :
                article.category === 'gdg-events' ? 'green' :
                article.category === 'success-stories' ? 'red' :
                article.category === 'developer-news' ? 'yellow' :
                'purple'
              }
              px={3}
              py={1}
              borderRadius="full"
              mb={4}
            >
              {categories.find(cat => cat.id === article.category)?.label || article.category}
            </Badge>
            <Heading size="lg">{article.title}</Heading>
            <HStack mt={4} color="gray.400" spacing={4}>
              <Text>By {article.author.name}</Text>
              {article.createdAt && (
                <Text>
                  {new Date(article.createdAt).toLocaleDateString()}
                </Text>
              )}
            </HStack>
          </Box>
        </ModalHeader>
        <ModalCloseButton color="white" size="lg" top={4} right={4} />
        <ModalBody px={6} pb={6}>
          <Text whiteSpace="pre-wrap" color="gray.300" fontSize="lg" lineHeight="tall">
            {article.content}
          </Text>
          
          {article.tags && article.tags.length > 0 && (
            <HStack spacing={2} wrap="wrap" mt={8}>
              {article.tags.map((tag, index) => (
                <Badge
                  key={index}
                  colorScheme="gray"
                  variant="subtle"
                  size="md"
                >
                  #{tag}
                </Badge>
              ))}
            </HStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.news);
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

  const filterNews = () => {
    return articles.filter((item) => {
      const matchesSearch = searchQuery.toLowerCase() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || 
        selectedCategory === 'all' || 
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    onOpen();
  };

  return (
    <Box
      w="full"
      bg="gray.900"
      minH="100vh"
      py={20}
      position="relative"
    >
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <VStack spacing={16} align="stretch">
          <VStack spacing={6} textAlign="center">
            <HStack spacing={3} justify="center">
              <Text
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color="#4285F4"
              >
                GDG
              </Text>
              <Text
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color="white"
              >
                Stories & Updates
              </Text>
            </HStack>
            <Text
              color="gray.400"
              fontSize={{ base: 'md', md: 'lg' }}
              maxW="2xl"
              lineHeight="tall"
            >
              Explore the latest stories, achievements, and innovations from our vibrant developer community.
            </Text>
          </VStack>

          <VStack spacing={8} w="full">
            <InputGroup maxW="600px" w="full">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="blue.400" />
              </InputLeftElement>
              <Input
                placeholder="Search updates..."
                bg="gray.800"
                border="1px solid"
                  borderColor="gray.700"
                _hover={{
                  borderColor: 'blue.400',
                  bg: 'gray.750'
                }}
                _focus={{
                  borderColor: 'blue.400',
                  boxShadow: '0 0 0 1px #4285F4'
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>

            <HStack 
              spacing={2} 
              justify="center"
              w="full"
              py={4}
              overflowX="auto"
              css={{
                '&::-webkit-scrollbar': {
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#4285F4',
                  borderRadius: '4px',
                  '&:hover': {
                    background: '#5C95F5',
                  },
                },
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  bg={selectedCategory === category.id ? category.color : 'transparent'}
                  color={selectedCategory === category.id ? 'white' : 'gray.300'}
                  _hover={{
                    bg: category.color,
                    color: 'white',
                    transform: 'translateY(-2px)',
                  }}
                  _active={{
                    bg: category.color,
                    transform: 'translateY(0)',
                  }}
                  transition="all 0.2s"
                  borderRadius="full"
                  px={6}
                  py={2}
                  fontSize="sm"
                  fontWeight="medium"
                  border="1px solid"
                  borderColor={selectedCategory === category.id ? category.color : 'gray.600'}
                  leftIcon={<Text>{category.icon}</Text>}
                  backdropFilter="blur(8px)"
                  boxShadow={selectedCategory === category.id ? 'lg' : 'none'}
                >
                  {category.label}
                </Button>
              ))}
                    </HStack>
                  </VStack>

          {isLoading ? (
            <Text textAlign="center">Loading articles...</Text>
          ) : filterNews().length === 0 ? (
            <Text textAlign="center">No articles found</Text>
          ) : (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 6, lg: 8 }}
            >
              {filterNews().map((item) => (
                <GridItem key={item._id}>
                  <NewsCard article={item} onOpen={handleArticleClick} />
                </GridItem>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>

      <ArticleModal
        isOpen={isOpen}
        onClose={onClose}
        article={selectedArticle}
      />
    </Box>
  );
};

export default News; 
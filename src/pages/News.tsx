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
  Icon,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import { FaCalendar, FaTag } from 'react-icons/fa';

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
  { id: 'all', label: 'All Posts', color: 'neutral.900', icon: '✦' },
  { id: 'tech-insights', label: 'Tech Insights', color: 'primary.500', icon: '💡' },
  { id: 'gdg-events', label: 'GDG Events', color: 'secondary.500', icon: '🎯' },
  { id: 'success-stories', label: 'Success Stories', color: 'error.500', icon: '🌟' },
  { id: 'developer-news', label: 'Developer News', color: 'warning.500', icon: '🔥' }
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
          <HStack spacing={4}>
            <Badge
              colorScheme={article.category === 'tech-insights' ? 'blue' : article.category === 'gdg-events' ? 'green' : 'red'}
              px={3}
              py={1}
              borderRadius="full"
              textTransform="uppercase"
              fontSize="xs"
              fontWeight="bold"
            >
              {article.category}
            </Badge>
            <HStack spacing={1} color="gray.600">
              <Icon as={FaCalendar} boxSize={3} />
              <Text fontSize="sm">{new Date(article.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</Text>
            </HStack>
          </HStack>
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
      setIsLoading(true);
      const data = await apiRequest('/api/news');
      
      if (!Array.isArray(data)) {
        console.error('Expected array but got:', typeof data);
        throw new Error('Invalid response format');
      }

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
    <Box bg="neutral.50" minH="100vh">
      <Container maxW="7xl" py={{ base: 8, md: 16 }}>
        <VStack spacing={12}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px">
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              color="neutral.900"
              fontFamily="Google Sans Display"
              fontWeight="medium"
            >
              Latest{' '}
              <Text as="span" color="primary.500">
                News & Updates
              </Text>
            </Heading>
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }} 
              color="neutral.700"
              fontFamily="Google Sans Text"
            >
              Stay up to date with the latest events, workshops, and announcements from our community
            </Text>
          </VStack>

          {/* Search and Filters */}
          <VStack spacing={6} w="full">
            <InputGroup maxW="600px" w="full">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="neutral.500" />
              </InputLeftElement>
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="white"
                borderRadius="full"
                size="lg"
                _focus={{
                  borderColor: 'primary.500',
                  boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
                }}
              />
            </InputGroup>

            <HStack spacing={4} wrap="wrap" justify="center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? 'solid' : 'ghost'}
                  colorScheme={selectedCategory === category.id ? 'primary' : undefined}
                  leftIcon={<Text>{category.icon}</Text>}
                  size="lg"
                >
                  {category.label}
                </Button>
              ))}
            </HStack>
          </VStack>

          {/* News Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
          >
            {filterNews().map((item) => (
              <Card
                key={item._id}
                variant="elevated"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  h="200px"
                  objectFit="cover"
                />
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <HStack spacing={4}>
                      <Badge
                        colorScheme={
                          item.category === 'tech-insights' ? 'primary' :
                          item.category === 'gdg-events' ? 'secondary' :
                          item.category === 'success-stories' ? 'error' :
                          'warning'
                        }
                        px={3}
                        py={1}
                        borderRadius="full"
                        textTransform="uppercase"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {item.category}
                      </Badge>
                      <HStack spacing={1} color="neutral.600">
                        <Icon as={FaCalendar} boxSize={3} />
                        <Text 
                          fontSize="sm"
                          fontFamily="Google Sans Text"
                        >
                          {new Date(item.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </Text>
                      </HStack>
                    </HStack>
                    <Heading 
                      size="md" 
                      color="neutral.900"
                      fontFamily="Google Sans"
                    >
                      {item.title}
                    </Heading>
                    <Text 
                      color="neutral.700" 
                      noOfLines={2}
                      fontFamily="Google Sans Text"
                    >
                      {item.content}
                    </Text>
                    <Button
                      variant="ghost"
                      colorScheme="primary"
                      size="sm"
                      rightIcon={<Icon as={FaTag} />}
                      onClick={() => handleArticleClick(item)}
                    >
                      Read More
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Load More Button */}
          <Button
            colorScheme="primary"
            size="lg"
            px={8}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'md',
            }}
          >
            Load More News
          </Button>
        </VStack>
      </Container>

      {/* Article Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent bg="white">
          <ModalHeader p={0}>
            <Image
              src={selectedArticle?.image || 'https://via.placeholder.com/1200x600'}
              alt={selectedArticle?.title}
              width="100%"
              height="400px"
              objectFit="cover"
            />
            <Box p={6}>
              <Badge
                colorScheme={
                  selectedArticle?.category === 'tech-insights' ? 'primary' :
                  selectedArticle?.category === 'gdg-events' ? 'secondary' :
                  selectedArticle?.category === 'success-stories' ? 'error' :
                  'warning'
                }
                px={3}
                py={1}
                borderRadius="full"
                mb={4}
              >
                {selectedArticle?.category}
              </Badge>
              <Heading 
                size="lg"
                color="neutral.900"
                fontFamily="Google Sans Display"
              >
                {selectedArticle?.title}
              </Heading>
              <HStack mt={4} color="neutral.600" spacing={4}>
                <Text fontFamily="Google Sans Text">
                  By {selectedArticle?.author.name}
                </Text>
                {selectedArticle?.createdAt && (
                  <Text fontFamily="Google Sans Text">
                    {new Date(selectedArticle.createdAt).toLocaleDateString()}
                  </Text>
                )}
              </HStack>
            </Box>
          </ModalHeader>
          <ModalCloseButton color="neutral.900" size="lg" top={4} right={4} />
          <ModalBody px={6} pb={6}>
            <Text 
              whiteSpace="pre-wrap" 
              color="neutral.700" 
              fontSize="lg" 
              lineHeight="tall"
              fontFamily="Google Sans Text"
            >
              {selectedArticle?.content}
            </Text>
            
            {selectedArticle?.tags && selectedArticle.tags.length > 0 && (
              <HStack spacing={2} wrap="wrap" mt={8}>
                {selectedArticle.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    colorScheme="primary"
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
    </Box>
  );
};

export default News; 
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  Image,
  Icon,
  Flex,
  Card,
  CardBody,
  Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaMicrophone, 
  FaNetworkWired, 
  FaLightbulb, 
  FaPuzzlePiece,
  FaArrowRight 
} from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box bg="white">
      {/* Hero Section */}
      <Container maxW="1400px" pt={{ base: 8, md: 16 }} pb={{ base: 16, md: 24 }}>
        <Flex 
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={{ base: 8, lg: 16 }}
        >
          <MotionBox
            flex="1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack spacing={6} maxW="600px">
              <Heading 
                as="h1" 
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="700"
                color="neutral.900"
                lineHeight="1.2"
              >
                Welcome to{' '}
                <Text as="span" color="primary.600">
                  GDG Gurugram University
                </Text>
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="neutral.700">
                Join our vibrant community of developers, connect with Google Developer Experts, 
                and explore the latest in technology.
              </Text>
              <Flex gap={4} pt={4}>
                <Button
                  size="lg"
                  colorScheme="primary"
                  rightIcon={<FaArrowRight />}
                  onClick={() => navigate('/events')}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                >
                  Explore Events
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="primary"
                  onClick={() => navigate('/team')}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'sm',
                  }}
                >
                  Meet the Team
                </Button>
              </Flex>
            </Stack>
          </MotionBox>

          <MotionBox 
            flex="1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/images/HEROiMAGE.png"
              alt="GDG Community"
              w="full"
              h="auto"
              maxH="500px"
              objectFit="contain"
            />
          </MotionBox>
        </Flex>
      </Container>

      {/* Features Section */}
      <Box bg="neutral.50" py={{ base: 16, md: 24 }}>
        <Container maxW="1400px">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center" maxW="800px">
              <Heading
                fontSize={{ base: '2xl', md: '3xl' }}
                color="neutral.900"
              >
                What We Offer
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="neutral.700">
                Join our community and get access to exclusive events, workshops, and networking opportunities.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {[
                {
                  icon: FaMicrophone,
                  title: 'Tech Talks',
                  description: 'Learn from industry experts and Google Developer Experts.',
                  color: 'primary.500'
                },
                {
                  icon: FaNetworkWired,
                  title: 'Networking',
                  description: 'Connect with like-minded developers and tech enthusiasts.',
                  color: 'red.500'
                },
                {
                  icon: FaLightbulb,
                  title: 'Workshops',
                  description: 'Hands-on sessions to learn and practice new technologies.',
                  color: 'yellow.600'
                },
                {
                  icon: FaPuzzlePiece,
                  title: 'Hackathons',
                  description: 'Collaborate and build innovative solutions together.',
                  color: 'green.500'
                }
              ].map((feature, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    bg="white"
                    h="full"
                    _hover={{
                      transform: 'translateY(-4px)',
                      boxShadow: 'lg',
                    }}
                    transition="all 0.2s"
                  >
                    <CardBody p={6}>
                      <VStack spacing={4} align="flex-start">
                        <Flex
                          w={12}
                          h={12}
                          bg={`${feature.color}15`}
                          color={feature.color}
                          rounded="lg"
                          align="center"
                          justify="center"
                        >
                          <Icon as={feature.icon} boxSize={6} />
                        </Flex>
                        <Heading size="md" color="neutral.900">
                          {feature.title}
                        </Heading>
                        <Text color="neutral.700">
                          {feature.description}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={{ base: 16, md: 24 }}>
        <Container maxW="1400px">
          <Card
            bg="primary.50"
            border="1px solid"
            borderColor="primary.100"
            overflow="hidden"
          >
            <CardBody p={{ base: 8, md: 12 }}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
                <VStack align="flex-start" spacing={6}>
                  <Heading color="neutral.900" size="lg">
                    Ready to Join Our Community?
                  </Heading>
                  <Text color="neutral.700" fontSize="lg">
                    Get involved with GDG Gurugram University and be part of an amazing tech community.
                  </Text>
                  <Button
                    size="lg"
                    colorScheme="primary"
                    rightIcon={<FaArrowRight />}
                    onClick={() => navigate('/events')}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Join Upcoming Events
                  </Button>
                </VStack>
                <Box>
                  <Image
                    src="/images/t2k7QK3r_400x400.png"
                    alt="GDG Community"
                    w="full"
                    h="auto"
                    maxH="300px"
                    objectFit="contain"
                  />
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
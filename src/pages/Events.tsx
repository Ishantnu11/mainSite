import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  ButtonGroup,
  Button,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from '../config/api';
import EventCard from '../components/EventCard';
import { useEvents } from '../hooks/useEvents';

type EventFilter = 'upcoming' | 'ongoing' | 'past';

const MotionBox = motion(Box);

const Events = () => {
  const [filter, setFilter] = useState<EventFilter>('upcoming');
  const { events, isLoading, error } = useEvents();

  return (
    <Box bg="neutral.50" minH="100vh">
      <Container maxW="7xl" py={{ base: 8, md: 16 }}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              color="neutral.900"
              fontFamily="Google Sans Display"
              fontWeight="medium"
            >
              Community Events
            </Heading>
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }} 
              color="neutral.700"
              maxW="800px"
              fontFamily="Google Sans Text"
            >
              Join us for exciting tech events, workshops, and meetups. Connect with
              fellow developers and grow together.
            </Text>
          </VStack>

          {/* Filters */}
          <ButtonGroup spacing={4} alignSelf="center">
            <Button
              variant={filter === 'upcoming' ? 'solid' : 'ghost'}
              onClick={() => setFilter('upcoming')}
              size="lg"
              colorScheme={filter === 'upcoming' ? 'primary' : undefined}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === 'ongoing' ? 'solid' : 'ghost'}
              onClick={() => setFilter('ongoing')}
              size="lg"
              colorScheme={filter === 'ongoing' ? 'primary' : undefined}
            >
              Ongoing
            </Button>
            <Button
              variant={filter === 'past' ? 'solid' : 'ghost'}
              onClick={() => setFilter('past')}
              size="lg"
              colorScheme={filter === 'past' ? 'primary' : undefined}
            >
              Past
            </Button>
          </ButtonGroup>

          {/* Content */}
          <Box>
            {isLoading ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {[...Array(6)].map((_, i) => (
                  <Card key={i} variant="elevated">
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Skeleton height="24px" width="70%" />
                        <Skeleton height="16px" />
                        <Skeleton height="16px" width="90%" />
                        <Skeleton height="32px" width="40%" />
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            ) : error ? (
              <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                borderRadius="xl"
                p={8}
                bg="error.50"
                border="1px solid"
                borderColor="error.100"
              >
                <AlertIcon color="error.500" boxSize={6} mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg" color="error.700">
                  Error Loading Events
                </AlertTitle>
                <AlertDescription color="error.600">
                  We're having trouble loading the events. Please try again later.
                </AlertDescription>
              </Alert>
            ) : events?.length === 0 ? (
              <Alert
                status="info"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                borderRadius="xl"
                p={8}
                bg="primary.50"
                border="1px solid"
                borderColor="primary.100"
              >
                <AlertIcon color="primary.500" boxSize={6} mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg" color="primary.700">
                  No Events Found
                </AlertTitle>
                <AlertDescription color="primary.600">
                  Check back soon for upcoming events!
                </AlertDescription>
              </Alert>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {events.map((event) => (
                  <Card
                    key={event.id}
                    variant="elevated"
                    _hover={{
                      transform: 'translateY(-4px)',
                      boxShadow: 'lg',
                    }}
                    transition="all 0.2s"
                  >
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Heading 
                          size="md" 
                          color="neutral.900"
                          fontFamily="Google Sans"
                        >
                          {event.title}
                        </Heading>
                        <Text 
                          color="neutral.700"
                          fontFamily="Google Sans Text"
                        >
                          {event.description}
                        </Text>
                        <Text 
                          color="primary.600" 
                          fontWeight="500"
                          fontFamily="Google Sans"
                        >
                          {event.date}
                        </Text>
                        <Button
                          colorScheme="primary"
                          size="sm"
                          alignSelf="flex-start"
                          variant="outline"
                        >
                          Learn More
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Events; 
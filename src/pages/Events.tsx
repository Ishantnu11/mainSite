import { useState } from 'react';
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
  Center,
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
    <Box bg="white" minH="100vh">
      <Container maxW="7xl" py={{ base: 8, md: 16 }}>
        <VStack spacing={12} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              color="gray.900"
              fontWeight="bold"
            >
              Community Events
            </Heading>
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }} 
              color="gray.600"
              maxW="800px"
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
              colorScheme="primary"
              fontWeight="medium"
            >
              Upcoming
            </Button>
            <Button
              variant={filter === 'ongoing' ? 'solid' : 'ghost'}
              onClick={() => setFilter('ongoing')}
              size="lg"
              colorScheme="green"
              fontWeight="medium"
            >
              Ongoing
            </Button>
            <Button
              variant={filter === 'past' ? 'solid' : 'ghost'}
              onClick={() => setFilter('past')}
              size="lg"
              colorScheme="gray"
              fontWeight="medium"
            >
              Past
            </Button>
          </ButtonGroup>

          {/* Content */}
          <Box>
            {isLoading ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {[...Array(6)].map((_, i) => (
                  <Card key={i} variant="outline">
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Skeleton height="200px" borderRadius="xl" />
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
              <Alert status="error" borderRadius="lg">
                <AlertIcon />
                {error.message}
              </Alert>
            ) : events.length === 0 ? (
              <Center py={12}>
                <Text color="gray.500" fontSize="lg">
                  No events found.
                </Text>
              </Center>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {events
                  .filter((event) => event.status === filter)
                  .map((event) => (
                    <MotionBox
                      key={event._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EventCard event={event} />
                    </MotionBox>
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
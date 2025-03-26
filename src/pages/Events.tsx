import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS, FALLBACK_API_ENDPOINTS, fetchWithFallback } from '../config/api';
import EventCard from '../components/EventCard';

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link?: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

const MotionBox = motion(Box);

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setPage] = useState([0, 0]);
  // Direction is used in the slideVariants function
  const [direction, setDirection] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      console.log('🔄 Starting to fetch events...');
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchWithFallback(
          API_ENDPOINTS.events,
          FALLBACK_API_ENDPOINTS.events
        );
        
        console.log(`✅ Successfully fetched ${data.length} events`);
        setEvents(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch events';
        console.error('❌ Error fetching events:', errorMessage);
        setError(errorMessage);
        toast({
          title: 'Error fetching events',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  const filterEvents = (status: Event['status']) => {
    return events.filter(event => event.status === status);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <Box
      minH="100vh"
      pt={20}
      position="relative"
      bg="black"
      overflow="hidden"
    >
      {/* Background Effects */}
      <Box
        position="absolute"
        top="5%"
        left="20%"
        width="600px"
        height="600px"
        background="radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, transparent 70%)"
        filter="blur(40px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        top="40%"
        right="10%"
        width="500px"
        height="500px"
        background="radial-gradient(circle, rgba(156, 39, 176, 0.1) 0%, transparent 70%)"
        filter="blur(40px)"
        zIndex={0}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading
              as={motion.h1}
              size="2xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: '0.5s' }}
            >
              Community Events
            </Heading>
            <Text
              as={motion.p}
              fontSize="xl"
              color="gray.400"
              mt={4}
              maxW="2xl"
              mx="auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: '0.3s' }}
            >
              Join us for exciting tech events, workshops, and meetups. Connect with fellow
              developers and grow together.
            </Text>
          </Box>

          <Tabs 
            variant="soft-rounded" 
            colorScheme="blue" 
            index={tabIndex}
            onChange={(index) => {
              const newDirection = index > tabIndex ? 1 : -1;
              setPage([page[0] + newDirection, newDirection]);
              setDirection(newDirection);
              setTabIndex(index);
            }}
            isLazy
          >
            <TabList 
              justifyContent="center" 
              bg="whiteAlpha.100"
              p={2}
              borderRadius="full"
              mx="auto"
              maxW="fit-content"
              display="flex"
              gap={4}
            >
              <Tab
                _selected={{
                  bg: "blue.400",
                  color: "white",
                  transform: "scale(1.05)",
                }}
                transition="all 0.3s"
                fontWeight="medium"
              >
                Upcoming
              </Tab>
              <Tab
                _selected={{
                  bg: "green.400",
                  color: "white",
                  transform: "scale(1.05)",
                }}
                transition="all 0.3s"
                fontWeight="medium"
              >
                Ongoing
              </Tab>
              <Tab
                _selected={{
                  bg: "purple.400",
                  color: "white",
                  transform: "scale(1.05)",
                }}
                transition="all 0.3s"
                fontWeight="medium"
              >
                Past
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel padding={0}>
                <MotionBox
                  key="upcoming"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  px={4}
                  py={8}
                >
                  {isLoading ? (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                      {[1, 2, 3].map((i) => (
                        <Box
                          key={i}
                          borderRadius="xl"
                          overflow="hidden"
                          bg="rgba(26, 32, 44, 0.7)"
                          p={6}
                        >
                          <VStack spacing={4} align="stretch">
                            <Skeleton height="200px" />
                            <Skeleton height="20px" width="40%" />
                            <Skeleton height="24px" />
                            <Skeleton height="60px" />
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  ) : error ? (
                    <Text color="red.400" textAlign="center">
                      {error}
                    </Text>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                      {filterEvents('upcoming').map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                      {filterEvents('upcoming').length === 0 && (
                        <Text color="gray.400" textAlign="center" gridColumn="1/-1">
                          No upcoming events found.
                        </Text>
                      )}
                    </SimpleGrid>
                  )}
                </MotionBox>
              </TabPanel>

              <TabPanel padding={0}>
                <MotionBox
                  key="ongoing"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  px={4}
                  py={8}
                >
                  {isLoading ? (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                      {[1, 2, 3].map((i) => (
                        <Box
                          key={i}
                          borderRadius="xl"
                          overflow="hidden"
                          bg="rgba(26, 32, 44, 0.7)"
                          p={6}
                        >
                          <VStack spacing={4} align="stretch">
                            <Skeleton height="200px" />
                            <Skeleton height="20px" width="40%" />
                            <Skeleton height="24px" />
                            <Skeleton height="60px" />
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  ) : error ? (
                    <Text color="red.400" textAlign="center">
                      {error}
                    </Text>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                      {filterEvents('ongoing').map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                      {filterEvents('ongoing').length === 0 && (
                        <Text color="gray.400" textAlign="center" gridColumn="1/-1">
                          No ongoing events found.
                        </Text>
                      )}
                    </SimpleGrid>
                  )}
                </MotionBox>
              </TabPanel>

              <TabPanel padding={0}>
                <MotionBox
                  key="past"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  px={4}
                  py={8}
                >
                  {isLoading ? (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                      {[1, 2, 3].map((i) => (
                        <Box
                          key={i}
                          borderRadius="xl"
                          overflow="hidden"
                          bg="rgba(26, 32, 44, 0.7)"
                          p={6}
                        >
                          <VStack spacing={4} align="stretch">
                            <Skeleton height="200px" />
                            <Skeleton height="20px" width="40%" />
                            <Skeleton height="24px" />
                            <Skeleton height="60px" />
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  ) : error ? (
                    <Text color="red.400" textAlign="center">
                      {error}
                    </Text>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                      {filterEvents('past').map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                      {filterEvents('past').length === 0 && (
                        <Text color="gray.400" textAlign="center" gridColumn="1/-1">
                          No past events found.
                        </Text>
                      )}
                    </SimpleGrid>
                  )}
                </MotionBox>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

export default Events; 
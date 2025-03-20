import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Image,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Link,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { API_ENDPOINTS } from '../config/api';

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link?: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

const EventCard = ({ event }: { event: Event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      bg="rgba(26, 32, 44, 0.7)"
      backdropFilter="blur(12px)"
      borderWidth="1px"
      borderColor="gray.700"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        borderColor: 'blue.400',
      }}
    >
      <Box position="relative" height="200px" overflow="hidden">
        <Image
          src={event.image}
          alt={event.title}
          objectFit="cover"
          w="100%"
          h="100%"
          transition="transform 0.3s"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)"
        />
      </Box>

      <VStack spacing={4} p={6} align="start">
        <Badge
          colorScheme={
            event.status === 'upcoming'
              ? 'blue'
              : event.status === 'ongoing'
              ? 'green'
              : 'purple'
          }
          fontSize="sm"
          px={2}
          py={1}
          borderRadius="full"
        >
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </Badge>

        <Heading size="md" color="white">
          {event.title}
        </Heading>

        <Text color="gray.400" noOfLines={3}>
          {event.description}
        </Text>

        <Text fontSize="sm" color="gray.500">
          {formattedDate}
        </Text>

        {event.link && (
          <Button
            as={Link}
            href={event.link}
            isExternal
            rightIcon={<ExternalLinkIcon />}
            size="sm"
            colorScheme="blue"
            variant="solid"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Learn More
          </Button>
        )}
      </VStack>
    </Box>
  );
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.events);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filterEvents = (status: Event['status']) => {
    return events.filter((event) => event.status === status);
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
          <Heading
            size="2xl"
            textAlign="center"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            filter="drop-shadow(0 0 8px rgba(66, 153, 225, 0.3))"
          >
            Community Events
          </Heading>

          <Text
            textAlign="center"
            color="gray.400"
            fontSize="lg"
            maxW="2xl"
            mx="auto"
          >
            Join us for exciting tech events, workshops, and meetups. Connect with fellow developers and grow together.
          </Text>

          <Tabs variant="soft-rounded" colorScheme="blue" align="center">
            <TabList>
              <Tab color="white" _selected={{ color: 'blue.800', bg: 'blue.100' }}>Upcoming</Tab>
              <Tab color="white" _selected={{ color: 'green.800', bg: 'green.100' }}>Ongoing</Tab>
              <Tab color="white" _selected={{ color: 'purple.800', bg: 'purple.100' }}>Past</Tab>
            </TabList>

            <TabPanels mt={8}>
              {['upcoming', 'ongoing', 'past'].map((status) => (
                <TabPanel key={status}>
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
                      {filterEvents(status as Event['status']).map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                    </SimpleGrid>
                  )}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

export default Events; 
import { Box, Container, Heading, Text, SimpleGrid, Button, VStack, Badge, Image } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api'

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

const EventCard = ({ title, date, description, image }: Event) => {
  return (
    <Box bg="white" shadow="md" rounded="lg" overflow="hidden">
      <Image src={image} alt={title} w="full" h="200px" objectFit="cover" />
      <VStack p={6} align="start" spacing={3}>
        <Badge colorScheme="blue">{new Date(date).toLocaleDateString()}</Badge>
        <Heading size="md">{title}</Heading>
        <Text color="gray.600">{description}</Text>
        <Button colorScheme="blue" variant="outline">Learn More</Button>
      </VStack>
    </Box>
  )
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.events);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxW="100%" py={12}>
        <Text>Loading events...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="100%" py={12}>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  return (
    <Box w="full">
      <Container maxW="100%" py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading mb={4}>Upcoming Events</Heading>
            <Text color="gray.600" fontSize="lg">
              Join us for exciting tech events and grow with the community
            </Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {events.map((event) => (
              <EventCard key={event._id} {...event} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Events 
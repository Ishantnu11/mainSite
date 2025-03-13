import { Box, Container, Heading, Text, SimpleGrid, Button, VStack, Badge, Image, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
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
  const [errorDetails, setErrorDetails] = useState<any>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      console.log('Fetching from:', API_ENDPOINTS.events);
      const response = await fetch(API_ENDPOINTS.events);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      setEvents(data);
      setError(null);
      setErrorDetails(null);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
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
          <AlertTitle>Loading events...</AlertTitle>
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
          {events.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              <AlertTitle>No events found</AlertTitle>
              <AlertDescription>Check back later for upcoming events!</AlertDescription>
            </Alert>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {events.map((event) => (
                <EventCard key={event._id} {...event} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default Events 
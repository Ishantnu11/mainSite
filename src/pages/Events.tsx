import { Box, Container, Heading, Text, SimpleGrid, Button, VStack, HStack, Badge, Icon, Image } from '@chakra-ui/react'
import { FaCalendar, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const EventCard = ({ title, date, description, image }: { title: string; date: string; description: string; image: string }) => {
  return (
    <Box bg="white" shadow="md" rounded="lg" overflow="hidden">
      <Image src={image} alt={title} w="full" h="200px" objectFit="cover" />
      <VStack p={6} align="start" spacing={3}>
        <Badge colorScheme="blue">{date}</Badge>
        <Heading size="md">{title}</Heading>
        <Text color="gray.600">{description}</Text>
        <Button colorScheme="blue" variant="outline">Learn More</Button>
      </VStack>
    </Box>
  )
}

const Events = () => {
  const events = [
    {
      title: "Google I/O Extended",
      date: "June 2024",
      description: "Join us for an extended experience of Google's largest developer conference. Learn about the latest in Android, Web, Cloud, and more.",
      image: "https://io.google/2023/assets/io-social-2x.jpg"
    },
    {
      title: "Flutter Workshop",
      date: "July 2024",
      description: "Hands-on workshop to build beautiful native apps in record time for iOS and Android using Flutter.",
      image: "https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png"
    },
    {
      title: "Cloud Study Jam",
      date: "August 2024",
      description: "Deep dive into Google Cloud Platform. Learn about compute, storage, ML, and application services.",
      image: "https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"
    },
    {
      title: "DevFest 2024",
      date: "October 2024",
      description: "Our flagship event bringing together developers for talks, codelabs, and networking.",
      image: "https://developers.google.com/static/community/devfest/images/devfest-banner.png"
    }
  ]

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
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Events 
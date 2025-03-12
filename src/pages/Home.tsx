import { Box, Container, Heading, Text, Button, SimpleGrid, Icon, VStack, HStack, Image, useBreakpointValue, Stack } from '@chakra-ui/react'
import { FaCalendar, FaUsers, FaCode, FaRocket } from 'react-icons/fa'

const Feature = ({ icon, title, text }: { icon: any; title: string; text: string }) => {
  return (
    <VStack align="start" spacing={4} p={6} bg="white" rounded="lg" shadow="md">
      <Icon as={icon} boxSize={6} color="google.blue" />
      <Heading size="md">{title}</Heading>
      <Text color="gray.600">{text}</Text>
    </VStack>
  )
}

const Home = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Box w="full">
      {/* Hero Section */}
      <Box bg="google.blue" color="white" py={{ base: 12, md: 20 }} w="full">
        <Container maxW={{ base: "100%", lg: "80%" }} px={{ base: 4, md: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} alignItems="center">
            <VStack align="start" spacing={{ base: 4, md: 6 }}>
              <Heading size={{ base: "xl", md: "2xl" }} fontWeight="bold">
                Welcome to GDG Community
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} opacity={0.9}>
                Join a global community of developers, connect with Google Developer Experts, and learn about Google technologies.
              </Text>
              <Stack 
                direction={{ base: "column", sm: "row" }} 
                spacing={4} 
                w={{ base: "100%", sm: "auto" }}
              >
                <Button 
                  bg="white" 
                  color="google.blue" 
                  size={{ base: "md", md: "lg" }}
                  _hover={{ bg: 'gray.100' }}
                  w={{ base: "100%", sm: "auto" }}
                >
                  Join Us
                </Button>
                <Button 
                  variant="outline" 
                  color="white" 
                  size={{ base: "md", md: "lg" }}
                  _hover={{ bg: 'blue.600' }}
                  w={{ base: "100%", sm: "auto" }}
                >
                  View Events
                </Button>
              </Stack>
            </VStack>
            <Box display={{ base: 'none', md: 'block' }}>
              <Image 
                src="https://developers.google.com/static/site-assets/images/home/developers-social-media.png"
                alt="Developers"
                borderRadius="lg"
                w="full"
                h="auto"
                maxH="400px"
                objectFit="contain"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW={{ base: "100%", lg: "80%" }} py={{ base: 12, md: 20 }} px={{ base: 4, md: 8 }}>
        <SimpleGrid 
          columns={{ base: 1, sm: 2, lg: 4 }} 
          spacing={{ base: 6, md: 8 }}
          mx="auto"
        >
          <Feature
            icon={FaCalendar}
            title="Regular Events"
            text="Join our workshops, hackathons, and tech talks to enhance your skills."
          />
          <Feature
            icon={FaUsers}
            title="Community"
            text="Connect with fellow developers and build your professional network."
          />
          <Feature
            icon={FaCode}
            title="Learn & Grow"
            text="Get hands-on experience with the latest Google technologies."
          />
          <Feature
            icon={FaRocket}
            title="Build Together"
            text="Collaborate on projects and create innovative solutions."
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Home
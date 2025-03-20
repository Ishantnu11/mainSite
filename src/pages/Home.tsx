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
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaMicrophone, 
  FaNetworkWired, 
  FaLightbulb, 
  FaPuzzlePiece 
} from 'react-icons/fa';

const MotionBox = motion(Box);

const Home = () => {
  const navigate = useNavigate();
  
  const floatAnimation = {
    y: [-10, 0, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <Box position="relative">
      {/* Hero Section */}
      <Container maxW="container.xl" pt={{ base: 20, md: 32 }} pb={{ base: 16, md: 24 }}>
        <Box 
          display="flex" 
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          gap={{ base: 8, lg: 12 }}
        >
          <VStack 
            align="flex-start" 
            spacing={6} 
            flex="1"
            maxW={{ base: 'full', lg: '600px' }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heading 
                as="h1" 
                size="2xl"
                bgGradient="linear(to-r, white, gray.400)"
                bgClip="text"
                lineHeight="1.2"
                mb={4}
                filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))"
              >
                Welcome to GDG Gurugram University
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Text fontSize="xl" color="gray.400" maxW="xl">
                Join a global community of developers, connect with Google Developer Experts, 
                and learn about Google technologies.
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/events')}
                bg="white"
                color="black"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl',
                  bg: 'gray.100'
                }}
                px={8}
              >
                View Events
              </Button>
            </MotionBox>
          </VStack>

          <MotionBox 
            flex="1"
            maxW={{ base: 'full', lg: '600px' }}
            animate={floatAnimation}
          >
            <HStack spacing={4} justify="center">
              <Image
                src="src/assets/HEROiMAGE.png"
                alt="Google Developers"
                w={{ base: "350px", md: "450px", lg: "600px" }}
                h="auto"
                objectFit="contain"
                borderRadius="2xl"
                filter="drop-shadow(0 0 20px rgba(66, 133, 244, 0.3))"
                _hover={{
                  transform: 'scale(1.02)',
                  transition: 'transform 0.3s ease-in-out'
                }}
              />
            </HStack>
          </MotionBox>
        </Box>
      </Container>

      {/* Features Grid */}
      <Box 
        bg="rgba(17, 17, 17, 0.8)" 
        py={{ base: 16, md: 24 }}
        backdropFilter="blur(20px)"
        borderTop="1px solid"
        borderColor="gray.800"
      >
        <Container maxW="container.xl">
          <SimpleGrid 
            columns={{ base: 1, md: 2 }} 
            spacing={{ base: 8, lg: 12 }}
          >
            <FeatureCard
              icon={FaMicrophone}
              title="Workshops & Tech Talks"
              description="Regular workshops and tech talks on the latest Google technologies and development practices."
            />
            <FeatureCard
              icon={FaNetworkWired}
              title="Network & Connect"
              description="Connect with fellow developers, share knowledge, and grow your professional network."
            />
            <FeatureCard
              icon={FaLightbulb}
              title="Learn & Grow"
              description="Access resources and learning materials to enhance your development skills."
            />
            <FeatureCard
              icon={FaPuzzlePiece}
              title="Community Events"
              description="Participate in hackathons, coding competitions, and other community events."
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: any; title: string; description: string }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    p={8}
    bg="rgba(26, 32, 44, 0.7)"
    borderRadius="xl"
    borderWidth="1px"
    borderColor="gray.700"
    backdropFilter="blur(12px)"
    _hover={{
      transform: 'translateY(-4px)',
      boxShadow: 'xl',
      borderColor: 'gray.600'
    }}
    transition="all 0.3s"
  >
    <VStack align="flex-start" spacing={4}>
      <Icon
        as={icon}
        boxSize={8}
        color="blue.400"
        filter="drop-shadow(0 0 8px rgba(66, 133, 244, 0.5))"
      />
      <Heading 
        size="md" 
        color="white"
        filter="drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))"
      >
        {title}
      </Heading>
      <Text color="gray.400">
        {description}
      </Text>
    </VStack>
  </MotionBox>
);

export default Home;
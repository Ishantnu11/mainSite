import { Box, Container, Heading, Text, SimpleGrid, VStack, Image, HStack, Link, Icon, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { API_ENDPOINTS } from '../config/api'

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  // Dynamic colors based on role with lighter shades
  const getRoleColor = (role: string) => {
    const roleColors: { [key: string]: { main: string, light: string } } = {
      'GDG Head': { main: '#4285F4', light: 'rgba(66, 133, 244, 0.15)' }, // Google Blue
      'Tech Lead': { main: '#DB4437', light: 'rgba(219, 68, 55, 0.15)' }, // Google Red
      'TechLead': { main: '#DB4437', light: 'rgba(219, 68, 55, 0.15)' }, // Google Red
      'Developer': { main: '#0F9D58', light: 'rgba(15, 157, 88, 0.15)' }, // Google Green
      'Designer': { main: '#F4B400', light: 'rgba(244, 180, 0, 0.15)' }, // Google Yellow
      'Social Media': { main: '#4285F4', light: 'rgba(66, 133, 244, 0.15)' }, // Google Blue
      'Content': { main: '#0F9D58', light: 'rgba(15, 157, 88, 0.15)' }, // Google Green
    };
    return roleColors[role] || { main: '#4285F4', light: 'rgba(66, 133, 244, 0.15)' };
  };

  const { main: roleColor, light: roleLightColor } = getRoleColor(member.role);

  return (
    <Box
      position="relative"
      bg="gray.800"
      p={6}
      rounded="2xl"
      overflow="hidden"
      transform="auto"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: 'rotateX(10deg)',
      }}
      _hover={{
        transform: 'rotateX(0deg) translateY(-8px)',
        shadow: 'dark-lg',
        borderColor: roleColor,
        '& .social-links': {
          opacity: 1,
          transform: 'translateY(0)',
        },
        '& .profile-image': {
          transform: 'scale(1.05) translateZ(20px)',
        },
        '& .role-badge': {
          transform: 'translateZ(15px)',
          bg: roleLightColor,
        },
        '& .member-name': {
          transform: 'translateZ(25px)',
          color: 'white',
        },
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="100%"
        bg={roleLightColor}
        opacity={0.1}
        style={{ transform: 'translateZ(5px)' }}
      />
      
      <VStack spacing={6} align="center" position="relative">
        <Box
          className="profile-image"
          position="relative"
          w="160px"
          h="160px"
          rounded="full"
          overflow="hidden"
          border="4px solid"
          borderColor="whiteAlpha.200"
          shadow="2xl"
          transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          bg="gray.700"
          style={{ transform: 'translateZ(10px)' }}
        >
          <Image
            src={member.image || 'https://via.placeholder.com/160'}
            alt={member.name}
            w="full"
            h="full"
            objectFit="cover"
          />
        </Box>

        <VStack spacing={3} textAlign="center">
          <Heading
            className="member-name"
            size="lg"
            color="gray.100"
            fontWeight="bold"
            letterSpacing="tight"
            transition="transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          >
            {member.name}
          </Heading>
          <Text
            className="role-badge"
            color={roleColor}
            fontWeight="bold"
            fontSize="md"
            textTransform="uppercase"
            letterSpacing="wider"
            px={4}
            py={1}
            rounded="full"
            bg={roleLightColor}
            transition="transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            style={{ transform: 'translateZ(10px)' }}
          >
            {member.role}
          </Text>
          {member.bio && (
            <Text
              color="gray.400"
              fontSize="md"
              noOfLines={2}
              px={4}
              fontWeight="medium"
              style={{ transform: 'translateZ(5px)' }}
            >
              {member.bio}
            </Text>
          )}
        </VStack>

        <HStack
          spacing={6}
          className="social-links"
          opacity={0.9}
          pt={2}
          style={{ transform: 'translateZ(15px)' }}
        >
          {member.linkedin && (
            <Link href={member.linkedin} isExternal>
              <Icon
                as={FaLinkedin}
                boxSize={6}
                color="gray.400"
                transition="all 0.3s"
                _hover={{ 
                  transform: 'scale(1.2) translateZ(25px)', 
                  color: roleColor 
                }}
              />
            </Link>
          )}
          {member.twitter && (
            <Link href={member.twitter} isExternal>
              <Icon
                as={FaTwitter}
                boxSize={6}
                color="gray.400"
                transition="all 0.3s"
                _hover={{ 
                  transform: 'scale(1.2) translateZ(25px)', 
                  color: roleColor 
                }}
              />
            </Link>
          )}
          {member.github && (
            <Link href={member.github} isExternal>
              <Icon
                as={FaGithub}
                boxSize={6}
                color="gray.400"
                transition="all 0.3s"
                _hover={{ 
                  transform: 'scale(1.2) translateZ(25px)', 
                  color: roleColor 
                }}
              />
            </Link>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchTeamMembers();
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.team);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTeamMembers(data);
      setError(null);
      setErrorDetails(null);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError('Failed to load team members');
      setErrorDetails(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxW="100%" py={12}>
        <Alert status="info" variant="subtle" borderRadius="xl">
          <AlertIcon />
          <AlertTitle>Loading team members...</AlertTitle>
        </Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="100%" py={12}>
        <Alert status="error" variant="subtle" borderRadius="xl">
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
    <Box
      w="full"
      bg="gray.900"
      minH="100vh"
      py={20}
      position="relative"
      overflow="hidden"
    >
      {/* Cursor light effect */}
      <Box
        ref={cursorRef}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        pointerEvents="none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(66, 133, 244, 0.06), transparent 40%)`,
        }}
      />

      {/* Decorative elements */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="400px"
        bgGradient="linear(to-b, blue.900, transparent)"
        opacity={0.1}
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="400px"
        bgGradient="linear(to-t, green.900, transparent)"
        opacity={0.1}
      />
      
      <Container maxW="7xl" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={16} align="stretch">
          <VStack spacing={6} textAlign="center">
            <HStack spacing={3} justify="center">
              <Text
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color="#4285F4"
              >
                Meet Our
              </Text>
              <Text
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color="white"
              >
                Amazing Team
              </Text>
            </HStack>
            <Text
              color="gray.400"
              fontSize={{ base: 'md', md: 'lg' }}
              maxW="2xl"
              lineHeight="tall"
            >
              We make life easier for our community through reliable, affordable, and useful tech innovations
            </Text>
          </VStack>

          {teamMembers.length === 0 ? (
            <Alert
              status="info"
              variant="subtle"
              borderRadius="xl"
              maxW="2xl"
              mx="auto"
              bg="gray.800"
              color="gray.100"
            >
              <AlertIcon />
              <AlertTitle>No team members found</AlertTitle>
              <AlertDescription>Team members will be added soon!</AlertDescription>
            </Alert>
          ) : (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 8, lg: 12 }}
              pt={8}
            >
              {teamMembers.map((member) => (
                <TeamMemberCard key={member._id} member={member} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default Team 
import { Box, Container, Heading, Text, SimpleGrid, VStack, Image, HStack, Link, Icon, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api'

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const TeamMemberCard = ({ name, role, image, linkedin, twitter, github }: TeamMember) => {
  return (
    <VStack 
      bg="white" 
      p={6} 
      rounded="lg" 
      spacing={4} 
      align="center"
      shadow="md"
      borderTop="4px solid"
      borderColor={role === "GDG Head" ? "google.blue" : role === "Tech Lead" ? "google.red" : "transparent"}
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <Image 
        src={image} 
        alt={name} 
        boxSize="140px"
        rounded="full" 
        objectFit="cover" 
      />
      <Heading 
        size="md"
        color="gray.700"
      >
        {name}
      </Heading>
      <Text 
        color="gray.600"
        fontWeight="medium"
      >
        {role}
      </Text>
      <HStack spacing={4}>
        {linkedin && (
          <Link href={linkedin} isExternal>
            <Icon as={FaLinkedin} boxSize={6} color="linkedin.500" />
          </Link>
        )}
        {twitter && (
          <Link href={twitter} isExternal>
            <Icon as={FaTwitter} boxSize={6} color="twitter.500" />
          </Link>
        )}
        {github && (
          <Link href={github} isExternal>
            <Icon as={FaGithub} boxSize={6} color="gray.700" />
          </Link>
        )}
      </HStack>
    </VStack>
  )
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      console.log('Fetching from:', API_ENDPOINTS.team);
      const response = await fetch(API_ENDPOINTS.team);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
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
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Loading team members...</AlertTitle>
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
            <Heading mb={4}>Our Team</Heading>
            <Text color="gray.600" fontSize="lg">
              Meet the amazing people behind GDG Community
            </Text>
          </Box>
          {teamMembers.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              <AlertTitle>No team members found</AlertTitle>
              <AlertDescription>Team members will be added soon!</AlertDescription>
            </Alert>
          ) : (
            <SimpleGrid 
              columns={{ base: 1, sm: 2, lg: 3 }} 
              spacing={8}
              mx="auto"
            >
              {teamMembers.map((member) => (
                <TeamMemberCard key={member._id} {...member} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default Team 
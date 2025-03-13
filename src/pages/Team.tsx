import { Box, Container, Heading, Text, SimpleGrid, VStack, Image, HStack, Link, Icon } from '@chakra-ui/react'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'
import { useState, useEffect } from 'react'

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  isLead?: boolean;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const TeamMember = ({ name, role, image, isLead = false, linkedin, twitter, github }: TeamMember) => {
  return (
    <VStack 
      bg="white" 
      p={6} 
      rounded="lg" 
      spacing={4} 
      align="center"
      shadow={isLead ? "lg" : "md"}
      borderTop="4px solid"
      borderColor={role === "GDG Head" ? "google.blue" : role === "Tech Lead" ? "google.red" : "transparent"}
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <Image 
        src={image} 
        alt={name} 
        boxSize={isLead ? "160px" : "140px"} 
        rounded="full" 
        objectFit="cover" 
      />
      <Heading 
        size={isLead ? "lg" : "md"} 
        color={isLead ? "google.blue" : "gray.700"}
      >
        {name}
      </Heading>
      <Text 
        color={isLead ? "google.red" : "gray.600"} 
        fontWeight={isLead ? "bold" : "medium"}
      >
        {role}
      </Text>
      <HStack spacing={4}>
        {linkedin && (
          <Link href={linkedin} isExternal>
            <Icon as={FaLinkedin} boxSize={{ base: 5, md: 6 }} color="linkedin.500" />
          </Link>
        )}
        {twitter && (
          <Link href={twitter} isExternal>
            <Icon as={FaTwitter} boxSize={{ base: 5, md: 6 }} color="twitter.500" />
          </Link>
        )}
        {github && (
          <Link href={github} isExternal>
            <Icon as={FaGithub} boxSize={{ base: 5, md: 6 }} color="gray.700" />
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

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/team-members');
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError('Failed to load team members');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxW="100%" py={12}>
        <Text>Loading team members...</Text>
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
            <Heading mb={4}>Our Team</Heading>
            <Text color="gray.600" fontSize="lg">
              Meet the amazing people behind GDG Community
            </Text>
          </Box>
          <SimpleGrid 
            columns={{ base: 1, sm: 2, lg: 3 }} 
            spacing={8}
            mx="auto"
          >
            {teamMembers.map((member) => (
              <TeamMember key={member._id} {...member} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Team 
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Image,
  HStack,
  IconButton,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/apiEndpoints';

interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.team);
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <Box as="section" py={{ base: 12, md: 16 }}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading
              as="h2"
              size="2xl"
              fontWeight="bold"
              mb={4}
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Our Team
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              Meet the passionate individuals behind GDG Guwahati
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
            {teamMembers.map((member) => (
              <Box
                key={member._id}
                bg={cardBg}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              >
                <Box position="relative" paddingTop="100%">
                  <Image
                    src={member.image}
                    alt={member.name}
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>
                <VStack p={4} spacing={2} align="center">
                  <Heading size="md" textAlign="center">
                    {member.name}
                  </Heading>
                  <Text
                    color={useColorModeValue('gray.600', 'gray.400')}
                    fontSize="sm"
                    fontWeight="medium"
                  >
                    {member.role}
                  </Text>
                  <HStack spacing={3} pt={2}>
                    {member.linkedin && (
                      <Link href={member.linkedin} isExternal>
                        <IconButton
                          aria-label="LinkedIn"
                          icon={<FaLinkedin />}
                          colorScheme="linkedin"
                          variant="ghost"
                          size="sm"
                        />
                      </Link>
                    )}
                    {member.twitter && (
                      <Link href={member.twitter} isExternal>
                        <IconButton
                          aria-label="Twitter"
                          icon={<FaTwitter />}
                          colorScheme="twitter"
                          variant="ghost"
                          size="sm"
                        />
                      </Link>
                    )}
                    {member.github && (
                      <Link href={member.github} isExternal>
                        <IconButton
                          aria-label="GitHub"
                          icon={<FaGithub />}
                          colorScheme="gray"
                          variant="ghost"
                          size="sm"
                        />
                      </Link>
                    )}
                  </HStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Team; 
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
  const roleColor = useColorModeValue('purple.500', 'purple.300');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

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
    <Box as="section" py={{ base: 12, md: 16 }} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="7xl">
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <Heading
              as="h2"
              size="2xl"
              fontWeight="bold"
              mb={4}
              bgGradient="linear(to-r, google.blue, google.red)"
              bgClip="text"
            >
              Our Team
            </Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              Meet the passionate individuals behind GDG Gurugram University
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
            {teamMembers.map((member) => (
              <Box
                key={member._id}
                bg={cardBg}
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="xl"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-8px)', shadow: '2xl' }}
                position="relative"
              >
                {/* Circular Image Container */}
                <Box
                  position="relative"
                  width="140px"
                  height="140px"
                  mx="auto"
                  mt={8}
                  mb={4}
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    borderRadius="full"
                    bg={member.role === 'GDG Head' ? 'purple.500' : member.role === 'Tech Lead' ? 'red.500' : 'blue.500'}
                    opacity="0.1"
                  />
                  <Image
                    src={member.image}
                    alt={member.name}
                    borderRadius="full"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    border="4px solid"
                    borderColor={member.role === 'GDG Head' ? 'purple.500' : member.role === 'Tech Lead' ? 'red.500' : 'blue.500'}
                  />
                </Box>

                <VStack p={6} spacing={3} align="center">
                  <Heading size="md" textAlign="center" fontWeight="bold">
                    {member.name}
                  </Heading>
                  <Text
                    color={member.role === 'GDG Head' ? 'purple.500' : member.role === 'Tech Lead' ? 'red.500' : 'blue.500'}
                    fontSize="sm"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    {member.role}
                  </Text>
                  <HStack spacing={4} pt={2}>
                    {member.linkedin && (
                      <Link href={member.linkedin} isExternal>
                        <IconButton
                          aria-label="LinkedIn"
                          icon={<FaLinkedin />}
                          colorScheme="linkedin"
                          variant="ghost"
                          size="sm"
                          rounded="full"
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
                          rounded="full"
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
                          rounded="full"
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
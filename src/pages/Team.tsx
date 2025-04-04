import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Card,
  CardBody,
  Avatar,
  Link,
  HStack,
  Icon,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Subham Singh',
    role: 'TECHLEAD',
    bio: 'This guy is techLead at gdgGug',
    image: '/subham.png',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Keshav',
    role: 'GDG HEAD',
    bio: 'Yes he is head',
    image: '/keshav.png',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
];

const SocialLink = ({ href, icon }: { href: string; icon: any }) => (
  <Link
    href={href}
    isExternal
    color="neutral.600"
    _hover={{ color: 'primary.600', transform: 'translateY(-2px)' }}
    transition="all 0.2s"
  >
    <Icon as={icon} boxSize={5} />
  </Link>
);

export default function Team() {
  return (
    <Box bg="white" minH="100vh">
      <Container maxW="7xl" py={{ base: 8, md: 16 }}>
        <VStack spacing={12}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px">
            <Heading
              fontSize={{ base: '3xl', md: '4xl' }}
              color="neutral.900"
              fontFamily="Google Sans Display"
              fontWeight="medium"
            >
              Meet Our{' '}
              <Text as="span" color="primary.500">
                Amazing Team
              </Text>
            </Heading>
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }} 
              color="neutral.700"
              fontFamily="Google Sans Text"
            >
              We make life easier for our community through reliable, affordable, and useful tech
              innovations
            </Text>
          </VStack>

          {/* Team Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
          >
            {teamMembers.map((member) => (
              <Card
                key={member.name}
                variant="elevated"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'xl',
                }}
                transition="all 0.2s"
                overflow="hidden"
              >
                <CardBody p={0}>
                  <Box
                    bg="primary.50"
                    h="120px"
                    position="relative"
                    mb="60px"
                  >
                    <Avatar
                      size="2xl"
                      name={member.name}
                      src={member.image}
                      position="absolute"
                      bottom="-50px"
                      left="50%"
                      transform="translateX(-50%)"
                      border="4px solid white"
                      bg="primary.500"
                    />
                  </Box>
                  <VStack spacing={4} px={6} pb={6}>
                    <VStack spacing={2}>
                      <Heading 
                        size="md" 
                        color="neutral.900"
                        fontFamily="Google Sans"
                        textAlign="center"
                      >
                        {member.name}
                      </Heading>
                      <Badge
                        colorScheme={member.role === 'TECHLEAD' ? 'error' : 'primary'}
                        px={3}
                        py={1}
                        borderRadius="full"
                        textTransform="uppercase"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {member.role}
                      </Badge>
                      <Text 
                        color="neutral.700" 
                        textAlign="center"
                        fontFamily="Google Sans Text"
                        fontSize="sm"
                        mt={2}
                      >
                        {member.bio}
                      </Text>
                    </VStack>
                    <HStack spacing={6} pt={2}>
                      <SocialLink href={member.social.linkedin} icon={FaLinkedin} />
                      <SocialLink href={member.social.twitter} icon={FaTwitter} />
                      <SocialLink href={member.social.github} icon={FaGithub} />
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
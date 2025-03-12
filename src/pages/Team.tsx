import { Box, Container, Heading, Text, SimpleGrid, VStack, Image, HStack, Link, Icon } from '@chakra-ui/react'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'

interface TeamMember {
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
  const teamMembers: TeamMember[] = [
    {
      name: "Alice Johnson",
      role: "GDG Head",
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=Alice&backgroundColor=4285f4`,
      isLead: true
    },
    {
      name: "Bob Smith",
      role: "Tech Lead",
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=Bob&backgroundColor=ea4335`,
      isLead: true
    },
    {
      name: "Carol White",
      role: "Community Manager",
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=Carol&backgroundColor=fbbc05`
    },
    {
      name: "David Brown",
      role: "Event Coordinator",
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=David&backgroundColor=34a853`
    },
    {
      name: "Eva Green",
      role: "Content Creator",
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=Eva&backgroundColor=4285f4`
    },
    {
      name: "Frank Lee",
      role: "Developer Relations",
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=Frank&backgroundColor=ea4335`
    }
  ]

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
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Team 
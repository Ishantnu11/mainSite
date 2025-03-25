import {
  Box,
  Container,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { EmailIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);

const TPO = () => {
  const teamMembers = [
    {
      name: 'Dr. Charu',
      designation: 'Training & Placement Officer & Director Employability',
      email: true,
    },
    {
      name: 'Dr. Rakesh Narang',
      designation: 'Deputy Director Employability',
      email: false,
    },
    {
      name: 'Dr. Neetu Singla',
      designation: 'Deputy Director-I',
      email: false,
    },
    {
      name: 'Dr. Kanchan Yadav',
      designation: 'Deputy Director-II',
      email: false,
    },
    {
      name: 'Mr. Sukhbeer',
      designation: 'Assistant',
      email: false,
    },
    {
      name: 'Sanehal Bansal',
      designation: 'ETPO',
      email: false,
    },
  ];

  return (
    <Container maxW="container.xl" pt={{ base: 24, md: 32 }}>
      <VStack spacing={12} align="stretch">
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
        >
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            letterSpacing="tight"
            mb={4}
          >
            Training and Placement Office
          </Heading>
          <Text
            fontSize="xl"
            color="gray.400"
            maxW="container.md"
            mx="auto"
          >
            Bridging the gap between academia and industry through excellence
            in training and placement.
          </Text>
        </MotionBox>

        {/* Team Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            bg="gray.900"
            borderRadius="xl"
            p={8}
            boxShadow="xl"
            border="1px solid"
            borderColor="gray.800"
          >
            <Heading
              size="lg"
              mb={6}
              bgGradient="linear(to-r, blue.400, cyan.400)"
              bgClip="text"
            >
              TPO Team
            </Heading>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th color="gray.400">NAME</Th>
                    <Th color="gray.400">DESIGNATION</Th>
                    <Th color="gray.400">CONTACT</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {teamMembers.map((member, index) => (
                    <Tr key={index}>
                      <Td color="white">{member.name}</Td>
                      <Td color="gray.300">{member.designation}</Td>
                      <Td>
                        {member.email && (
                          <Link
                            href="mailto:tpo@gug.ac.in"
                            color="blue.400"
                            _hover={{
                              color: 'blue.300',
                              textDecoration: 'none',
                            }}
                          >
                            <EmailIcon mr={2} />
                            Email
                          </Link>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </MotionBox>

        {/* Contact Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box
            bg="gray.900"
            borderRadius="xl"
            p={8}
            boxShadow="xl"
            border="1px solid"
            borderColor="gray.800"
          >
            <Heading
              size="lg"
              mb={6}
              bgGradient="linear(to-r, purple.400, pink.400)"
              bgClip="text"
            >
              Contact Information
            </Heading>
            <Text color="gray.300">
              For placement related queries, please contact:
            </Text>
            <Link
              href="mailto:tpo@gug.ac.in"
              color="blue.400"
              fontSize="lg"
              mt={2}
              display="inline-flex"
              alignItems="center"
              _hover={{
                color: 'blue.300',
                textDecoration: 'none',
              }}
            >
              <EmailIcon mr={2} />
              tpo@gug.ac.in
            </Link>
          </Box>
        </MotionBox>
      </VStack>
    </Container>
  );
};

export default TPO; 
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
  Card,
  CardBody,
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
    <Box bg="white">
      <Container maxW="1400px" pt={{ base: 8, md: 16 }} pb={{ base: 16, md: 24 }}>
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
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="700"
              color="neutral.900"
              lineHeight="1.2"
              mb={4}
            >
              Training and Placement Office
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="neutral.700"
              maxW="800px"
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
            <Card
              variant="outline"
              borderRadius="lg"
              borderColor="neutral.200"
              boxShadow="sm"
            >
              <CardBody p={8}>
                <Heading
                  size="lg"
                  mb={6}
                  color="neutral.900"
                >
                  TPO Team
                </Heading>
                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th color="neutral.700">NAME</Th>
                        <Th color="neutral.700">DESIGNATION</Th>
                        <Th color="neutral.700">CONTACT</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {teamMembers.map((member, index) => (
                        <Tr key={index}>
                          <Td color="neutral.900" fontWeight="500">{member.name}</Td>
                          <Td color="neutral.700">{member.designation}</Td>
                          <Td>
                            {member.email && (
                              <Link
                                href="mailto:tpo@gug.ac.in"
                                color="primary.500"
                                display="inline-flex"
                                alignItems="center"
                                fontWeight="500"
                                _hover={{
                                  color: 'primary.600',
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
              </CardBody>
            </Card>
          </MotionBox>

          {/* Contact Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card
              variant="outline"
              borderRadius="lg"
              borderColor="neutral.200"
              boxShadow="sm"
            >
              <CardBody p={8}>
                <Heading
                  size="lg"
                  mb={6}
                  color="neutral.900"
                >
                  Contact Information
                </Heading>
                <Text color="neutral.700" fontSize="lg">
                  For placement related queries, please contact:
                </Text>
                <Link
                  href="mailto:tpo@gug.ac.in"
                  color="primary.500"
                  fontSize="lg"
                  mt={2}
                  display="inline-flex"
                  alignItems="center"
                  fontWeight="500"
                  _hover={{
                    color: 'primary.600',
                    textDecoration: 'none',
                  }}
                >
                  <EmailIcon mr={2} />
                  tpo@gug.ac.in
                </Link>
              </CardBody>
            </Card>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default TPO; 
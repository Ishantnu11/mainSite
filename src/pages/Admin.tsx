import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  type: 'news' | 'internship';
  company?: string;
  location?: string;
  date: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const Admin = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Local state for storing items
  const [events, setEvents] = useState<Event[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    description: '',
    image: ''
  });

  // News form state
  const [newsForm, setNewsForm] = useState({
    title: '',
    description: '',
    type: 'news',
    company: '',
    location: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Team member form state
  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    image: '',
    linkedin: '',
    twitter: '',
    github: ''
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventForm
    };
    setEvents([...events, newEvent]);
    toast({
      title: 'Event added successfully',
      status: 'success',
      duration: 3000,
    });
    setEventForm({ title: '', date: '', description: '', image: '' });
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNewsItem: NewsItem = {
      id: Date.now().toString(),
      ...newsForm,
      date: new Date(newsForm.date).toISOString()
    };
    setNewsItems([...newsItems, newNewsItem]);
    toast({
      title: 'News item added successfully',
      status: 'success',
      duration: 3000,
    });
    setNewsForm({
      title: '',
      description: '',
      type: 'news',
      company: '',
      location: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeamMember: TeamMember = {
      id: Date.now().toString(),
      ...teamForm
    };
    setTeamMembers([...teamMembers, newTeamMember]);
    toast({
      title: 'Team member added successfully',
      status: 'success',
      duration: 3000,
    });
    setTeamForm({
      name: '',
      role: '',
      image: '',
      linkedin: '',
      twitter: '',
      github: ''
    });
  };

  const handleDelete = (type: 'event' | 'news' | 'team', id: string) => {
    switch (type) {
      case 'event':
        setEvents(events.filter(event => event.id !== id));
        break;
      case 'news':
        setNewsItems(newsItems.filter(item => item.id !== id));
        break;
      case 'team':
        setTeamMembers(teamMembers.filter(member => member.id !== id));
        break;
    }
    toast({
      title: 'Item deleted successfully',
      status: 'success',
      duration: 3000,
    });
  };

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  return (
    <Box w="full">
      <Container maxW={{ base: "100%", lg: "80%" }} py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
        <Grid templateColumns="1fr auto" alignItems="center" mb={8}>
          <Heading>Admin Dashboard</Heading>
          <Button onClick={handleLogout} colorScheme="red" variant="outline">
            Logout
          </Button>
        </Grid>

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Events</Tab>
            <Tab>News</Tab>
            <Tab>Team</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={8} align="stretch">
                <VStack as="form" spacing={4} align="stretch" onSubmit={handleEventSubmit}>
                  <Heading size="md">Add New Event</Heading>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      value={eventForm.image}
                      onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="blue">
                    Add Event
                  </Button>
                </VStack>

                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Title</Th>
                        <Th>Date</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {events.map((event) => (
                        <Tr key={event.id}>
                          <Td>{event.title}</Td>
                          <Td>{new Date(event.date).toLocaleDateString()}</Td>
                          <Td>
                            <IconButton
                              aria-label="Delete event"
                              icon={<FaTrash />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDelete('event', event.id)}
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={8} align="stretch">
                <VStack as="form" spacing={4} align="stretch" onSubmit={handleNewsSubmit}>
                  <Heading size="md">Add News/Internship</Heading>
                  <FormControl isRequired>
                    <FormLabel>Type</FormLabel>
                    <Select
                      value={newsForm.type}
                      onChange={(e) => setNewsForm({ ...newsForm, type: e.target.value as 'news' | 'internship' })}
                    >
                      <option value="news">News</option>
                      <option value="internship">Internship</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    />
                  </FormControl>
                  {newsForm.type === 'internship' && (
                    <>
                      <FormControl>
                        <FormLabel>Company</FormLabel>
                        <Input
                          value={newsForm.company}
                          onChange={(e) => setNewsForm({ ...newsForm, company: e.target.value })}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Location</FormLabel>
                        <Input
                          value={newsForm.location}
                          onChange={(e) => setNewsForm({ ...newsForm, location: e.target.value })}
                        />
                      </FormControl>
                    </>
                  )}
                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={newsForm.description}
                      onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      value={newsForm.date}
                      onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="blue">
                    Add News Item
                  </Button>
                </VStack>

                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Title</Th>
                        <Th>Type</Th>
                        <Th>Date</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {newsItems.map((item) => (
                        <Tr key={item.id}>
                          <Td>{item.title}</Td>
                          <Td>{item.type}</Td>
                          <Td>{new Date(item.date).toLocaleDateString()}</Td>
                          <Td>
                            <IconButton
                              aria-label="Delete news"
                              icon={<FaTrash />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDelete('news', item.id)}
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={8} align="stretch">
                <VStack as="form" spacing={4} align="stretch" onSubmit={handleTeamSubmit}>
                  <Heading size="md">Add Team Member</Heading>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Role</FormLabel>
                    <Input
                      value={teamForm.role}
                      onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      value={teamForm.image}
                      onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <Input
                      value={teamForm.linkedin}
                      onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Twitter URL</FormLabel>
                    <Input
                      value={teamForm.twitter}
                      onChange={(e) => setTeamForm({ ...teamForm, twitter: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>GitHub URL</FormLabel>
                    <Input
                      value={teamForm.github}
                      onChange={(e) => setTeamForm({ ...teamForm, github: e.target.value })}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="blue">
                    Add Team Member
                  </Button>
                </VStack>

                <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Role</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {teamMembers.map((member) => (
                        <Tr key={member.id}>
                          <Td>{member.name}</Td>
                          <Td>{member.role}</Td>
                          <Td>
                            <IconButton
                              aria-label="Delete member"
                              icon={<FaTrash />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDelete('team', member.id)}
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default Admin; 
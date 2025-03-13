import React, { useState, useEffect } from 'react';
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
  _id?: string;  // MongoDB uses _id
  title: string;
  date: string;
  description: string;
  image: string;
}

interface NewsItem {
  _id?: string;  // MongoDB uses _id
  title: string;
  description: string;
  type: 'news' | 'internship';
  company?: string;
  location?: string;
  date: string;
}

interface TeamMember {
  _id?: string;  // MongoDB uses _id
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

  // Add state for loading and error
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch all data when component mounts
  useEffect(() => {
    fetchNewsItems();
    fetchEvents();
    fetchTeamMembers();
  }, []);

  const fetchNewsItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news items');
      }
      const data = await response.json();
      setNewsItems(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        title: 'Error fetching news items',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: 'Error fetching events',
        status: 'error',
        duration: 3000,
      });
    }
  };

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
      toast({
        title: 'Error fetching team members',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const eventData = {
      ...eventForm,
      date: new Date(eventForm.date).toISOString()
    };
    
    try {
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      await fetchEvents();
      
      toast({
        title: 'Event added successfully',
        status: 'success',
        duration: 3000,
      });
      
      setEventForm({ title: '', date: '', description: '', image: '' });
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: 'Error adding event',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newsData = {
      ...newsForm,
      type: newsForm.type as 'news' | 'internship',
      date: new Date(newsForm.date).toISOString()
    };
    
    console.log('Sending news data:', newsData); // Debug log

    try {
      const response = await fetch('http://localhost:5000/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData); // Debug log
        throw new Error('Failed to add news item');
      }

      const newNews = await response.json();
      console.log('Successfully added news item:', newNews); // Debug log
      
      // Refresh the news items list
      await fetchNewsItems();
      
      toast({
        title: 'News item added successfully',
        status: 'success',
        duration: 3000,
      });
      
      // Reset form
      setNewsForm({
        title: '',
        description: '',
        type: 'news',
        company: '',
        location: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding news:', error);
      toast({
        title: 'Error adding news item',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/team-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamForm),
      });

      if (!response.ok) {
        throw new Error('Failed to add team member');
      }

      await fetchTeamMembers();
      
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
    } catch (error) {
      console.error('Error adding team member:', error);
      toast({
        title: 'Error adding team member',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type: 'event' | 'news' | 'team', id: string) => {
    try {
      let endpoint = '';
      switch (type) {
        case 'event':
          endpoint = `/events/${id}`;
          break;
        case 'news':
          endpoint = `/news/${id}`;
          break;
        case 'team':
          endpoint = `/team-members/${id}`;
          break;
      }

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${type}`);
      }

      // Refresh the appropriate list
      switch (type) {
        case 'event':
          await fetchEvents();
          break;
        case 'news':
          await fetchNewsItems();
          break;
        case 'team':
          await fetchTeamMembers();
          break;
      }

      toast({
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast({
        title: `Error deleting ${type}`,
        status: 'error',
        duration: 3000,
      });
    }
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
                        <Tr key={event._id}>
                          <Td>{event.title}</Td>
                          <Td>{new Date(event.date).toLocaleDateString()}</Td>
                          <Td>
                            <IconButton
                              aria-label="Delete event"
                              icon={<FaTrash />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDelete('event', event._id as string)}
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
                  <Button 
                    type="submit" 
                    colorScheme="blue" 
                    isLoading={isLoading}
                    loadingText="Adding..."
                  >
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
                        <Tr key={item._id}>
                          <Td>{item.title}</Td>
                          <Td>{item.type}</Td>
                          <Td>{new Date(item.date).toLocaleDateString()}</Td>
                          <Td>
                            <IconButton
                              aria-label="Delete news"
                              icon={<FaTrash />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDelete('news', item._id as string)}
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
                        <Tr key={member._id}>
                          <Td>{member.name}</Td>
                          <Td>{member.role}</Td>
                          <Td>
                            <IconButton
                              aria-label="Delete member"
                              icon={<FaTrash />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDelete('team', member._id as string)}
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
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
  HStack,
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
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api'

interface Event {
  _id?: string;  // MongoDB uses _id
  title: string;
  date: string;
  description: string;
  image: string;
  link?: string;
  status: 'upcoming' | 'ongoing' | 'past';
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
  _id?: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Local state for storing items
  const [events, setEvents] = useState<Event[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Event form state
  const [eventForm, setEventForm] = useState<Event>({
    title: '',
    date: '',
    description: '',
    image: '',
    link: '',
    status: 'upcoming'
  });

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

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
  const [teamForm, setTeamForm] = useState<TeamMember>({
    name: '',
    role: '',
    image: '',
    linkedin: '',
    twitter: '',
    github: ''
  });

  // Add state for loading and error
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch all data when component mounts
  useEffect(() => {
    fetchEvents();
    fetchNewsItems();
    fetchTeamMembers();
  }, []);

  const fetchNewsItems = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.news);
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
      const response = await fetch(API_ENDPOINTS.events);
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
      const response = await fetch(API_ENDPOINTS.team);
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
    
    // Validate that all required fields are filled
    if (!eventForm.title || !eventForm.date || !eventForm.description || !eventForm.image) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in all required fields',
        status: 'warning',
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }
    
    const eventData = {
      ...eventForm,
      date: new Date(eventForm.date).toISOString(),
      status: eventForm.status || 'upcoming' // Ensure status is set
    };
    
    try {
      let response;
      let successMessage;
      
      if (editMode && editingEventId) {
        // Update existing event
        console.log(`📝 Updating event ${editingEventId} with data:`, eventData);
        response = await fetch(`${API_ENDPOINTS.events}?id=${editingEventId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });
        successMessage = `Event "${eventForm.title}" has been updated`;
      } else {
        // Create new event
        console.log('📝 Creating new event with data:', eventData);
        response = await fetch(API_ENDPOINTS.events, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        });
        successMessage = `Event "${eventForm.title}" has been added with status: ${eventForm.status}`;
      }

      if (!response.ok) {
        throw new Error(editMode ? 'Failed to update event' : 'Failed to add event');
      }

      const savedEvent = await response.json();
      console.log(editMode ? '✅ Event updated successfully:' : '✅ Event created successfully:', savedEvent);

      await fetchEvents();
      
      toast({
        title: editMode ? 'Event updated successfully' : 'Event added successfully',
        description: successMessage,
        status: 'success',
        duration: 3000,
      });
      
      // Reset form and edit mode
      setEventForm({
        title: '',
        date: '',
        description: '',
        image: '',
        link: '',
        status: 'upcoming'
      });
      setEditMode(false);
      setEditingEventId(null);
    } catch (error) {
      console.error(editMode ? '❌ Error updating event:' : '❌ Error adding event:', error);
      toast({
        title: editMode ? 'Error updating event' : 'Error adding event',
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
    
    try {
      const response = await fetch(API_ENDPOINTS.news, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      if (!response.ok) {
        throw new Error('Failed to add news item');
      }

      await fetchNewsItems();
      
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
      const response = await fetch(API_ENDPOINTS.team, {
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
          endpoint = `${API_ENDPOINTS.events}/${id}`;
          break;
        case 'news':
          endpoint = `${API_ENDPOINTS.news}/${id}`;
          break;
        case 'team':
          endpoint = `${API_ENDPOINTS.team}/${id}`;
          break;
      }

      const response = await fetch(endpoint, {
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

  if (!user) {
    return null;
  }

  return (
    <Box 
      minH="100vh" 
      bg="gray.900" 
      color="white"
      position="relative"
      overflow="hidden"
    >
      {/* Background Effects */}
      <Box
        position="absolute"
        top="5%"
        left="20%"
        width="600px"
        height="600px"
        background="radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, transparent 70%)"
        filter="blur(40px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        top="40%"
        right="10%"
        width="500px"
        height="500px"
        background="radial-gradient(circle, rgba(156, 39, 176, 0.1) 0%, transparent 70%)"
        filter="blur(40px)"
        zIndex={0}
      />

      <Container maxW="container.xl" py={8} position="relative" zIndex={1}>
        <Grid templateColumns="1fr auto" alignItems="center" mb={8} gap={4}>
          <Heading 
            size="xl"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            letterSpacing="tight"
          >
            Admin Dashboard
          </Heading>
          <Button 
            onClick={handleLogout} 
            colorScheme="red" 
            variant="ghost"
            _hover={{
              bg: 'rgba(254, 178, 178, 0.12)',
              transform: 'translateY(-2px)'
            }}
          >
            Logout
          </Button>
        </Grid>

        <Tabs 
          variant="soft-rounded" 
          colorScheme="blue" 
          isLazy
          bg="gray.800"
          p={4}
          borderRadius="xl"
          boxShadow="xl"
        >
          <TabList mb={6} gap={4}>
            <Tab 
              _selected={{ 
                color: 'blue.800', 
                bg: 'blue.100',
                fontWeight: 'semibold' 
              }}
              color="gray.100"
            >
              Events
            </Tab>
            <Tab 
              _selected={{ 
                color: 'green.800', 
                bg: 'green.100',
                fontWeight: 'semibold'
              }}
              color="gray.100"
            >
              News
            </Tab>
            <Tab 
              _selected={{ 
                color: 'purple.800', 
                bg: 'purple.100',
                fontWeight: 'semibold'
              }}
              color="gray.100"
            >
              Team
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={8} align="stretch">
                <Box 
                  bg="gray.700" 
                  p={6} 
                  borderRadius="lg"
                  boxShadow="md"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="gray.600"
                >
                  <Heading size="md" mb={6} color="blue.100">
                    {editMode ? 'Edit Event' : 'Add New Event'}
                  </Heading>
                  <VStack as="form" spacing={6} align="stretch" onSubmit={handleEventSubmit}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl isRequired>
                        <FormLabel color="gray.200">Title</FormLabel>
                        <Input
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          bg="gray.800"
                          border="1px solid"
                          borderColor="gray.600"
                          _hover={{ borderColor: 'blue.400' }}
                          _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel color="gray.200">Date</FormLabel>
                        <Input
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          bg="gray.800"
                          border="1px solid"
                          borderColor="gray.600"
                          _hover={{ borderColor: 'blue.400' }}
                          _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
                        />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl isRequired>
                      <FormLabel color="gray.200">Status</FormLabel>
                      <Select
                        value={eventForm.status}
                        onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as 'upcoming' | 'ongoing' | 'past' })}
                        bg="gray.800"
                        border="1px solid"
                        borderColor="gray.600"
                        _hover={{ borderColor: 'blue.400' }}
                        _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="past">Past</option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color="gray.200">Description</FormLabel>
                      <Textarea
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                        bg="gray.800"
                        border="1px solid"
                        borderColor="gray.600"
                        _hover={{ borderColor: 'blue.400' }}
                        _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
                        rows={4}
                      />
                    </FormControl>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl isRequired>
                        <FormLabel color="gray.200">Image URL</FormLabel>
                        <Input
                          value={eventForm.image}
                          onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                          bg="gray.800"
                          border="1px solid"
                          borderColor="gray.600"
                          _hover={{ borderColor: 'blue.400' }}
                          _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel color="gray.200">Registration Link</FormLabel>
                        <Input
                          value={eventForm.link}
                          onChange={(e) => setEventForm({ ...eventForm, link: e.target.value })}
                          placeholder="https://example.com/register"
                          bg="gray.800"
                          border="1px solid"
                          borderColor="gray.600"
                          _hover={{ borderColor: 'blue.400' }}
                          _focus={{ borderColor: 'blue.400', boxShadow: 'none' }}
                        />
                      </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
                      <Button 
                        type="submit" 
                        colorScheme="blue"
                        size="lg"
                        isLoading={isLoading}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                      >
                        {editMode ? 'Update Event' : 'Add Event'}
                      </Button>
                      {editMode && (
                        <Button 
                          colorScheme="gray"
                          size="lg"
                          onClick={() => {
                            setEventForm({
                              title: '',
                              date: '',
                              description: '',
                              image: '',
                              link: '',
                              status: 'upcoming'
                            });
                            setEditMode(false);
                            setEditingEventId(null);
                          }}
                          _hover={{
                            transform: 'translateY(-2px)',
                          }}
                        >
                          Cancel Edit
                        </Button>
                      )}
                    </SimpleGrid>
                  </VStack>
                </Box>

                <Box 
                  bg="gray.700" 
                  p={6} 
                  borderRadius="lg"
                  boxShadow="md"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="gray.600"
                >
                  <Heading size="md" mb={6} color="blue.100">Manage Events</Heading>
                  <Box overflowX="auto">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th color="gray.300">Title</Th>
                          <Th color="gray.300">Date</Th>
                          <Th color="gray.300">Status</Th>
                          <Th color="gray.300">Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {events.map((event) => (
                          <Tr key={event._id}>
                            <Td color="gray.100">{event.title}</Td>
                            <Td color="gray.100">{new Date(event.date).toLocaleDateString()}</Td>
                            <Td>
                              <Badge
                                colorScheme={
                                  event.status === 'upcoming'
                                    ? 'blue'
                                    : event.status === 'ongoing'
                                    ? 'green'
                                    : 'purple'
                                }
                              >
                                {event.status}
                              </Badge>
                            </Td>
                            <Td>
                              <HStack spacing={2}>
                                <IconButton
                                  aria-label="Edit event"
                                  icon={<FaEdit />}
                                  colorScheme="blue"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    // Format date for input field (YYYY-MM-DD)
                                    const formattedDate = new Date(event.date).toISOString().split('T')[0];
                                    
                                    setEventForm({
                                      title: event.title,
                                      date: formattedDate,
                                      description: event.description,
                                      image: event.image,
                                      link: event.link || '',
                                      status: event.status
                                    });
                                    setEditMode(true);
                                    setEditingEventId(event._id as string);
                                    
                                    // Scroll to form
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }}
                                  _hover={{
                                    bg: 'rgba(66, 153, 225, 0.12)',
                                    transform: 'translateY(-2px)'
                                  }}
                                />
                                <IconButton
                                  aria-label="Delete event"
                                  icon={<FaTrash />}
                                  colorScheme="red"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDelete('event', event._id as string)}
                                  _hover={{
                                    bg: 'rgba(254, 178, 178, 0.12)',
                                    transform: 'translateY(-2px)'
                                  }}
                                />
                              </HStack>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
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
                    <Select
                      value={teamForm.role}
                      onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    >
                      <option value="">Select Role</option>
                      <option value="GDG Head">GDG Head</option>
                      <option value="Tech Lead">Tech Lead</option>
                      <option value="Core Team">Core Team</option>
                      <option value="Member">Member</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      value={teamForm.image}
                      onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <Input
                      value={teamForm.linkedin}
                      onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Twitter URL</FormLabel>
                    <Input
                      value={teamForm.twitter}
                      onChange={(e) => setTeamForm({ ...teamForm, twitter: e.target.value })}
                      placeholder="https://twitter.com/username"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>GitHub URL</FormLabel>
                    <Input
                      value={teamForm.github}
                      onChange={(e) => setTeamForm({ ...teamForm, github: e.target.value })}
                      placeholder="https://github.com/username"
                    />
                  </FormControl>
                  <Button 
                    type="submit" 
                    colorScheme="blue"
                    isLoading={isLoading}
                    loadingText="Adding..."
                  >
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
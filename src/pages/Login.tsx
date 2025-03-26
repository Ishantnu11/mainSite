import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  Icon,
  Flex,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
      });
      navigate('/admin');
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Please check your credentials and try again.';
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      toast({
        title: 'Login failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box 
      minH="100vh" 
      bg="black"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
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

      <Container maxW="md" position="relative" zIndex={1}>
        <Flex direction="row" overflow="hidden" borderRadius="xl" boxShadow="2xl">
          {/* Left side - Brand/Logo */}
          <Box 
            bg="linear-gradient(135deg, #4285F4 0%, #0F9D58 100%)"
            p={8} 
            color="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="40%"
          >
            <VStack spacing={6} align="center">
              <Heading 
                size="xl" 
                fontWeight="bold"
                textAlign="center"
                letterSpacing="tight"
              >
                GDG Admin Portal
              </Heading>
              <Text fontSize="md" textAlign="center" opacity={0.9}>
                Access the dashboard to manage events, news, and team members.
              </Text>
              <Image 
                src="/logo.png" 
                alt="GDG Logo"
                fallbackSrc="https://via.placeholder.com/150?text=GDG"
                boxSize="100px"
                mt={4}
              />
            </VStack>
          </Box>

          {/* Right side - Login Form */}
          <Box 
            bg="white" 
            p={8}
            width="60%"
          >
            <VStack spacing={6} align="stretch">
              <Heading size="lg" fontWeight="bold" color="blue.500">
                Sign In
              </Heading>
              
              <Text color="gray.500">
                Enter your credentials to access the dashboard
              </Text>

              <VStack as="form" spacing={5} w="full" onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        size="sm"
                      >
                        <Icon as={showPassword ? FaEyeSlash : FaEye} color="gray.500" />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Text fontSize="sm" color="gray.500">
                  Full access to all features
                </Text>

                <Button
                  type="submit"
                  colorScheme="blue"
                  w="full"
                  mt={4}
                  isLoading={loading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>
              </VStack>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Login; 
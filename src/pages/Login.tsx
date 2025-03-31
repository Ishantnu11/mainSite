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
  Checkbox,
  Link,
  HStack,
  Image
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

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
      // Force navigation to admin after successful login
      window.location.href = '/admin';
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Please check your credentials and try again.';
      
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
      display="flex"
      alignItems="center"
      bg="black"
      position="relative"
      overflow="hidden"
    >
      {/* GDG-themed decorative elements */}
      <Box
        position="absolute"
        right="-100px"
        top="-100px"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="#4285F4"
        opacity="0.15"
      />
      <Box
        position="absolute"
        left="-50px"
        bottom="-50px"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="#0F9D58"
        opacity="0.15"
      />
      <Box
        position="absolute"
        left="30%"
        top="20%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="#DB4437"
        opacity="0.1"
      />

      <Container maxW="md" py={12} position="relative">
        <VStack
          spacing={8}
          bg="whiteAlpha.100"
          p={8}
          borderRadius="xl"
          boxShadow="2xl"
          w="full"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          <VStack spacing={3} w="full" align="center">
            <Image 
              src="/gdg-logo.png"
              alt="GDG Logo"
              boxSize="80px"
              mb={2}
            />
            <Heading size="lg" color="white">Welcome to GDG Admin</Heading>
            <Text color="whiteAlpha.800">Please enter your credentials to continue</Text>
          </VStack>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4} w="full">
              <FormControl>
                <FormLabel color="whiteAlpha.900">Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  borderRadius="md"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.500' }}
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #4285F4' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="whiteAlpha.900">Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                    borderRadius="md"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    color="white"
                    _placeholder={{ color: 'whiteAlpha.500' }}
                    _hover={{ borderColor: 'blue.400' }}
                    _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #4285F4' }}
                  />
                  <InputRightElement h="full">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      variant="ghost"
                      onClick={togglePasswordVisibility}
                      color="whiteAlpha.700"
                      _hover={{ bg: 'whiteAlpha.100' }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <VStack w="full" spacing={4} pt={2}>
                <Button
                  type="submit"
                  w="full"
                  size="lg"
                  borderRadius="md"
                  bg="#4285F4"
                  color="white"
                  _hover={{ bg: '#357ABD' }}
                  _active={{ bg: '#2D6AA0' }}
                  isLoading={loading}
                  loadingText="Signing in..."
                >
                  Sign in
                </Button>
                <Button
                  leftIcon={<FaGoogle />}
                  variant="outline"
                  size="lg"
                  w="full"
                  borderRadius="md"
                  color="white"
                  borderColor="whiteAlpha.300"
                  _hover={{ bg: 'whiteAlpha.100' }}
                >
                  Sign in with Google
                </Button>
              </VStack>
            </VStack>
          </form>

          <Text color="whiteAlpha.700" fontSize="sm" textAlign="center">
            Having trouble? Contact your administrator
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Login; 
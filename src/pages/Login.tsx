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
  Image,
  IconButton,
  Card,
  CardBody,
  useBoolean,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { relative } from 'path';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useBoolean(false);
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      toast({
        title: 'Welcome back!',
        description: 'Successfully signed in to your account.',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
      navigate('/admin');
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
        title: 'Unable to sign in',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      minH="100vh" 
      bg="white" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      py={10}
    >
      <Container maxW="400px" border="2px solid #ccc" borderRadius="12px"

      transition="all 0.3s ease"
      _hover={{
        boxShadow: '0 0 12px rgba(59, 130, 246, 0.6)', // glowing effect
        borderColor: '#ffa500' }}>
        
        <Card
          variant="outline"
          borderRadius="lg"
          borderColor="neutral.200"
          boxShadow="sm"

          

          
        >
          <CardBody p={8}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                {/* Logo and Title */}
                <VStack spacing={0} align="center">
                  <Image
                    src="/images/t2k7QK3r_400x400.png"
                    alt="GDG Logo"
                    boxSize="80px"
                    objectFit="contain"
                  />
                  <VStack spacing={0}>
                    <Text
                      fontSize="24px"
                      fontWeight="bold"
                      color="neutral.900"
                      fontFamily="Google Sans"
                      textAlign="center"
                      mt="-10"
                      
                    >
                      Sign In
                    </Text>
                    <Text
                      fontSize="16px"
                      color="neutral.700"
                      fontFamily="Google Sans Text"
                      textAlign="center"
                      mt="-12"


                      
                    


                    >
                      to continue to GDG Gurugram University
                    </Text>
                  </VStack>
                </VStack>

                {/* Form */}
                <VStack spacing={3} pt={4}>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize="sm"
                      
                      color="neutral.700"
                      fontFamily="Google Sans Text"
                      mb={1}
                      
                    >
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      size="lg"
                      
                      borderRadius="md"
                      borderColor="neutral.300"
                      color="neutral.900"
                      _placeholder={{ color: 'neutral.500'}}
                      _hover={{ borderColor: 'neutral.400' }}
                      _focus={{
                        borderColor: 'primary.500',
                        boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
                      }}
                      fontFamily="Roboto"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel
                      fontSize="sm"
                    
                      color="neutral.700"
                      fontFamily="Google Sans Text"
                      mb={1}
                    >
                      Password
                    </FormLabel>
                    <InputGroup size="lg">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        borderRadius="md"
                        borderColor="neutral.300"
                        color="neutral.900"
                        _placeholder={{ color: 'neutral.500' }}
                        _hover={{ borderColor: 'neutral.400' }}
                        _focus={{
                          borderColor: 'primary.500',
                          boxShadow: '0 0 0 1px var(--chakra-colors-primary-500)',
                        }}
                        fontFamily="Roboto"
                      />
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={setShowPassword.toggle}
                          color="neutral.600"
                          bottom="-1.5"
                          left="-1"
                          _hover={{ bg: 'transparent', color: 'neutral.800' }}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </VStack>

                {/* Links and Buttons */}
                <VStack spacing={6} pt={4}>
                  <Link
                    color="primary.500"
                    fontSize="14px"
                    fontWeight="500"
                    fontFamily="Google Sans"
                    alignSelf="flex-centre"
                    cursor="pointer"

                    _hover={{ textDecoration: 'none', color: 'primary.600' }}
                  >
                    Forgot password?
                  </Link>

                  <Text
                    color="neutral.700"
                    fontSize="14px"
                    fontFamily="Google Sans Text"
                  >
                    Not your computer? Use Guest mode to sign in privately.{' '}
                    <Link
                      color="primary.500"
                      fontWeight="500"
                      _hover={{ textDecoration: 'none', color: 'primary.600' }}
                    >
                      Learn more
                    </Link>
                  </Text>

                  <HStack   justify="space-between" w="full" pt={4} mt='-10'>
                    <Link
                      color="primary.500"
                      fontSize="14px"
                      fontWeight="500"
                      fontFamily="Google Sans"
                      ml='-110'
                      cursor="pointer"

                      _hover={{ textDecoration: 'none', color: 'primary.600' }}
                    >
                      Create account          
                    </Link>
                    <Button
                      type="submit"
                      colorScheme="primary"
                      size="lg"
                      px={8}
                      fontFamily="Google Sans"
                      fontWeight="500"
                      isLoading={loading}
                      _hover={{
                        transform: 'translateY(-1px)',
                        boxShadow: 'sm',
                      }}
                    >
                      Sign in
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
} 

import {
  Box,
  Container,
  Flex,
  HStack,
  Link as ChakraLink,
  Button,
  IconButton,
  useDisclosure,
  VStack,
  Image,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { isAdmin } = useAuth()

  const navItems = [
    { name: 'Events', path: '/events' },
    { name: 'News', path: '/news' },
    { name: 'Team', path: '/team' },
  ]

  if (isAdmin) {
    navItems.push({ name: 'Admin', path: '/admin' })
  }

  return (
    <Box 
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="rgba(0, 0, 0, 0.8)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Container maxW="container.xl" py={4}>
        <Flex justify="space-between" align="center">
          <HStack spacing={4} as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Box
              width="40px"
              height="40px"
              borderRadius="full"
              overflow="hidden"
              border="2px solid"
              borderColor="whiteAlpha.400"
              transition="all 0.3s"
              _hover={{ borderColor: "blue.400", transform: "scale(1.05)" }}
              bg="white"
            >
              <Image
                src="src/assets/t2k7QK3r_400x400.png"
                alt="GDG Logo"
                width="100%"
                height="100%"
                objectFit="contain"
                p="2px"
              />
            </Box>
            <Box
              fontSize="xl"
              fontWeight="bold"
              color="white"
              letterSpacing="tight"
              _hover={{ color: "blue.400" }}
              transition="all 0.3s"
            >
              GDG Gurugram
            </Box>
          </HStack>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <ChakraLink
                key={item.path}
                as={RouterLink}
                to={item.path}
                fontSize="md"
                fontWeight="bold"
                color="white"
                _hover={{
                  color: 'white',
                  transform: 'translateY(-1px)',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                }}
                transition="all 0.2s"
              >
                {item.name}
              </ChakraLink>
            ))}
            <Button
              as={RouterLink}
              to="/login"
              variant="outline"
              colorScheme="blue"
              size="sm"
              _hover={{
                bg: 'whiteAlpha.200',
                transform: 'translateY(-2px)',
              }}
            >
              Login
            </Button>
          </HStack>

          {/* Mobile Navigation Toggle */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle Navigation"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
          />
        </Flex>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <VStack
            display={{ base: 'flex', md: 'none' }}
            py={4}
            spacing={4}
            align="stretch"
          >
            {navItems.map((item) => (
              <ChakraLink
                key={item.path}
                as={RouterLink}
                to={item.path}
                fontSize="lg"
                fontWeight="bold"
                color="white"
                onClick={onToggle}
                _hover={{ 
                  color: 'white',
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
                }}
                transition="all 0.2s"
              >
                {item.name}
              </ChakraLink>
            ))}
            <Button
              as={RouterLink}
              to="/login"
              variant="outline"
              colorScheme="blue"
              w="full"
              _hover={{
                bg: 'whiteAlpha.200',
                transform: 'translateY(-2px)',
              }}
            >
              Login
            </Button>
          </VStack>
        )}
      </Container>
    </Box>
  )
}

export default Navbar 
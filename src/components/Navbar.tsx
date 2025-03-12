import {
  Box,
  Container,
  HStack,
  Text,
  Button,
  IconButton,
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <RouterLink to={to}>
      <Text
        px={2}
        py={1}
        rounded="md"
        fontWeight="medium"
        color={isActive ? "google.blue" : "gray.600"}
        _hover={{
          textDecoration: 'none',
          color: 'google.blue',
        }}
      >
        {children}
      </Text>
    </RouterLink>
  )
}

const NavLinks = () => (
  <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/events">Events</NavLink>
    <NavLink to="/news">News</NavLink>
    <NavLink to="/team">Team</NavLink>
  </>
)

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, isAdmin } = useAuth()

  return (
    <Box
      as="nav"
      bg="white"
      shadow="sm"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Container maxW={{ base: "100%", lg: "80%" }} px={{ base: 4, md: 8 }}>
        <HStack h={16} justify="space-between" spacing={8}>
          <HStack spacing={4}>
            <Box
              bg="google.blue"
              color="white"
              px={3}
              py={1}
              rounded="md"
              fontWeight="bold"
            >
              GDG
            </Box>
            <Text fontWeight="medium">Gurugram</Text>
          </HStack>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <NavLinks />
            {isAdmin ? (
              <RouterLink to="/admin">
                <Button colorScheme="blue" variant="outline">
                  Admin Panel
                </Button>
              </RouterLink>
            ) : user ? (
              <RouterLink to="/login">
                <Button colorScheme="blue" variant="outline">
                  Dashboard
                </Button>
              </RouterLink>
            ) : (
              <RouterLink to="/login">
                <Button colorScheme="blue" variant="outline">
                  Login
                </Button>
              </RouterLink>
            )}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            icon={<FaBars />}
            aria-label="Open menu"
            variant="ghost"
          />
        </HStack>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <NavLinks />
              {isAdmin ? (
                <RouterLink to="/admin">
                  <Button w="full" colorScheme="blue" variant="outline">
                    Admin Panel
                  </Button>
                </RouterLink>
              ) : user ? (
                <RouterLink to="/login">
                  <Button w="full" colorScheme="blue" variant="outline">
                    Dashboard
                  </Button>
                </RouterLink>
              ) : (
                <RouterLink to="/login">
                  <Button w="full" colorScheme="blue" variant="outline">
                    Login
                  </Button>
                </RouterLink>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Navbar 
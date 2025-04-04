import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  CloseButton,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <RouterLink to={to}>
    <Button
      variant="ghost"
      color="neutral.700"
      _hover={{
        bg: 'neutral.50',
        color: 'neutral.900',
      }}
      _active={{
        bg: 'neutral.100',
      }}
    >
      {children}
    </Button>
  </RouterLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuth();
  const bg = useColorModeValue('white', 'white');
  const borderColor = useColorModeValue('neutral.200', 'neutral.200');

  return (
    <Box
      bg={bg}
      px={4}
      py={4}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1400px" mx="auto">
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="ghost"
          color="neutral.700"
        />
        <HStack spacing={8} alignItems="center">
          <RouterLink to="/">
            <Image
              src="/images/t2k7QK3r_400x400.png"
              alt="GDG GUG Logo"
              h="40px"
              w="40px"
              objectFit="contain"
            />
          </RouterLink>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/team">Team</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/tpo">TPO</NavLink>
          </HStack>
        </HStack>
        <Flex alignItems="center">
          {user ? (
            <Button
              variant="outline"
              colorScheme="primary"
              onClick={logout}
              _hover={{
                bg: 'primary.50',
                color: 'primary.700',
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              as={RouterLink}
              to="/login"
              colorScheme="primary"
              _hover={{
                bg: 'primary.600',
                transform: 'translateY(-1px)',
                boxShadow: 'sm',
              }}
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box
          pb={4}
          display={{ md: 'none' }}
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="white"
          zIndex={20}
        >
          <Flex h={16} alignItems="center" justifyContent="space-between" px={4}>
            <RouterLink to="/">
              <Image
                src="/images/t2k7QK3r_400x400.png"
                alt="GDG GUG Logo"
                h="40px"
                w="40px"
                objectFit="contain"
              />
            </RouterLink>
            <CloseButton onClick={onClose} color="neutral.700" />
          </Flex>
          <VStack spacing={4} px={4}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/team">Team</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/tpo">TPO</NavLink>
            {user ? (
              <Button
                variant="outline"
                colorScheme="primary"
                onClick={logout}
                w="full"
                _hover={{
                  bg: 'primary.50',
                  color: 'primary.700',
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                as={RouterLink}
                to="/login"
                colorScheme="primary"
                w="full"
                _hover={{
                  bg: 'primary.600',
                  transform: 'translateY(-1px)',
                  boxShadow: 'sm',
                }}
              >
                Login
              </Button>
            )}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
} 
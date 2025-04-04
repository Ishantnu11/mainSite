import {
  Box,
  Image,
  Text,
  VStack,
  Badge,
  Link,
  HStack,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { getAssetPath } from '../config/api';
import { format } from 'date-fns';

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link?: string;
  location?: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const statusColors = {
    upcoming: 'primary',
    ongoing: 'green',
    past: 'gray',
  };

  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'MMM d, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');

  const defaultImage = 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/GDG%20Cloud.png';

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
    >
      <Box position="relative">
        <Image
          src={event.image || defaultImage}
          alt={event.title}
          width="100%"
          height="200px"
          objectFit="cover"
          fallback={
            <Box
              width="100%"
              height="200px"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="gray.500">Loading image...</Text>
            </Box>
          }
        />
        <Badge
          position="absolute"
          top="4"
          right="4"
          colorScheme={statusColors[event.status]}
          px={3}
          py={1}
          borderRadius="full"
          textTransform="capitalize"
          fontSize="sm"
          fontWeight="medium"
        >
          {event.status}
        </Badge>
      </Box>

      <VStack align="stretch" p={6} spacing={4}>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="gray.900"
          noOfLines={2}
          lineHeight="shorter"
        >
          {event.title}
        </Text>

        <Text color="gray.600" noOfLines={2} fontSize="sm">
          {event.description}
        </Text>

        <VStack align="stretch" spacing={2}>
          <Flex align="center" color="gray.600" fontSize="sm">
            <Icon as={FaCalendar} mr={2} color={`${statusColors[event.status]}.500`} />
            {formattedDate}
          </Flex>
          <Flex align="center" color="gray.600" fontSize="sm">
            <Icon as={FaClock} mr={2} color={`${statusColors[event.status]}.500`} />
            {formattedTime}
          </Flex>
          {event.location && (
            <Flex align="center" color="gray.600" fontSize="sm">
              <Icon as={FaMapMarkerAlt} mr={2} color={`${statusColors[event.status]}.500`} />
              {event.location}
            </Flex>
          )}
        </VStack>

        {event.link && (
          <Link
            href={event.link}
            isExternal
            color={`${statusColors[event.status]}.500`}
            fontWeight="medium"
            fontSize="sm"
            display="flex"
            alignItems="center"
            gap={2}
            mt={2}
            _hover={{
              textDecoration: 'none',
              color: `${statusColors[event.status]}.600`,
            }}
          >
            Learn More
            <Icon as={ExternalLinkIcon} />
          </Link>
        )}
      </VStack>
    </Box>
  );
};

export default EventCard; 
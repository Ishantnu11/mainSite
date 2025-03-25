import {
  Box,
  Image,
  Text,
  VStack,
  Badge,
  Link,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { getAssetPath } from '../config/api';

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link?: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const statusColors = {
    upcoming: 'blue',
    ongoing: 'green',
    past: 'purple',
  };

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      bg="whiteAlpha.100"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'xl',
      }}
    >
      <Image
        src={getAssetPath(event.image)}
        alt={event.title}
        width="100%"
        height="200px"
        objectFit="cover"
        fallback={
          <Box
            width="100%"
            height="200px"
            bg="gray.700"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="gray.500">Image not available</Text>
          </Box>
        }
      />

      <VStack align="stretch" p={6} spacing={4}>
        <HStack justify="space-between" align="center">
          <Badge
            colorScheme={statusColors[event.status]}
            px={3}
            py={1}
            borderRadius="full"
            textTransform="capitalize"
          >
            {event.status}
          </Badge>
          <Text color="gray.400" fontSize="sm">
            {formattedDate}
          </Text>
        </HStack>

        <Text
          fontSize="xl"
          fontWeight="bold"
          color="white"
          noOfLines={2}
        >
          {event.title}
        </Text>

        <Text color="gray.400" noOfLines={3}>
          {event.description}
        </Text>

        {event.link && (
          <Link
            href={event.link}
            isExternal
            color={`${statusColors[event.status]}.400`}
            fontWeight="medium"
            display="flex"
            alignItems="center"
            gap={2}
            _hover={{ textDecoration: 'none', color: `${statusColors[event.status]}.300` }}
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
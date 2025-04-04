import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import { Event } from '../types/event';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await apiRequest('/api/events');
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format');
        }

        // Map the data to ensure both id and _id are available
        const mappedEvents = data.map(event => ({
          ...event,
          _id: event._id || event.id, // Use _id if available, fallback to id
          id: event.id || event._id, // Ensure id is also available
        }));

        setEvents(mappedEvents);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch events'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, isLoading, error };
}; 
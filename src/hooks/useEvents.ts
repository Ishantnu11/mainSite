import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiRequest } from '../config/api';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  location?: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

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

        setEvents(data);
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
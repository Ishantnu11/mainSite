import React, { useState } from 'react';
import { EventsSection } from '../components/sections/EventsSection';
import { useEvents } from '../hooks/useEvents';

type EventFilter = 'upcoming' | 'ongoing' | 'past';

const Events = () => {
  const [filter, setFilter] = useState<EventFilter>('upcoming');
  const { events, isLoading, error } = useEvents();

  const filteredEvents = events.filter((event) => event.status === filter);

  return (
    <EventsSection
      title="Community Events"
      subtitle="Join us for exciting tech events, workshops, and meetups. Connect with fellow developers and grow together."
      events={filteredEvents}
      showViewAll={false}
      maxEvents={12}
    />
  );
};

export default Events; 
import React, { useState, useEffect } from 'react';
import { TeamSection } from '../components/sections/TeamSection';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  tags?: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Subham Singh',
    role: 'Tech Lead',
    description: 'Leading technical initiatives and driving innovation at GDG Gurugram University. Passionate about creating impactful tech solutions.',
    avatar: '/subham.png',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
    tags: ['Full Stack', 'React', 'Node.js'],
  },
  {
    id: '2',
    name: 'Keshav',
    role: 'GDG Head',
    description: 'Heading the GDG community and organizing amazing tech events. Dedicated to fostering a vibrant developer ecosystem.',
    avatar: '/keshav.png',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
    tags: ['Community', 'Leadership', 'Events'],
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Event Coordinator',
    description: 'Coordinating workshops, hackathons, and tech talks. Making sure every event is a memorable experience.',
    avatar: '/priya.png',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
    },
    tags: ['Events', 'Workshops', 'Coordination'],
  },
  {
    id: '4',
    name: 'Rahul Kumar',
    role: 'Technical Mentor',
    description: 'Mentoring students in various technologies and helping them grow their technical skills.',
    avatar: '/rahul.png',
    socialLinks: {
      linkedin: '#',
      github: '#',
      website: '#',
    },
    tags: ['Mentoring', 'Python', 'AI/ML'],
  },
];

const Team = () => {
  return (
    <TeamSection
      title="Meet Our Amazing Team"
      subtitle="We make life easier for our community through reliable, affordable, and useful tech innovations"
      members={teamMembers}
    />
  );
};

export default Team;
import React from 'react';
import { TPOSection } from '../components/sections/TPOSection';

const TPO = () => {
  const teamMembers = [
    {
      name: 'Dr. Charu',
      designation: 'Training & Placement Officer & Director Employability',
      email: true,
    },
    {
      name: 'Dr. Rakesh Narang',
      designation: 'Deputy Director Employability',
      email: false,
    },
    {
      name: 'Dr. Neetu Singla',
      designation: 'Deputy Director-I',
      email: false,
    },
    {
      name: 'Dr. Kanchan Yadav',
      designation: 'Deputy Director-II',
      email: false,
    },
    {
      name: 'Mr. Sukhbeer',
      designation: 'Assistant',
      email: false,
    },
    {
      name: 'Sanehal Bansal',
      designation: 'ETPO',
      email: false,
    },
  ];

  return (
    <TPOSection
      title="Training and Placement Office"
      subtitle="Bridging the gap between academia and industry through excellence in training and placement."
      members={teamMembers}
      contactEmail="tpo@gug.ac.in"
    />
  );
};

export default TPO; 
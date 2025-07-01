import { Metadata } from 'next';
import teamMembers from '@/data/teamMembers';
import TeamMemberClient from './TeamMemberClient';
import { TeamMemberPageProps } from './types';

// Dynamically generate metadata for the team member page based on the slug in the URL
export function generateMetadata({ params }: TeamMemberPageProps): Metadata {
  const member = teamMembers.find((m) => m.slug === params.slug);

  // Fallback metadata if no matching team member is found
  if (!member) {
    return {
      title: 'XEQ | Team Member Not Found',
      description: 'The team member you are looking for does not exist.',
    };
  }

  // Dynamic metadata using the team member's information
  return {
    title: `XEQ | ${member.name}`,
    description: `Meet ${member.name}, ${member.role} at the iSee XEQ Team.`,
  };
}

// Server-side component that renders the client-side team member profile
export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  // Extract and normalise the slug from URL parameters
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  // Find the index of the current member
  const index = teamMembers.findIndex((member) => member.slug === slug);
  const member = teamMembers[index];

  // Render fallback if the member was not found
  if (index === -1 || !member) {
    return <div>Member not found</div>;
  }

  // Determine the previous and next team members for navigation
  const prev = teamMembers[(index - 1 + teamMembers.length) % teamMembers.length];
  const next = teamMembers[(index + 1) % teamMembers.length];

  // Render the client-side component with member navigation
  return <TeamMemberClient member={member} prev={prev} next={next} />;
}

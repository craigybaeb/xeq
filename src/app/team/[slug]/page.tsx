import { Metadata } from 'next';
import teamMembers from '@/data/teamMembers';
import TeamMemberClient from './TeamMemberClient';
import { TeamMemberPageProps } from './types';

// Dynamically generate metadata for the team member page based on the slug in the URL
export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { slug : SLUG } = await params;
  const MEMBER = teamMembers.find((m) => m.slug === SLUG);

  // Fallback metadata if no matching team member is found
  if (!MEMBER) {
    return {
      title: 'XEQ | Team Member Not Found',
      description: 'The team member you are looking for does not exist.',
    };
  }

  // Dynamic metadata using the team member's information
  return {
    title: `XEQ | ${MEMBER.name}`,
    description: `Meet ${MEMBER.name}, ${MEMBER.role} at the iSee XEQ Team.`,
  };
}

// Server-side component that renders the client-side team member profile
export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  // Extract and normalise the slug from URL parameters
  const { slug : PARAMS_SLUG } = await params;
  const SLUG = Array.isArray(PARAMS_SLUG) ? PARAMS_SLUG[0] : PARAMS_SLUG;

  // Find the index of the current member
  const INDEX = teamMembers.findIndex((member) => member.slug === SLUG);
  const MEMBER = teamMembers[INDEX];

  // Render fallback if the member was not found
  if (INDEX === -1 || !MEMBER) {
    return <div>Member not found</div>;
  }

  // Determine the previous and next team members for navigation
  const PREVIOUS_MEMBER = teamMembers[(INDEX - 1 + teamMembers.length) % teamMembers.length];
  const NEXT_MEMBER = teamMembers[(INDEX + 1) % teamMembers.length];

  // Render the client-side component with member navigation
  return <TeamMemberClient member={MEMBER} prev={PREVIOUS_MEMBER} next={NEXT_MEMBER} />;
}

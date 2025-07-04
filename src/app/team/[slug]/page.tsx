import { Metadata } from 'next';
import teamMembers from '@/data/teamMembers';
import TeamMemberClient from './TeamMemberClient';
import { TeamMemberPageProps } from './types';

// Dynamically generate metadata for the team member page based on the slug in the URL
export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { slug: SLUG } = await params; // ✅ NO await here
  const MEMBER = teamMembers.find((m) => m.slug === SLUG);

  if (!MEMBER) {
    return {
      title: 'XEQ | Team Member Not Found',
      description: 'The team member you are looking for does not exist.',
    };
  }

  return {
    title: `XEQ | ${MEMBER.name}`,
    description: `Meet ${MEMBER.name}, ${MEMBER.role} at the iSee XEQ Team.`,
  };
}


// Server-side component that renders the client-side team member profile
export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug: PARAMS_SLUG } = await params; 
  const SLUG = Array.isArray(PARAMS_SLUG) ? PARAMS_SLUG[0] : PARAMS_SLUG;

  const INDEX = teamMembers.findIndex((member) => member.slug === SLUG);
  const MEMBER = teamMembers[INDEX];

  if (INDEX === -1 || !MEMBER) {
    return <div>Member not found</div>;
  }

  const PREVIOUS_MEMBER = teamMembers[(INDEX - 1 + teamMembers.length) % teamMembers.length];
  const NEXT_MEMBER = teamMembers[(INDEX + 1) % teamMembers.length];

  return <TeamMemberClient member={MEMBER} prev={PREVIOUS_MEMBER} next={NEXT_MEMBER} />;
}


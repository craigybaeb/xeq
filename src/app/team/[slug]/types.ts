export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    slug: string;
    src: string;
  }
  
  export interface TeamMemberClientProps {
    member: TeamMember;
    prev: TeamMember;
    next: TeamMember;
  }

  export interface TeamMemberPageProps {
    params: Promise<{ slug: string }>;
  }
  
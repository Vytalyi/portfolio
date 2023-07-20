export interface NavProps {
  className?: string;
  items: NavLinkProps[];
}

export interface DropdownProps {
  className?: string;
  item: NavLinkProps;
}

export interface NavLinkProps {
  className?: string;
  url?: string;
  text: string;
  active?: boolean;
  children?: Array<Omit<NavLinkProps, 'className'>>;
  target?: string;
}

export type PageNameType = 'home' | 'case_studies' | 'contacts';

export interface BadgeProps {
  type: 'gray' | 'green' | 'blue';
  text: string;
}

export interface ExperienceProps {
  items: Array<{
    start: number;
    end: number;
    company: string;
    position: string;
    now: boolean;
  }>;
}

export interface CaseStudyCardProps {
  caseStudy: {
    url: string;
    name: string;
    start: Date;
    end: Date;
    size?: string;
    type: string;
    industry?: string;
    location?: string;
    project: string;
    client?: string;
    role: string;
    responsibilities: string;
    skills: string[];
    results: string[];
    images: ImageMetadata[];
  };
}

export interface ImageGalleryProps {
  images: ImageMetadata[];
}

export interface CaseStudyStatsProps {
  stats: Array<[string, string?]>;
}

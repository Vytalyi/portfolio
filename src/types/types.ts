export interface NavProps {
  items: NavLinkProps[];
}

export interface NavLinkProps {
  className?: string;
  url: string;
  text: string;
  active: boolean;
}

export type PageNameType = 'home' | 'case_studies' | 'contacts';

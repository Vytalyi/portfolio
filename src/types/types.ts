export interface NavProps {
    items: Array<NavLinkProps>
}

export interface NavLinkProps {
    className?: string,
    url: string;
    text: string;
    active: boolean;
}

export type PageNameType = 'index' | 'dev'
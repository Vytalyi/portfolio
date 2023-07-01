import type { NavLinkProps } from '../types/types';

export default function NavLink(props: NavLinkProps) {
  return (
    <a
      href={props.url}
      className={`${props.className} ${
        props.active
          ? 'bg-neutral-950 text-white'
          : 'text-gray-300 hover:bg-neutral-950 hover:text-white'
      }`}
      {...(props.active ? { 'aria-current': 'page' } : {})}
    >
      {props.text}
    </a>
  );
}

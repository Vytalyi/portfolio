import type { NavLinkProps } from '../types/types';

export default function NavLink(props: NavLinkProps) {
  return (
    <a
      href={props.url}
      {...(props.target != null ? { target: props.target } : {})}
      className={`${props.className} rounded-md px-3 py-2 font-medium ${
        props.active === true
          ? 'bg-neutral-950 text-white'
          : 'text-gray-300 hover:bg-neutral-950 hover:text-white'
      }`}
      {...(props.active === true ? { 'aria-current': 'page' } : {})}
    >
      {props.text}
    </a>
  );
}

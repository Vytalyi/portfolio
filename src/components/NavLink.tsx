import type { NavLinkProps, NavLinkProps as Props } from '../types/types'

export default function NavLink(props: NavLinkProps) {
  return (
    <a
      href={props.url}
      className={`${props.className} ${
        props.active
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      {...(props.active ? { 'aria-current': 'page' } : {})}
    >
      {props.text}
    </a>
  )
}

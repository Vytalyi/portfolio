import { useState, useEffect, useRef } from 'preact/hooks';
import type { DropdownProps } from '../types/types';
import NavLink from './NavLink';
import IconArrowBottom1 from './icons/IconArrowBottom1';

const Dropdown = (props: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const childrenItems = props.item.children != null ? props.item.children : [];

  function handleDropdownClick(e: Event) {
    if (container.current != null && e.target != null) {
      const isClickOutside = !container.current.contains(e.target as Node);
      if (isClickOutside) {
        setOpen(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDropdownClick);
  });

  return (
    <div ref={container}>
      <button
        data-dropdown-toggle='dropdown'
        className={`text-gray-300 hover:bg-neutral-950 hover:text-white rounded-md px-3 py-2 font-medium text-center inline-flex items-center w-full sm:w-auto ${props.className}`}
        type='button'
        onClick={() => {
          setOpen(!open);
        }}
      >
        {props.item.text} <IconArrowBottom1 />
      </button>
      <div
        className={`z-10 divide-y divide-gray-100 rounded-lg shadow sm:bg-neutral-950 ${
          open ? 'block w-full sm:absolute sm:w-64' : 'hidden'
        }`}
      >
        <ul className='sm:py-2 text-sm text-gray-200'>
          {childrenItems.map((item) => (
            <li
              key={`dropdown-${item.url}`}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <NavLink
                {...item}
                className='block rounded-md px-3 py-2 text-base font-medium text-center sm:text-left'
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;

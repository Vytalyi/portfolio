import { useState } from 'preact/hooks';
import type { NavProps } from '../types/types';
import NavLink from './NavLink';

const Nav = (props: NavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className='bg-gray-800'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={() => {
                setMobileOpen(!mobileOpen);
              }}
            >
              <span className='sr-only'>Open main menu</span>
              {mobileOpen ? <CloseIcon /> : <OpenIcon />}
            </button>
          </div>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex flex-shrink-0 items-center'>
              <Logo className='block h-8 w-auto lg:hidden' />
              <Logo className='hidden h-8 w-auto lg:block' />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-4'>
                {props.items.map((item) => (
                  <NavLink
                    {...item}
                    key={'navLink_' + item.url}
                    className='rounded-md px-3 py-2 text-sm font-medium'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className='sm:hidden' id='mobile-menu'>
          <div className='space-y-1 px-2 pb-3 pt-2'>
            {props.items.map((item) => (
              <NavLink
                {...item}
                key={'navLink_' + item.url}
                className='block rounded-md px-3 py-2 text-base font-medium'
              />
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

const OpenIcon = () => (
  <svg
    className='block h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='1.5'
    stroke='currentColor'
    aria-hidden='true'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
    ></path>
  </svg>
);

const CloseIcon = () => (
  <svg
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='1.5'
    stroke='currentColor'
    aria-hidden='true'
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'></path>
  </svg>
);

const Logo = (props: { className?: string }) => (
  <img
    className={props.className}
    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
    alt='Your Company'
  />
);

export default Nav;

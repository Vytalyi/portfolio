import { useState, useEffect } from 'preact/hooks';
import type { NavProps } from '../types/types';
import NavLink from './NavLink';

const Nav = (props: NavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const onScroll = (e: Event) => {
    setScroll(window.scrollY > 0);
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 duration-300 transition-colors ${
        scroll ? 'bg-black opacity-90' : ''
      }`}
    >
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
              <LogoIcon className='hidden h-8 w-auto lg:block' />
              <LogoIcon className='block h-8 w-auto lg:hidden' />
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

const LogoIcon = (props: { className?: string }) => (
  <svg
    className={`${props.className} icon icon-tabler icon-tabler-swords`}
    width='40'
    height='40'
    viewBox='0 0 24 24'
    strokeWidth='1.00'
    stroke='rgba(1, 1, 1, 1)'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle
      cx='50%'
      cy='50%'
      r='50%'
      stroke='none'
      strokeWidth='0'
      fill='rgba(255, 255, 255, 1)'
    ></circle>
    <g transform='translate(2.40, 2.40) scale(0.8)'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z'></path>
      <path d='M5 13l6 6'></path>
      <path d='M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365'></path>
      <path d='M10 5.5l-2 -2.5h-5v5l3 2.5'></path>
    </g>
  </svg>
);

export default Nav;

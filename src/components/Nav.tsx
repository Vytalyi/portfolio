import { useState, useEffect } from 'preact/hooks';
import type { NavProps } from '../types/types';
import NavLink from './NavLink';
import IconOpenMenu from './icons/IconOpenMenu';
import IconCloseMenu from './icons/IconCloseMenu';
import IconLogo from './icons/IconLogo';

const Nav = (props: NavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const onScroll = (e: Event) => {
    setScroll(window.scrollY > 0);
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    onScroll();
  }, []);

  return (
    <nav
      className={`sticky top-0 duration-300 transition-colors z-10 ${
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
              {mobileOpen ? <IconCloseMenu /> : <IconOpenMenu />}
            </button>
          </div>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex flex-shrink-0 items-center'>
              <IconLogo className='hidden h-8 w-auto lg:block' />
              <IconLogo className='block h-8 w-auto lg:hidden' />
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

export default Nav;

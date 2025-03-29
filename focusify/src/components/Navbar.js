"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaSearch, FaTasks, FaUser } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <header className="w-full py-2 bg-gradient-to-r from-[#1a1a1a] to-[#2c2c2c] text-center fixed top-0 left-0 z-10 shadow-lg">
      <nav>
        <ul className="list-none flex justify-center items-center">
          <li className="inline-block mx-3 md:mx-5">
            <Link href="/" className={`navbar-link flex items-center gap-2 ${pathname === '/' ? 'text-[var(--primary-color)]' : ''}`}>
              <FaHome /> <span className="hidden md:inline">Home</span>
            </Link>
          </li>
          <li className="inline-block mx-3 md:mx-5">
            <Link href="/search" className={`navbar-link flex items-center gap-2 ${pathname === '/search' ? 'text-[var(--primary-color)]' : ''}`}>
              <FaSearch /> <span className="hidden md:inline">Search</span>
            </Link>
          </li>
          <li className="inline-block mx-3 md:mx-5">
            <Link href="/task-tracker" className={`navbar-link flex items-center gap-2 ${pathname === '/task-tracker' ? 'text-[var(--primary-color)]' : ''}`}>
              <FaTasks /> <span className="hidden md:inline">Task Tracker</span>
            </Link>
          </li>
          <li className="absolute right-4">
            <Link href="/profile" className={`navbar-link flex items-center gap-2 ${pathname === '/profile' ? 'text-[var(--primary-color)]' : ''}`}>
              <FaUser /> <span className="hidden md:inline">Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

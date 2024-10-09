// src/components/Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-2" /> {/* Replace with your logo path */}
          </Link>
          <span className="text-xl font-semibold">Chat Wise - Chat with Pegasus Prongs</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition duration-300">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

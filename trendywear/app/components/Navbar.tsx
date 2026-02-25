"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  MdOutlineSearch, 
  MdFavoriteBorder, 
  MdOutlineShoppingCart, 
  MdOutlinePersonOutline 
} from 'react-icons/md';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Products", href: "/products" },
    { label: "New In", href: "/new-in" },
    { label: "Sales", href: "/sales" },
  ];

  const icons = [
    { label: "Search", icon: <MdOutlineSearch size={22} />, href: "#" },
    { label: "Wishlist", icon: <MdFavoriteBorder size={22} />, href: "#" },
    { label: "Cart", icon: <MdOutlineShoppingCart size={22} />, href: "#" },
    { label: "Account", icon: <MdOutlinePersonOutline size={22} />, href: "#" },
  ];

  const iconStyle =
    "p-2 rounded-full border border-[#003049] text-[#003049] hover:bg-[#003049]/10 transition flex items-center justify-center";

  return (
    <nav className="w-full bg-[#f8f9fa] border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center">

        {/* Left Links */}
        <div className="hidden md:flex flex-1 justify-evenly text-[#003049] font-medium text-lg">
          {links.map((link, idx) => (
            <Link key={idx} href={link.href} className="hover:text-black transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <div className="flex-shrink-0 md:px-16 px-2 text-center">
          <Link href="/" className="text-2xl font-bold text-[#C1121F] uppercase">
            Trendy Wear
          </Link>
        </div>

        {/* Right Icons / Hamburger */}
        <div className="flex-1 hidden md:flex justify-evenly items-center">
          {icons.map((item, idx) => (
            <button key={idx} className={iconStyle} aria-label={item.label}>
              {item.icon}
            </button>
          ))}
        </div>

        {/* Hamburger (Mobile Only) */}
        <div className="flex md:hidden ml-auto">
          <button
            className="p-2 text-[#003049] hover:bg-[#003049]/10 rounded transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f8f9fa] border-t border-gray-300">
          <div className="flex flex-col px-4 py-3 space-y-2 font-medium text-sm">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex items-center p-2 hover:bg-[#003049]/10 rounded transition"
              >
                <span>{link.label}</span>
              </Link>
            ))}

            {icons.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center space-x-3 p-2 hover:bg-[#003049]/10 rounded transition"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

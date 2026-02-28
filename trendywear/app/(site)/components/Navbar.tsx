"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter} from 'next/navigation'; 


import { 
  MdOutlineSearch, 
  MdFavoriteBorder, 
  MdOutlineShoppingCart, 
  MdOutlinePersonOutline,
  MdLogout,
} from 'react-icons/md';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useUser } from '../context/UserContext';
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); 
  const router = useRouter();
  const { user, setUser} = useUser();
  const supabase = createClient();

  const links = [
    { label: "Products", href: "/products-page" },
    { label: "New In", href: "/new-in" },
    { label: "Sales", href: "/sales" },
  ];

  const icons = [
    { label: "Search", icon: <MdOutlineSearch size={22} />, href: "#" },
    { label: "Wishlist", icon: <MdFavoriteBorder size={22} />, href: "wishlist" },
    { label: "Cart", icon: <MdOutlineShoppingCart size={22} />, href: "shopping-cart" },
    { label: "Account", icon: <MdOutlinePersonOutline size={22} />, href: "#" },
  ];

  const iconStyle =
    "p-2 rounded-full border border-[#003049] text-[#003049] hover:bg-[#003049]/10 transition flex items-center justify-center";

  const getLinkStyle = (href: string, isIcon = false) => {
    const isActive = pathname === href;
    const base = "transition-all duration-300 flex items-center justify-center rounded-full border border-[#003049]";
    
    if (isActive) {
      return `${base} bg-[#003049] text-white shadow-md ${isIcon ? 'p-2' : 'px-6 py-2 '}`;
    }
    
    return `${base} text-[#003049] border-transparent hover:border-[#003049] hover:bg-[#003049]/5 ${isIcon ? 'p-2' : 'px-6 py-2 font-medium'}`;
  };

  const AccountDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async ()  => {
      await supabase.auth.signOut(); 
      setUser(null); 
      alert("You have been logged out.");
      window.location.href = "/";
    };

    return (
      <div className="relative inline-block">
        <button 
          title='Logout'
          onClick={() => setIsOpen(!isOpen)}
          className={iconStyle}
        >
          <MdOutlinePersonOutline size={22} />
        </button>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 shadow-xl rounded-lg py-1 z-50">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors"
              >
                <MdLogout size={18} />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <nav className="w-full bg-[#f8f9fa] border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center">

        {/* Left Links */}
        <div className="hidden lg:flex flex-1 justify-evenly text-[#003049] font-medium text-lg">
          {links.map((link, idx) => (
            <Link key={idx} href={link.href} className={getLinkStyle(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <div className="flex-shrink-0 lg:px-16 px-2 text-center">
          <Link href="/" className="text-2xl font-bold text-[#C1121F] uppercase">
            Trendy Wear
          </Link>
        </div>

        {/* Right Icons / Hamburger */}
        <div className="flex-1 hidden lg:flex justify-evenly items-center">
          {icons.map((item, idx) => {
              const restricted = ["Wishlist", "Cart", "Account"];
              if (item.label === "Account" && user) {
                return <AccountDropdown key={idx} />;
              }
              return (
                <button
                  key={idx}
                  className={iconStyle}
                  onClick={() => {
                    if (restricted.includes(item.label) && !user) {
                      router.push("/login"); 
                    } else if (item.href && item.label !== "Search") {
                      router.push(item.href); 
                    }                   
                  }}
                >
                  <span>{item.icon}</span>
                </button>
              );
            })}
        </div>

        {/* Hamburger (Mobile Only) */}
        <div className="flex lg:hidden ml-auto">
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
            {icons.map((item, idx) => {
              const restricted = ["Wishlist", "Cart", "Account"];
              if (item.label === "Account" && user) {
                return <AccountDropdown key={idx} />;
              }
              return (
                <button
                  key={idx}
                  className="flex items-center space-x-3 p-2 hover:bg-[#003049]/10 rounded transition"
                  onClick={() => {
                    if (restricted.includes(item.label) && !user) {
                      router.push("/login"); 
                    } else if (item.href && item.label !== "Search") {
                      router.push(item.href); 
                    }                   
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

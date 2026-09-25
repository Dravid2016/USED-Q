import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import ModernSearchBar from './ModernSearchBar';
import LocationPicker from './LocationPicker';
import CategoryFilterMenu from './CategoryFilterMenu';
import { Grid } from 'lucide-react';

interface HeaderProps {
  searchQuery?: string;
  dark?: boolean;
  transparent?: boolean;
  hideSearch?: boolean;
}

export default function Header({ searchQuery = '', dark = false, transparent = false, hideSearch = false }: HeaderProps) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const headerBgClass = transparent
    ? dark
      ? 'bg-transparent text-white border-b border-transparent shadow-none'
      : 'bg-transparent text-[#12151A] border-b border-transparent shadow-none'
    : dark
    ? 'glass-header-dark text-white border-b border-gray-800/80 shadow-xs'
    : 'glass-header border-b border-[#E7E7E3]/80 text-[#12151A] shadow-2xs';

  return (
    <>
      <CategoryFilterMenu
        isOpen={showCategoryMenu}
        onClose={() => setShowCategoryMenu(false)}
      />

      <header className={`sticky top-0 z-50 transition-all duration-300 ${headerBgClass}`}>
        <div className="max-w-[1320px] mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-3.5 h-16">
            {/* Logo Container */}
            <Link
              to="/"
              className={`shrink-0 flex items-center justify-center px-4 md:px-5 py-1.5 rounded-2xl transition-all border ${
                transparent
                  ? 'bg-white/80 backdrop-blur-md hover:bg-white border-[#E7E7E3]/60 shadow-sm'
                  : 'bg-white hover:bg-white/95 border-[#E7E7E3] shadow-md'
              }`}
            >
              <img src={logo} alt="UsedQ — Buy, Sell, Trade" className="h-7 md:h-8 w-auto object-contain" />
            </Link>

            {/* Header Categories Button */}
            <button
              onClick={() => setShowCategoryMenu(true)}
              className={`hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shrink-0 ${
                dark
                  ? 'border-gray-700 bg-white/10 text-white hover:bg-white/20'
                  : 'border-[#E7E7E3] bg-[#F7F7F5] text-[#12151A] hover:border-[#FDB209] hover:bg-white'
              }`}
            >
              <Grid className="w-4 h-4 text-[#FDB209]" />
              <span>Categories ☰</span>
            </button>

            {/* Location Picker */}
            <div className="hidden md:flex items-center shrink-0">
              <LocationPicker dark={dark} />
            </div>

            {/* Right Group: Search Bar + Nav Actions + Sell CTA */}
            <div className="hidden md:flex items-center gap-3 ml-auto shrink-0 flex-1 justify-end max-w-2xl">
              {/* Header Search Bar on the Right */}
              {!hideSearch && (
                <div className="flex-1 max-w-xs lg:max-w-md">
                  <ModernSearchBar initialQuery={searchQuery} dark={dark} variant="header" />
                </div>
              )}

              {/* Nav actions */}
              <nav className="flex items-center gap-1 shrink-0">
                <Link to="/saved" className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full transition-colors ${dark ? 'hover:bg-white/10 text-gray-300 hover:text-white' : 'hover:bg-black/5 text-[#12151A]'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-[11px] font-semibold">Saved</span>
                </Link>
                <Link to="/messages" className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full transition-colors ${dark ? 'hover:bg-white/10 text-gray-300 hover:text-white' : 'hover:bg-black/5 text-[#12151A]'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-[11px] font-semibold">Messages</span>
                  <span className="absolute top-1 right-2 w-4 h-4 bg-[#FDB209] rounded-full text-[9px] font-bold text-[#12151A] flex items-center justify-center shadow-sm">3</span>
                </Link>
                <Link to="/notifications" className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full transition-colors ${dark ? 'hover:bg-white/10 text-gray-300 hover:text-white' : 'hover:bg-black/5 text-[#12151A]'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="text-[11px] font-semibold">Alerts</span>
                  <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center shadow-sm">2</span>
                </Link>
                <Link to="/profile" className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full transition-colors ${dark ? 'hover:bg-white/10 text-gray-300 hover:text-white' : 'hover:bg-black/5 text-[#12151A]'}`}>
                  <div className="w-5 h-5 rounded-full bg-[#12151A] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">A</div>
                  <span className="text-[11px] font-semibold">Profile</span>
                </Link>
              </nav>

              {/* Sell CTA */}
              <Link
                to="/sell"
                className="flex items-center gap-1.5 brand-gradient text-[#12151A] font-extrabold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shrink-0 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Sell
              </Link>
            </div>

            {/* Mobile search icon + category menu */}
            <div className="flex md:hidden items-center gap-2 ml-auto">
              <button
                onClick={() => setShowCategoryMenu(true)}
                className={`p-2 rounded-full ${dark ? 'text-white hover:bg-white/10' : 'text-[#12151A] hover:bg-black/5'}`}
                title="Category Menu"
              >
                <Grid className="w-5 h-5 text-[#FDB209]" />
              </button>
              <Link to="/search" className={`p-2 rounded-full ${dark ? 'text-white hover:bg-white/10' : 'text-[#12151A] hover:bg-black/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              <Link to="/notifications" className={`relative p-2 rounded-full ${dark ? 'text-white hover:bg-white/10' : 'text-[#12151A] hover:bg-black/5'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


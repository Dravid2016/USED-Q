import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, X } from 'lucide-react';

interface ModernSearchBarProps {
  initialQuery?: string;
  dark?: boolean;
  variant?: 'header' | 'hero';
  showLocation?: boolean;
  className?: string;
}

const CITIES = ['All India', 'Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Delhi NCR', 'Pune', 'Coimbatore'];

export default function ModernSearchBar({
  initialQuery = '',
  dark = false,
  variant = 'header',
  showLocation = false,
  className = '',
}: ModernSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [isCityOpen, setIsCityOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const cityParam = showLocation ? `&city=${encodeURIComponent(selectedCity)}` : '';
      navigate(`/search?q=${encodeURIComponent(query.trim())}${cityParam}`);
    }
  };

  const isHero = variant === 'hero';

  return (
    <form
      onSubmit={handleSearch}
      className={`relative flex items-center rounded-full transition-all border ${
        isHero
          ? 'bg-white border border-[#E7E7E3] p-1.5 sm:p-2 shadow-xl hover:shadow-2xl focus-within:border-[#FDB209] focus-within:ring-4 focus-within:ring-[#FDB209]/20'
          : dark
          ? 'bg-white/10 backdrop-blur-md border-white/15 p-1 shadow-lg focus-within:border-[#FDB209]/80 focus-within:bg-white/15'
          : 'bg-white/80 backdrop-blur-md border-[#E7E7E3] p-1 shadow-md focus-within:border-[#FDB209]/80 focus-within:bg-white'
      } ${className}`}
    >
      {/* Location Badge Pill Dropdown - Only if showLocation is true */}
      {showLocation ? (
        <>
          <div ref={dropdownRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsCityOpen(!isCityOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                dark
                  ? 'bg-white/15 backdrop-blur-md text-gray-100 hover:bg-white/25 border border-white/20'
                  : 'bg-[#F7F7F5] text-[#12151A] hover:bg-gray-200/80 border border-gray-200 shadow-2xs'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#FDB209] shrink-0" />
              <span className="truncate max-w-[80px]">{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
            </button>

            {isCityOpen && (
              <div
                className={`absolute top-full left-0 mt-2 w-44 rounded-2xl p-1.5 shadow-2xl border z-50 backdrop-blur-2xl ${
                  dark
                    ? 'bg-[#14171C]/85 border-white/20 text-white'
                    : 'bg-white/95 border-gray-200 text-[#12151A]'
                }`}
              >
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                      selectedCity === city
                        ? 'bg-[#FDB209] text-[#12151A] font-extrabold shadow-sm'
                        : dark
                        ? 'hover:bg-white/15 text-gray-200'
                        : 'hover:bg-black/5 text-[#12151A]'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#12151A]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Segment Divider */}
          <div className={`h-5 w-px mx-2 ${dark ? 'bg-white/20' : 'bg-gray-300/60'}`} />
        </>
      ) : (
        /* Left Search Icon when Location Pill is removed */
        <div className="pl-4 sm:pl-5 pr-2 flex items-center justify-center text-gray-400 shrink-0">
          <Search className="w-5 h-5 stroke-[2.2] text-[#FDB209]" />
        </div>
      )}

      {/* Segment 2: Search Input Field */}
      <div className="flex-1 flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isHero ? 'Search phones, bikes, laptops, electronics...' : 'Search items nearby...'}
          className={`w-full bg-transparent outline-none font-medium placeholder:text-gray-400 ${
            isHero ? 'py-2 px-2 text-base sm:text-lg text-[#12151A]' : 'py-1 px-1 text-sm text-[#12151A]'
          } ${dark ? 'text-white' : 'text-[#12151A]'}`}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1 text-gray-400 hover:text-gray-200 transition-colors mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Segment 3: Circular / Rounded Action Search Button */}
      <button
        type="submit"
        className={`brand-gradient text-[#12151A] font-extrabold rounded-full transition-all flex items-center justify-center shrink-0 shadow-md hover:opacity-95 active:scale-95 ${
          isHero ? 'px-7 py-3 gap-2 text-base' : 'w-9 h-9 md:w-auto md:px-5 md:py-2 gap-1.5 text-xs md:text-sm'
        }`}
      >
        <Search className="w-4 h-4 shrink-0 stroke-[2.5]" />
        <span className={isHero ? 'inline' : 'hidden md:inline'}>Search</span>
      </button>
    </form>
  );
}

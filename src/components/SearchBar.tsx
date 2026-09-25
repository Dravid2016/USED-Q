import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, X, TrendingUp, Sparkles } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  dark?: boolean;
  variant?: 'header' | 'hero' | 'compact';
  className?: string;
}

const POPULAR_SEARCHES = [
  'iPhone 15 Pro',
  'MacBook Air M2',
  'Royal Enfield',
  'Sony PS5 Console',
  'Canon Mirrorless Camera',
  'Aero Gaming Chair',
];

const LOCATIONS = [
  'All India',
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Mumbai',
  'Delhi NCR',
  'Pune',
  'Coimbatore',
];

export default function SearchBar({
  initialQuery = '',
  dark = false,
  variant = 'header',
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState('Chennai');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const searchTerm = typeof e === 'string' ? e : query;
    if (searchTerm.trim()) {
      setIsOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}&location=${encodeURIComponent(location)}`);
    }
  };

  const isHero = variant === 'hero';
  const isCompact = variant === 'compact';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form
        onSubmit={handleSearch}
        className={`flex items-center gap-1.5 rounded-full transition-all shadow-md focus-within:ring-2 focus-within:ring-[#FDB209]/70 focus-within:shadow-lg ${
          isHero
            ? 'p-2 md:p-2.5 bg-[#16191E] border border-white/10 text-white'
            : isCompact
            ? 'p-1 bg-[#F7F7F5] border border-[#E7E7E3] text-[#12151A]'
            : dark
            ? 'p-1 bg-[#16191E] border border-white/10 text-white'
            : 'p-1 bg-[#F7F7F5] border border-[#E7E7E3] text-[#12151A]'
        }`}
      >
        {/* Search Icon */}
        <div className={`flex items-center pl-3.5 ${isHero ? 'pl-4' : ''}`}>
          <Search className={`w-4 h-4 md:w-5 md:h-5 ${dark || isHero ? 'text-gray-400' : 'text-gray-400'}`} />
        </div>

        {/* Text Input */}
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          placeholder={isHero ? 'Search iPhones, Laptops, Motorcycles...' : 'What are you looking for?'}
          className={`flex-1 bg-transparent outline-none font-medium placeholder:text-gray-400 ${
            isHero ? 'py-2 px-3 text-base text-white' : 'py-1.5 px-2.5 text-sm'
          } ${dark || isHero ? 'text-white' : 'text-[#12151A]'}`}
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className={`p-1 rounded-full hover:bg-black/10 transition-colors mr-1 ${
              dark || isHero ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Divider */}
        <div className={`h-5 w-px ${dark || isHero ? 'bg-gray-700/60' : 'bg-[#E7E7E3]'}`} />

        {/* Location Selector */}
        <div className="hidden sm:flex items-center gap-1 px-2 shrink-0">
          <MapPin className={`w-3.5 h-3.5 ${dark || isHero ? 'text-[#FDB209]' : 'text-[#FDB209]'}`} />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`bg-transparent text-xs lg:text-sm font-semibold outline-none cursor-pointer border-none ${
              dark || isHero
                ? 'text-gray-300 [&>option]:bg-[#16191E] [&>option]:text-white'
                : 'text-gray-600 [&>option]:bg-white [&>option]:text-[#12151A]'
            }`}
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`brand-gradient text-[#12151A] font-extrabold rounded-full hover:opacity-95 transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
            isHero ? 'px-6 md:px-8 py-3 text-base' : 'px-4 lg:px-6 py-2 text-xs lg:text-sm'
          }`}
        >
          {isHero && <Sparkles className="w-4 h-4 shrink-0" />}
          <span>Search</span>
        </button>
      </form>

      {/* Autocomplete / Popular Searches Dropdown */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden z-50 transition-all border ${
            dark || isHero
              ? 'bg-[#181B20]/95 backdrop-blur-xl border-white/10 text-white'
              : 'bg-white/95 backdrop-blur-xl border-[#E7E7E3] text-[#12151A]'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-[#FDB209]" />
              <span>Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setQuery(item);
                    handleSearch(item);
                  }}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    dark || isHero
                      ? 'bg-white/10 hover:bg-[#FDB209] hover:text-[#12151A]'
                      : 'bg-[#F7F7F5] hover:bg-[#FDB209] hover:text-[#12151A] border border-[#E7E7E3]'
                  }`}
                >
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

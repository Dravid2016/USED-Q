import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface ModernSearchBarProps {
  initialQuery?: string;
  dark?: boolean;
  variant?: 'header' | 'hero';
  showLocation?: boolean;
  className?: string;
}

export default function ModernSearchBar({
  initialQuery = '',
  dark = false,
  variant = 'header',
  className = '',
}: ModernSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
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
      {/* Segment 2: Search Input Field */}
      <div className="flex-1 flex items-center pl-3 sm:pl-4">
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

      {/* Segment 3: Action Search Button */}
      <button
        type="submit"
        className={`brand-gradient text-[#12151A] font-extrabold rounded-full transition-all flex items-center justify-center shrink-0 shadow-md hover:opacity-95 active:scale-95 ${
          isHero ? 'px-7 py-3 text-base' : 'px-4 py-2 text-xs md:text-sm'
        }`}
      >
        <span>Search</span>
      </button>
    </form>
  );
}

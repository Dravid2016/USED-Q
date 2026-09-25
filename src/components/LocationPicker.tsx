import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Navigation, Check } from 'lucide-react';

interface LocationPickerProps {
  dark?: boolean;
  className?: string;
}

const POPULAR_CITIES = [
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Mumbai',
  'Delhi NCR',
  'Pune',
  'Coimbatore',
  'Kolkata',
  'Ahmedabad',
];

export default function LocationPicker({ dark = false, className = '' }: LocationPickerProps) {
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative shrink-0 ${className}`}>
      {/* Location Button Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs md:text-sm font-bold transition-all shadow-sm ${
          dark
            ? 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/15'
            : 'bg-white text-[#12151A] hover:bg-[#F7F7F5] border border-[#E7E7E3]'
        }`}
      >
        <MapPin className="w-4 h-4 text-[#FDB209] shrink-0" />
        <span className="truncate max-w-[90px] md:max-w-[110px]">{selectedCity}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      </button>

      {/* City Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 w-56 rounded-2xl p-2 shadow-2xl border z-50 backdrop-blur-2xl transition-all ${
            dark
              ? 'bg-[#14171C]/90 border-white/20 text-white'
              : 'bg-white/95 border-[#E7E7E3] text-[#12151A]'
          }`}
        >
          {/* GPS Auto Detect */}
          <button
            type="button"
            onClick={() => {
              setSelectedCity('Chennai (Current)');
              setIsOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#FDB209] bg-[#FDB209]/10 hover:bg-[#FDB209]/20 transition-colors flex items-center gap-2 mb-2"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Use Current Location</span>
          </button>

          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-1">
            Popular Cities
          </div>

          <div className="max-h-56 overflow-y-auto space-y-0.5">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setSelectedCity(city);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  selectedCity === city
                    ? 'bg-[#FDB209] text-[#12151A] font-extrabold'
                    : dark
                    ? 'hover:bg-white/15 text-gray-200'
                    : 'hover:bg-[#F7F7F5] text-[#12151A]'
                }`}
              >
                <span>{city}</span>
                {selectedCity === city && <Check className="w-3.5 h-3.5 text-[#12151A]" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

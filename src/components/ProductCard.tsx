import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Listing } from '../data/mockData';
import { formatPrice } from '../data/mockData';

import { Package } from 'lucide-react';

interface ProductCardProps {
  listing: Listing;
  onSave?: (id: string) => void;
  dark?: boolean;
}

const conditionColorLight = {
  'Like New': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Excellent': 'bg-blue-50 text-blue-700 border border-blue-200',
  'Good': 'bg-[#FDB209]/10 text-[#E98B00] border border-[#FDB209]/30',
  'Fair': 'bg-gray-100 text-gray-600 border border-gray-200',
};

const conditionColorDark = {
  'Like New': 'bg-emerald-500/20 text-emerald-300',
  'Excellent': 'bg-blue-500/20 text-blue-300',
  'Good': 'bg-[#FDB209]/20 text-[#FDB209]',
  'Fair': 'bg-gray-500/20 text-gray-300',
};

export default function ProductCard({ listing, onSave, dark = false }: ProductCardProps) {
  const [saved, setSaved] = useState(listing.saved);
  const [imgError, setImgError] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setSaved(s => !s);
    onSave?.(listing.id);
  };

  const hasImage = listing.images.length > 0 && !imgError;

  return (
    <Link
      to={`/listing/${listing.id}`}
      className={`group rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1 ${
        dark
          ? 'bg-[#14171C] hover:bg-[#1E222A] hover:shadow-2xl'
          : 'bg-white border border-[#E7E7E3] hover:shadow-md hover:border-[#FDB209]/50'
      }`}
    >
      {/* Image */}
      <div className={`relative aspect-[4/3] overflow-hidden ${dark ? 'bg-black/50' : 'bg-[#F7F7F5]'}`}>
        {hasImage ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className={`w-10 h-10 ${dark ? 'text-gray-500' : 'text-gray-300'}`} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
          {listing.featured && (
            <span className="brand-gradient text-[#12151A] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
              Featured
            </span>
          )}
          {listing.sold && (
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${dark ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'}`}>
              Sold
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            saved
              ? 'brand-gradient text-[#12151A] shadow-md'
              : dark
              ? 'bg-black/60 text-white hover:bg-[#FDB209] hover:text-[#12151A]'
              : 'bg-white/90 text-gray-500 hover:bg-white shadow-sm'
          }`}
        >
          <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Image count */}
        {listing.images.length > 1 && (
          <div className={`absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-medium ${dark ? 'bg-black/70 text-white' : 'bg-black/50 text-white'}`}>
            1/{listing.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        {/* Price */}
        <div className={`text-xl font-black tracking-tight ${dark ? 'brand-gradient-text' : 'text-[#12151A]'}`}>{formatPrice(listing.price)}</div>

        {/* Title */}
        <div className={`text-sm font-semibold line-clamp-2 leading-snug transition-colors ${dark ? 'text-white group-hover:text-[#FDB209]' : 'text-[#12151A] group-hover:text-[#FDB209]'}`}>{listing.title}</div>

        {/* Condition */}
        <span className={`self-start text-[10px] font-bold px-2.5 py-0.5 rounded-full ${dark ? conditionColorDark[listing.condition] : conditionColorLight[listing.condition]}`}>
          {listing.condition}
        </span>

        {/* Meta */}
        <div className={`mt-auto flex items-center justify-between text-[11px] pt-2 border-t ${dark ? 'text-gray-400 border-gray-800/60' : 'text-gray-500 border-[#E7E7E3]/60'}`}>
          <div className="flex items-center gap-1 truncate">
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="truncate">{listing.area}, {listing.location}</span>
          </div>
          <span className="shrink-0">{listing.postedAt}</span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E7E7E3] overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-[#F7F7F5]" />
      <div className="p-3.5 flex flex-col gap-2">
        <div className="h-5 bg-[#F7F7F5] rounded-full w-1/2" />
        <div className="h-4 bg-[#F7F7F5] rounded-full w-3/4" />
        <div className="h-4 bg-[#F7F7F5] rounded-full w-2/3" />
        <div className="h-3 bg-[#F7F7F5] rounded-full w-1/3 mt-2" />
      </div>
    </div>
  );
}

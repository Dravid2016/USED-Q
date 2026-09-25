import { useState } from 'react';
import { Link } from 'react-router-dom';
import { myListings, formatPrice } from '../data/mockData';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { ClipboardList, Package, Eye, Heart, MessageSquare } from 'lucide-react';

type Status = 'ALL' | 'ACTIVE' | 'DRAFT' | 'SOLD' | 'EXPIRED';

const statusConfig: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: 'Active', color: 'text-emerald-600 bg-emerald-50' },
  DRAFT: { label: 'Draft', color: 'text-gray-600 bg-gray-100' },
  SOLD: { label: 'Sold', color: 'text-gray-500 bg-gray-100' },
  EXPIRED: { label: 'Expired', color: 'text-red-500 bg-red-50' },
  PENDING_REVIEW: { label: 'Under Review', color: 'text-amber-600 bg-amber-50' },
};

export default function MyListings() {
  const [tab, setTab] = useState<Status>('ALL');

  const tabs: Status[] = ['ALL', 'ACTIVE', 'DRAFT', 'SOLD', 'EXPIRED'];
  const filtered = tab === 'ALL' ? myListings : myListings.filter(l => l.status === tab);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-6 pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-[#12151A]">My Listings</h1>
          <Link to="/sell" className="flex items-center gap-1.5 brand-gradient text-[#12151A] font-bold text-sm px-4 py-2.5 rounded-xl">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Post Listing
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 border-b border-[#E7E7E3] overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium shrink-0 border-b-2 transition-colors ${tab === t ? 'border-[#FDB209] text-[#12151A]' : 'border-transparent text-gray-500 hover:text-[#12151A]'}`}
            >
              {t === 'ALL' ? 'All' : t.charAt(0) + t.slice(1).toLowerCase()}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${tab === t ? 'brand-gradient text-[#12151A]' : 'bg-[#F7F7F5] text-gray-500'}`}>
                {t === 'ALL' ? myListings.length : myListings.filter(l => l.status === t).length}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-[#12151A] mb-1">No listings here</h3>
            <p className="text-sm text-gray-500 mb-5">Your {tab.toLowerCase()} listings will appear here.</p>
            <Link to="/sell" className="inline-block brand-gradient text-[#12151A] font-bold px-5 py-3 rounded-xl">Post a Listing</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(listing => {
              const sc = statusConfig[listing.status];
              return (
                <div key={listing.id} className="flex gap-4 bg-white border border-[#E7E7E3] rounded-2xl p-4 hover:shadow-sm transition-shadow">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F7F7F5] shrink-0">
                    {listing.images[0] ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[#12151A] text-sm line-clamp-1">{listing.title}</p>
                        <p className="text-lg font-extrabold text-[#12151A]">{formatPrice(listing.price)}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${sc.color}`}>{sc.label}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1.5">
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-gray-400" /> {listing.views}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {listing.favorites}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-blue-500" /> {listing.enquiries}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1.5 shrink-0">
                    {listing.status === 'ACTIVE' && (
                      <>
                        <Link to={`/listing/${listing.id}`} className="text-xs font-medium text-[#12151A] border border-[#E7E7E3] px-3 py-1.5 rounded-lg hover:bg-[#F7F7F5] text-center">
                          Preview
                        </Link>
                        <button className="text-xs font-medium text-gray-600 border border-[#E7E7E3] px-3 py-1.5 rounded-lg hover:bg-[#F7F7F5]">
                          Mark Sold
                        </button>
                        <button className="text-xs font-medium text-[#FDB209] border border-[#FDB209]/40 px-3 py-1.5 rounded-lg hover:bg-[#FDB209]/5">
                          Edit
                        </button>
                      </>
                    )}
                    {listing.status === 'DRAFT' && (
                      <>
                        <button className="text-xs font-medium brand-gradient text-[#12151A] px-3 py-1.5 rounded-lg">
                          Publish
                        </button>
                        <button className="text-xs font-medium text-gray-600 border border-[#E7E7E3] px-3 py-1.5 rounded-lg hover:bg-[#F7F7F5]">
                          Edit
                        </button>
                      </>
                    )}
                    {listing.status === 'SOLD' && (
                      <Link to={`/listing/${listing.id}`} className="text-xs font-medium text-gray-600 border border-[#E7E7E3] px-3 py-1.5 rounded-lg hover:bg-[#F7F7F5] text-center">
                        View
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

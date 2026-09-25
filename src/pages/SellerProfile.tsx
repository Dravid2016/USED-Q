import { useParams, Link } from 'react-router-dom';
import { sellers, listings, formatPrice } from '../data/mockData';
import { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { Star, MapPin } from 'lucide-react';

export default function SellerProfile() {
  const { id } = useParams();
  const seller = sellers.find(s => s.id === id) || sellers[0];
  const sellerListings = listings.filter(l => l.seller.id === seller.id);
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-6 pb-24 md:pb-8">
        {/* Seller card */}
        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#F7F7F5] shrink-0">
              {seller.avatar ? (
                <img src={seller.avatar} alt={seller.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-3xl">{seller.name[0]}</div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#12151A]">{seller.name}</h1>
                {seller.verified && (
                  <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-full">✓ Verified</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex text-amber-500">
                  {Array.from({ length: Math.round(seller.rating) }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{seller.rating} · {seller.reviewCount} reviews</span>
              </div>
              <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{seller.location} · Member since {seller.memberSince}</span>
              </div>
              <div className="text-sm text-gray-500">{seller.responseTime}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#E7E7E3]">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-[#12151A]">{seller.activeListings}</div>
              <div className="text-xs text-gray-500">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-[#12151A]">{seller.soldListings}</div>
              <div className="text-xs text-gray-500">Items Sold</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-5">
            <Link
              to={`/messages?seller=${seller.id}`}
              className="flex-1 brand-gradient text-[#12151A] font-bold py-3 rounded-xl text-center text-sm hover:opacity-90"
            >
              Contact Seller
            </Link>
            <button
              onClick={() => setShowReport(true)}
              className="flex-1 border border-[#E7E7E3] text-gray-600 font-semibold py-3 rounded-xl text-sm hover:bg-[#F7F7F5]"
            >
              Report User
            </button>
          </div>
        </div>

        {/* Seller listings */}
        <h2 className="text-lg font-bold text-[#12151A] mb-4">Listings by {seller.name}</h2>
        {sellerListings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No active listings</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sellerListings.map(l => <ProductCard key={l.id} listing={l} />)}
          </div>
        )}
      </div>

      {showReport && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-white rounded-t-3xl md:rounded-3xl p-6 w-full max-w-md">
            <h2 className="font-bold text-[#12151A] text-lg mb-4">Report User</h2>
            <div className="space-y-2 mb-5">
              {['Suspicious behaviour', 'Fake account', 'Harassment', 'Scam', 'Other'].map(r => (
                <label key={r} className="flex items-center gap-3 p-3 border border-[#E7E7E3] rounded-xl cursor-pointer hover:bg-[#F7F7F5]">
                  <input type="radio" name="report" className="accent-[#FDB209]" />
                  <span className="text-sm">{r}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowReport(false)} className="flex-1 border border-[#E7E7E3] text-gray-600 font-semibold py-3 rounded-xl">Cancel</button>
              <button onClick={() => setShowReport(false)} className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600">Submit</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { listings } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Heart } from 'lucide-react';

export default function Saved() {
  const [saved, setSaved] = useState(listings.filter(l => l.saved));

  const remove = (id: string) => setSaved(s => s.filter(l => l.id !== id));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-6 pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-[#12151A]">Saved Listings</h1>
          {saved.length > 0 && <span className="text-sm text-gray-500">{saved.length} items</span>}
        </div>

        {saved.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-5" />
            <h2 className="text-xl font-bold text-[#12151A] mb-2">Nothing saved yet</h2>
            <p className="text-gray-500 mb-6 text-sm">Tap the heart icon on any listing to save it here for later.</p>
            <Link to="/search" className="inline-block brand-gradient text-[#12151A] font-bold px-6 py-3 rounded-xl hover:opacity-90">
              Explore Listings
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {saved.map(l => <ProductCard key={l.id} listing={{ ...l, saved: true }} onSave={() => remove(l.id)} />)}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

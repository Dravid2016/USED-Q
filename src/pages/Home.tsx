import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listings, categories } from '../data/mockData';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import CategoryIcon from '../components/CategoryIcon';
import { ShieldCheck, CheckCircle2, Flag, Users } from 'lucide-react';

import ModernSearchBar from '../components/ModernSearchBar';
import uqMark from '../assets/uq-logo-mark.png';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const recommended = listings.slice(0, 4);
  const recent = listings.slice(2, 8);
  const nearby = listings.slice(4, 8);

  return (
    <div className="min-h-screen bg-white text-[#12151A] flex flex-col font-sans">
      {/* HERO & HEADER CONTAINER - RICH BRAND GRADIENT SHADES & CENTERED ALIGNMENT */}
      <div className="relative bg-gradient-to-br from-[#FFFCE8] via-[#FFF3D1] to-[#FCEEC7] text-[#12151A] overflow-hidden flex flex-col border-b border-[#FDB209]/30 min-h-[calc(100vh-64px)] justify-between">
        {/* Rich Multi-Layered Brand Gradient Shades & Glow Accents */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          {/* Radiant Top-Center Sunburst Glow */}
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-[radial-gradient(ellipse_at_top,rgba(253,178,9,0.45),transparent_65%)] pointer-events-none" />
          
          {/* Top-Left Vibrant Amber Bloom */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-[#FDB209]/30 via-[#E98B00]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          {/* Bottom-Right Golden Sunrise Glow */}
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-[#FDB209]/35 via-[#FFBE24]/25 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          {/* Center Subtle Golden Focus Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FDB209]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Micro-Dot Brand Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#FDB209_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        </div>

        {/* Top Header */}
        <div className="relative z-10">
          <Header transparent hideSearch />
        </div>

        {/* Hero Content Section - Perfectly Centered in First Slide */}
        <section className="relative z-10 flex-1 flex flex-col justify-center items-center py-10 sm:py-14 lg:py-16">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
              
              {/* Centered Logo Emblem & Brand Text */}
              <div 
                className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 cursor-pointer group transition-transform duration-300 hover:scale-105" 
                onClick={() => navigate('/')}
              >
                <img
                  src={uqMark}
                  alt="USED Q Logo Emblem"
                  className="h-20 sm:h-28 md:h-32 w-auto object-contain drop-shadow-sm"
                />
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#12151A] leading-none">
                    USED <span className="text-[#FDB209]">Q</span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
                    E-Commerce Marketplace
                  </span>
                </div>
              </div>

              {/* Marketplace Badge */}
              <div className="inline-flex items-center gap-1.5 brand-gradient text-[#12151A] text-[11px] sm:text-xs font-black px-4.5 py-1.5 rounded-full mb-6 shadow-sm tracking-wider uppercase border border-[#FDB209]/40">
                <span>India's Premier Verified Marketplace</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-4 tracking-tight text-[#12151A]">
                Buy Used. <span className="brand-gradient-text">Sell Smart.</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto font-medium leading-relaxed">
                Find great verified products nearby or sell pre-owned items instantly.
              </p>

              {/* Hero Search Bar Component */}
              <div className="w-full max-w-2xl mx-auto">
                <ModernSearchBar initialQuery={searchQuery} variant="hero" showLocation={true} />
              </div>

              {/* Quick Filter Pill Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-7 justify-center items-center">
                <span className="text-xs font-semibold text-gray-400 mr-1 hidden sm:inline">Popular Searches:</span>
                {['iPhones', 'Laptops', 'Motorcycles', 'Cameras', 'Tablets'].map(q => (
                  <button
                    key={q}
                    onClick={() => navigate(`/search?q=${q}`)}
                    className="text-xs font-bold text-[#12151A] bg-[#F7F7F5] border border-[#E7E7E3] rounded-full px-4 py-1.5 hover:bg-[#FDB209] hover:border-[#FDB209] hover:text-[#12151A] transition-all shadow-2xs"
                  >
                    {q}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* Stats Bar - Perfectly Balanced Grid Alignment */}
      <div className="border-b border-[#E7E7E3] bg-[#F7F7F5] py-5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-x-0 md:divide-x divide-[#E7E7E3]">
            {[
              { label: 'Active Listings', value: '14,000+' },
              { label: 'Cities Covered', value: '50+' },
              { label: 'Happy Sellers', value: '8,400+' },
              { label: 'Deals Closed', value: '32,000+' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center justify-center p-2">
                <div className="text-2xl sm:text-3xl font-black text-[#FDB209] tracking-tight">{stat.value}</div>
                <div className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body Content */}
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-16 w-full flex-1">
        {/* Popular Categories */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#12151A] tracking-tight">Popular Categories</h2>
              <p className="text-xs sm:text-sm text-gray-500">Explore products by category</p>
            </div>
            <Link to="/categories" className="text-xs sm:text-sm font-bold text-[#FDB209] hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-3">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/search?category=${cat.id}`}
                className="flex flex-col items-center gap-2 group p-3 rounded-2xl bg-[#F7F7F5] border border-[#E7E7E3] hover:border-[#FDB209] hover:bg-[#FDB209]/10 transition-all duration-200 shadow-2xs hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-gray-700 group-hover:text-[#FDB209] transition-colors shadow-2xs">
                  <CategoryIcon id={cat.id} className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-[#12151A] text-center leading-tight truncate w-full">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommended For You */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#12151A] tracking-tight">Recommended For You</h2>
              <p className="text-xs sm:text-sm text-gray-500">Handpicked items based on your browsing</p>
            </div>
            <Link to="/search" className="text-xs sm:text-sm font-bold text-[#FDB209] hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array(4).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
              : recommended.map(l => <ProductCard key={l.id} listing={l} />)
            }
          </div>
        </section>

        {/* Recently Added */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#12151A] tracking-tight">Recently Added</h2>
              <p className="text-xs sm:text-sm text-gray-500">Fresh listings just posted</p>
            </div>
            <Link to="/search?sort=newest" className="text-xs sm:text-sm font-bold text-[#FDB209] hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {recent.map(l => <ProductCard key={l.id} listing={l} />)}
          </div>
        </section>

        {/* Sell CTA Banner */}
        <section className="mt-16 bg-[#12151A] text-white rounded-3xl overflow-hidden relative shadow-xl p-6 sm:p-10 border border-white/10">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FDB209]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#FDB209]/15 rounded-full blur-3xl" />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
                Got something to sell?
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Post your listing in minutes and reach thousands of buyers near you — completely free.
              </p>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 brand-gradient text-[#12151A] font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full hover:opacity-95 transition-opacity shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Start Selling Now
              </Link>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 text-center justify-center w-full lg:w-auto">
              {[['Free', 'Always free to post'], ['Fast', 'Live in minutes'], ['Local', 'Reach nearby buyers']].map(([t, s]) => (
                <div key={t} className="bg-white/10 backdrop-blur-xs rounded-2xl px-5 py-4 flex-1 sm:flex-initial min-w-[110px]">
                  <div className="text-xl sm:text-2xl font-black brand-gradient-text">{t}</div>
                  <div className="text-[11px] text-gray-400 mt-1 font-medium">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Near You */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#12151A] tracking-tight">Popular Near You</h2>
              <p className="text-xs sm:text-sm text-gray-500">Chennai & nearby areas</p>
            </div>
            <Link to="/search?near=true" className="text-xs sm:text-sm font-bold text-[#FDB209] hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {nearby.map(l => <ProductCard key={l.id} listing={l} />)}
          </div>
        </section>

        {/* Trust & Safety Cards */}
        <section className="mt-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#12151A] tracking-tight">Trust & Safety First</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">We build features to keep your buying and selling experience secure</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: CheckCircle2, title: 'Verified Users', desc: 'Profile verification builds trust between buyers and sellers.', color: 'text-emerald-600 bg-emerald-50' },
              { icon: ShieldCheck, title: 'Safe Communication', desc: 'Chat within the platform. Never share personal contact directly.', color: 'text-blue-600 bg-blue-50' },
              { icon: Flag, title: 'Report Listings', desc: 'Flag suspicious listings or sellers and we\'ll review quickly.', color: 'text-amber-600 bg-amber-50' },
              { icon: Users, title: 'Community Guidelines', desc: 'Fair, respectful marketplace for everyone. No fraud tolerated.', color: 'text-purple-600 bg-purple-50' },
            ].map(item => {
              const IconComponent = item.icon;
              return (
                <div key={item.title} className="bg-[#F7F7F5] border border-[#E7E7E3] rounded-2xl p-5 text-center flex flex-col items-center hover:shadow-sm transition-shadow">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3.5 ${item.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#12151A] text-sm mb-1.5">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer & Bottom Navigation */}
      <Footer />
      <BottomNav />
    </div>
  );
}

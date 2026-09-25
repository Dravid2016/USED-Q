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
import Silk from '../components/Silk';
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
    <div className="min-h-screen bg-white text-[#12151A] flex flex-col">
      {/* HERO & HEADER CONTAINER WITH REACT BITS SILK BACKGROUND (WHITE & GOLDEN THEME) */}
      <div className="relative bg-[#FAFAF7] text-[#12151A] overflow-hidden min-h-[520px] flex flex-col border-b border-[#E7E7E3]">
        {/* React Bits Silk WebGL Canvas - Covers Header & Hero */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <Silk
            speed={3}
            scale={1.2}
            color="#FDB209"
            noiseIntensity={1.2}
            rotation={0}
            lightMode={true}
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FAFAF7]/20 via-transparent to-[#FAFAF7]/80" />
        </div>

        {/* Fully Transparent Header floating directly over Beams Canvas */}
        <div className="relative z-10">
          <Header transparent />
        </div>

        {/* Hero Content */}
        <section className="relative z-10 flex-1 flex items-center justify-center py-10 md:py-14">
          <div className="max-w-[1320px] mx-auto px-4 lg:px-6 w-full flex flex-col items-center text-center">
            <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
              {/* UQ Logo Emblem (Landing Page Center Top — Transparent & Scaled) */}
              <div className="mb-6 flex items-center justify-center cursor-pointer group" onClick={() => navigate('/')}>
                <img
                  src={uqMark}
                  alt="USED Q Logo"
                  className="h-32 md:h-44 lg:h-52 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Badge */}
              <div className="inline-block brand-gradient text-[#12151A] text-xs font-black px-4 py-1.5 rounded-full mb-6 shadow-md tracking-wide uppercase border border-[#FDB209]/40">
                India's Modern Re-Commerce Marketplace
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-5 tracking-tight drop-shadow-sm text-[#12151A]">
                Buy Used. <span className="brand-gradient-text">Sell Smart.</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-lg mx-auto font-medium leading-relaxed">
                Find great verified products nearby or sell items you no longer need.
              </p>

              {/* Hero ModernSearchBar Component */}
              <div className="w-full max-w-xl mx-auto">
                <ModernSearchBar initialQuery={searchQuery} variant="hero" />
              </div>

              {/* Quick Filter Pill Buttons */}
              <div className="flex flex-wrap gap-2.5 mt-7 justify-center">
                {['iPhones', 'Laptops', 'Motorcycles', 'Cameras'].map(q => (
                  <button
                    key={q}
                    onClick={() => navigate(`/search?q=${q}`)}
                    className="text-xs font-bold text-[#12151A] bg-white border border-[#E7E7E3] rounded-full px-4.5 py-2 hover:bg-[#FDB209] hover:border-[#FDB209] hover:text-[#12151A] transition-all shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Stats Bar - Clean Light Mode Background */}
      <div className="border-y border-[#E7E7E3] bg-[#F7F7F5] py-4">
        <div className="max-w-[1320px] mx-auto px-4 lg:px-6 flex justify-around gap-6 overflow-x-auto text-center">
          {[
            { label: 'Active Listings', value: '14,000+' },
            { label: 'Cities Covered', value: '50+' },
            { label: 'Happy Sellers', value: '8,400+' },
            { label: 'Deals Closed', value: '32,000+' },
          ].map(stat => (
            <div key={stat.label} className="shrink-0 px-4">
              <div className="text-2xl font-black text-[#FDB209] tracking-tight">{stat.value}</div>
              <div className="text-xs font-medium text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Body Content - Clean Light Background for Perfect Product Card Contrast */}
      <main className="max-w-[1320px] mx-auto px-4 lg:px-6 pb-24 md:pb-16 w-full flex-1">
        {/* Categories */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#12151A] tracking-tight">Popular Categories</h2>
            <Link to="/categories" className="text-sm font-semibold text-[#FDB209] hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/search?category=${cat.id}`}
                className="flex flex-col items-center gap-2.5 group p-3 rounded-2xl bg-[#F7F7F5] border border-[#E7E7E3] hover:border-[#FDB209] hover:bg-[#FDB209]/10 transition-all duration-200 shadow-sm hover:-translate-y-1"
              >
                <div className="w-12 h-12 md:w-13 md:h-13 bg-white rounded-full flex items-center justify-center text-gray-700 group-hover:text-[#FDB209] transition-colors shadow-sm">
                  <CategoryIcon id={cat.id} className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-[10px] md:text-xs font-semibold text-[#12151A] text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommended For You */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#12151A] tracking-tight">Recommended For You</h2>
              <p className="text-sm text-gray-500">Handpicked items based on your browsing</p>
            </div>
            <Link to="/search" className="text-sm font-semibold text-[#FDB209] hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <h2 className="text-2xl font-bold text-[#12151A] tracking-tight">Recently Added</h2>
              <p className="text-sm text-gray-500">Fresh listings just posted</p>
            </div>
            <Link to="/search?sort=newest" className="text-sm font-semibold text-[#FDB209] hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {recent.map(l => <ProductCard key={l.id} listing={l} />)}
          </div>
        </section>

        {/* Sell CTA Banner with React Silk Animation in Used Q color palette */}
        <section className="mt-16 bg-[#12151A] text-white rounded-3xl overflow-hidden relative shadow-xl p-8 md:p-10 border border-white/10">
          {/* React Silk WebGL Canvas Background */}
          <Silk color="#FDB209" speed={0.8} noiseIntensity={1.2} />

          <div className="relative flex flex-col md:flex-row items-center gap-8 z-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
                Got something to sell?
              </h2>
              <p className="text-gray-400 text-base mb-6 max-w-lg leading-relaxed">
                Post your listing in minutes and reach thousands of buyers near you — completely free.
              </p>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 brand-gradient text-[#12151A] font-extrabold text-base px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Start Selling Now
              </Link>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4 text-center justify-center">
              {[['Free', 'Always free to post'], ['Fast', 'Live in minutes'], ['Local', 'Reach nearby buyers']].map(([t, s]) => (
                <div key={t} className="bg-white/10 rounded-2xl px-5 py-4 min-w-[110px]">
                  <div className="text-2xl font-black brand-gradient-text">{t}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Near You */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#12151A] tracking-tight">Popular Near You</h2>
              <p className="text-sm text-gray-500">Chennai & nearby areas</p>
            </div>
            <Link to="/search?near=true" className="text-sm font-semibold text-[#FDB209] hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearby.map(l => <ProductCard key={l.id} listing={l} />)}
          </div>
        </section>

        {/* Trust & Safety Cards */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[#12151A] mb-8 text-center tracking-tight">Trust & Safety</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: CheckCircle2, title: 'Verified Users', desc: 'Profile verification builds trust between buyers and sellers.', color: 'text-emerald-600 bg-emerald-50' },
              { icon: ShieldCheck, title: 'Safe Communication', desc: 'Chat within the platform. Never share personal contact directly.', color: 'text-blue-600 bg-blue-50' },
              { icon: Flag, title: 'Report Listings', desc: 'Flag suspicious listings or sellers and we\'ll review quickly.', color: 'text-amber-600 bg-amber-50' },
              { icon: Users, title: 'Community Guidelines', desc: 'Fair, respectful marketplace for everyone. No fraud tolerated.', color: 'text-purple-600 bg-purple-50' },
            ].map(item => {
              const IconComponent = item.icon;
              return (
                <div key={item.title} className="bg-[#F7F7F5] border border-[#E7E7E3] rounded-2xl p-5 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${item.color}`}>
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

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings, categories } from '../data/mockData';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import CategoryIcon from '../components/CategoryIcon';
import { SearchX, Filter, Check, SlidersHorizontal, MapPin, ShieldCheck, ArrowUpDown, X } from 'lucide-react';

const conditions = ['Like New', 'Excellent', 'Good', 'Fair'];
const sortOptions = ['Relevance', 'Newest First', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];
const locationsList = ['All Cities', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'];

const pricePresets = [
  { label: 'Under ₹5k', min: '', max: '5000' },
  { label: '₹5k - ₹20k', min: '5000', max: '20000' },
  { label: '₹20k - ₹50k', min: '20000', max: '50000' },
  { label: 'Over ₹50k', min: '50000', max: '' },
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const [query, setQuery] = useState(q);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sort, setSort] = useState('Relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [q, selectedConditions, priceMin, priceMax, selectedCategory, selectedLocation, onlyVerified, sort]);

  // Combined Filtering and Sorting
  const filtered = useMemo(() => {
    let result = listings.filter(l => {
      const matchQ = !q || l.title.toLowerCase().includes(q.toLowerCase()) || l.category.toLowerCase().includes(q.toLowerCase()) || l.description.toLowerCase().includes(q.toLowerCase());
      const matchCond = !selectedConditions.length || selectedConditions.includes(l.condition);
      const targetCat = categories.find(c => c.id === selectedCategory || c.name.toLowerCase() === selectedCategory.toLowerCase());
      const matchCat = !selectedCategory || (targetCat ? l.category === targetCat.name : l.category.toLowerCase().includes(selectedCategory.toLowerCase()));
      const matchMin = !priceMin || l.price >= parseInt(priceMin);
      const matchMax = !priceMax || l.price <= parseInt(priceMax);
      const matchLoc = selectedLocation === 'All Cities' || l.location.toLowerCase().includes(selectedLocation.toLowerCase()) || l.area.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchVerified = !onlyVerified || (l.seller && l.seller.verified);

      return matchQ && matchCond && matchCat && matchMin && matchMax && matchLoc && matchVerified;
    });

    // Apply Sorting
    return result.sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      if (sort === 'Most Popular') return (b.views || 0) + (b.favorites || 0) * 2 - ((a.views || 0) + (a.favorites || 0) * 2);
      if (sort === 'Newest First') return b.id.localeCompare(a.id);
      return 0; // Default Relevance
    });
  }, [q, selectedConditions, priceMin, priceMax, selectedCategory, selectedLocation, onlyVerified, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  const toggleCondition = (c: string) =>
    setSelectedConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const activeFiltersCount = selectedConditions.length + (priceMin ? 1 : 0) + (priceMax ? 1 : 0) + (selectedCategory ? 1 : 0) + (selectedLocation !== 'All Cities' ? 1 : 0) + (onlyVerified ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedConditions([]);
    setPriceMin('');
    setPriceMax('');
    setSelectedCategory('');
    setSelectedLocation('All Cities');
    setOnlyVerified(false);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-bold text-[#12151A]">Category</h3>
          {selectedCategory && (
            <button onClick={() => setSelectedCategory('')} className="text-xs text-[#E98B00] font-medium hover:underline">Clear</button>
          )}
        </div>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left text-sm px-2.5 py-1.5 rounded-xl transition-colors ${!selectedCategory ? 'bg-[#FDB209]/15 text-[#12151A] font-semibold' : 'text-gray-600 hover:bg-[#F7F7F5]'}`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left text-sm px-2.5 py-1.5 rounded-xl transition-colors flex items-center justify-between ${selectedCategory === cat.id ? 'bg-[#FDB209]/15 text-[#12151A] font-semibold' : 'text-gray-600 hover:bg-[#F7F7F5]'}`}
            >
              <span className="flex items-center gap-2 truncate">
                <CategoryIcon id={cat.id} className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="truncate">{cat.name}</span>
              </span>
              <span className="text-xs text-gray-400 shrink-0">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-sm font-bold text-[#12151A] mb-2 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#FDB209]" />
          Location
        </h3>
        <select
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
          className="w-full border border-[#E7E7E3] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#FDB209] bg-white text-[#12151A]"
        >
          {locationsList.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Verified Sellers Only */}
      <div className="pt-1">
        <label className="flex items-center justify-between p-3 border border-[#E7E7E3] rounded-xl cursor-pointer hover:border-[#FDB209] transition-colors bg-[#F7F7F5]/50">
          <span className="flex items-center gap-2 text-sm font-medium text-[#12151A]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Sellers Only
          </span>
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={e => setOnlyVerified(e.target.checked)}
            className="w-4 h-4 accent-[#FDB209] rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Condition */}
      <div>
        <h3 className="text-sm font-bold text-[#12151A] mb-2.5">Item Condition</h3>
        <div className="space-y-2">
          {conditions.map(c => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-700 hover:text-[#12151A]">
              <input
                type="checkbox"
                checked={selectedConditions.includes(c)}
                onChange={() => toggleCondition(c)}
                className="w-4 h-4 accent-[#FDB209] rounded cursor-pointer"
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range & Presets */}
      <div>
        <h3 className="text-sm font-bold text-[#12151A] mb-2.5">Price Range (₹)</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            className="w-full border border-[#E7E7E3] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#FDB209]"
          />
          <span className="self-center text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            className="w-full border border-[#E7E7E3] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#FDB209]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {pricePresets.map(preset => {
            const isActive = priceMin === preset.min && priceMax === preset.max;
            return (
              <button
                key={preset.label}
                onClick={() => {
                  setPriceMin(preset.min);
                  setPriceMax(preset.max);
                }}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  isActive
                    ? 'border-[#FDB209] bg-[#FDB209]/20 text-[#12151A] font-semibold'
                    : 'border-[#E7E7E3] text-gray-600 hover:border-gray-400'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={resetAllFilters}
          className="w-full text-sm text-red-500 hover:text-red-600 font-semibold py-2.5 rounded-xl border border-red-100 hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
        >
          <X className="w-4 h-4" />
          Clear All Filters ({activeFiltersCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header searchQuery={q} />

      {/* Search bar (mobile) */}
      <div className="md:hidden border-b border-[#E7E7E3] bg-white px-4 py-3 sticky top-14 z-20">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 flex items-center bg-[#F7F7F5] border border-[#E7E7E3] rounded-xl px-3 gap-2 focus-within:border-[#FDB209] transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search items, brands, categories..."
              className="flex-1 py-2 bg-transparent text-sm outline-none"
            />
          </div>
          <button type="submit" className="brand-gradient text-[#12151A] font-bold text-sm px-4 rounded-xl shadow-xs">Search</button>
        </form>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-6 pb-24 md:pb-8">
        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-20 bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4 border-b border-[#E7E7E3] pb-3">
                <h2 className="font-bold text-[#12151A] flex items-center gap-2 text-base">
                  <SlidersHorizontal className="w-4 h-4 text-[#FDB209]" />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="brand-gradient text-[#12151A] text-xs font-bold px-2 py-0.5 rounded-full">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Results section */}
          <div className="flex-1 min-w-0">
            {/* Header / Control Bar */}
            <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 mb-5 shadow-xs flex items-center justify-between flex-wrap gap-3">
              <div>
                {q ? (
                  <p className="text-sm text-gray-600">
                    Found <span className="font-bold text-[#12151A]">{filtered.length} listings</span> for "<span className="text-[#12151A] font-semibold">{q}</span>"
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">Showing <span className="font-bold text-[#12151A]">{filtered.length}</span> active listings</p>
                )}
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="md:hidden flex items-center gap-2 text-sm font-semibold border border-[#E7E7E3] bg-[#F7F7F5] rounded-xl px-3.5 py-2 hover:border-[#FDB209]"
                >
                  <Filter className="w-4 h-4 text-[#12151A]" />
                  Filters {activeFiltersCount > 0 && <span className="brand-gradient text-[#12151A] text-xs font-bold px-1.5 py-0.2 rounded-full">{activeFiltersCount}</span>}
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 border border-[#E7E7E3] rounded-xl px-3 py-1.5 bg-white focus-within:border-[#FDB209]">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="text-sm font-medium outline-none bg-transparent text-[#12151A] cursor-pointer"
                  >
                    {sortOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* View Mode Switcher */}
                <div className="hidden sm:flex border border-[#E7E7E3] rounded-xl p-0.5 bg-[#F7F7F5]">
                  {(['grid', 'list'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`p-1.5 rounded-lg transition-all ${viewMode === mode ? 'bg-white text-[#12151A] shadow-xs font-semibold' : 'text-gray-400 hover:text-gray-600'}`}
                      title={`${mode.toUpperCase()} view`}
                    >
                      {mode === 'grid' ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters Badges */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-xs text-gray-500 font-medium">Applied Filters:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#E7E7E3] text-[#12151A] font-medium px-2.5 py-1 rounded-full shadow-2xs">
                    Cat: {selectedCategory}
                    <X className="w-3 h-3 text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => setSelectedCategory('')} />
                  </span>
                )}
                {selectedLocation !== 'All Cities' && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#E7E7E3] text-[#12151A] font-medium px-2.5 py-1 rounded-full shadow-2xs">
                    City: {selectedLocation}
                    <X className="w-3 h-3 text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => setSelectedLocation('All Cities')} />
                  </span>
                )}
                {onlyVerified && (
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium px-2.5 py-1 rounded-full shadow-2xs">
                    Verified Only
                    <X className="w-3 h-3 text-emerald-500 hover:text-red-500 cursor-pointer" onClick={() => setOnlyVerified(false)} />
                  </span>
                )}
                {selectedConditions.map(c => (
                  <span key={c} className="inline-flex items-center gap-1 text-xs bg-[#FDB209]/15 border border-[#FDB209]/30 text-[#12151A] font-medium px-2.5 py-1 rounded-full shadow-2xs">
                    {c}
                    <X className="w-3 h-3 text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => toggleCondition(c)} />
                  </span>
                ))}
                {(priceMin || priceMax) && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white border border-[#E7E7E3] text-[#12151A] font-medium px-2.5 py-1 rounded-full shadow-2xs">
                    Price: ₹{priceMin || '0'} - ₹{priceMax || '∞'}
                    <X className="w-3 h-3 text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => { setPriceMin(''); setPriceMax(''); }} />
                  </span>
                )}
              </div>
            )}

            {/* Results Grid / List */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white border border-[#E7E7E3] rounded-2xl text-center py-16 px-4 shadow-xs">
                <SearchX className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#12151A] mb-1">No matching products found</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">We couldn't find any items matching your selected query or filters. Try adjusting your price range or clearing active filters.</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button onClick={resetAllFilters} className="text-sm font-bold brand-gradient text-[#12151A] px-5 py-2.5 rounded-xl shadow-xs hover:opacity-90">
                    Clear All Filters
                  </button>
                  <button onClick={() => { setQuery(''); setSearchParams({}); }} className="text-sm font-semibold border border-[#E7E7E3] text-[#12151A] px-5 py-2.5 rounded-xl hover:bg-[#F7F7F5]">
                    Reset Search Term
                  </button>
                </div>
              </div>
            ) : (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-3'
              }>
                {filtered.map(l => <ProductCard key={l.id} listing={l} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setShowFilters(false)} />
          <div className="relative bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-5 border-b border-[#E7E7E3] pb-3">
              <h2 className="font-bold text-[#12151A] text-lg flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#FDB209]" />
                Filter Options
              </h2>
              <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-[#F7F7F5]">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <FilterPanel />
            <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-6 border-t border-[#E7E7E3]">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full brand-gradient text-[#12151A] font-bold py-3.5 rounded-xl shadow-md text-center"
              >
                Apply Filters ({filtered.length} results)
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

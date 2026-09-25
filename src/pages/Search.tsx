import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listings, categories } from '../data/mockData';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import CategoryIcon from '../components/CategoryIcon';
import { SearchX } from 'lucide-react';

const conditions = ['Like New', 'Excellent', 'Good', 'Fair'];
const sortOptions = ['Relevance', 'Newest First', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const [query, setQuery] = useState(q);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [sort, setSort] = useState('Relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [q, selectedConditions, priceMin, priceMax, selectedCategory]);

  const filtered = listings.filter(l => {
    const matchQ = !q || l.title.toLowerCase().includes(q.toLowerCase()) || l.category.toLowerCase().includes(q.toLowerCase());
    const matchCond = !selectedConditions.length || selectedConditions.includes(l.condition);
    const targetCat = categories.find(c => c.id === selectedCategory || c.name.toLowerCase() === selectedCategory.toLowerCase());
    const matchCat = !selectedCategory || (targetCat ? l.category === targetCat.name : l.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchMin = !priceMin || l.price >= parseInt(priceMin);
    const matchMax = !priceMax || l.price <= parseInt(priceMax);
    return matchQ && matchCond && matchCat && matchMin && matchMax;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const toggleCondition = (c: string) =>
    setSelectedConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const activeFiltersCount = selectedConditions.length + (priceMin ? 1 : 0) + (priceMax ? 1 : 0) + (selectedCategory ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-5">
      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold text-[#12151A] mb-2.5">Category</h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${!selectedCategory ? 'text-[#FDB209] font-semibold' : 'text-gray-600 hover:bg-[#F7F7F5]'}`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between ${selectedCategory === cat.id ? 'text-[#FDB209] font-semibold bg-[#FDB209]/5' : 'text-gray-600 hover:bg-[#F7F7F5]'}`}
            >
              <span className="flex items-center gap-2">
                <CategoryIcon id={cat.id} className="w-4 h-4 text-gray-500" />
                {cat.name}
              </span>
              <span className="text-xs text-gray-400">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="text-sm font-semibold text-[#12151A] mb-2.5">Condition</h3>
        <div className="space-y-2">
          {conditions.map(c => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedConditions.includes(c)}
                onChange={() => toggleCondition(c)}
                className="w-4 h-4 accent-[#FDB209] rounded"
              />
              <span className="text-sm text-gray-700">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold text-[#12151A] mb-2.5">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min ₹"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            className="w-full border border-[#E7E7E3] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FDB209]"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            className="w-full border border-[#E7E7E3] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FDB209]"
          />
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={() => { setSelectedConditions([]); setPriceMin(''); setPriceMax(''); setSelectedCategory(''); }}
          className="w-full text-sm text-red-500 hover:text-red-600 font-medium py-2"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header searchQuery={q} />

      {/* Search bar (mobile) */}
      <div className="md:hidden border-b border-[#E7E7E3] px-4 py-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 flex items-center bg-[#F7F7F5] border border-[#E7E7E3] rounded-xl px-3 gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search listings..."
              className="flex-1 py-2.5 bg-transparent text-sm outline-none"
            />
          </div>
          <button type="submit" className="brand-gradient text-[#12151A] font-semibold text-sm px-4 rounded-xl">Go</button>
        </form>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-6 pb-24 md:pb-8">
        <div className="flex gap-6">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="sticky top-20 bg-white border border-[#E7E7E3] rounded-2xl p-4">
              <h2 className="font-bold text-[#12151A] mb-4">Filters</h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <div className="flex-1">
                {q ? (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-[#12151A]">{filtered.length} results</span> for "{q}"
                  </p>
                ) : (
                  <p className="text-sm text-gray-600"><span className="font-semibold text-[#12151A]">{filtered.length}</span> listings</p>
                )}
              </div>

              {/* Active filter chips */}
              {selectedConditions.map(c => (
                <button
                  key={c}
                  onClick={() => toggleCondition(c)}
                  className="flex items-center gap-1 text-xs bg-[#FDB209]/10 text-[#E98B00] font-medium px-2.5 py-1 rounded-full"
                >
                  {c}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}

              {/* Mobile filters */}
              <button
                onClick={() => setShowFilters(true)}
                className="md:hidden flex items-center gap-1.5 text-sm font-medium border border-[#E7E7E3] rounded-xl px-3 py-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters {activeFiltersCount > 0 && <span className="brand-gradient text-[#12151A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{activeFiltersCount}</span>}
              </button>

              {/* Sort */}
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="text-sm border border-[#E7E7E3] rounded-xl px-3 py-2 outline-none bg-white"
              >
                {sortOptions.map(s => <option key={s}>{s}</option>)}
              </select>

              {/* View mode */}
              <div className="hidden md:flex border border-[#E7E7E3] rounded-xl overflow-hidden">
                {(['grid', 'list'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 ${viewMode === mode ? 'bg-[#12151A] text-white' : 'text-gray-400 hover:bg-[#F7F7F5]'}`}
                  >
                    {mode === 'grid' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
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

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <SearchX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#12151A] mb-2">No results found</h3>
                <p className="text-gray-500 text-sm mb-6">Try a different keyword or clear your filters</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button onClick={() => { setQuery(''); setSearchParams({}); }} className="text-sm font-medium border border-[#E7E7E3] px-4 py-2 rounded-xl hover:bg-[#F7F7F5]">
                    Clear search
                  </button>
                  <button onClick={() => setSelectedConditions([])} className="text-sm font-medium bg-[#12151A] text-white px-4 py-2 rounded-xl hover:bg-black">
                    Browse all listings
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
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="relative bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#12151A] text-lg">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-[#F7F7F5]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setShowFilters(false)}
              className="w-full brand-gradient text-[#12151A] font-bold py-3.5 rounded-xl mt-6"
            >
              Apply Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import CategoryIcon from './CategoryIcon';
import { X, ChevronRight, SlidersHorizontal, Grid, ArrowRight } from 'lucide-react';

interface CategoryFilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategoryId?: string;
  onSelectCategory?: (categoryId: string, subcategory?: string) => void;
}

export default function CategoryFilterMenu({
  isOpen,
  onClose,
  selectedCategoryId = '',
  onSelectCategory
}: CategoryFilterMenuProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCat, setExpandedCat] = useState<string | null>(selectedCategoryId || null);

  if (!isOpen) return null;

  const filteredCategories = categories.filter(cat => {
    const matchName = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSub = cat.subcategories?.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchName || matchSub;
  });

  const handleCategoryClick = (catId: string, subcat?: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId, subcat);
    } else {
      const url = subcat
        ? `/search?category=${catId}&q=${encodeURIComponent(subcat)}`
        : `/search?category=${catId}`;
      navigate(url);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Menu Modal Drawer */}
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10 border border-[#E7E7E3] animate-pop-in">
        {/* Header */}
        <div className="bg-[#12151A] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl brand-gradient text-[#12151A] flex items-center justify-center font-bold shadow-xs">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">Category Filter Menu</h2>
              <p className="text-xs text-gray-400">Browse all marketplace categories & subcategories</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Input */}
        <div className="p-4 bg-[#F7F7F5] border-b border-[#E7E7E3]">
          <div className="flex items-center bg-white border border-[#E7E7E3] rounded-2xl px-3.5 py-2.5 shadow-2xs focus-within:border-[#FDB209] transition-colors">
            <input
              type="text"
              placeholder="Search category or subcategory (e.g. iPhones, Laptops, Cars)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent outline-none text-[#12151A] font-medium"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories List & Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-bold text-[#12151A]">No matching categories found</p>
              <p className="text-xs text-gray-500 mt-1">Try searching with a different keyword</p>
            </div>
          ) : (
            filteredCategories.map(cat => {
              const isExpanded = expandedCat === cat.id;
              const isSelected = selectedCategoryId === cat.id;

              return (
                <div
                  key={cat.id}
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    isSelected
                      ? 'border-[#FDB209] bg-[#FDB209]/5 shadow-xs'
                      : 'border-[#E7E7E3] hover:border-gray-300 bg-white'
                  }`}
                >
                  {/* Category Header Row */}
                  <div
                    onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected ? 'bg-[#FDB209] text-[#12151A] border-[#FDB209]' : 'bg-[#F7F7F5] text-gray-700 border-[#E7E7E3]'
                      }`}>
                        <CategoryIcon id={cat.id} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-[#12151A] truncate">{cat.name}</div>
                        <div className="text-[11px] text-gray-500">{cat.count.toLocaleString()} items</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleCategoryClick(cat.id);
                        }}
                        className="text-xs font-extrabold brand-gradient text-[#12151A] px-3 py-1.5 rounded-xl hover:opacity-90 shadow-2xs flex items-center gap-1"
                      >
                        Browse All <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-gray-400 transition-transform ${isExpanded ? 'rotate-90 bg-gray-100 text-[#12151A]' : ''}`}>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subcategories Expansion Drawer */}
                  {isExpanded && cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="bg-[#F7F7F5] border-t border-[#E7E7E3] p-3.5 px-4 animate-fade-in">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                        Popular Subcategories in {cat.name}:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.subcategories.map(sub => (
                          <button
                            key={sub}
                            onClick={() => handleCategoryClick(cat.id, sub)}
                            className="text-xs font-semibold bg-white border border-[#E7E7E3] hover:border-[#FDB209] hover:bg-[#FDB209]/15 text-[#12151A] px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-white border-t border-[#E7E7E3] flex justify-between items-center">
          <button
            onClick={() => handleCategoryClick('')}
            className="text-xs font-bold text-gray-600 hover:text-[#12151A] px-3 py-2 rounded-xl hover:bg-[#F7F7F5]"
          >
            Clear Selected Category
          </button>
          <button
            onClick={onClose}
            className="bg-[#12151A] text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-black transition-colors"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
}

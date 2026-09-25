import { useState } from 'react';
import { Link } from 'react-router-dom';
import { myListings as initialListings, formatPrice } from '../data/mockData';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import {
  ClipboardList, Package, Eye, Heart, MessageSquare, Plus, Edit, Trash2,
  CheckCircle2, DollarSign, TrendingUp, Tag, AlertCircle, X, Search, RefreshCw
} from 'lucide-react';

type MyListingItem = typeof initialListings[number];

type Status = 'ALL' | 'ACTIVE' | 'DRAFT' | 'SOLD' | 'EXPIRED';

const statusConfig: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: 'Active', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  DRAFT: { label: 'Draft', color: 'text-gray-700 bg-gray-100 border-gray-200' },
  SOLD: { label: 'Sold', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  EXPIRED: { label: 'Expired', color: 'text-red-700 bg-red-50 border-red-200' },
  PENDING_REVIEW: { label: 'Under Review', color: 'text-amber-700 bg-amber-50 border-amber-200' },
};

export default function MyListings() {
  const [listingsState, setListingsState] = useState<MyListingItem[]>(initialListings);
  const [tab, setTab] = useState<Status>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit Modal State
  const [editingListing, setEditingListing] = useState<MyListingItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState<number | ''>('');
  const [editCondition, setEditCondition] = useState('');

  // Delete Confirmation Modal
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs: Status[] = ['ALL', 'ACTIVE', 'DRAFT', 'SOLD', 'EXPIRED'];

  // Status Action Handlers
  const handleToggleStatus = (id: string, newStatus: 'ACTIVE' | 'SOLD' | 'DRAFT') => {
    setListingsState(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    const actionName = newStatus === 'SOLD' ? 'marked as Sold' : newStatus === 'ACTIVE' ? 're-published as Active' : 'moved to Drafts';
    showNotification(`Listing ${actionName}!`);
  };

  const handleDeleteListing = (id: string) => {
    setListingsState(prev => prev.filter(l => l.id !== id));
    setDeletingId(null);
    showNotification('Listing permanently deleted.');
  };

  const handleOpenEdit = (listing: MyListingItem) => {
    setEditingListing(listing);
    setEditTitle(listing.title);
    setEditPrice(listing.price);
    setEditCondition(listing.condition);
  };

  const handleSaveEdit = () => {
    if (!editingListing || !editTitle || editPrice === '') return;
    setListingsState(prev => prev.map(l => l.id === editingListing.id ? {
      ...l,
      title: editTitle,
      price: Number(editPrice),
      condition: (editCondition || l.condition) as MyListingItem['condition']
    } : l));
    setEditingListing(null);
    showNotification('Listing details updated!');
  };

  // Filtered listings
  const filtered = listingsState.filter(l => {
    const matchTab = tab === 'ALL' || l.status === tab;
    const matchQ = !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchQ;
  });

  // Analytics Metrics
  const totalViews = listingsState.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalInquiries = listingsState.reduce((acc, curr) => acc + (curr.enquiries || 0), 0);
  const totalSoldValue = listingsState
    .filter(l => l.status === 'SOLD')
    .reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#12151A] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#FDB209]" />
          {toastMessage}
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-6 pb-28 md:pb-12">
        {/* Top Header & Post Button */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-black text-[#12151A] tracking-tight">Seller Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">Manage your inventory, active listings, and performance stats</p>
          </div>
          <Link
            to="/sell"
            className="flex items-center gap-2 brand-gradient text-[#12151A] font-extrabold text-sm px-5 py-3 rounded-xl shadow-xs hover:opacity-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Create New Listing
          </Link>
        </div>

        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Active Items</span>
              <Tag className="w-4 h-4 text-[#FDB209]" />
            </div>
            <div className="text-2xl font-black text-[#12151A]">
              {listingsState.filter(l => l.status === 'ACTIVE').length}
            </div>
            <div className="text-[10px] text-gray-400 mt-1">out of {listingsState.length} total</div>
          </div>

          <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Total Impressions</span>
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-[#12151A]">{totalViews}</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1">↑ +14% this week</div>
          </div>

          <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Buyer Inquiries</span>
              <MessageSquare className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-[#12151A]">{totalInquiries}</div>
            <div className="text-[10px] text-gray-400 mt-1">direct chats</div>
          </div>

          <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Items Sold Value</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">{formatPrice(totalSoldValue)}</div>
            <div className="text-[10px] text-gray-400 mt-1">completed sales</div>
          </div>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="bg-white border border-[#E7E7E3] rounded-2xl p-4 mb-6 shadow-2xs space-y-3">
          {/* Tabs */}
          <div className="flex gap-1.5 border-b border-[#E7E7E3] pb-3 overflow-x-auto">
            {tabs.map(t => {
              const count = t === 'ALL' ? listingsState.length : listingsState.filter(l => l.status === t).length;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 ${tab === t ? 'bg-[#12151A] text-white shadow-xs' : 'text-gray-600 hover:bg-[#F7F7F5]'}`}
                >
                  {t === 'ALL' ? 'All Items' : t.charAt(0) + t.slice(1).toLowerCase()}
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${tab === t ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Search */}
          <div className="flex items-center bg-[#F7F7F5] border border-[#E7E7E3] rounded-xl px-3 gap-2 focus-within:border-[#FDB209]">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search your listings by title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full py-2 bg-transparent text-xs outline-none text-[#12151A]"
            />
            {searchQuery && (
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSearchQuery('')} />
            )}
          </div>
        </div>

        {/* Listings List */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#E7E7E3] rounded-2xl text-center py-16 px-4 shadow-2xs">
            <ClipboardList className="w-14 h-14 text-gray-300 mx-auto mb-3" />
            <h3 className="font-extrabold text-[#12151A] text-lg mb-1">No listings found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-5">
              {searchQuery ? `No listings matching "${searchQuery}"` : `You don't have any ${tab !== 'ALL' ? tab.toLowerCase() : ''} listings currently.`}
            </p>
            <Link to="/sell" className="inline-flex items-center gap-2 brand-gradient text-[#12151A] font-extrabold text-xs px-5 py-3 rounded-xl shadow-xs">
              <Plus className="w-4 h-4 stroke-[3]" />
              Post a New Item
            </Link>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filtered.map(listing => {
              const sc = statusConfig[listing.status] || { label: listing.status, color: 'text-gray-700 bg-gray-100 border-gray-200' };
              return (
                <div key={listing.id} className="bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-2xs hover:border-[#FDB209]/40 transition-all flex flex-col sm:flex-row gap-4">
                  {/* Thumbnail Image */}
                  <div className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-[#F7F7F5] border border-[#E7E7E3] shrink-0 relative group">
                    {listing.images[0] ? (
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Information & Metrics */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border inline-block mb-1 ${sc.color}`}>
                            {sc.label}
                          </span>
                          <h3 className="font-bold text-[#12151A] text-base line-clamp-1">{listing.title}</h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-lg font-black text-[#12151A]">{formatPrice(listing.price)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mt-1">
                        <span>Condition: <strong>{listing.condition}</strong></span>
                        <span>•</span>
                        <span>Posted {listing.postedAt}</span>
                      </div>
                    </div>

                    {/* Stats bar */}
                    <div className="flex items-center gap-5 text-xs text-gray-500 pt-3 border-t border-[#E7E7E3] mt-3">
                      <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-gray-400" /> <strong>{listing.views}</strong> views</span>
                      <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> <strong>{listing.favorites}</strong> saved</span>
                      <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-blue-500" /> <strong>{listing.enquiries}</strong> inquiries</span>
                    </div>
                  </div>

                  {/* Seller Action Controls */}
                  <div className="flex sm:flex-col justify-end gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E7E7E3]">
                    <Link
                      to={`/listing/${listing.id}`}
                      className="flex-1 sm:flex-initial text-xs font-bold text-[#12151A] border border-[#E7E7E3] px-3.5 py-2 rounded-xl hover:bg-[#F7F7F5] text-center transition-colors"
                    >
                      Preview
                    </Link>

                    {listing.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleToggleStatus(listing.id, 'SOLD')}
                        className="flex-1 sm:flex-initial text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3.5 py-2 rounded-xl hover:bg-purple-100 transition-colors"
                      >
                        Mark as Sold
                      </button>
                    )}

                    {listing.status === 'SOLD' && (
                      <button
                        onClick={() => handleToggleStatus(listing.id, 'ACTIVE')}
                        className="flex-1 sm:flex-initial text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Relist Item
                      </button>
                    )}

                    {listing.status === 'DRAFT' && (
                      <button
                        onClick={() => handleToggleStatus(listing.id, 'ACTIVE')}
                        className="flex-1 sm:flex-initial text-xs font-extrabold brand-gradient text-[#12151A] px-3.5 py-2 rounded-xl shadow-2xs"
                      >
                        Publish Now
                      </button>
                    )}

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(listing)}
                        className="p-2 border border-[#E7E7E3] text-gray-600 rounded-xl hover:border-[#FDB209] hover:text-[#12151A] transition-colors"
                        title="Edit Listing Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setDeletingId(listing.id)}
                        className="p-2 border border-red-100 text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Listing Modal */}
      {editingListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setEditingListing(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-extrabold text-[#12151A] text-xl mb-4">Edit Listing</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#12151A] mb-1 block">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full border border-[#E7E7E3] rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#FDB209]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#12151A] mb-1 block">Price (₹)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={e => setEditPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full border border-[#E7E7E3] rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#FDB209] font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#12151A] mb-1 block">Condition</label>
                <select
                  value={editCondition}
                  onChange={e => setEditCondition(e.target.value)}
                  className="w-full border border-[#E7E7E3] rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#FDB209] bg-white"
                >
                  <option value="Like New">Like New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setEditingListing(null)}
                  className="flex-1 border border-[#E7E7E3] text-gray-600 font-semibold py-3 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 brand-gradient text-[#12151A] font-extrabold py-3 rounded-xl text-xs shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl relative">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="font-extrabold text-[#12151A] text-lg mb-1">Delete Listing?</h2>
            <p className="text-xs text-gray-500 mb-5">Are you sure you want to delete this listing? This action cannot be undone.</p>

            <div className="flex gap-2">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 border border-[#E7E7E3] text-gray-600 font-semibold py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteListing(deletingId)}
                className="flex-1 bg-red-500 text-white font-extrabold py-2.5 rounded-xl text-xs hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}


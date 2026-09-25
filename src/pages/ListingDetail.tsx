import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { listings, formatPrice } from '../data/mockData';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { Package, ShieldCheck, Eye, Heart, MessageSquare, Star, CheckCircle2 } from 'lucide-react';

const conditionColor = {
  'Like New': 'text-emerald-600 bg-emerald-50',
  'Excellent': 'text-blue-600 bg-blue-50',
  'Good': 'text-[#E98B00] bg-[#FDB209]/10',
  'Fair': 'text-gray-600 bg-gray-100',
};

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id) || listings[0];

  const [currentImg, setCurrentImg] = useState(0);
  const [saved, setSaved] = useState(listing.saved);
  const [showOffer, setShowOffer] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerSent, setOfferSent] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const related = listings.filter(l => l.id !== listing.id && l.category === listing.category).slice(0, 4);

  const handleSendOffer = () => {
    if (!offerAmount) return;
    setOfferSent(true);
    setTimeout(() => { setShowOffer(false); setOfferSent(false); }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-[#E7E7E3] bg-[#F7F7F5]">
        <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-2.5 flex items-center gap-1.5 text-xs text-gray-500">
          <Link to="/" className="hover:text-[#FDB209]">Home</Link>
          <span>/</span>
          <Link to={`/search?category=${listing.category}`} className="hover:text-[#FDB209]">{listing.category}</Link>
          <span>/</span>
          <span className="text-[#12151A] font-medium line-clamp-1">{listing.title}</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-6 pb-32 md:pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Gallery */}
          <div className="lg:w-[55%]">
            {/* Main image */}
            <div
              className="relative bg-[#F7F7F5] rounded-2xl overflow-hidden aspect-[4/3] cursor-zoom-in"
              onClick={() => setFullScreen(true)}
            >
              {listing.images.length > 0 ? (
                <img
                  src={listing.images[currentImg]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-300" />
                </div>
              )}

              {/* Nav arrows */}
              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); setCurrentImg(i => Math.max(0, i - 1)); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setCurrentImg(i => Math.min(listing.images.length - 1, i + 1)); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {currentImg + 1} / {listing.images.length}
                  </div>
                </>
              )}

              {listing.featured && (
                <div className="absolute top-3 left-3 brand-gradient text-[#12151A] text-xs font-bold px-2.5 py-1 rounded-full">
                  Featured
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {listing.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {listing.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${currentImg === i ? 'border-[#FDB209]' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-6">
              <h2 className="font-semibold text-[#12151A] mb-3">Description</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{listing.description}</p>
            </div>

            {/* Specs */}
            {listing.specs && (
              <div className="mt-6">
                <h2 className="font-semibold text-[#12151A] mb-3">Specifications</h2>
                <div className="border border-[#E7E7E3] rounded-2xl overflow-hidden">
                  {Object.entries(listing.specs).map(([k, v], i) => (
                    <div key={k} className={`flex ${i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F5]'} px-4 py-2.5`}>
                      <span className="text-sm text-gray-500 w-40 shrink-0">{k}</span>
                      <span className="text-sm font-medium text-[#12151A]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety tips */}
            <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                Safety Tips
              </h3>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>• Meet in a safe, public place to inspect the item</li>
                <li>• Never share banking or personal information</li>
                <li>• Verify the product before making payment</li>
                <li>• Be cautious of offers that seem too good to be true</li>
              </ul>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:w-[45%] lg:sticky lg:top-20 lg:self-start space-y-4">
            {/* Price & Title */}
            <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-3xl font-extrabold text-[#12151A]">{formatPrice(listing.price)}</div>
                  <h1 className="text-lg font-semibold text-[#12151A] mt-1 leading-snug">{listing.title}</h1>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setSaved(s => !s)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${saved ? 'border-[#FDB209] bg-[#FDB209]/10 text-[#FDB209]' : 'border-[#E7E7E3] text-gray-400 hover:border-[#FDB209]'}`}
                  >
                    <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="w-9 h-9 rounded-xl border border-[#E7E7E3] flex items-center justify-center text-gray-400 hover:border-[#FDB209]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-500 border-t border-[#E7E7E3] pt-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${conditionColor[listing.condition]}`}>
                  {listing.condition}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {listing.area}, {listing.location}
                </span>
                <span>Posted {listing.postedAt}</span>
              </div>

              {/* Stats */}
              <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-gray-400" /> {listing.views} views</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {listing.favorites} saved</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-blue-500" /> {listing.enquiries} enquiries</span>
              </div>
            </div>

            {/* Seller card */}
            <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-[#12151A] mb-3">Seller</h2>
              <Link to={`/seller/${listing.seller.id}`} className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F7F7F5] shrink-0">
                  {listing.seller.avatar ? (
                    <img src={listing.seller.avatar} alt={listing.seller.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-[#12151A]">
                      {listing.seller.name[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#12151A] text-sm group-hover:text-[#FDB209] transition-colors">{listing.seller.name}</span>
                    {listing.seller.verified && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                    <span>{listing.seller.rating} ({listing.seller.reviewCount} reviews) · Member since {listing.seller.memberSince}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{listing.seller.responseTime}</div>
                </div>
              </Link>

              <div className="flex gap-3 mt-4 text-xs text-gray-500">
                <span>{listing.seller.activeListings} active</span>
                <span>·</span>
                <span>{listing.seller.soldListings} sold</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="hidden md:flex flex-col gap-2">
              <Link
                to={`/messages?listing=${listing.id}`}
                className="w-full brand-gradient text-[#12151A] font-bold py-3.5 rounded-xl text-center hover:opacity-90 transition-opacity"
              >
                Contact Seller
              </Link>
              <button
                onClick={() => setShowOffer(true)}
                className="w-full bg-[#12151A] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors"
              >
                Make an Offer
              </button>
              <button
                onClick={() => setShowReport(true)}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors py-1"
              >
                Report this listing
              </button>
            </div>
          </div>
        </div>

        {/* Related listings */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#12151A] mb-5">Similar Listings</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map(l => <ProductCard key={l.id} listing={l} />)}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky CTAs */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-[#E7E7E3] px-4 py-3 flex gap-2">
        <button
          onClick={() => setShowOffer(true)}
          className="flex-1 bg-[#12151A] text-white font-bold py-3 rounded-xl text-sm"
        >
          Make an Offer
        </button>
        <Link
          to={`/messages?listing=${listing.id}`}
          className="flex-1 brand-gradient text-[#12151A] font-bold py-3 rounded-xl text-sm text-center"
        >
          Contact Seller
        </Link>
      </div>

      {/* Offer modal */}
      {showOffer && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-white rounded-t-3xl md:rounded-3xl p-6 w-full max-w-md">
            <h2 className="font-bold text-[#12151A] text-lg mb-1">Make an Offer</h2>
            <p className="text-sm text-gray-500 mb-4">Listed at <strong>{formatPrice(listing.price)}</strong></p>

            {offerSent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <p className="font-semibold text-[#12151A]">Offer Sent!</p>
                <p className="text-sm text-gray-500 mt-1">The seller will respond shortly.</p>
              </div>
            ) : (
              <>
                <div className="relative mb-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                  <input
                    type="number"
                    placeholder="Enter your offer amount"
                    value={offerAmount}
                    onChange={e => setOfferAmount(e.target.value)}
                    className="w-full border border-[#E7E7E3] rounded-xl pl-8 pr-4 py-3.5 text-[#12151A] font-semibold outline-none focus:border-[#FDB209]"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowOffer(false)}
                    className="flex-1 border border-[#E7E7E3] text-gray-600 font-semibold py-3 rounded-xl hover:bg-[#F7F7F5]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendOffer}
                    className="flex-1 brand-gradient text-[#12151A] font-bold py-3 rounded-xl hover:opacity-90"
                  >
                    Send Offer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Report modal */}
      {showReport && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-white rounded-t-3xl md:rounded-3xl p-6 w-full max-w-md">
            <h2 className="font-bold text-[#12151A] text-lg mb-4">Report Listing</h2>
            <div className="space-y-2 mb-5">
              {['Fraud or scam', 'Fake product', 'Duplicate listing', 'Wrong category', 'Inappropriate content', 'Suspicious seller', 'Other'].map(r => (
                <label key={r} className="flex items-center gap-3 p-3 border border-[#E7E7E3] rounded-xl cursor-pointer hover:bg-[#F7F7F5]">
                  <input type="radio" name="report" className="accent-[#FDB209]" />
                  <span className="text-sm text-[#12151A]">{r}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowReport(false)} className="flex-1 border border-[#E7E7E3] text-gray-600 font-semibold py-3 rounded-xl">
                Cancel
              </button>
              <button onClick={() => setShowReport(false)} className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600">
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen image viewer */}
      {fullScreen && listing.images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setFullScreen(false)}>
          <button className="absolute top-4 right-4 text-white w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={listing.images[currentImg]}
            alt={listing.title}
            className="max-w-full max-h-full object-contain"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {currentImg + 1} / {listing.images.length}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

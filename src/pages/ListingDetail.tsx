import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { listings, formatPrice } from '../data/mockData';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import {
  Package, ShieldCheck, Eye, Heart, MessageSquare, Star,
  CheckCircle2, ShoppingCart, Truck, CreditCard, X, ChevronLeft, ChevronRight, Share2, MapPin, Send, AlertTriangle
} from 'lucide-react';

const conditionColor: Record<string, string> = {
  'Like New': 'text-emerald-700 bg-emerald-50 border-emerald-200',
  'Excellent': 'text-blue-700 bg-blue-50 border-blue-200',
  'Good': 'text-[#E98B00] bg-[#FDB209]/15 border-[#FDB209]/30',
  'Fair': 'text-gray-700 bg-gray-100 border-gray-200',
};

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id) || listings[0];

  const [currentImg, setCurrentImg] = useState(0);
  const [saved, setSaved] = useState(listing.saved);

  // Modals state
  const [showOffer, setShowOffer] = useState(false);
  const [offerAmount, setOfferAmount] = useState<number | ''>('');
  const [offerNote, setOfferNote] = useState('');
  const [offerSent, setOfferSent] = useState(false);

  const [showBuyNow, setShowBuyNow] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<'shipping' | 'pickup'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [buySuccess, setBuySuccess] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const related = listings.filter(l => l.id !== listing.id && l.category === listing.category).slice(0, 4);

  const discountChips = [
    { label: '5% off', amount: Math.round(listing.price * 0.95) },
    { label: '10% off', amount: Math.round(listing.price * 0.90) },
    { label: '15% off', amount: Math.round(listing.price * 0.85) },
  ];

  const quickPrompts = [
    "Is this item still available?",
    "Can you share more photos of the item?",
    "What is your final price?",
    "Is local pickup available today?"
  ];

  const handleSendOffer = () => {
    if (!offerAmount) return;
    setOfferSent(true);
    setTimeout(() => {
      setShowOffer(false);
      setOfferSent(false);
      setOfferAmount('');
      setOfferNote('');
    }, 1800);
  };

  const handleBuyNow = () => {
    setBuySuccess(true);
    setTimeout(() => {
      setShowBuyNow(false);
      setBuySuccess(false);
    }, 2200);
  };

  const handleSendMessage = () => {
    if (!quickMessage) return;
    setMessageSent(true);
    setTimeout(() => {
      setShowMessageModal(false);
      setMessageSent(false);
      setQuickMessage('');
      navigate(`/messages?listing=${listing.id}`);
    }, 1200);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-[#E7E7E3] bg-white">
        <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-3 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#FDB209]">Home</Link>
            <span>/</span>
            <Link to={`/search?category=${listing.category}`} className="hover:text-[#FDB209]">{listing.category}</Link>
            <span>/</span>
            <span className="text-[#12151A] font-semibold truncate max-w-[200px] sm:max-w-[400px]">{listing.title}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-[#12151A] transition-colors shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-6 pb-32 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Media & Details */}
          <div className="lg:w-[58%]">
            {/* Main Image Showcase */}
            <div
              className="relative bg-white border border-[#E7E7E3] rounded-2xl overflow-hidden aspect-[4/3] group cursor-zoom-in shadow-xs"
              onClick={() => setFullScreen(true)}
            >
              {listing.images.length > 0 ? (
                <img
                  src={listing.images[currentImg]}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#F7F7F5]">
                  <Package className="w-16 h-16 text-gray-300" />
                </div>
              )}

              {/* Navigation arrows */}
              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); setCurrentImg(i => Math.max(0, i - 1)); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center shadow-md hover:bg-white text-[#12151A] transition-transform active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setCurrentImg(i => Math.min(listing.images.length - 1, i + 1)); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center shadow-md hover:bg-white text-[#12151A] transition-transform active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {currentImg + 1} / {listing.images.length}
                  </div>
                </>
              )}

              {listing.featured && (
                <div className="absolute top-3 left-3 brand-gradient text-[#12151A] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  ★ Featured Listing
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {listing.images.length > 1 && (
              <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                {listing.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${currentImg === i ? 'border-[#FDB209] shadow-xs scale-102' : 'border-transparent opacity-75 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Item Overview & Description */}
            <div className="mt-8 bg-white border border-[#E7E7E3] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#12151A] mb-3">Item Description</h2>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{listing.description}</p>
              </div>

              {/* Specifications */}
              {listing.specs && Object.keys(listing.specs).length > 0 && (
                <div className="border-t border-[#E7E7E3] pt-5">
                  <h2 className="text-base font-bold text-[#12151A] mb-3">Item Specifications</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {Object.entries(listing.specs).map(([k, v]) => (
                      <div key={k} className="bg-[#F7F7F5] rounded-xl px-4 py-2.5 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">{k}</span>
                        <span className="text-xs font-bold text-[#12151A]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Buyer Safety Banner */}
              <div className="border-t border-[#E7E7E3] pt-5">
                <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-amber-900 mb-1">Used Q Buyer Protection</h3>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Always inspect the product carefully before making payment. Use our built-in secure chat to communicate with sellers. Never transfer funds outside the platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Seller Action Card */}
          <div className="lg:w-[42%] lg:sticky lg:top-20 lg:self-start space-y-4">
            {/* Price & Primary Actions Card */}
            <div className="bg-white border border-[#E7E7E3] rounded-2xl p-6 shadow-xs space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-3xl font-black text-[#12151A] tracking-tight">{formatPrice(listing.price)}</div>
                  <h1 className="text-xl font-bold text-[#12151A] mt-1.5 leading-snug">{listing.title}</h1>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setSaved(s => !s)}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${saved ? 'border-[#FDB209] bg-[#FDB209]/15 text-[#E98B00]' : 'border-[#E7E7E3] text-gray-400 hover:border-[#FDB209]'}`}
                    title={saved ? 'Saved to Favorites' : 'Save to Favorites'}
                  >
                    <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Status / Meta badges */}
              <div className="flex flex-wrap gap-2 text-xs border-y border-[#E7E7E3] py-3.5">
                <span className={`font-bold px-2.5 py-1 rounded-full border ${conditionColor[listing.condition] || 'text-gray-700 bg-gray-100'}`}>
                  Condition: {listing.condition}
                </span>
                <span className="flex items-center gap-1 font-medium text-gray-600 bg-[#F7F7F5] px-2.5 py-1 rounded-full border border-[#E7E7E3]">
                  <MapPin className="w-3.5 h-3.5 text-[#FDB209]" />
                  {listing.area}, {listing.location}
                </span>
                <span className="font-medium text-gray-500 bg-[#F7F7F5] px-2.5 py-1 rounded-full border border-[#E7E7E3]">
                  Posted {listing.postedAt}
                </span>
              </div>

              {/* Impressions stats */}
              <div className="flex gap-5 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-gray-400" /> {listing.views} views</span>
                <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-red-500 fill-red-500" /> {listing.favorites} saved</span>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-blue-500" /> {listing.enquiries} inquiries</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => setShowBuyNow(true)}
                  className="w-full brand-gradient text-[#12151A] font-extrabold text-base py-3.5 rounded-xl shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now with Protection
                </button>
                <button
                  onClick={() => setShowOffer(true)}
                  className="w-full bg-[#12151A] text-white font-bold text-base py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  Make an Offer
                </button>
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="w-full border border-[#E7E7E3] bg-[#F7F7F5] text-[#12151A] font-semibold text-sm py-3 rounded-xl hover:bg-white hover:border-[#FDB209] transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#FDB209]" />
                  Send Seller a Message
                </button>
              </div>
            </div>

            {/* Seller Profile Card */}
            <div className="bg-white border border-[#E7E7E3] rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E7E3] pb-3">
                <h3 className="text-sm font-bold text-[#12151A]">Seller Profile</h3>
                <Link to={`/seller/${listing.seller.id}`} className="text-xs font-bold text-[#E98B00] hover:underline">
                  View Full Profile →
                </Link>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#F7F7F5] border border-[#E7E7E3] shrink-0">
                  {listing.seller.avatar ? (
                    <img src={listing.seller.avatar} alt={listing.seller.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-lg text-[#12151A]">
                      {listing.seller.name[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#12151A] text-base truncate">{listing.seller.name}</span>
                    {listing.seller.verified && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                        ✓ Verified Seller
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                    <span className="font-semibold text-[#12151A]">{listing.seller.rating}</span>
                    <span>({listing.seller.reviewCount} reviews)</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">Member since {listing.seller.memberSince} • {listing.seller.responseTime}</div>
                </div>
              </div>

              <div className="bg-[#F7F7F5] rounded-xl p-3 flex justify-around text-center text-xs">
                <div>
                  <div className="font-bold text-[#12151A] text-sm">{listing.seller.activeListings}</div>
                  <div className="text-gray-500">Active Listings</div>
                </div>
                <div className="border-r border-gray-200" />
                <div>
                  <div className="font-bold text-[#12151A] text-sm">{listing.seller.soldListings}</div>
                  <div className="text-gray-500">Items Sold</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowReport(true)}
              className="w-full text-xs text-gray-400 hover:text-red-500 transition-colors py-2 flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Report suspicious listing or seller
            </button>
          </div>
        </div>

        {/* Similar Listings Section */}
        {related.length > 0 && (
          <div className="mt-14 border-t border-[#E7E7E3] pt-8">
            <h2 className="text-xl font-extrabold text-[#12151A] mb-6">Similar Products You Might Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map(l => <ProductCard key={l.id} listing={l} />)}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E7E3] p-3 flex gap-2 shadow-lg">
        <button
          onClick={() => setShowOffer(true)}
          className="flex-1 bg-[#12151A] text-white font-bold py-3 rounded-xl text-sm"
        >
          Make Offer
        </button>
        <button
          onClick={() => setShowBuyNow(true)}
          className="flex-1 brand-gradient text-[#12151A] font-extrabold py-3 rounded-xl text-sm text-center shadow-xs"
        >
          Buy Now
        </button>
      </div>

      {/* Make Offer Modal */}
      {showOffer && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowOffer(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-extrabold text-[#12151A] text-xl mb-1">Make an Offer</h2>
            <p className="text-xs text-gray-500 mb-5">Listed price: <strong className="text-[#12151A]">{formatPrice(listing.price)}</strong></p>

            {offerSent ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h3 className="font-extrabold text-lg text-[#12151A]">Offer Sent to Seller!</h3>
                <p className="text-xs text-gray-500 mt-1">The seller will review your offer of {formatPrice(Number(offerAmount))} and notify you shortly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Discount Suggestion Chips */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-2 block">Quick Offers:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {discountChips.map(chip => (
                      <button
                        key={chip.label}
                        onClick={() => setOfferAmount(chip.amount)}
                        className={`py-2 px-1 text-xs rounded-xl border font-bold transition-all text-center ${offerAmount === chip.amount ? 'border-[#FDB209] bg-[#FDB209]/20 text-[#12151A]' : 'border-[#E7E7E3] hover:border-gray-400 text-gray-700'}`}
                      >
                        <div>{chip.label}</div>
                        <div className="text-[10px] font-normal text-gray-500">{formatPrice(chip.amount)}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Offer Input */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Custom Offer Amount (₹):</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={offerAmount}
                      onChange={e => setOfferAmount(e.target.value ? Number(e.target.value) : '')}
                      className="w-full border border-[#E7E7E3] rounded-xl pl-9 pr-4 py-3 text-[#12151A] font-bold text-base outline-none focus:border-[#FDB209]"
                    />
                  </div>
                </div>

                {/* Message to Seller */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Optional note to seller:</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Can pick up today evening!"
                    value={offerNote}
                    onChange={e => setOfferNote(e.target.value)}
                    className="w-full border border-[#E7E7E3] rounded-xl p-3 text-xs outline-none focus:border-[#FDB209] resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowOffer(false)}
                    className="flex-1 border border-[#E7E7E3] text-gray-600 font-semibold py-3 rounded-xl hover:bg-[#F7F7F5]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendOffer}
                    disabled={!offerAmount}
                    className="flex-1 brand-gradient text-[#12151A] font-extrabold py-3 rounded-xl shadow-xs disabled:opacity-50"
                  >
                    Send Offer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Buy Now Checkout Modal */}
      {showBuyNow && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowBuyNow(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-extrabold text-[#12151A] text-xl mb-1 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Secure Checkout
            </h2>
            <p className="text-xs text-gray-500 mb-5">Protected by Used Q Guarantee</p>

            {buySuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h3 className="font-black text-xl text-[#12151A]">Order Placed Successfully!</h3>
                <p className="text-xs text-gray-500 mt-2">Order #UQ-{Math.floor(100000 + Math.random() * 900000)} has been created.</p>
                <p className="text-xs text-emerald-700 bg-emerald-50 p-3 rounded-xl mt-4 font-semibold">The seller has been notified to process your order.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Product Summary */}
                <div className="flex gap-3 bg-[#F7F7F5] p-3 rounded-2xl border border-[#E7E7E3]">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0">
                    <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs text-[#12151A] truncate">{listing.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Condition: {listing.condition}</div>
                    <div className="font-extrabold text-sm text-[#12151A] mt-1">{formatPrice(listing.price)}</div>
                  </div>
                </div>

                {/* Fulfillment Selection */}
                <div>
                  <label className="text-xs font-bold text-[#12151A] mb-2 block">Delivery Method:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDeliveryOption('shipping')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${deliveryOption === 'shipping' ? 'border-[#FDB209] bg-[#FDB209]/10' : 'border-[#E7E7E3]'}`}
                    >
                      <Truck className="w-4 h-4 text-[#FDB209] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-[#12151A]">Courier Shipping</div>
                        <div className="text-[10px] text-gray-500">₹149 • 2-3 Days</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setDeliveryOption('pickup')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${deliveryOption === 'pickup' ? 'border-[#FDB209] bg-[#FDB209]/10' : 'border-[#E7E7E3]'}`}
                    >
                      <MapPin className="w-4 h-4 text-[#FDB209] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-[#12151A]">Self Pickup</div>
                        <div className="text-[10px] text-gray-500">Free • Meet Seller</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Payment Option */}
                <div>
                  <label className="text-xs font-bold text-[#12151A] mb-2 block">Payment Method:</label>
                  <div className="space-y-2">
                    {[
                      { id: 'upi', label: 'UPI / GPay / PhonePe', desc: 'Instant 0% fee transaction' },
                      { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                      { id: 'cod', label: 'Pay on Pickup / Delivery', desc: 'Inspect first, pay later' },
                    ].map(pm => (
                      <label
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === pm.id ? 'border-[#FDB209] bg-[#FDB209]/10' : 'border-[#E7E7E3]'}`}
                      >
                        <div>
                          <div className="text-xs font-bold text-[#12151A]">{pm.label}</div>
                          <div className="text-[10px] text-gray-500">{pm.desc}</div>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === pm.id}
                          onChange={() => {}}
                          className="accent-[#FDB209]"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-[#E7E7E3] pt-3 text-xs space-y-1.5">
                  <div className="flex justify-between text-gray-600">
                    <span>Item Price</span>
                    <span>{formatPrice(listing.price)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Buyer Protection Fee</span>
                    <span>₹99</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>{deliveryOption === 'shipping' ? '₹149' : 'FREE'}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-sm text-[#12151A] border-t border-[#E7E7E3] pt-2">
                    <span>Total Amount</span>
                    <span>{formatPrice(listing.price + (deliveryOption === 'shipping' ? 149 : 0) + 99)}</span>
                  </div>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full brand-gradient text-[#12151A] font-extrabold py-3.5 rounded-xl shadow-md text-base"
                >
                  Confirm & Pay Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowMessageModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-extrabold text-[#12151A] text-xl mb-1 flex items-center gap-2">
              <Send className="w-5 h-5 text-[#FDB209]" />
              Message {listing.seller.name}
            </h2>
            <p className="text-xs text-gray-500 mb-4">Send a quick inquiry about this listing</p>

            {messageSent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-[#12151A]">Message Sent!</p>
                <p className="text-xs text-gray-500 mt-1">Redirecting to chat conversation...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-2 block">Quick Question Templates:</label>
                  <div className="space-y-1.5">
                    {quickPrompts.map(prompt => (
                      <button
                        key={prompt}
                        onClick={() => setQuickMessage(prompt)}
                        className={`w-full text-left text-xs p-2.5 rounded-xl border transition-all ${quickMessage === prompt ? 'border-[#FDB209] bg-[#FDB209]/15 font-semibold text-[#12151A]' : 'border-[#E7E7E3] hover:bg-[#F7F7F5] text-gray-700'}`}
                      >
                        "{prompt}"
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Your Message:</label>
                  <textarea
                    rows={3}
                    placeholder="Type your message here..."
                    value={quickMessage}
                    onChange={e => setQuickMessage(e.target.value)}
                    className="w-full border border-[#E7E7E3] rounded-xl p-3 text-xs outline-none focus:border-[#FDB209] resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 border border-[#E7E7E3] text-gray-600 font-semibold py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!quickMessage}
                    className="flex-1 brand-gradient text-[#12151A] font-extrabold py-3 rounded-xl disabled:opacity-50"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowReport(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-extrabold text-[#12151A] text-lg mb-1">Report Listing</h2>
            <p className="text-xs text-gray-500 mb-4">Help us keep Used Q safe for everyone.</p>

            {reportSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-[#12151A]">Report Received</p>
                <p className="text-xs text-gray-500 mt-1">Our moderation team will review this listing within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-5">
                  {['Fraud or scam', 'Fake or counterfeit product', 'Duplicate listing', 'Incorrect category or info', 'Inappropriate content', 'Suspicious seller profile'].map(r => (
                    <label key={r} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${reportReason === r ? 'border-red-500 bg-red-50/50' : 'border-[#E7E7E3] hover:bg-[#F7F7F5]'}`}>
                      <input
                        type="radio"
                        name="report"
                        checked={reportReason === r}
                        onChange={() => setReportReason(r)}
                        className="accent-red-500"
                      />
                      <span className="text-xs font-semibold text-[#12151A]">{r}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowReport(false)} className="flex-1 border border-[#E7E7E3] text-gray-600 font-semibold py-3 rounded-xl">
                    Cancel
                  </button>
                  <button
                    onClick={() => setReportSubmitted(true)}
                    disabled={!reportReason}
                    className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 disabled:opacity-50"
                  >
                    Submit Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Image Preview */}
      {fullScreen && listing.images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setFullScreen(false)}>
          <button className="absolute top-5 right-5 text-white w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40">
            <X className="w-6 h-6" />
          </button>

          <img
            src={listing.images[currentImg]}
            alt={listing.title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />

          <div className="absolute bottom-6 text-white text-xs font-semibold bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full">
            {currentImg + 1} / {listing.images.length}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import CategoryIcon from '../components/CategoryIcon';
import { CheckCircle2, Check, Lightbulb } from 'lucide-react';

const steps = ['Category', 'Details', 'Photos', 'Location', 'Preview'];
const conditions = ['Like New', 'Excellent', 'Good', 'Fair'] as const;

interface FormData {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  price: string;
  condition: string;
  brand: string;
  model: string;
  city: string;
  area: string;
  pincode: string;
  photos: string[];
}

export default function SellFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [form, setForm] = useState<FormData>({
    category: '', subcategory: '', title: '', description: '',
    price: '', condition: '', brand: '', model: '',
    city: '', area: '', pincode: '', photos: [],
  });

  const update = (field: keyof FormData, value: string | string[]) =>
    setForm(f => ({ ...f, [field]: value }));

  const selectedCategory = categories.find(c => c.id === form.category);

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => { setPublishing(false); setPublished(true); }, 1500);
  };

  if (published) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <CheckCircle2 className="w-16 h-16 text-[#FDB209] mb-6" />
        <h1 className="text-2xl font-extrabold text-[#12151A] mb-2">Listing Published!</h1>
        <p className="text-gray-500 text-center mb-8">Your listing is now live and visible to buyers near you.</p>
        <div className="flex gap-3">
          <Link to="/" className="border border-[#E7E7E3] text-[#12151A] font-semibold px-5 py-3 rounded-xl hover:bg-[#F7F7F5]">
            Go Home
          </Link>
          <Link to="/my-listings" className="brand-gradient text-[#12151A] font-bold px-5 py-3 rounded-xl">
            View My Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                i < step ? 'brand-gradient text-[#12151A]' :
                i === step ? 'bg-[#12151A] text-white' :
                'bg-[#F7F7F5] text-gray-400'
              }`}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-[#12151A]' : 'text-gray-400'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-[#FDB209]' : 'bg-[#E7E7E3]'}`} />}
            </div>
          ))}
        </div>

        {/* Step 0: Category */}
        {step === 0 && (
          <div>
            <h1 className="text-2xl font-extrabold text-[#12151A] mb-2">What are you selling?</h1>
            <p className="text-gray-500 text-sm mb-6">Choose the best category for your item</p>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { update('category', cat.id); update('subcategory', ''); }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                    form.category === cat.id
                      ? 'border-[#FDB209] bg-[#FDB209]/5'
                      : 'border-[#E7E7E3] hover:border-[#FDB209]/50 hover:bg-[#F7F7F5]'
                  }`}
                >
                  <CategoryIcon id={cat.id} className="w-6 h-6 text-gray-700" />
                  <span className="text-sm font-medium text-[#12151A]">{cat.name}</span>
                </button>
              ))}
            </div>

            {form.category && selectedCategory?.subcategories?.length && (
              <div className="mt-5">
                <p className="text-sm font-medium text-[#12151A] mb-3">Subcategory (optional)</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.subcategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => update('subcategory', sub)}
                      className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${form.subcategory === sub ? 'border-[#FDB209] bg-[#FDB209]/10 text-[#E98B00] font-semibold' : 'border-[#E7E7E3] text-gray-600 hover:border-[#FDB209]/50'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-extrabold text-[#12151A] mb-6">Product Details</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#12151A] mb-1.5">Title *</label>
                <input
                  type="text"
                  placeholder="e.g. iPhone 14 128GB Midnight Black"
                  value={form.title}
                  onChange={e => update('title', e.target.value)}
                  className="w-full border border-[#E7E7E3] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FDB209]"
                />
                <p className="text-xs text-gray-400 mt-1">{form.title.length}/80 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#12151A] mb-1.5">Price *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.price}
                    onChange={e => update('price', e.target.value)}
                    className="w-full border border-[#E7E7E3] rounded-xl pl-8 pr-4 py-3 text-sm outline-none focus:border-[#FDB209]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#12151A] mb-1.5">Condition *</label>
                <div className="grid grid-cols-2 gap-2">
                  {conditions.map(c => (
                    <button
                      key={c}
                      onClick={() => update('condition', c)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-all ${form.condition === c ? 'border-[#FDB209] bg-[#FDB209]/10 text-[#E98B00]' : 'border-[#E7E7E3] text-gray-600 hover:border-[#FDB209]/50'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#12151A] mb-1.5">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Apple"
                    value={form.brand}
                    onChange={e => update('brand', e.target.value)}
                    className="w-full border border-[#E7E7E3] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FDB209]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#12151A] mb-1.5">Model</label>
                  <input
                    type="text"
                    placeholder="e.g. iPhone 14"
                    value={form.model}
                    onChange={e => update('model', e.target.value)}
                    className="w-full border border-[#E7E7E3] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FDB209]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#12151A] mb-1.5">Description *</label>
                <textarea
                  placeholder="Describe your item — condition, age, what's included, reason for selling..."
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  rows={4}
                  className="w-full border border-[#E7E7E3] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FDB209] resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-extrabold text-[#12151A] mb-2">Add Photos</h1>
            <p className="text-gray-500 text-sm mb-6">Good photos get more enquiries. Add up to 10 photos.</p>

            <div className="grid grid-cols-3 gap-3">
              {/* Uploaded photos */}
              {['https://images.unsplash.com/photo-1675525494535-d2a39c76de78?w=200&h=200&fit=crop&auto=format'].map((url, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-[#F7F7F5] border border-[#E7E7E3]">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  {i === 0 && (
                    <div className="absolute bottom-1 left-1 bg-[#FDB209] text-[#12151A] text-[9px] font-bold px-1.5 py-0.5 rounded">Cover</div>
                  )}
                  <button className="absolute top-1 right-1 w-5 h-5 bg-black/50 text-white rounded-full flex items-center justify-center text-xs">×</button>
                </div>
              ))}

              {/* Upload button */}
              <button className="aspect-square rounded-xl border-2 border-dashed border-[#E7E7E3] flex flex-col items-center justify-center gap-1.5 hover:border-[#FDB209] hover:bg-[#FDB209]/5 transition-colors">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs text-gray-400">Add Photo</span>
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">• First photo is your cover image<br/>• Clear, well-lit photos attract more buyers</p>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-extrabold text-[#12151A] mb-6">Location</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#12151A] mb-1.5">City *</label>
                <select
                  value={form.city}
                  onChange={e => update('city', e.target.value)}
                  className="w-full border border-[#E7E7E3] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FDB209] bg-white"
                >
                  <option value="">Select city</option>
                  {['Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune', 'Coimbatore'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#12151A] mb-1.5">Area / Locality *</label>
                <input
                  type="text"
                  placeholder="e.g. Velachery, Koramangala"
                  value={form.area}
                  onChange={e => update('area', e.target.value)}
                  className="w-full border border-[#E7E7E3] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FDB209]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#12151A] mb-1.5">Pincode</label>
                <input
                  type="text"
                  placeholder="e.g. 600042"
                  value={form.pincode}
                  onChange={e => update('pincode', e.target.value)}
                  className="w-full border border-[#E7E7E3] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FDB209]"
                />
              </div>
              <button className="flex items-center gap-2 text-sm text-[#FDB209] font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Use current location
              </button>
              <p className="text-xs text-gray-400">Your exact address will not be shown publicly — only your city and area.</p>
            </div>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === 4 && (
          <div>
            <h1 className="text-2xl font-extrabold text-[#12151A] mb-2">Preview</h1>
            <p className="text-gray-500 text-sm mb-5">This is how your listing will appear to buyers.</p>

            <div className="border border-[#E7E7E3] rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-[#F7F7F5]">
                <img
                  src="https://images.unsplash.com/photo-1675525494535-d2a39c76de78?w=600&h=450&fit=crop&auto=format"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-xl font-extrabold text-[#12151A]">₹{parseInt(form.price || '0').toLocaleString('en-IN')}</div>
                <div className="font-semibold text-[#12151A] mt-1">{form.title || 'Your listing title'}</div>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <span className="text-xs bg-[#FDB209]/10 text-[#E98B00] font-semibold px-2 py-0.5 rounded-full">{form.condition || 'Condition'}</span>
                  <span>{form.area || 'Area'}, {form.city || 'City'}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mt-4 text-xs text-amber-700 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Your listing will be reviewed and go live within a few minutes.</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 border border-[#E7E7E3] text-[#12151A] font-semibold py-3.5 rounded-xl hover:bg-[#F7F7F5]"
            >
              Back
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={step === 0 && !form.category}
              className="flex-1 brand-gradient text-[#12151A] font-bold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex-1 brand-gradient text-[#12151A] font-bold py-3.5 rounded-xl hover:opacity-90 flex items-center justify-center gap-2"
            >
              {publishing ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#12151A] border-t-transparent rounded-full animate-spin" />
                  Publishing...
                </>
              ) : 'Publish Listing'}
            </button>
          )}
        </div>

        {step === 4 && (
          <button className="w-full text-sm text-gray-500 hover:text-[#12151A] py-3 mt-2">
            Save as Draft
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { sellers } from '../data/mockData';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { 
  ClipboardList, Heart, MessageSquare, Bell, User, Lock, KeyRound, UserX, 
  HelpCircle, FileText, Shield, Star
} from 'lucide-react';

const me = sellers[0];

const menuSections = [
  {
    title: 'My Activity',
    items: [
      { icon: ClipboardList, label: 'My Listings', to: '/my-listings' },
      { icon: Heart, label: 'Saved Listings', to: '/saved' },
      { icon: MessageSquare, label: 'Messages', to: '/messages' },
      { icon: Bell, label: 'Notifications', to: '/notifications' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Edit Profile', to: '/settings' },
      { icon: Lock, label: 'Privacy', to: '/settings' },
      { icon: KeyRound, label: 'Security', to: '/settings' },
      { icon: UserX, label: 'Blocked Users', to: '/settings' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help & Support', to: '/settings' },
      { icon: FileText, label: 'Terms of Use', to: '/settings' },
      { icon: Shield, label: 'Privacy Policy', to: '/settings' },
    ],
  },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8">
        {/* Profile card */}
        <div className="bg-white rounded-2xl p-5 mb-4 border border-[#E7E7E3]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-[#F7F7F5] shrink-0">
              {me.avatar ? (
                <img src={me.avatar} alt={me.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-[#12151A]">
                  {me.name[0]}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-[#12151A] text-lg">{me.name}</h2>
                {me.verified && (
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 font-semibold px-1.5 py-0.5 rounded-full">✓ Verified</span>
                )}
              </div>
              <p className="text-sm text-gray-500">{me.location} · Member since {me.memberSince}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex text-amber-500">
                  {Array.from({ length: Math.round(me.rating) }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">{me.rating} ({me.reviewCount} reviews)</span>
              </div>
            </div>
            <Link to="/settings" className="p-2 rounded-xl border border-[#E7E7E3] hover:bg-[#F7F7F5]">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#E7E7E3]">
            {[
              { label: 'Active', value: me.activeListings },
              { label: 'Sold', value: me.soldListings },
              { label: 'Reviews', value: me.reviewCount },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-extrabold text-[#12151A]">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sell CTA */}
        <Link
          to="/sell"
          className="flex items-center justify-center gap-2 brand-gradient text-[#12151A] font-bold py-3.5 rounded-2xl mb-4 hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Post a New Listing
        </Link>

        {/* Menu sections */}
        {menuSections.map(section => (
          <div key={section.title} className="mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-1.5">{section.title}</p>
            <div className="bg-white rounded-2xl border border-[#E7E7E3] overflow-hidden">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`flex items-center gap-3 px-4 py-3.5 hover:bg-[#F7F7F5] transition-colors ${i > 0 ? 'border-t border-[#E7E7E3]' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F7F7F5] flex items-center justify-center text-gray-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-[#12151A]">{item.label}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="w-full text-red-500 font-semibold text-sm py-4 hover:text-red-600 transition-colors">
          Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

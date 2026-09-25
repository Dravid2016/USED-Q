import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sellers } from '../data/mockData';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { 
  User, KeyRound, Smartphone, Bell, Globe, MapPin, 
  Lock, UserX, Shield, HelpCircle, PhoneCall, ClipboardList, FileText 
} from 'lucide-react';

const me = sellers[0];

type Section = 'main' | 'profile' | 'notifications' | 'privacy' | 'security';

export default function Settings() {
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>('main');
  const [notifPrefs, setNotifPrefs] = useState({
    messages: true,
    offers: true,
    priceChanges: true,
    dealReminders: true,
    marketing: false,
  });

  const toggle = (key: keyof typeof notifPrefs) =>
    setNotifPrefs(p => ({ ...p, [key]: !p[key] }));

  if (section === 'profile') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
          <button onClick={() => setSection('main')} className="flex items-center gap-2 text-sm text-gray-500 mb-5 hover:text-[#12151A]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Settings
          </button>
          <h1 className="text-xl font-bold text-[#12151A] mb-5">Edit Profile</h1>
          <div className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[#F7F7F5] mb-3">
                {me.avatar && <img src={me.avatar} alt="" className="w-full h-full object-cover" />}
              </div>
              <button className="text-sm font-medium text-[#FDB209] hover:underline">Change Photo</button>
            </div>
            {[
              { label: 'Full Name', value: me.name, type: 'text' },
              { label: 'Email', value: 'arjun@email.com', type: 'email' },
              { label: 'Phone', value: '+91 98765 43210', type: 'tel' },
              { label: 'City', value: me.location, type: 'text' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-[#12151A] mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  defaultValue={f.value}
                  className="w-full border border-[#E7E7E3] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FDB209]"
                />
              </div>
            ))}
            <button className="w-full brand-gradient text-[#12151A] font-bold py-3.5 rounded-xl mt-2">
              Save Changes
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (section === 'notifications') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
          <button onClick={() => setSection('main')} className="flex items-center gap-2 text-sm text-gray-500 mb-5 hover:text-[#12151A]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Settings
          </button>
          <h1 className="text-xl font-bold text-[#12151A] mb-5">Notifications</h1>
          <div className="bg-white border border-[#E7E7E3] rounded-2xl overflow-hidden">
            {Object.entries(notifPrefs).map(([key, val], i) => {
              const labels: Record<string, string> = {
                messages: 'New Messages',
                offers: 'Offers & Negotiations',
                priceChanges: 'Price Changes on Saved',
                dealReminders: 'Deal Reminders',
                marketing: 'Promotions & Tips',
              };
              return (
                <div key={key} className={`flex items-center justify-between px-4 py-3.5 ${i > 0 ? 'border-t border-[#E7E7E3]' : ''}`}>
                  <span className="text-sm font-medium text-[#12151A]">{labels[key]}</span>
                  <button
                    onClick={() => toggle(key as keyof typeof notifPrefs)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${val ? 'bg-[#FDB209]' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-transform shadow ${val ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Main settings
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', action: () => setSection('profile') },
        { icon: KeyRound, label: 'Change Password', action: () => {} },
        { icon: Smartphone, label: 'Verify Phone', action: () => {} },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notification Settings', action: () => setSection('notifications') },
        { icon: Globe, label: 'Language', action: () => {} },
        { icon: MapPin, label: 'Location Settings', action: () => {} },
      ],
    },
    {
      title: 'Safety',
      items: [
        { icon: Lock, label: 'Privacy Settings', action: () => setSection('privacy') },
        { icon: UserX, label: 'Blocked Users', action: () => {} },
        { icon: Shield, label: 'Trust & Safety', action: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', action: () => {} },
        { icon: PhoneCall, label: 'Contact Support', action: () => {} },
        { icon: ClipboardList, label: 'Terms of Use', action: () => {} },
        { icon: FileText, label: 'Privacy Policy', action: () => {} },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8">
        <h1 className="text-xl font-bold text-[#12151A] mb-5">Settings</h1>

        {settingsSections.map(section => (
          <div key={section.title} className="mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-1.5">{section.title}</p>
            <div className="bg-white rounded-2xl border border-[#E7E7E3] overflow-hidden">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#F7F7F5] transition-colors text-left ${i > 0 ? 'border-t border-[#E7E7E3]' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F7F7F5] flex items-center justify-center text-gray-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-[#12151A]">{item.label}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Danger zone */}
        <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-red-700 mb-3">Danger Zone</h3>
          <button className="w-full text-sm text-red-600 font-semibold border border-red-200 py-3 rounded-xl hover:bg-red-100 transition-colors">
            Delete Account
          </button>
        </div>

        <button onClick={() => navigate(-1)} className="w-full text-sm text-gray-500 py-4 mt-2 hover:text-red-500">
          Log Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

import { useState } from 'react';
import { notifications } from '../data/mockData';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import type { Notification } from '../data/mockData';
import { 
  MessageSquare, Tag, CheckCircle2, XCircle, TrendingDown, 
  Sparkles, CheckCircle, Calendar, ShieldCheck, Bell 
} from 'lucide-react';

const typeIconMap = {
  message: { icon: MessageSquare, color: 'text-blue-500 bg-blue-50' },
  offer: { icon: Tag, color: 'text-amber-600 bg-amber-50' },
  offer_accepted: { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
  offer_rejected: { icon: XCircle, color: 'text-red-500 bg-red-50' },
  price_change: { icon: TrendingDown, color: 'text-purple-600 bg-purple-50' },
  listing_sold: { icon: Sparkles, color: 'text-amber-500 bg-amber-50' },
  listing_approved: { icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
  deal_reminder: { icon: Calendar, color: 'text-indigo-600 bg-indigo-50' },
  safety: { icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50' },
};

export default function Notifications() {
  const [items, setItems] = useState(notifications);

  const markAllRead = () => setItems(n => n.map(x => ({ ...x, read: true })));
  const markRead = (id: string) => setItems(n => n.map(x => x.id === id ? { ...x, read: true } : x));

  const unreadCount = items.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-[#12151A]">Notifications</h1>
            {unreadCount > 0 && <p className="text-sm text-gray-500">{unreadCount} unread</p>}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-sm font-medium text-[#FDB209] hover:underline">
              Mark all read
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-[#12151A] mb-1">No notifications yet</h3>
            <p className="text-sm text-gray-500">We'll notify you about messages, offers, and deals.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {items.map(notif => {
              const IconData = typeIconMap[notif.type] || typeIconMap.message;
              const IconComp = IconData.icon;
              return (
                <button
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={`w-full flex items-start gap-3 p-4 rounded-2xl text-left transition-colors ${notif.read ? 'bg-white hover:bg-[#F7F7F5]' : 'bg-[#FDB209]/5 hover:bg-[#FDB209]/10'}`}
                >
                  {/* Icon or avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${IconData.color}`}>
                    {notif.avatar ? (
                      <img src={notif.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <IconComp className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className={`text-sm leading-snug ${notif.read ? 'text-gray-700' : 'text-[#12151A] font-semibold'}`}>
                      {notif.title}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.body}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{notif.time}</span>
                  </div>

                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full brand-gradient mt-1.5 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

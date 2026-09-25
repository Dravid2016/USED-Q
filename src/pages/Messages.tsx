import { useState } from 'react';
import { Link } from 'react-router-dom';
import { conversations, formatPrice } from '../data/mockData';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { MessageSquare } from 'lucide-react';
import type { Conversation, Message } from '../data/mockData';

function OfferCard({ offer, isOwn }: { offer: NonNullable<Message['offer']>; isOwn: boolean }) {
  const statusColors = {
    pending: 'bg-amber-50 border-amber-200 text-amber-800',
    accepted: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    rejected: 'bg-red-50 border-red-200 text-red-700',
    countered: 'bg-blue-50 border-blue-200 text-blue-800',
    expired: 'bg-gray-100 border-gray-200 text-gray-600',
  };
  const statusLabel = { pending: 'Pending', accepted: '✓ Accepted', rejected: '✕ Rejected', countered: 'Countered', expired: 'Expired' };

  return (
    <div className={`border rounded-2xl p-4 w-56 ${statusColors[offer.status]}`}>
      <div className="text-xs font-semibold mb-1 opacity-70">{offer.fromBuyer ? 'Offer from Buyer' : 'Counter from Seller'}</div>
      <div className="text-xl font-extrabold">{formatPrice(offer.amount)}</div>
      <div className="text-xs mt-1 font-semibold">{statusLabel[offer.status]}</div>
      {!isOwn && offer.status === 'pending' && (
        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-emerald-500 text-white text-xs font-semibold py-1.5 rounded-lg">Accept</button>
          <button className="flex-1 border border-current text-xs font-semibold py-1.5 rounded-lg">Counter</button>
        </div>
      )}
    </div>
  );
}

function ChatView({ convo, onBack }: { convo: Conversation; onBack: () => void }) {
  const [text, setText] = useState('');
  const [showOffer, setShowOffer] = useState(false);
  const [offerAmt, setOfferAmt] = useState('');

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E7E7E3] bg-white">
        <button onClick={onBack} className="md:hidden p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F7F7F5] shrink-0">
          {convo.otherUser.avatar && <img src={convo.otherUser.avatar} alt="" className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[#12151A] text-sm">{convo.otherUser.name}</div>
          <div className="text-xs text-gray-500">Online</div>
        </div>
        <Link
          to={`/listing/${convo.listing.id}`}
          className="flex items-center gap-2 border border-[#E7E7E3] rounded-xl px-3 py-1.5 hover:bg-[#F7F7F5] shrink-0"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#F7F7F5]">
            {convo.listing.images[0] && <img src={convo.listing.images[0]} alt="" className="w-full h-full object-cover" />}
          </div>
          <div className="text-xs">
            <div className="font-semibold text-[#12151A] line-clamp-1 max-w-[80px]">{convo.listing.title}</div>
            <div className="text-[#FDB209] font-bold">{formatPrice(convo.listing.price)}</div>
          </div>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F7F7F5]">
        {convo.messages.map(msg => {
          const isOwn = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              {!isOwn && (
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 mr-2 mt-auto shrink-0">
                  {convo.otherUser.avatar && <img src={convo.otherUser.avatar} alt="" className="w-full h-full object-cover" />}
                </div>
              )}
              <div>
                {msg.type === 'offer' && msg.offer ? (
                  <OfferCard offer={msg.offer} isOwn={isOwn} />
                ) : (
                  <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${isOwn ? 'bg-[#12151A] text-white rounded-br-sm' : 'bg-white text-[#12151A] rounded-bl-sm border border-[#E7E7E3]'}`}>
                    {msg.text}
                  </div>
                )}
                <div className={`text-[10px] text-gray-400 mt-1 ${isOwn ? 'text-right' : ''}`}>
                  {msg.timestamp} {isOwn && (msg.read ? '✓✓' : '✓')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-[#E7E7E3] bg-white">
        {showOffer && (
          <div className="mb-3 p-3 bg-[#F7F7F5] rounded-xl flex items-center gap-2">
            <span className="text-sm text-gray-500">Offer:</span>
            <span className="text-gray-500 font-semibold">₹</span>
            <input
              type="number"
              placeholder="Amount"
              value={offerAmt}
              onChange={e => setOfferAmt(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm font-semibold text-[#12151A]"
            />
            <button className="text-xs brand-gradient text-[#12151A] font-bold px-3 py-1.5 rounded-lg">Send</button>
            <button onClick={() => setShowOffer(false)} className="text-xs text-gray-400 px-2">Cancel</button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOffer(s => !s)}
            className="p-2.5 rounded-xl border border-[#E7E7E3] text-gray-500 hover:border-[#FDB209] hover:text-[#FDB209]"
            title="Make offer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#F7F7F5] border border-[#E7E7E3] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#FDB209]"
          />
          <button
            disabled={!text.trim()}
            className="w-10 h-10 brand-gradient rounded-xl flex items-center justify-center disabled:opacity-40"
          >
            <svg className="w-4 h-4 text-[#12151A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 max-w-[1320px] mx-auto w-full px-4 lg:px-6 py-6 pb-24 md:pb-8">
        <div className="flex h-[calc(100vh-160px)] bg-white border border-[#E7E7E3] rounded-2xl overflow-hidden">
          {/* Conversation list */}
          <div className={`${activeConvo ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-[#E7E7E3]`}>
            <div className="p-4 border-b border-[#E7E7E3]">
              <h2 className="font-bold text-[#12151A] text-lg">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No messages yet</p>
                </div>
              ) : (
                conversations.map(convo => (
                  <button
                    key={convo.id}
                    onClick={() => setActiveConvo(convo)}
                    className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-[#F7F7F5] transition-colors text-left border-b border-[#E7E7E3]/50 ${activeConvo?.id === convo.id ? 'bg-[#FDB209]/5 border-l-2 border-l-[#FDB209]' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F7F7F5] shrink-0">
                      {convo.otherUser.avatar && <img src={convo.otherUser.avatar} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${convo.unread > 0 ? 'font-bold text-[#12151A]' : 'font-medium text-gray-700'}`}>{convo.otherUser.name}</span>
                        <span className="text-[10px] text-gray-400">{convo.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{convo.lastMessage}</p>
                      <p className="text-[10px] text-[#FDB209] font-medium truncate mt-0.5 line-clamp-1">{convo.listing.title}</p>
                    </div>
                    {convo.unread > 0 && (
                      <span className="w-5 h-5 brand-gradient rounded-full text-[10px] font-bold text-[#12151A] flex items-center justify-center shrink-0">
                        {convo.unread}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className={`${!activeConvo ? 'hidden md:flex' : 'flex'} flex-col flex-1`}>
            {activeConvo ? (
              <ChatView convo={activeConvo} onBack={() => setActiveConvo(null)} />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-[#12151A] mb-1">Select a conversation</h3>
                <p className="text-sm text-gray-500">Choose a conversation from the list to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

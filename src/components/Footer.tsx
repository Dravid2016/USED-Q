import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

interface FooterProps {
  dark?: boolean;
}

export default function Footer({ dark = false }: FooterProps) {
  return (
    <footer className={`text-white mt-20 relative z-10 ${dark ? 'bg-[#0B0B0D]/90 border-t border-gray-800' : 'bg-[#12151A]'}`}>
      <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block bg-white px-3.5 py-1.5 rounded-2xl mb-3 shadow-md hover:opacity-95 transition-opacity">
              <img src={logo} alt="UsedQ" className="h-7 w-auto object-contain" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Buy Used. Sell Smart. India's modern marketplace for pre-owned products.
            </p>
            <div className="flex gap-2.5">
              {['Twitter', 'Instagram', 'Facebook'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-[#FDB209] hover:text-[#12151A] transition-all text-xs font-bold shadow-sm">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Buy */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Buy</h3>
            <ul className="space-y-2">
              {['Browse Listings', 'Categories', 'Nearby Listings', 'Featured', 'Safety Tips'].map(l => (
                <li key={l}><Link to="/search" className="text-sm text-gray-400 hover:text-[#FDB209] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Sell</h3>
            <ul className="space-y-2">
              {['Post a Listing', 'My Listings', 'Seller Tips', 'Pricing Guide', 'Sell Faster'].map(l => (
                <li key={l}><Link to="/sell" className="text-sm text-gray-400 hover:text-[#FDB209] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Company</h3>
            <ul className="space-y-2">
              {['About USEDQ', 'Careers', 'Press', 'Trust & Safety', 'Help Center', 'Contact Us'].map(l => (
                <li key={l}><a href="#" className="text-sm text-gray-400 hover:text-[#FDB209] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© 2024 USEDQ. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

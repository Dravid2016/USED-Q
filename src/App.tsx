import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import ListingDetail from './pages/ListingDetail';
import SellFlow from './pages/SellFlow';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import MyListings from './pages/MyListings';
import Settings from './pages/Settings';
import SellerProfile from './pages/SellerProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/sell" element={<SellFlow />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/seller/:id" element={<SellerProfile />} />
        <Route path="/categories" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

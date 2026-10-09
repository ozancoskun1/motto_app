import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, SlidersHorizontal } from 'lucide-react';
import mottoLogo from '../../assets/images/motto_logo.jpg';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    setShowFilterModal,
    likesYou,
    matches,
    setSelectedMatchId
  } = useApp();

  const totalUnreadMessages = matches.reduce((acc, m) => acc + (m.unreadCount || 0), 0);

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/10 px-4 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Official Logo (Motto yazmaya gerek yok, logoda yazıyor) */}
        <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
          <button 
            onClick={() => { setActiveTab('discover'); setSelectedMatchId(null); }}
            className="flex items-center gap-2 group text-left cursor-pointer"
            title="Motto Keşif"
          >
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-white/25 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform bg-[#070A18]">
              <img
                src={mottoLogo}
                alt="Motto"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
              18+
            </span>
          </button>
        </div>

        {/* Zone 2: Desktop Navigation Links (Profil, Keşfet, Mesaj, Like Atanlar) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => { setActiveTab('profile'); setSelectedMatchId(null); }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'text-white font-semibold border-b-2 border-[#22D3EE]' : 'hover:text-white'
            }`}
          >
            <span>Profil</span>
            {currentUser?.verifiedPhoto && (
              <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
            )}
          </button>

          <button
            onClick={() => { setActiveTab('discover'); setSelectedMatchId(null); }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'discover' ? 'text-white font-semibold border-b-2 border-[#22D3EE]' : 'hover:text-white'
            }`}
          >
            <span>Keşfet</span>
          </button>

          <button
            onClick={() => { setActiveTab('matches'); }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'matches' ? 'text-white font-semibold border-b-2 border-[#22D3EE]' : 'hover:text-white'
            }`}
          >
            <span>Mesaj</span>
            {totalUnreadMessages > 0 && (
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#22D3EE] text-slate-950 font-bold">
                {totalUnreadMessages}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('likes'); setSelectedMatchId(null); }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'likes' ? 'text-white font-semibold border-b-2 border-[#22D3EE]' : 'hover:text-white'
            }`}
          >
            <span>Like Atanlar</span>
            {likesYou.length > 0 && (
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#FB7185]/20 text-[#FB7185] font-bold">
                {likesYou.length}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Sağ Üstte Sadece Filtre Butonu ("Başka ayar olmasın") */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold text-cyan-300 shadow-md shadow-cyan-950/40 transition-all cursor-pointer active:scale-95"
            title="Keşif Filtreleri"
          >
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>Filtrele</span>
          </button>
        </div>
      </div>
    </header>
  );
};

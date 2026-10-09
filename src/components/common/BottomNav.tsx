import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Heart, MessageCircle, User, ShieldCheck } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    likesYou, 
    matches, 
    currentUser, 
    setSelectedMatchId 
  } = useApp();

  const totalUnreadMessages = matches.reduce((acc, m) => acc + (m.unreadCount || 0), 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-dock border-t border-white/10 px-3 py-2 pb-safe shadow-2xl">
      <div className="grid grid-cols-4 items-center max-w-md mx-auto">
        {/* 1. Profil */}
        <button
          onClick={() => { setActiveTab('profile'); setSelectedMatchId(null); }}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-[#22D3EE] scale-105 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <User className="w-5 h-5" />
            {currentUser?.verifiedPhoto && (
              <ShieldCheck className="w-3 h-3 text-[#22D3EE] absolute -bottom-0.5 -right-1 bg-slate-900 rounded-full" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Profil</span>
        </button>

        {/* 2. Keşfet */}
        <button
          onClick={() => { setActiveTab('discover'); setSelectedMatchId(null); }}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'discover' ? 'text-[#22D3EE] scale-105 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight mt-1">Keşfet</span>
        </button>

        {/* 3. Mesaj */}
        <button
          onClick={() => { setActiveTab('matches'); }}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'matches' ? 'text-[#3B82F6] scale-105 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            {totalUnreadMessages > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-[#22D3EE] text-slate-950 text-[9px] font-bold">
                {totalUnreadMessages}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Mesaj</span>
        </button>

        {/* 4. Like Atanlar */}
        <button
          onClick={() => { setActiveTab('likes'); setSelectedMatchId(null); }}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'likes' ? 'text-[#FB7185] scale-105 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {likesYou.length > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-[#FB7185] text-white text-[9px] font-bold">
                {likesYou.length}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 truncate">Like Atanlar</span>
        </button>
      </div>
    </nav>
  );
};

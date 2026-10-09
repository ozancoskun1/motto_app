import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MessageCircle, Heart, X, Send } from 'lucide-react';

export const MatchCelebrationModal: React.FC = () => {
  const { 
    matchedUserProfile, 
    setMatchedUserProfile, 
    currentUser, 
    setSelectedMatchId, 
    setActiveTab,
    matches,
    handleSendMessage 
  } = useApp();

  if (!matchedUserProfile) return null;

  const currentMatchRecord = matches.find(m => m.user.id === matchedUserProfile.id);

  const handleStartChat = (initialText?: string) => {
    if (currentMatchRecord) {
      if (initialText) {
        handleSendMessage(currentMatchRecord.id, initialText);
      }
      setSelectedMatchId(currentMatchRecord.id);
      setActiveTab('matches');
    }
    setMatchedUserProfile(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setMatchedUserProfile(null)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Floating Sparks Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#3B82F6] via-[#22D3EE] to-[#FB7185] flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/30">
          <Sparkles className="w-7 h-7 text-white" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white tracking-tight">Yeni Bir Vibe!</h2>
          <p className="text-xs text-cyan-300 font-medium">
            Sen ve {matchedUserProfile.name} birbirinizi beğendiniz!
          </p>
        </div>

        {/* Side by side / overlapping avatars */}
        <div className="flex items-center justify-center -space-x-4 py-2">
          <div className="w-20 h-20 rounded-full border-4 border-[#070A18] overflow-hidden shadow-2xl z-10">
            <img
              src={currentUser?.photos[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt="Sen"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-[#070A18] overflow-hidden shadow-2xl z-20">
            <img
              src={matchedUserProfile.photos[0]}
              alt={matchedUserProfile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Quick icebreakers */}
        <div className="space-y-2 text-left">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
            Buz Kırıcı Cümle Seç:
          </div>
          <button
            onClick={() => handleStartChat('Selam! Harika bir müzik ve kahve zevkin var ✨')}
            className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-200 transition-colors text-left flex items-center justify-between cursor-pointer"
          >
            <span className="truncate">"Harika bir müzik ve kahve zevkin var ✨"</span>
            <Send className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          </button>
          <button
            onClick={() => handleStartChat('Selam! Hafta sonu sergi veya kahve turuna ne dersin? ☕️')}
            className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-200 transition-colors text-left flex items-center justify-between cursor-pointer"
          >
            <span className="truncate">"Hafta sonu kahve turuna ne dersin? ☕️"</span>
            <Send className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          </button>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => handleStartChat()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-black text-xs hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <MessageCircle className="w-4 h-4 text-slate-950" />
            <span>Sohbete Başla</span>
          </button>

          <button
            onClick={() => setMatchedUserProfile(null)}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold hover:text-white cursor-pointer"
          >
            Keşfe Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};

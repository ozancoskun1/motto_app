import React from 'react';
import { useApp } from '../../context/AppContext';
import { INTENT_LABELS } from '../../data/mockData';
import { Heart, Crown, Lock, Sparkles, MapPin, ShieldCheck } from 'lucide-react';

export const LikesScreen: React.FC = () => {
  const { 
    currentUser, 
    likesYou, 
    setShowProModal, 
    setProModalReason, 
    handleSwipe,
    setSelectedProfileDetail 
  } = useApp();

  const isUnlocked = currentUser?.tier === 'pro' || currentUser?.tier === 'promax';

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 pb-24 md:pb-12 space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Seni Beğenenler</h1>
            <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-[#FB7185] border border-pink-500/30 text-xs font-bold">
              {likesYou.length} Kişi
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isUnlocked 
              ? 'Tüm profiller açık! Beğendiğin kişiye anında karşılık vererek eşleş.'
              : 'Seni beğenen gizli hayranları net görmek ve anında eşleşmek için Pro’ya geç.'}
          </p>
        </div>

        {!isUnlocked && (
          <button
            onClick={() => {
              setProModalReason('Seni beğenen tüm kişilerin fotoğraflarını net görmek ve anında eşleşmek için Pro veya Pro Max paketini seç!');
              setShowProModal(true);
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Crown className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>Beğenenleri Aç (Pro)</span>
          </button>
        )}
      </div>

      {/* Grid of Profiles */}
      {likesYou.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-white/10 space-y-3">
          <Heart className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Henüz Yeni Beğeni Yok</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Profilini güncel tut ve Keşif'te aktif ol; yeni vibe'lar kısa sürede burada görünecek!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {likesYou.map((profile) => (
            <div
              key={profile.id}
              className="group relative rounded-2xl overflow-hidden glass-card border border-white/10 aspect-[3/4] flex flex-col justify-end shadow-xl transition-all"
            >
              {/* Profile Image (Blurred if Free, crisp if Pro) */}
              <div className="absolute inset-0">
                <img
                  src={profile.photos[0]}
                  alt="Beğenen Kullanıcı"
                  className={`w-full h-full object-cover transition-all ${
                    isUnlocked 
                      ? 'filter-none group-hover:scale-105 duration-300' 
                      : 'blur-lg scale-110 opacity-70'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A18] via-[#070A18]/40 to-transparent" />
              </div>

              {/* Locked Blur Overlay for Free Tier */}
              {!isUnlocked && (
                <div 
                  onClick={() => {
                    setProModalReason(`Bu profili (${profile.university || 'Üniversite öğrencisi'}) ve seni beğenen diğer ${likesYou.length} kişiyi net görmek için Pro’ya geç!`);
                    setShowProModal(true);
                  }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center p-3 text-center cursor-pointer bg-slate-950/20 hover:bg-slate-950/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-900/80 border border-white/20 flex items-center justify-center text-yellow-400 mb-2 shadow-lg">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white tracking-wide">Fotoğrafı Aç</span>
                  <span className="text-[10px] text-cyan-300 font-medium mt-0.5">{profile.distanceKm} km · {profile.university?.split(' ')[0] || 'Öğrenci'}</span>
                </div>
              )}

              {/* Profile Info Card Footer */}
              <div className="relative z-10 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-white">
                      {isUnlocked ? profile.name : 'Gizli Vibe'}, {profile.age}
                    </span>
                    {profile.verifiedPhoto && isUnlocked && (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-300">
                  <MapPin className="w-3 h-3 text-[#22D3EE]" />
                  <span>{profile.distanceKm} km yakınında</span>
                </div>

                {isUnlocked && (
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleSwipe(profile.id, 'like')}
                      className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-slate-950 font-bold text-xs flex items-center justify-center gap-1 hover:opacity-90 cursor-pointer shadow-md"
                    >
                      <Heart className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Eşleş</span>
                    </button>
                    <button
                      onClick={() => setSelectedProfileDetail(profile)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                      title="Profili Gör"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

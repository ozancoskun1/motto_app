import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';
import { INTENT_LABELS } from '../../data/mockData';
import { 
  Heart, 
  X, 
  Star, 
  RotateCcw, 
  Zap, 
  Info, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Music, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

export const DiscoverScreen: React.FC = () => {
  const { 
    profiles, 
    currentUser, 
    handleSwipe, 
    handleUndo, 
    setSelectedProfileDetail,
    setShowProModal,
    setProModalReason,
    setShowFilterModal,
    filters,
    handleReloadProfiles
  } = useApp();

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);

  // Drag motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);
  const opacityLike = useTransform(x, [20, 140], [0, 1]);
  const opacityPass = useTransform(x, [-20, -140], [0, 1]);
  const opacitySuper = useTransform(y, [-20, -120], [0, 1]);

  // Filter profiles based on current user filters
  const filteredProfiles = profiles.filter(p => {
    // 1. Cinsiyet filtresi (en önemlisi)
    if (filters.gender === 'women' && p.gender !== 'woman') return false;
    if (filters.gender === 'men' && p.gender !== 'man') return false;
    // 2. Yaş filtresi (18+)
    if (p.age < filters.minAge || p.age > filters.maxAge) return false;
    // 3. Mesafe ve Şehir filtresi
    if (p.distanceKm > filters.maxDistanceKm) return false;
    if (filters.city && filters.city !== 'Tüm Şehirler' && p.city !== filters.city) return false;
    // 4. Kullanım amacı / niyet filtresi
    if (filters.intents.length > 0 && !filters.intents.includes(p.intent)) return false;
    // 5. Doğrulanmış profil filtresi
    if (filters.verifiedOnly && !p.verifiedPhoto) return false;
    return true;
  });

  const activeCard: UserProfile | undefined = filteredProfiles[0];

  const handleDragEnd = (_: any, info: any) => {
    if (!activeCard) return;
    const thresholdX = 110;
    const thresholdY = -110;

    if (info.offset.y < thresholdY && Math.abs(info.offset.x) < 80) {
      // Super Vibe (Up)
      setSwipeDirection('up');
      setTimeout(() => {
        handleSwipe(activeCard.id, 'super');
        setSwipeDirection(null);
        setCurrentPhotoIndex(0);
      }, 150);
    } else if (info.offset.x > thresholdX) {
      // Like (Right)
      setSwipeDirection('right');
      setTimeout(() => {
        handleSwipe(activeCard.id, 'like');
        setSwipeDirection(null);
        setCurrentPhotoIndex(0);
      }, 150);
    } else if (info.offset.x < -thresholdX) {
      // Pass (Left)
      setSwipeDirection('left');
      setTimeout(() => {
        handleSwipe(activeCard.id, 'pass');
        setSwipeDirection(null);
        setCurrentPhotoIndex(0);
      }, 150);
    }
  };

  const handleButtonClick = (type: 'pass' | 'super' | 'like') => {
    if (!activeCard) return;
    setSwipeDirection(type === 'pass' ? 'left' : type === 'like' ? 'right' : 'up');
    setTimeout(() => {
      handleSwipe(activeCard.id, type);
      setSwipeDirection(null);
      setCurrentPhotoIndex(0);
    }, 180);
  };

  // Next/prev photo within card
  const handlePhotoNav = (e: React.MouseEvent, direction: 'prev' | 'next') => {
    e.stopPropagation();
    if (!activeCard) return;
    if (direction === 'next') {
      setCurrentPhotoIndex((prev) => (prev + 1) % activeCard.photos.length);
    } else {
      setCurrentPhotoIndex((prev) => (prev - 1 + activeCard.photos.length) % activeCard.photos.length);
    }
  };

  const remainingSwipes = currentUser 
    ? Math.max(0, currentUser.dailySwipeLimit - currentUser.dailySwipesCount)
    : 50;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-between min-h-[calc(100vh-4.5rem)] pb-20 md:pb-8 pt-2 px-3 sm:px-4">
      {/* Top micro bar: Daily swipe counter + Quick filters */}
      <div className="w-full flex items-center justify-between px-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-white/10 text-xs font-semibold text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Kalan Swipe:</span>
            <span className={`font-mono font-bold ${remainingSwipes <= 5 ? 'text-pink-400' : 'text-cyan-400'}`}>
              {currentUser?.tier === 'promax' ? '∞' : remainingSwipes}
            </span>
          </div>

          {currentUser?.tier === 'free' && remainingSwipes <= 10 && (
            <button
              onClick={() => {
                setProModalReason('Swipe hakkın tükenmek üzere! Kesintisiz sohbet ve eşleşme için Pro Max’e yüksel.');
                setShowProModal(true);
              }}
              className="text-[11px] font-bold text-yellow-400 hover:underline cursor-pointer"
            >
              Yükselt
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900/60 border border-white/5 cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filtre</span>
        </button>
      </div>

      {/* Main Card Container */}
      <div className="relative w-full h-[540px] sm:h-[580px] flex items-center justify-center">
        <AnimatePresence>
          {activeCard ? (
            <motion.div
              key={activeCard.id}
              style={{ x, y, rotate }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              animate={
                swipeDirection === 'right'
                  ? { x: 500, opacity: 0, rotate: 25 }
                  : swipeDirection === 'left'
                  ? { x: -500, opacity: 0, rotate: -25 }
                  : swipeDirection === 'up'
                  ? { y: -500, opacity: 0 }
                  : { x: 0, y: 0, opacity: 1, rotate: 0 }
              }
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute w-full h-full rounded-3xl overflow-hidden glass-card shadow-2xl border border-white/15 cursor-grab active:cursor-grabbing select-none"
            >
              {/* Background Photo */}
              <div className="relative w-full h-full">
                <img
                  src={activeCard.photos[currentPhotoIndex] || activeCard.photos[0]}
                  alt={activeCard.name}
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Photo pagination dots */}
                {activeCard.photos.length > 1 && (
                  <div className="absolute top-3 left-4 right-4 flex gap-1.5 z-20">
                    {activeCard.photos.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          idx === currentPhotoIndex ? 'bg-white shadow-sm' : 'bg-white/30 backdrop-blur-xs'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Left/Right click zones for cycling photos */}
                {activeCard.photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => handlePhotoNav(e, 'prev')}
                      className="absolute top-0 bottom-1/3 left-0 w-1/3 z-10 opacity-0"
                      aria-label="Önceki fotoğraf"
                    />
                    <button
                      type="button"
                      onClick={(e) => handlePhotoNav(e, 'next')}
                      className="absolute top-0 bottom-1/3 right-0 w-1/3 z-10 opacity-0"
                      aria-label="Sonraki fotoğraf"
                    />
                  </>
                )}

                {/* Swipe Stamp Overlays */}
                <motion.div
                  style={{ opacity: opacityLike }}
                  className="absolute top-8 left-8 z-30 pointer-events-none transform -rotate-12 px-4 py-1.5 rounded-2xl border-3 border-[#22D3EE] bg-cyan-950/80 backdrop-blur-md text-[#22D3EE] font-black text-2xl tracking-wider shadow-xl shadow-cyan-500/30"
                >
                  VIBE ✨
                </motion.div>

                <motion.div
                  style={{ opacity: opacityPass }}
                  className="absolute top-8 right-8 z-30 pointer-events-none transform rotate-12 px-4 py-1.5 rounded-2xl border-3 border-[#FB7185] bg-rose-950/80 backdrop-blur-md text-[#FB7185] font-black text-2xl tracking-wider shadow-xl shadow-rose-500/30"
                >
                  GEÇ ✕
                </motion.div>

                <motion.div
                  style={{ opacity: opacitySuper }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-5 py-2 rounded-2xl border-3 border-yellow-400 bg-amber-950/80 backdrop-blur-md text-yellow-300 font-black text-2xl tracking-wider shadow-xl shadow-yellow-500/30"
                >
                  SUPER VIBE ⭐
                </motion.div>

                {/* Dark Vignette / Contrast Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A18] via-[#070A18]/60 to-transparent opacity-95 pointer-events-none" />

                {/* Card Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 space-y-3 pointer-events-auto">
                  {/* Name, Age, Verification */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">
                        {activeCard.name}, <span className="font-normal text-slate-200">{activeCard.age}</span>
                      </h2>
                      {activeCard.verifiedPhoto && (
                        <div title="Yüzü ve kimliği doğrulanmış profil" className="flex items-center">
                          <ShieldCheck className="w-5 h-5 text-[#22D3EE] fill-[#22D3EE]/20" />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProfileDetail(activeCard)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
                      title="Detaylı Profili Aç"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Intent & Location */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Intent Tag */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 text-white font-medium">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: INTENT_LABELS[activeCard.intent]?.iconColor || '#22D3EE' }}
                      />
                      <span>{INTENT_LABELS[activeCard.intent]?.label}</span>
                    </div>

                    {/* Distance Tag */}
                    <div className="flex items-center gap-1 text-slate-300 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs">
                      <MapPin className="w-3 h-3 text-[#22D3EE]" />
                      <span>{activeCard.distanceKm} km yakınında</span>
                    </div>
                  </div>

                  {/* University & Profession */}
                  <div className="space-y-1 text-xs text-slate-200">
                    {activeCard.university && (
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{activeCard.university} {activeCard.major && `· ${activeCard.major}`}</span>
                      </div>
                    )}
                    {activeCard.profession && (
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{activeCard.profession}</span>
                      </div>
                    )}
                  </div>

                  {/* Short Bio */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {activeCard.bio}
                  </p>

                  {/* Common Interests / Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeCard.hobbies.slice(0, 3).map((hobby) => (
                      <span
                        key={hobby}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900/80 border border-white/15 text-cyan-200 font-medium"
                      >
                        {hobby}
                      </span>
                    ))}
                    {activeCard.musicTaste && activeCard.musicTaste.length > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-purple-900/40 border border-purple-400/30 text-purple-200 flex items-center gap-1">
                        <Music className="w-3 h-3 text-purple-300" />
                        <span>{activeCard.musicTaste[0]}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full rounded-3xl glass-card flex flex-col items-center justify-center p-8 text-center border border-white/10"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[#22D3EE]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tüm Vibe'ları Keşfettin!</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6">
                Şimdilik yakınındaki tüm profilleri inceledin. Daha fazla kişiye ulaşmak için filtreleri genişlet veya profilleri yenile.
              </p>
              <button
                onClick={handleReloadProfiles}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-slate-950 font-bold text-xs hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Profilleri Yeniden Yükle
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Controls Bar (Thumb-Zone Ergonomic) */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3">
        {/* Undo Button (Rewind) */}
        <button
          onClick={handleUndo}
          className="w-12 h-12 rounded-full glass-panel border border-white/15 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:bg-white/10 active:scale-90 transition-all shadow-lg cursor-pointer"
          title="Geri Al (Pro)"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Pass Button (X) */}
        <button
          onClick={() => handleButtonClick('pass')}
          disabled={!activeCard}
          className="w-14 h-14 rounded-full bg-slate-900/90 border border-rose-500/40 flex items-center justify-center text-[#FB7185] hover:bg-rose-500/20 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-rose-950/40 cursor-pointer disabled:opacity-40"
          title="Geç"
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Super Vibe Button (Star) */}
        <button
          onClick={() => handleButtonClick('super')}
          disabled={!activeCard}
          className="w-12 h-12 rounded-full bg-slate-900/90 border border-yellow-500/40 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/20 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-950/40 cursor-pointer disabled:opacity-40"
          title="Super Vibe"
        >
          <Star className="w-6 h-6 fill-yellow-400/20 stroke-[2.2]" />
        </button>

        {/* Like / Vibe Button (Heart) */}
        <button
          onClick={() => handleButtonClick('like')}
          disabled={!activeCard}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#22D3EE] flex items-center justify-center text-slate-950 hover:opacity-95 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-500/30 cursor-pointer disabled:opacity-40"
          title="Vibe (Beğen)"
        >
          <Heart className="w-7 h-7 fill-slate-950 stroke-[2.5]" />
        </button>

        {/* Boost Profile Button */}
        <button
          onClick={() => {
            setProModalReason('Profilini 30 dakika boyunca bölgede 1 numaraya taşımak için Profil Boost özelliğini kullan!');
            setShowProModal(true);
          }}
          className="w-12 h-12 rounded-full glass-panel border border-white/15 flex items-center justify-center text-purple-400 hover:text-purple-300 hover:bg-white/10 active:scale-90 transition-all shadow-lg cursor-pointer"
          title="Profil Boost"
        >
          <Zap className="w-5 h-5 fill-purple-400/20" />
        </button>
      </div>
    </div>
  );
};

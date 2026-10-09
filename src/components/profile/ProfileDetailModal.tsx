import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INTENT_LABELS } from '../../data/mockData';
import { 
  X, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Music, 
  Heart, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const ProfileDetailModal: React.FC = () => {
  const { 
    selectedProfileDetail, 
    setSelectedProfileDetail, 
    handleSwipe,
    handleReportUser 
  } = useApp();

  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<any>('inappropriate_photo');
  const [reportText, setReportText] = useState<string>('');

  if (!selectedProfileDetail) return null;

  const profile = selectedProfileDetail;

  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % profile.photos.length);
  };

  const handlePrevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + profile.photos.length) % profile.photos.length);
  };

  const submitReport = () => {
    handleReportUser(profile.id, reportReason, reportText);
    setShowReport(false);
    setSelectedProfileDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg glass-card rounded-3xl overflow-hidden border border-white/15 my-auto max-h-[92vh] flex flex-col shadow-2xl">
        {/* Sticky top close bar */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setShowReport(!showReport)}
            className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-slate-300 hover:text-amber-400 flex items-center justify-center backdrop-blur-md cursor-pointer transition-colors"
            title="Şikayet Et"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSelectedProfileDetail(null)}
            className="w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-colors"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Photos Carousel */}
          <div className="relative w-full h-96 sm:h-[440px] bg-slate-950">
            <img
              src={profile.photos[photoIndex] || profile.photos[0]}
              alt={profile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Pagination dots */}
            {profile.photos.length > 1 && (
              <div className="absolute top-4 left-4 right-16 flex gap-1.5 z-20">
                {profile.photos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      idx === photoIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Nav Arrows */}
            {profile.photos.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 text-white flex items-center justify-center hover:bg-slate-950/90 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/60 text-white flex items-center justify-center hover:bg-slate-950/90 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#070A18] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Profile Details Body */}
          <div className="p-6 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  {profile.name}, <span className="font-light text-slate-300">{profile.age}</span>
                </h1>
                {profile.verifiedPhoto && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-[#22D3EE] text-xs font-bold border border-cyan-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Doğrulanmış</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[#22D3EE]">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.city} · {profile.distanceKm} km yakınında
                </span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">Aktif</span>
              </div>
            </div>

            {/* Intent Badge */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">İlişki Niyeti</span>
                <div className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: INTENT_LABELS[profile.intent]?.iconColor || '#22D3EE' }}
                  />
                  <span>{INTENT_LABELS[profile.intent]?.label}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-[200px] text-right">
                {INTENT_LABELS[profile.intent]?.desc}
              </p>
            </div>

            {/* School & Profession */}
            <div className="space-y-2 text-xs text-slate-200">
              {profile.university && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">{profile.university}</span>
                    {profile.major && <span className="text-slate-400"> · {profile.major}</span>}
                  </div>
                </div>
              )}
              {profile.profession && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">{profile.profession}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Hakkında</h3>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-2xl border border-white/10">
                {profile.bio}
              </p>
            </div>

            {/* Hobbies & Interests */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">İlgi Alanları & Tutkular</h3>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="text-xs px-3 py-1.5 rounded-xl bg-[#22D3EE]/15 border border-[#22D3EE]/30 text-cyan-200 font-medium"
                  >
                    {hobby}
                  </span>
                ))}
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Music Taste */}
            {profile.musicTaste && profile.musicTaste.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-purple-400" />
                  <span>Favori Sanatçılar / Müzik Zevki</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.musicTaste.map((artist) => (
                    <span
                      key={artist}
                      className="text-xs px-3 py-1 rounded-xl bg-purple-900/30 border border-purple-500/30 text-purple-200 font-medium"
                    >
                      {artist}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Report Box if open */}
            {showReport && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                <h4 className="text-xs font-bold text-amber-300">Bu Profili Raporla</h4>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value as any)}
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="inappropriate_photo">Müstehcen / Uygunsuz Fotoğraf</option>
                  <option value="fake_profile">Sahte Profil / Bot</option>
                  <option value="harassment">Taciz</option>
                  <option value="underage_suspect">18 Yaş Altı Şüphesi</option>
                </select>
                <textarea
                  rows={2}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Açıklama ekleyin..."
                  className="w-full bg-slate-900 border border-white/15 rounded-xl p-2 text-xs text-white"
                />
                <button
                  onClick={submitReport}
                  className="w-full py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 cursor-pointer"
                >
                  Raporu Gönder & Profili Gizle
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 backdrop-blur-md flex items-center justify-center gap-4">
          <button
            onClick={() => {
              handleSwipe(profile.id, 'pass');
              setSelectedProfileDetail(null);
            }}
            className="w-14 h-14 rounded-full bg-slate-900 border border-rose-500/30 text-[#FB7185] flex items-center justify-center hover:bg-rose-500/20 active:scale-95 transition-all cursor-pointer shadow-lg"
            title="Geç"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            onClick={() => {
              handleSwipe(profile.id, 'super');
              setSelectedProfileDetail(null);
            }}
            className="w-12 h-12 rounded-full bg-slate-900 border border-yellow-500/40 text-yellow-400 flex items-center justify-center hover:bg-yellow-500/20 active:scale-95 transition-all cursor-pointer shadow-lg"
            title="Super Vibe"
          >
            <Star className="w-5 h-5 fill-yellow-400/20 stroke-[2.2]" />
          </button>

          <button
            onClick={() => {
              handleSwipe(profile.id, 'like');
              setSelectedProfileDetail(null);
            }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#22D3EE] text-slate-950 flex items-center justify-center hover:opacity-95 active:scale-95 transition-all cursor-pointer shadow-xl shadow-cyan-500/30"
            title="Vibe (Beğen)"
          >
            <Heart className="w-6 h-6 fill-slate-950 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

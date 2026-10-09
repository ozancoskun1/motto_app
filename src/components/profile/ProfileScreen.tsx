import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INTENT_LABELS, UNIVERSITIES, INTEREST_CATEGORIES } from '../../data/mockData';
import { 
  ShieldCheck, 
  Crown, 
  Camera, 
  Edit3, 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Zap, 
  Trash2, 
  RotateCcw, 
  Check, 
  Shield, 
  Scan,
  Settings
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    setShowProModal, 
    setProModalReason,
    setShowSafetyModal,
    setShowAdminModal,
    setShowSettingsModal,
    setShowWelcomeScreen,
    handleDeleteAccount,
    handleResetDemoData
  } = useApp();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(currentUser?.name || '');
  const [bio, setBio] = useState<string>(currentUser?.bio || '');
  const [university, setUniversity] = useState<string>(currentUser?.university || '');
  const [major, setMajor] = useState<string>(currentUser?.major || '');
  const [profession, setProfession] = useState<string>(currentUser?.profession || '');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifyNotice, setVerifyNotice] = useState<string | null>(null);

  if (!currentUser) return null;

  const handleSaveProfile = () => {
    setCurrentUser(prev => prev ? {
      ...prev,
      name,
      bio,
      university,
      major,
      profession,
    } : null);
    setIsEditing(false);
  };

  const handleRunLivenessCheck = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentUser(prev => prev ? { ...prev, verifiedPhoto: true } : null);
      setVerifyNotice('Biyometrik liveness ve insan yüzü doğrulaması başarıyla onaylandı! Mavi Rozetiniz aktif.');
      setTimeout(() => setVerifyNotice(null), 4000);
    }, 1800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 pb-28 md:pb-12 space-y-6">
      {/* Profile Card Header */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar with Verified & Edit Badge */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
              <img
                src={currentUser.photos[0]}
                alt={currentUser.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {currentUser.verifiedPhoto && (
              <div 
                title="Doğrulanmış Profil"
                className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-slate-950 border border-cyan-400 shadow-lg text-[#22D3EE]"
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  {currentUser.name}, {currentUser.age}
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  18+
                </span>
              </div>

              {/* Tier Badge & Settings */}
              <div className="flex items-center gap-2">
                {currentUser.tier === 'promax' ? (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40 text-yellow-300 text-xs font-bold">
                    <Crown className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Pro Max VIP</span>
                  </div>
                ) : currentUser.tier === 'pro' ? (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                    <Crown className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Pro Üyelik</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setProModalReason('Pro Max ile sınırsız swipe, seni beğenenleri ömür boyu görme ve VIP rozete kavuş!');
                      setShowProModal(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-xs font-bold cursor-pointer transition-all"
                  >
                    <Crown className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Ücretsiz Plan (Yükselt)</span>
                  </button>
                )}

                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-bold cursor-pointer transition-all shadow-sm"
                  title="Ayarlar & Hesap Yönetimi"
                >
                  <Settings className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ayarlar</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentUser.city}</span>
              <span>·</span>
              <span className="text-slate-400">{currentUser.phone}</span>
            </p>

            <div className="text-xs text-slate-400 space-y-0.5 pt-1">
              {currentUser.university && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>{currentUser.university} {currentUser.major && `(${currentUser.major})`}</span>
                </div>
              )}
              {currentUser.profession && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  <span>{currentUser.profession}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Liveness Verification Status Banner */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-2xl">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${currentUser.verifiedPhoto ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                {currentUser.verifiedPhoto ? 'Fotoğraf Doğrulaması Aktif' : 'Fotoğrafını Doğrula'}
              </div>
              <div className="text-[11px] text-slate-400">
                {currentUser.verifiedPhoto 
                  ? 'Profilinde mavi rozet görünür ve %300 daha fazla Vibe alırsın.' 
                  : 'Canlı selfie taraması ile gerçek kişi olduğunu kanıtla.'}
              </div>
            </div>
          </div>

          <button
            onClick={handleRunLivenessCheck}
            disabled={isVerifying}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Scan className="w-3.5 h-3.5" />
            <span>{isVerifying ? 'Taranıyor...' : 'Liveness Testi'}</span>
          </button>
        </div>

        {verifyNotice && (
          <div className="mt-2 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 text-center">
            {verifyNotice}
          </div>
        )}
      </div>

      {/* Profile Bio & Details Card */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Profil Detayları</h2>
          <button
            onClick={() => {
              if (isEditing) {
                handleSaveProfile();
              } else {
                setIsEditing(true);
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>Kaydet</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Düzenle</span>
              </>
            )}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400">İsim</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400">Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400">Üniversite</label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {UNIVERSITIES.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Bölüm</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <div className="text-xs text-slate-400 font-semibold mb-1">Hakkında</div>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-white/5">
                {currentUser.bio}
              </p>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-semibold mb-1.5">İlişki Niyeti</div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-medium">
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: INTENT_LABELS[currentUser.intent]?.iconColor || '#22D3EE' }}
                />
                <span>{INTENT_LABELS[currentUser.intent]?.label}</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-semibold mb-1.5">Hobiler & İlgi Alanları</div>
              <div className="flex flex-wrap gap-1.5">
                {[...currentUser.hobbies, ...currentUser.interests].map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Account & Safety Tools */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
        <h2 className="text-base font-bold text-white">Hesap & Güvenlik</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 hover:bg-slate-800/80 border border-cyan-500/40 text-left flex items-center justify-between text-xs text-cyan-200 transition-colors cursor-pointer sm:col-span-2 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-[#22D3EE]">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">Ayarlar & Yönetim Merkezi</span>
                <p className="text-[11px] text-slate-400">Satın alımlar, dil seçimi, profil dondurma ve hesap silme</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowSafetyModal(true)}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-left flex items-center justify-between text-xs text-slate-200 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Güvenlik & KVKK Merkezi</span>
            </div>
          </button>

          <button
            onClick={() => setShowAdminModal(true)}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-left flex items-center justify-between text-xs text-slate-200 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Admin Moderasyon Paneli</span>
            </div>
          </button>

          <button
            onClick={() => setShowWelcomeScreen(true)}
            className="p-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-left flex items-center justify-between text-xs text-cyan-200 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">Yeni İndirenler Ekranı</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">Önizle</span>
          </button>
        </div>

        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleResetDemoData}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Demo Verilerini Sıfırla</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Hesabınızı ve tüm verilerinizi kalıcı olarak silmek istediğinizden emin misiniz? (KVKK kapsamında tüm veriler anonimleştirilecektir)')) {
                handleDeleteAccount();
              }
            }}
            className="flex-1 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-xs text-red-300 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span>Hesabımı Sil (KVKK)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

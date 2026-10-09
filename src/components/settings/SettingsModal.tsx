import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Settings, 
  Crown, 
  Globe, 
  PauseCircle, 
  Trash2, 
  LogOut, 
  ShieldCheck, 
  RotateCcw,
  Check,
  Zap,
  Lock,
  Bell,
  Eye,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { 
    showSettingsModal, 
    setShowSettingsModal, 
    currentUser, 
    setShowProModal, 
    setProModalReason,
    setShowSafetyModal,
    setShowAdminModal,
    handleFreezeAccount,
    handleUpdateLanguage,
    handleDeleteAccount,
    handleResetDemoData,
    setShowWelcomeScreen,
    setCurrentUser
  } = useApp();

  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [approxLocationEnabled, setApproxLocationEnabled] = useState(true);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  if (!showSettingsModal || !currentUser) return null;

  const currentLang = currentUser.language || 'tr';
  const isFrozen = currentUser.isFrozen || false;

  const triggerToast = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-auto space-y-6 max-h-[92vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-[#22D3EE] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Ayarlar & Hesap Yönetimi</h2>
              <p className="text-[11px] text-slate-400">Paketler, dil, dondurma, gizlilik ve hesap silme</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettingsModal(false)}
            className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {actionSuccessMsg && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* 1. SATIN ALIM YERLERİ & ABONELİK (PRO & PRO MAX) */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-cyan-950/40 border border-amber-500/30 shadow-lg space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-yellow-400 border border-amber-500/30">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">Motto Premium & Satın Alımlar</span>
                <p className="text-[11px] text-slate-400">
                  Mevcut Plan: <strong className="text-yellow-300 uppercase">{currentUser.tier === 'promax' ? 'Pro Max VIP' : currentUser.tier === 'pro' ? 'Pro Üye' : 'Ücretsiz'}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setProModalReason('Sınırsız keşif, seni beğenenleri anında görme ve VIP rozeti için Motto Pro Max’e yüksel!');
                setShowSettingsModal(false);
                setShowProModal(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-xs font-black hover:opacity-95 cursor-pointer shadow-md active:scale-95 transition-transform"
            >
              {currentUser.tier === 'promax' ? 'Planı Yönet' : 'Paket Satın Al'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+50 Swipe Paketi</span>
                </div>
                <div className="text-[10px] text-slate-400">Hemen 50 ekstra keşif</div>
              </div>
              <button
                onClick={() => {
                  setProModalReason('50 Ekstra Swipe Paketi ile keşfe hemen devam et!');
                  setShowSettingsModal(false);
                  setShowProModal(true);
                }}
                className="mt-2 w-full py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold cursor-pointer text-center"
              >
                50 ₺ Satın Al
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-white flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-purple-400" />
                  <span>Profil Boost (30 dk)</span>
                </div>
                <div className="text-[10px] text-slate-400">Bölgede 1 numara ol</div>
              </div>
              <button
                onClick={() => {
                  setProModalReason('Profil Boost ile 30 dakika boyunca bölgede 1 numaraya çık!');
                  setShowSettingsModal(false);
                  setShowProModal(true);
                }}
                className="mt-2 w-full py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-[11px] font-bold cursor-pointer text-center"
              >
                79 ₺ Boost Al
              </button>
            </div>
          </div>
        </div>

        {/* 2. DİL SEÇİMİ */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Uygulama Dili (Language)</span>
          </label>

          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 'tr' as const, label: 'Türkçe 🇹🇷' },
              { code: 'en' as const, label: 'English 🇬🇧' },
              { code: 'de' as const, label: 'Deutsch 🇩🇪' },
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  handleUpdateLanguage(lang.code);
                  triggerToast(`Dil ${lang.label} olarak güncellendi.`);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                  currentLang === lang.code
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md'
                    : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <span>{lang.label}</span>
                {currentLang === lang.code && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* 3. PROFİLİ DONDURMA (KEŞFİ DURAKLAT) */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <PauseCircle className="w-4 h-4 text-amber-400" />
              <span>Profili Dondur (Keşfi Duraklat)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Profilin yeni kullanıcılara görünmez. Mevcut eşleşmelerin ve sohbetlerin güvende kalır.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={isFrozen}
              onChange={(e) => {
                handleFreezeAccount(e.target.checked);
                triggerToast(e.target.checked ? 'Profilin donduruldu, yeni keşiflere kapatıldı.' : 'Profilin yeniden aktif!');
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {/* 4. GİZLİLİK VE BİLDİRİMLER */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Gizlilik & Bildirim Tercihleri</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[11px] text-slate-300">
              <p className="font-semibold text-white">Yaklaşık Konum Göster</p>
              <p className="text-slate-400">Tam GPS yerine ~2 km bulanıklaştırılmış mesafe paylaş</p>
            </div>
            <input
              type="checkbox"
              checked={approxLocationEnabled}
              onChange={(e) => {
                setApproxLocationEnabled(e.target.checked);
                triggerToast('Gizlilik tercihi kaydedildi.');
              }}
              className="w-4 h-4 accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="text-[11px] text-slate-300">
              <p className="font-semibold text-white">Anlık Bildirimler</p>
              <p className="text-slate-400">Yeni eşleşmeler ve mesaj bildirimlerini al</p>
            </div>
            <input
              type="checkbox"
              checked={notificationEnabled}
              onChange={(e) => {
                setNotificationEnabled(e.target.checked);
                triggerToast(e.target.checked ? 'Bildirimler açıldı.' : 'Bildirimler sessize alındı.');
              }}
              className="w-4 h-4 accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* 5. GÜVENLİK & ADMIN PANELLERİ */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Güvenlik & Denetim</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => {
                setShowSettingsModal(false);
                setShowSafetyModal(true);
              }}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-left flex items-center justify-between text-xs text-slate-200 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Güvenlik & KVKK Merkezi</span>
              </div>
            </button>

            <button
              onClick={() => {
                setShowSettingsModal(false);
                setShowAdminModal(true);
              }}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-left flex items-center justify-between text-xs text-slate-200 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>Admin Moderasyon Paneli</span>
              </div>
            </button>
          </div>
        </div>

        {/* 6. VERİ SIFIRLAMA, KARŞILAMA EKRANI & PROFİL SİLME (KVKK) */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                setShowSettingsModal(false);
                setShowWelcomeScreen(true);
              }}
              className="flex-1 py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-xs font-bold text-cyan-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Yeni İndirenler Ekranı</span>
            </button>

            <button
              onClick={() => {
                setShowSettingsModal(false);
                setShowWelcomeScreen(true);
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span>Çıkış Yap / Giriş Ekranı</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                handleResetDemoData();
                setShowSettingsModal(false);
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Verileri Sıfırla</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Hesabınızı kalıcı olarak silmek ve KVKK kapsamında tüm profil, eşleşme ve biyometrik kayıtlarınızı anonimleştirmek istediğinizden emin misiniz?')) {
                  handleDeleteAccount();
                  setShowSettingsModal(false);
                }
              }}
              className="flex-1 py-2.5 rounded-xl bg-red-950/50 hover:bg-red-900 border border-red-500/30 text-xs font-bold text-red-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
              <span>Profili Kalıcı Olarak Sil (KVKK)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

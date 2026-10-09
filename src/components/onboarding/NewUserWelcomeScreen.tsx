import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Flame, 
  MapPin, 
  Phone, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Compass,
  X
} from 'lucide-react';
import mottoLogo from '../../assets/images/motto_logo.jpg';

interface NewUserWelcomeScreenProps {
  onStartOnboarding: () => void;
  onQuickExplore: () => void;
  onLoginSuccess: () => void;
}

export const NewUserWelcomeScreen: React.FC<NewUserWelcomeScreenProps> = ({
  onStartOnboarding,
  onQuickExplore,
  onLoginSuccess,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPhone, setLoginPhone] = useState('532 987 65 43');
  const [loginOtp, setLoginOtp] = useState('');
  const [loginOtpSent, setLoginOtpSent] = useState(false);

  const slides = [
    {
      badgeIcon: Heart,
      badgeText: 'Vibe & Enerji Uyumu',
      title: 'Aynı Frekansta Olanları Keşfet',
      desc: 'Klişe sorular ve yapay sohbetler yerine; müzik zevkin, kahve ritüellerin ve yaşam tarzınla tam uyumlu gençlerle eşleş.',
      accentColor: '#22D3EE',
      accentGradient: 'from-cyan-500/20 to-blue-500/10'
    },
    {
      badgeIcon: ShieldCheck,
      badgeText: '18+ Doğrulanmış Topluluk',
      title: 'Sahte ve Bot Profillere Sıfır Tolerans',
      desc: 'Biyometrik selfie doğrulaması ve yaklaşık konum korumasıyla güvenli bir ortam. Karşındaki herkes %100 gerçek.',
      accentColor: '#FB7185',
      accentGradient: 'from-rose-500/20 to-pink-500/10'
    },
    {
      badgeIcon: Flame,
      badgeText: 'Süper Vibe & Hızlı Bağlantı',
      title: 'İlk Adımı At, Enerjiyi Başlat',
      desc: 'Seni heyecanlandıran profillere Süper Vibe gönder. Karşılıklı beğeni anında eşleşmeye ve samimi sohbete dönüşsün.',
      accentColor: '#FACC15',
      accentGradient: 'from-amber-500/20 to-orange-500/10'
    }
  ];

  // Auto rotate slides every 4.5 seconds unless user manually interacts
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const triggerHaptic = () => {
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(25);
      }
    } catch {
      /* ignore */
    }
  };

  const handleStartOnboarding = () => {
    triggerHaptic();
    onStartOnboarding();
  };

  const handleQuickExplore = () => {
    triggerHaptic();
    onQuickExplore();
  };

  const handleSendLoginOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPhone.length < 10) return;
    setLoginOtpSent(true);
    setLoginOtp('7391');
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic();
    setShowLoginModal(false);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-4 bg-[#070A18] text-[#F8FAFC] select-none relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/12 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-rose-500/10 blur-[110px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/15 blur-[130px]" />
      </div>

      {/* Main Mobile-First Frame */}
      <div className="relative z-10 w-full max-w-[420px] rounded-[36px] bg-[#0c1024]/90 border border-white/10 shadow-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[760px] max-h-[96vh] overflow-y-auto no-scrollbar">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pt-1">
          {/* Logo & Brand Wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-rose-400 shadow-lg shadow-cyan-500/20">
              <img 
                src={mottoLogo} 
                alt="Motto" 
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white leading-none">
                Motto
              </div>
              <div className="text-[11px] text-cyan-300 font-medium tracking-wide mt-0.5">
                Aynı enerjide buluş.
              </div>
            </div>
          </div>

          {/* Quick Demo Skip */}
          <button
            onClick={handleQuickExplore}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            title="Kayıt olmadan uygulamayı test et"
          >
            <span>Hızlı Keşfet</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Center Section: Animated App Hero & Feature Carousel */}
        <div className="my-auto py-5 space-y-6">
          {/* Visual Showcase Card */}
          <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-[36px] overflow-hidden p-1 bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-rose-500/20 border border-white/15 shadow-[0_0_50px_rgba(34,211,238,0.2)] flex items-center justify-center group">
            <img 
              src={mottoLogo} 
              alt="Motto Logo" 
              className="w-full h-full object-cover rounded-[32px] transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft inner vignette */}
            <div 
              className="absolute inset-0 rounded-[32px] pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 30px rgba(7, 10, 24, 0.6), inset 0 0 15px rgba(34, 211, 238, 0.3)'
              }}
            />

            {/* Floating Live Badge */}
            <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                İstanbul Kampüsleri Aktif
              </span>
              <span className="text-slate-400 font-mono text-[10px]">18+ Doğrulanmış</span>
            </div>
          </div>

          {/* Interactive Feature Slider */}
          <div className="text-center space-y-2.5 px-2">
            {/* Feature Tag */}
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-cyan-400 tracking-wide">
              {React.createElement(slides[currentSlide].badgeIcon, { className: 'w-4 h-4' })}
              <span>{slides[currentSlide].badgeText}</span>
            </div>

            {/* Slide Title */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug min-h-[56px] flex items-center justify-center">
              {slides[currentSlide].title}
            </h2>

            {/* Slide Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[64px] flex items-center justify-center">
              {slides[currentSlide].desc}
            </p>

            {/* Carousel Dots / Segment Bars */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx 
                      ? 'w-7 bg-cyan-400 shadow-[0_0_8px_#22d3ee]' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions Deck */}
        <div className="space-y-3 pt-3">
          {/* Primary Action: Create New Account (Onboarding Wizard) */}
          <button
            onClick={handleStartOnboarding}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-black text-sm hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 cursor-pointer"
          >
            <span>Yeni Hesap Oluştur</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          {/* Secondary Action: Login for Existing Users */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowLoginModal(true)}
              className="py-3 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Giriş Yap</span>
            </button>

            <button
              onClick={handleQuickExplore}
              className="py-3 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 text-xs font-bold text-cyan-300 hover:text-cyan-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Demo İncele</span>
            </button>
          </div>

          {/* Zero-Pill Unboxed Clean Legal & Age Disclaimer */}
          <div className="text-[11px] text-slate-400 text-center leading-relaxed pt-2 border-t border-white/10">
            <p>
              Devam ederek <span className="text-slate-300 font-medium">Kullanım Koşulları</span>, <span className="text-slate-300 font-medium">KVKK Politikası</span> ve <span className="text-slate-300 font-medium">Topluluk İlkeleri</span>’ni kabul etmiş olursun.
            </p>
            <div className="mt-1 flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <span>18+ Yetişkinler İçin</span>
              <span aria-hidden="true">·</span>
              <span>Biyometrik Doğrulanmış</span>
              <span aria-hidden="true">·</span>
              <span>Gizlilik Korumalı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal for Returning Users */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#0c1024] border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-900">
                  <img src={mottoLogo} alt="Motto" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-base font-bold text-white">Motto'ya Giriş Yap</h3>
              </div>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!loginOtpSent ? (
              <form onSubmit={handleSendLoginOtp} className="space-y-3">
                <p className="text-xs text-slate-300">
                  Kayıtlı telefon numaranı girerek hesabına anında erişebilirsin.
                </p>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Telefon Numarası</label>
                  <div className="flex items-center gap-2 bg-slate-900 border border-white/15 rounded-xl px-3 py-2.5">
                    <span className="text-xs text-slate-400 font-semibold">🇹🇷 +90</span>
                    <input 
                      type="tel"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="5XX XXX XX XX"
                      className="bg-transparent text-white text-xs focus:outline-none w-full font-mono"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-slate-950 font-bold text-xs hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>SMS Kodu Gönder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyLogin} className="space-y-3">
                <p className="text-xs text-slate-300">
                  +90 {loginPhone} numarasına gönderilen SMS kodunu gir.
                </p>
                <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-center">
                  <span className="text-xs text-cyan-300 font-medium">Demo Kod: 7391</span>
                </div>
                <input 
                  type="text"
                  maxLength={4}
                  value={loginOtp}
                  onChange={(e) => setLoginOtp(e.target.value)}
                  placeholder="7391"
                  className="w-full text-center text-xl font-bold tracking-[0.4em] font-mono bg-slate-900 border border-white/20 rounded-xl py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-slate-950 font-bold text-xs hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Giriş Yap ve Başla</span>
                </button>
              </form>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <button 
                type="button"
                onClick={() => {
                  setShowLoginModal(false);
                  onQuickExplore();
                }}
                className="hover:text-cyan-400 cursor-pointer"
              >
                Demo Kullanıcı ile Gir
              </button>
              <button 
                type="button"
                onClick={() => {
                  setShowLoginModal(false);
                  onStartOnboarding();
                }}
                className="text-cyan-400 font-semibold hover:underline cursor-pointer"
              >
                Yeni Hesap Aç
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

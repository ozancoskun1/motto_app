import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubscriptionTier } from '../../types';
import { 
  X, 
  Crown, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Zap, 
  ArrowRight,
  Lock
} from 'lucide-react';

export const PremiumModal: React.FC = () => {
  const { 
    showProModal, 
    setShowProModal, 
    proModalReason, 
    handleUpgradeTier, 
    handleBuyExtraSwipes 
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<'pro_weekly' | 'pro_monthly' | 'promax_lifetime' | 'extra_50'>('promax_lifetime');
  const [step, setStep] = useState<'plans' | 'checkout' | '3dsecure'>('plans');

  // Checkout form
  const [cardNumber, setCardNumber] = useState<string>('5328 1234 5678 9012');
  const [cardExpiry, setCardExpiry] = useState<string>('08/29');
  const [cardCvc, setCardCvc] = useState<string>('432');
  const [cardName, setCardName] = useState<string>('ARZU YILMAZ');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!showProModal) return null;

  const handleStartCheckout = () => {
    setStep('checkout');
  };

  const handleSubmitPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('3dsecure');
    }, 1000);
  };

  const handleComplete3DSecure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (selectedPlan === 'extra_50') {
        handleBuyExtraSwipes();
      } else if (selectedPlan === 'promax_lifetime') {
        handleUpgradeTier('promax');
      } else {
        handleUpgradeTier('pro');
      }
      setStep('plans');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={() => { setShowProModal(false); setStep('plans'); }}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: PLANS SELECTION */}
        {step === 'plans' && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-bold">
                <Crown className="w-3.5 h-3.5 text-yellow-400" />
                <span>Motto VIP Ayrıcalıkları</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Motto Pro & Pro Max
              </h2>
              {proModalReason ? (
                <p className="text-xs text-cyan-300 font-medium max-w-sm mx-auto leading-relaxed">
                  {proModalReason}
                </p>
              ) : (
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Seni beğenenleri anında gör, sınırsız swipe ile dilediğin kadar genç yetişkin keşfet.
                </p>
              )}
            </div>

            {/* Plan Cards */}
            <div className="space-y-3">
              {/* Pro Max Lifetime (Recommended) */}
              <div
                onClick={() => setSelectedPlan('promax_lifetime')}
                className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedPlan === 'promax_lifetime'
                    ? 'bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-slate-900 border-yellow-400/80 shadow-lg shadow-yellow-500/10'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
                  En Popüler · Ömür Boyu
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-base">Pro Max VIP</span>
                    <span className="text-xs text-amber-300 font-semibold">(Ömür Boyu)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Sınırsız Swipe + Beğenenleri Sürekli Görme + VIP Rozet + 10x Super Vibe
                  </p>
                </div>

                <div className="text-right shrink-0 pl-3">
                  <div className="text-xl font-extrabold text-yellow-300 font-mono">499.99 ₺</div>
                  <span className="text-[10px] text-slate-400">Tek seferlik</span>
                </div>
              </div>

              {/* Pro Monthly */}
              <div
                onClick={() => setSelectedPlan('pro_monthly')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedPlan === 'pro_monthly'
                    ? 'bg-gradient-to-r from-cyan-950/40 to-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">Pro Aylık</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    1 Ay Beğenenleri Görme + 250 Günlük Swipe + Geri Alma
                  </p>
                </div>

                <div className="text-right shrink-0 pl-3">
                  <div className="text-lg font-bold text-cyan-300 font-mono">249.99 ₺</div>
                  <span className="text-[10px] text-slate-400">/ ay</span>
                </div>
              </div>

              {/* Pro Weekly */}
              <div
                onClick={() => setSelectedPlan('pro_weekly')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedPlan === 'pro_weekly'
                    ? 'bg-gradient-to-r from-blue-950/40 to-slate-900 border-blue-400/80'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">Pro Haftalık</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    1 Hafta Beğenenleri Görme + Geri Alma
                  </p>
                </div>

                <div className="text-right shrink-0 pl-3">
                  <div className="text-lg font-bold text-slate-200 font-mono">89.99 ₺</div>
                  <span className="text-[10px] text-slate-400">/ hafta</span>
                </div>
              </div>

              {/* Extra 50 Swipes Package */}
              <div
                onClick={() => setSelectedPlan('extra_50')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedPlan === 'extra_50'
                    ? 'bg-slate-800 border-slate-300'
                    : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-white text-sm">Ek 50 Swipe Paketi</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Bugün için ekstra 50 keşif hakkı ekler
                  </p>
                </div>

                <div className="text-right shrink-0 pl-3">
                  <div className="text-base font-bold text-slate-200 font-mono">50.00 ₺</div>
                  <span className="text-[10px] text-slate-400">Tek seferlik</span>
                </div>
              </div>
            </div>

            {/* Features Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Seni Beğenenleri Görme</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Sınırsız Geri Alma (Rewind)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Öncelikli Mesajlaşma</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Reklamsız Deneyim</span>
              </div>
            </div>

            <button
              onClick={handleStartCheckout}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black text-sm hover:opacity-95 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/20"
            >
              <span>Ödemeye İlerle</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

        {/* STEP 2: CHECKOUT CARD DETAILS */}
        {step === 'checkout' && (
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <button 
                onClick={() => setStep('plans')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2 cursor-pointer"
              >
                ← Planlara Dön
              </button>
              <h2 className="text-xl font-bold text-white tracking-tight">Güvenli Kart ile Ödeme</h2>
              <p className="text-xs text-slate-400 mt-1">
                256-Bit SSL korumalı ve 3D Secure ile güvenli ödeme.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300">Seçilen Paket:</span>
              <span className="font-bold text-yellow-300">
                {selectedPlan === 'promax_lifetime' && 'Pro Max VIP (499.99 ₺)'}
                {selectedPlan === 'pro_monthly' && 'Pro Aylık (249.99 ₺)'}
                {selectedPlan === 'pro_weekly' && 'Pro Haftalık (89.99 ₺)'}
                {selectedPlan === 'extra_50' && 'Ek 50 Swipe (50.00 ₺)'}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Kart Üzerindeki İsim</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Kart Numarası</label>
                <div className="flex items-center gap-2 bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 mt-1">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="bg-transparent text-white text-xs w-full font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Son Kullanma (AA/YY)</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">CVC / CVV</label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmitPayment}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-sm hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/20"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>{isProcessing ? 'İşleniyor...' : '3D Secure ile Öde'}</span>
            </button>
          </div>
        )}

        {/* STEP 3: 3D SECURE MODAL */}
        {step === '3dsecure' && (
          <div className="p-6 sm:p-8 space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Banka 3D Secure Doğrulaması</h2>
              <p className="text-xs text-slate-400 mt-1">
                Kayıtlı cep telefonunuza gönderilen doğrulama şifresi onaylanıyor.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300">
              İşlem Referansı: TR-MOTTO-984214
            </div>

            <button
              onClick={handleComplete3DSecure}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Check className="w-4 h-4 text-slate-950" />
              <span>{isProcessing ? 'Abonelik Tanımlanıyor...' : 'İşlemi Tamamla & VIP Başlat'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

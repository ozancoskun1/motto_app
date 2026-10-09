import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrentUser, GenderType, InterestedInType, IntentType } from '../../types';
import { INTENT_LABELS, UNIVERSITIES, INTEREST_CATEGORIES } from '../../data/mockData';
import { 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  Scan, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Lock,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import mottoLogo from '../../assets/images/motto_logo.jpg';

interface OnboardingWizardProps {
  onComplete: () => void;
  onCancel?: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onCancel }) => {
  const { setCurrentUser } = useApp();
  const [step, setStep] = useState<number>(1);

  // Form states
  const [phone, setPhone] = useState<string>('532 987 65 43');
  const [otp, setOtp] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [otpTimer, setOtpTimer] = useState<number>(59);

  // 18+ Verification
  const [birthDate, setBirthDate] = useState<string>('2002-05-18');
  const [ageError, setAgeError] = useState<string | null>(null);

  // Photo & Liveness
  const [photoPreview, setPhotoPreview] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80');
  const [isScanningLiveness, setIsScanningLiveness] = useState<boolean>(false);
  const [livenessPassed, setLivenessPassed] = useState<boolean>(true);
  const [livenessScore, setLivenessScore] = useState<number>(99.1);

  // Profile fields
  const [name, setName] = useState<string>('Arzu');
  const [gender, setGender] = useState<GenderType>('woman');
  const [interestedIn, setInterestedIn] = useState<InterestedInType>('everyone');
  const [city, setCity] = useState<string>('İstanbul');
  const [university, setUniversity] = useState<string>('Boğaziçi Üniversitesi');
  const [major, setMajor] = useState<string>('Psikoloji');
  const [profession, setProfession] = useState<string>('Yüksek Lisans Öğrencisi');
  
  // Intent & interests
  const [intent, setIntent] = useState<IntentType>('relationship');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Filtre Kahve', 'Modern Sanat', 'Yoga', 'Kitap Kulübü', 'Indie Rock'
  ]);
  const [bio, setBio] = useState<string>('Kahve ritüelleri, sergi açılışları ve hafta sonu bisiklet turları. Samimi sohbetleri ve yeni dostlukları seviyorum ✨');

  // Location permission
  const [locationGranted, setLocationGranted] = useState<boolean>(true);

  // Calculate age helper
  const calculateAge = (dateStr: string): number => {
    if (!dateStr) return 0;
    const dob = new Date(dateStr);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  // Step 1: Send SMS OTP
  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setIsOtpSent(true);
    setOtp('7391'); // Auto-fill demo OTP code for frictionless onboarding
    setStep(2);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = () => {
    if (otp.length >= 4) {
      setStep(3);
    }
  };

  // Step 3: Verify Age
  const handleVerifyAge = () => {
    const age = calculateAge(birthDate);
    if (age < 18) {
      setAgeError('VibeMatch yalnızca 18 yaş ve üzeri yetişkinler içindir. 18 yaşın altındaki bireyler platforma kayıt olamaz.');
      return;
    }
    setAgeError(null);
    setStep(4);
  };

  // Step 4: Run Liveness Simulation
  const handleRunLiveness = () => {
    setIsScanningLiveness(true);
    setTimeout(() => {
      setIsScanningLiveness(false);
      setLivenessPassed(true);
      setLivenessScore(98.8);
    }, 1800);
  };

  // Interest toggle
  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(prev => prev.filter(i => i !== item));
    } else {
      if (selectedInterests.length < 8) {
        setSelectedInterests(prev => [...prev, item]);
      }
    }
  };

  // Complete Onboarding
  const handleFinish = () => {
    const calculatedAge = calculateAge(birthDate);
    const newUser: CurrentUser = {
      id: `user_${Date.now()}`,
      phone: `+90 ${phone}`,
      name,
      age: calculatedAge >= 18 ? calculatedAge : 22,
      birthDate,
      gender,
      interestedIn,
      city,
      university,
      major,
      profession,
      photos: [photoPreview],
      verifiedPhoto: livenessPassed,
      intent,
      bio,
      hobbies: selectedInterests.slice(0, 4),
      interests: selectedInterests.slice(4),
      musicTaste: ['Indie Rock', 'Jakuzi', 'The Strokes'],
      distanceKm: 2,
      lastActive: 'Şimdi aktif',
      tier: 'free',
      dailySwipesCount: 0,
      dailySwipeLimit: 50,
      superVibesRemaining: 1,
      boostsRemaining: 0,
    };

    setCurrentUser(newUser);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#22D3EE', '#3B82F6', '#FB7185', '#FACC15']
      });
    } catch (e) {
      /* ignore */
    }

    onComplete();
  };

  return (
    <div className="min-h-screen py-8 px-4 flex items-center justify-center relative z-10">
      <div className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/20 shadow-md bg-[#070A18]">
              <img src={mottoLogo} alt="Motto" className="w-full h-full object-cover" />
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
              18+
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Adım {step} / 8
          </span>
        </div>

        {/* STEP 1: Phone Login */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              {onCancel && (
                <button 
                  onClick={onCancel} 
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Karşılama Ekranına Dön
                </button>
              )}
              <h2 className="text-2xl font-bold text-white tracking-tight">Telefon ile Giriş Yap</h2>
              <p className="text-xs text-slate-400 mt-1">
                Güvenliğin için SMS ile tek kullanımlık şifre (OTP) göndereceğiz.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Telefon Numaran</label>
              <div className="flex items-center gap-2 bg-slate-900/80 border border-white/15 rounded-xl px-3.5 py-2.5">
                <span className="text-sm font-semibold text-slate-400">🇹🇷 +90</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="5XX XXX XX XX"
                  className="bg-transparent text-white text-sm focus:outline-none w-full font-mono"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
              <span>Numaranız diğer kullanıcılara asla gösterilmez. Sadece hesap güvenliği ve doğrulama için kullanılır.</span>
            </div>

            <button
              onClick={handleSendOtp}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-bold text-sm hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <span>SMS Doğrulama Kodu Gönder</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <button 
                onClick={() => setStep(1)} 
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Numarayı Değiştir
              </button>
              <h2 className="text-2xl font-bold text-white tracking-tight">Kodu Doğrula</h2>
              <p className="text-xs text-slate-400 mt-1">
                +90 {phone} numarasına gelen 4 haneli SMS kodunu gir.
              </p>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-white/10 text-center space-y-3">
              <div className="text-xs text-cyan-400 font-medium">Demo SMS Kodu: 7391</div>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="7391"
                className="w-36 mx-auto text-center tracking-[0.5em] text-2xl font-bold font-mono bg-slate-950 border border-cyan-500/40 rounded-xl py-2 text-white focus:outline-none focus:border-cyan-400"
              />
              <p className="text-[11px] text-slate-500">Tekrar kod gönder ({otpTimer}s)</p>
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-slate-950 font-bold text-sm hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Numarayı Onayla</span>
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

        {/* STEP 3: 18+ Age Check */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <button 
                onClick={() => setStep(2)} 
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Geri
              </button>
              <h2 className="text-2xl font-bold text-white tracking-tight">18+ Yaş Doğrulaması</h2>
              <p className="text-xs text-slate-400 mt-1">
                Motto genç yetişkinlere özeldir. 18 yaşın altındaki bireyler kesinlikle kabul edilmez.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Doğum Tarihin</label>
              <input
                type="date"
                value={birthDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setAgeError(null);
                }}
                className="w-full bg-slate-900/80 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Hesaplanan Yaş:</span>
                <span className="font-bold text-cyan-400 font-mono text-sm">
                  {calculateAge(birthDate)} yaşında
                </span>
              </div>
            </div>

            {ageError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{ageError}</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                Yaş Güvenlik Politikası:
              </p>
              <p>Doğum tarihiniz profilde gün/ay/yıl olarak gizli tutulur, yalnızca yaşınız gösterilir.</p>
            </div>

            <button
              onClick={handleVerifyAge}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-bold text-sm hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>18+ Olduğumu Onaylıyorum</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

        {/* STEP 4: Real Photo & Liveness Check */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <button 
                onClick={() => setStep(3)} 
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Geri
              </button>
              <h2 className="text-2xl font-bold text-white tracking-tight">Gerçek Fotoğraf & Liveness</h2>
              <p className="text-xs text-slate-400 mt-1">
                Sahte veya bot hesapları engellemek için yüz doğrulaması zorunludur.
              </p>
            </div>

            {/* Photo Preview & Frame */}
            <div className="relative mx-auto w-44 h-56 rounded-2xl overflow-hidden border-2 border-dashed border-cyan-400/50 bg-slate-900 flex items-center justify-center group shadow-xl">
              <img
                src={photoPreview}
                alt="Profil Fotoğrafı"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {isScanningLiveness && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center">
                  <Scan className="w-10 h-10 text-cyan-400 animate-pulse mb-2" />
                  <span className="text-xs font-bold text-cyan-300">Yüz Hatları Taranıyor...</span>
                  <span className="text-[10px] text-slate-400 mt-1">Canlılık ve mimik simetrisi test ediliyor</span>
                </div>
              )}

              {livenessPassed && !isScanningLiveness && (
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-lg bg-emerald-500/90 text-slate-950 text-[11px] font-bold flex items-center justify-center gap-1 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>İnsan Yüzü Doğrulandı (%{livenessScore})</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleRunLiveness}
                disabled={isScanningLiveness}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Tekrar Tara (Liveness)</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-[11px] text-slate-400">
              <span className="text-white font-medium">KVKK Bilgilendirmesi:</span> Biyometrik veriler sunucularımızda saklanmaz. Doğrulama sonucu sadece <span className="text-cyan-400 font-mono">verifiedPhoto: true</span> olarak tutulur.
            </div>

            <button
              onClick={() => setStep(5)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-bold text-sm hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Fotoğrafı Onayla & Devam Et</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

        {/* STEP 5: Personal Details */}
        {step === 5 && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 no-scrollbar">
            <div>
              <button 
                onClick={() => setStep(4)} 
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Geri
              </button>
              <h2 className="text-2xl font-bold text-white tracking-tight">Profil Bilgilerin</h2>
              <p className="text-xs text-slate-400 mt-1">
                Diğer genç yetişkinlerin seni tanımasını sağla.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">İsmin</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 bg-slate-900/80 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Cinsiyetin</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as GenderType)}
                  className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                >
                  <option value="woman">Kadın</option>
                  <option value="man">Erkek</option>
                  <option value="nonbinary">Non-binary</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">İlgilendiğin</label>
                <select
                  value={interestedIn}
                  onChange={(e) => setInterestedIn(e.target.value as InterestedInType)}
                  className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                >
                  <option value="everyone">Herkes</option>
                  <option value="women">Kadınlar</option>
                  <option value="men">Erkekler</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Şehir</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Örn: İstanbul"
                className="w-full mt-1 bg-slate-900/80 border border-white/15 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Üniversite</label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
              >
                {UNIVERSITIES.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Bölüm</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="Mimarlık / Yazılım"
                  className="w-full mt-1 bg-slate-900/80 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Meslek / Durum</label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="Öğrenci / Mühendis"
                  className="w-full mt-1 bg-slate-900/80 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(6)}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-bold text-sm hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Niyet Seçimine Geç</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

        {/* STEP 6: Intent Selection */}
        {step === 6 && (
          <div className="space-y-4">
            <div>
              <button 
                onClick={() => setStep(5)} 
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Geri
              </button>
              <h2 className="text-2xl font-bold text-white tracking-tight">Burada Neyi Arıyorsun?</h2>
              <p className="text-xs text-slate-400 mt-1">
                Niyetin kartında net olarak gözükecek ve benzer beklentideki profillerle eşleşmeni sağlayacak.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {(Object.keys(INTENT_LABELS) as IntentType[]).map((key) => {
                const item = INTENT_LABELS[key];
                const isSelected = intent === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setIntent(key)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-[#22D3EE] shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span style={{ color: item.iconColor }}>●</span>
                        <span>{item.label}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(7)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-bold text-sm hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>İlgi Alanlarına Geç</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

        {/* STEP 7: Hobbies & Bio */}
        {step === 7 && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 no-scrollbar">
            <div>
              <button 
                onClick={() => setStep(6)} 
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Geri
              </button>
              <h2 className="text-2xl font-bold text-white tracking-tight">Hobiler & Bio</h2>
              <p className="text-xs text-slate-400 mt-1">
                Ortak ilgi alanları kartlarda vurgulanır ({selectedInterests.length}/8 seçildi).
              </p>
            </div>

            <div className="space-y-3">
              {INTEREST_CATEGORIES.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{cat.name}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => {
                      const isSelected = selectedInterests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#22D3EE]/20 border-[#22D3EE] text-cyan-300 font-semibold'
                              : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Kısa Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={250}
                placeholder="Kendinden, enerjinden veya aradığın sohbetten bahset..."
                className="w-full mt-1 bg-slate-900/80 border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none"
              />
              <div className="text-[10px] text-slate-500 text-right">{bio.length}/250</div>
            </div>

            <button
              onClick={() => setStep(8)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-bold text-sm hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Son Adım: Konum İzni</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}

        {/* STEP 8: Location Permission & Finish */}
        {step === 8 && (
          <div className="space-y-5 text-center">
            <div className="flex justify-start">
              <button 
                onClick={() => setStep(7)} 
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Geri
              </button>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#3B82F6]/30 to-[#22D3EE]/30 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-400">
              <MapPin className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Yakınındaki Vibe'ları Keşfet</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Kampüsünde, semtinde veya kafede yakınında olan gençleri keşfetmek için yaklaşık konum izni ver.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-left space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Gizlilik Güvencesi:
              </div>
              <p className="text-slate-400 leading-relaxed">
                Tam GPS koordinatlarınız veya adresiniz hiçbir koşulda kimseyle paylaşılmaz. Yalnızca <span className="text-cyan-300 font-medium">"2 km yakınında"</span> gibi yuvarlanmış mesafe gösterilir.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#FB7185] text-slate-950 font-extrabold text-sm hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
            >
              <Heart className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Motto’ya Başla</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

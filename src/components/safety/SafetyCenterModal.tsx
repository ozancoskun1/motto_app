import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  MapPin, 
  AlertOctagon, 
  PhoneCall, 
  FileText, 
  Trash2,
  CheckCircle2
} from 'lucide-react';

export const SafetyCenterModal: React.FC = () => {
  const { 
    showSafetyModal, 
    setShowSafetyModal, 
    handleDeleteAccount 
  } = useApp();

  if (!showSafetyModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-auto max-h-[90vh] overflow-y-auto no-scrollbar space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Motto 18+ Güvenlik & KVKK Merkezi</h2>
              <p className="text-[11px] text-slate-400">18+ Doğrulama, Gizlilik ve Topluluk Kuralları</p>
            </div>
          </div>
          <button
            onClick={() => setShowSafetyModal(false)}
            className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 18+ Age Guarantee */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
            <AlertOctagon className="w-4 h-4" />
            <span>Kesin 18+ Yaş Sınırı Politikası</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Motto yalnızca 18 yaş ve üzerindeki genç yetişkinler, üniversiteliler ve genç profesyoneller içindir. Kayıt esnasında doğum tarihi teyit edilir; 18 yaşın altındaki bireylerin kaydı kanunen ve topluluk ilkelerimiz gereği kesinlikle reddedilir.
          </p>
        </div>

        {/* Biometrics & Liveness Privacy */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
            <Lock className="w-4 h-4" />
            <span>KVKK Kapsamında Biyometrik Veri Güvencesi</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Profil fotoğrafı ve canlılık selfie taraması, sahte hesap ve botları engellemek için cihazınızda veya anlık yapay zeka oturumunda işlenir. <strong className="text-white">Biyometrik yüz haritanız sunucularımızda asla kalıcı olarak saklanmaz.</strong> Yalnızca doğrulama durumu <span className="font-mono text-cyan-300">verifiedPhoto: true</span> olarak tutulur.
          </p>
        </div>

        {/* Location Privacy */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <MapPin className="w-4 h-4" />
            <span>Yaklaşık Konum ve Adres Güvenliği</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Tam GPS koordinatlarınız, eviniz veya bulunduğunuz bina kesinlikle diğer kullanıcılara sunulmaz. Yalnızca yuvarlanmış yaklaşık mesafe (örneğin <span className="text-cyan-300">"2 km yakınında"</span>) gösterilir.
          </p>
        </div>

        {/* Safe Dating Tips */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Genç Yetişkinler İçin Güvenli Tanışma İpuçları</h3>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>İlk buluşmayı her zaman kalabalık, halka açık bir kafe veya kampüs mekanında yapın.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Buluşma yerini ve saatini bir arkadaşınızla veya ev arkadaşınızla paylaşın.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Rahatsız edici mesaj veya davranış durumunda mesaj ekranındaki "Şikayet Et & Engelle" butonunu kullanın.</span>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-300">
            <PhoneCall className="w-4 h-4" />
            <span>Acil Durumlar İçin:</span>
          </div>
          <span className="font-bold text-white font-mono">112 Acil Çağrı / KADES</span>
        </div>

        {/* Delete Account / KVKK Data Erase */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            KVKK Madde 11 uyarınca tüm verilerinizi kalıcı olarak silebilirsiniz.
          </div>
          <button
            onClick={() => {
              if (window.confirm('Tüm verilerinizi, sohbetlerinizi ve profilinizi kalıcı olarak silmek istiyor musunuz?')) {
                handleDeleteAccount();
                setShowSafetyModal(false);
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-red-950 border border-red-500/30 text-xs font-bold text-red-300 hover:bg-red-900 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span>Verilerimi Sil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

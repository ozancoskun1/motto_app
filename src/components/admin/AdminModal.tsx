import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldAlert, 
  Users, 
  CheckCircle, 
  Flame, 
  DollarSign, 
  Ban, 
  EyeOff, 
  ShieldCheck, 
  Trash2,
  AlertTriangle
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const { 
    showAdminModal, 
    setShowAdminModal, 
    profiles, 
    reports, 
    matches, 
    swipes, 
    adminBanUser, 
    adminSuspendUser, 
    adminToggleVerify, 
    adminResolveReport 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reports' | 'users' | 'stats'>('reports');

  if (!showAdminModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-auto max-h-[90vh] overflow-y-auto no-scrollbar space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black">
              ⚡️
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Motto Admin Moderasyon Paneli</h2>
              <p className="text-[11px] text-slate-400">18+ Güvenlik Denetimi, Kullanıcı Moderasyonu & Raporlar</p>
            </div>
          </div>
          <button
            onClick={() => setShowAdminModal(false)}
            className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Toplam Kullanıcı</span>
              <Users className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono">{profiles.length + 1}</div>
            <div className="text-[10px] text-emerald-400 font-medium">%100 18+ Doğrulandı</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Toplam Swipe</span>
              <Flame className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono">{swipes.length + 48}</div>
            <div className="text-[10px] text-cyan-300">Günlük Limit: Aktif</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Eşleşmeler</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono">{matches.length}</div>
            <div className="text-[10px] text-emerald-300 font-medium">Yüksek Eşleşme Hızı</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Premium Gelir</span>
              <DollarSign className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <div className="text-xl font-bold text-yellow-300 font-mono">1.249,90 ₺</div>
            <div className="text-[10px] text-slate-400">Pro & Pro Max</div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reports' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Şikayet & Moderasyon Kuyruğu ({reports.filter(r => r.status === 'pending').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'users' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kullanıcı Yönetimi ({profiles.length})</span>
          </button>
        </div>

        {/* TAB 1: REPORTS QUEUE */}
        {activeTab === 'reports' && (
          <div className="space-y-3">
            {reports.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">Bekleyen şikayet bulunmamaktadır.</div>
            ) : (
              reports.map((rep) => (
                <div key={rep.id} className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                        {rep.reason.replace('_', ' ')}
                      </span>
                      <span className="font-bold text-xs text-white">Hedef: {rep.targetUserName}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{rep.createdAt}</span>
                  </div>

                  <p className="text-xs text-slate-300">{rep.details}</p>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => adminResolveReport(rep.id, 'dismissed')}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-medium hover:bg-slate-700 cursor-pointer"
                    >
                      Şikayeti Kapat
                    </button>
                    <button
                      onClick={() => {
                        adminSuspendUser(rep.targetUserId);
                        adminResolveReport(rep.id, 'action_taken');
                      }}
                      className="px-3 py-1 rounded-lg bg-amber-600/30 text-amber-300 border border-amber-500/30 text-[11px] font-medium hover:bg-amber-600/50 cursor-pointer flex items-center gap-1"
                    >
                      <EyeOff className="w-3 h-3" />
                      <span>Profili Askıya Al</span>
                    </button>
                    <button
                      onClick={() => {
                        adminBanUser(rep.targetUserId);
                        adminResolveReport(rep.id, 'action_taken');
                      }}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 cursor-pointer flex items-center gap-1"
                    >
                      <Ban className="w-3 h-3" />
                      <span>Kullanıcıyı Banla</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: USERS LIST */}
        {activeTab === 'users' && (
          <div className="space-y-2.5">
            {profiles.map((p) => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={p.photos[0]}
                    alt={p.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-bold text-xs text-white flex items-center gap-1.5">
                      {p.name}, {p.age}
                      {p.verifiedPhoto && (
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-xs">
                      {p.university || p.city} · {p.profession || 'Öğrenci'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => adminToggleVerify(p.id)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-[11px] text-cyan-300 font-medium hover:bg-cyan-900 cursor-pointer"
                    title="Doğrulama Rozetini Değiştir"
                  >
                    {p.verifiedPhoto ? 'Rozeti Al' : 'Doğrula'}
                  </button>

                  <button
                    onClick={() => adminBanUser(p.id)}
                    className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 hover:bg-red-900 cursor-pointer"
                    title="Kullanıcıyı Banla"
                  >
                    <Ban className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

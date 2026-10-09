import React from 'react';
import { useApp } from '../../context/AppContext';
import { IntentType, InterestedInType } from '../../types';
import { INTENT_LABELS } from '../../data/mockData';
import { X, SlidersHorizontal, ShieldCheck, Check, Users, MapPin, RotateCcw } from 'lucide-react';

const CITIES = ['Tüm Şehirler', 'İstanbul', 'Ankara', 'İzmir', 'Eskişehir', 'Antalya', 'Bursa'];

export const FilterModal: React.FC = () => {
  const { 
    showFilterModal, 
    setShowFilterModal, 
    filters, 
    setFilters 
  } = useApp();

  if (!showFilterModal) return null;

  const toggleIntent = (intentKey: IntentType) => {
    setFilters(prev => {
      const exists = prev.intents.includes(intentKey);
      if (exists) {
        if (prev.intents.length <= 1) return prev; // Keep at least one
        return { ...prev, intents: prev.intents.filter(i => i !== intentKey) };
      } else {
        return { ...prev, intents: [...prev.intents, intentKey] };
      }
    });
  };

  const handleResetFilters = () => {
    setFilters({
      gender: 'everyone',
      maxDistanceKm: 50,
      minAge: 18,
      maxAge: 30,
      intents: ['flirt', 'relationship', 'friendship', 'chat', 'event', 'hobby'],
      verifiedOnly: false,
      universityOnly: false,
      city: 'Tüm Şehirler'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-white/20 shadow-2xl my-auto space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Keşif Filtreleri</h2>
          </div>
          <button
            onClick={() => setShowFilterModal(false)}
            className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. CİNSİYET FİLTRESİ (EN ÖNEMLİSİ) */}
        <div className="space-y-2.5 p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/25">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Users className="w-4 h-4 text-pink-400" />
              <span>Görmek İstediğin Cinsiyet</span>
            </label>
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
              En Önemli
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'women' as InterestedInType, label: 'Kadınlar' },
              { id: 'men' as InterestedInType, label: 'Erkekler' },
              { id: 'everyone' as InterestedInType, label: 'Herkes' },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, gender: item.id }))}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  filters.gender === item.id
                    ? 'bg-gradient-to-r from-pink-500/30 to-cyan-500/30 border-cyan-400 text-white shadow-md shadow-cyan-950/40'
                    : 'bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. YAŞ ARALIĞI (18+) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Yaş Aralığı (18+)</span>
            <span className="font-mono font-bold text-cyan-400">
              {filters.minAge} - {filters.maxAge} Yaş
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400">En Az</label>
              <select
                value={filters.minAge}
                onChange={(e) => setFilters(prev => ({ ...prev, minAge: Number(e.target.value) }))}
                className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white"
              >
                {[18, 19, 20, 21, 22, 23, 24, 25].map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400">En Çok</label>
              <select
                value={filters.maxAge}
                onChange={(e) => setFilters(prev => ({ ...prev, maxAge: Number(e.target.value) }))}
                className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white"
              >
                {[22, 24, 26, 28, 30, 35, 40, 50].map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. KONUM & MESAFE */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Şehir</span>
              </label>
              <select
                value={filters.city || 'Tüm Şehirler'}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white"
              >
                {CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Mesafe</span>
                <span className="font-mono font-bold text-cyan-400">{filters.maxDistanceKm} km</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={filters.maxDistanceKm}
                onChange={(e) => setFilters(prev => ({ ...prev, maxDistanceKm: Number(e.target.value) }))}
                className="w-full accent-cyan-400 cursor-pointer mt-2"
              />
            </div>
          </div>
        </div>

        {/* 4. KULLANIM AMACI / NİYET */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Uygulama Kullanım Amacı / Niyet</label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(INTENT_LABELS) as IntentType[]).map((key) => {
              const item = INTENT_LABELS[key];
              const isSelected = filters.intents.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleIntent(key)}
                  className={`p-2 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-400 text-white font-medium shadow-sm'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. DOĞRULANMIŞ KULLANICI */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-xs font-bold text-white">Doğrulanmış Kullanıcılar</div>
              <div className="text-[10px] text-slate-400">Mavi rozetli / liveness selfie onaylı profiller</div>
            </div>
          </div>

          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
            className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-3.5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-white font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Filtreleri Sıfırla"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFilterModal(false)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-slate-950 font-bold text-xs hover:opacity-95 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 text-center"
          >
            Filtreleri Uygula
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  Image as ImageIcon, 
  Smile, 
  MoreVertical, 
  ShieldAlert, 
  UserX, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCheck, 
  MessageCircle, 
  Sparkles,
  Heart
} from 'lucide-react';

export const MessagesScreen: React.FC = () => {
  const { 
    matches, 
    messages, 
    currentUser, 
    selectedMatchId, 
    setSelectedMatchId, 
    handleSendMessage, 
    handleReportUser, 
    handleBlockUser,
    setSelectedProfileDetail 
  } = useApp();

  const [inputText, setInputText] = useState<string>('');
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<any>('inappropriate_photo');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMatch = matches.find(m => m.id === selectedMatchId);
  const activeMessages = selectedMatchId ? messages[selectedMatchId] || [] : [];

  // Scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length]);

  const handleSend = () => {
    if (!selectedMatchId || !inputText.trim()) return;
    handleSendMessage(selectedMatchId, inputText.trim());
    setInputText('');
  };

  const handleSendEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  const handleSendPhotoMock = () => {
    if (!selectedMatchId) return;
    const samplePhotos = [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
    ];
    const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
    handleSendMessage(selectedMatchId, '📷 Bir fotoğraf paylaştı', randomPhoto);
  };

  const confirmReport = () => {
    if (!activeMatch) return;
    handleReportUser(activeMatch.user.id, reportReason, reportDetails);
    setShowReportModal(false);
    setSelectedMatchId(null);
  };

  const confirmBlock = () => {
    if (!activeMatch) return;
    handleBlockUser(activeMatch.user.id);
    setSelectedMatchId(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 pb-24 md:pb-12 h-[calc(100vh-5rem)] flex flex-col">
      {/* If no match is selected: Show Matches List & Threads */}
      {!selectedMatchId ? (
        <div className="flex-1 flex flex-col space-y-4">
          {/* Header */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Eşleşmeler & Sohbetler</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Karşılıklı beğendiğin kişilerle güvenle mesajlaş.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-[#22D3EE] border border-cyan-500/30 text-xs font-bold">
              {matches.length} Eşleşme
            </span>
          </div>

          {/* New Matches Stories Strip */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Yeni Eşleşmeler</h3>
            {matches.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">Henüz yeni eşleşme yok. Keşif'te sağa kaydırmaya devam et!</p>
            ) : (
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
                {matches.map((match) => (
                  <button
                    key={match.id}
                    onClick={() => setSelectedMatchId(match.id)}
                    className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
                  >
                    <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#22D3EE] to-[#FB7185] group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20">
                      <img
                        src={match.user.photos[0]}
                        alt={match.user.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-slate-900"
                        referrerPolicy="no-referrer"
                      />
                      {match.user.verifiedPhoto && (
                        <ShieldCheck className="w-4 h-4 text-[#22D3EE] absolute bottom-0 right-0 bg-slate-950 rounded-full" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate max-w-[64px]">
                      {match.user.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Conversations List */}
          <div className="flex-1 glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col">
            <div className="p-3.5 border-b border-white/10 bg-slate-900/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Aktif Mesajlar</h3>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {matches.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Henüz bir sohbet başlamadı.
                </div>
              ) : (
                matches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatchId(match.id)}
                    className="p-3.5 hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-3.5"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={match.user.photos[0]}
                        alt={match.user.name}
                        className="w-12 h-12 rounded-full object-cover border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      {match.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#22D3EE] text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-md">
                          {match.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-sm text-white truncate flex items-center gap-1.5">
                          {match.user.name}
                          {match.user.verifiedPhoto && (
                            <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
                          )}
                        </span>
                        <span className="text-[11px] text-slate-400 shrink-0 font-mono">
                          {match.lastMessageTime || match.matchedAt}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {match.lastMessage || 'Yeni eşleşme! Selam ver ✨'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Active Chat View */
        <div className="flex-1 glass-card rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-white/10 bg-slate-900/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedMatchId(null)}
                className="p-1.5 -ml-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div 
                onClick={() => activeMatch && setSelectedProfileDetail(activeMatch.user)}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={activeMatch?.user.photos[0]}
                    alt={activeMatch?.user.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  {activeMatch?.user.verifiedPhoto && (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE] absolute bottom-0 right-0 bg-slate-950 rounded-full" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    {activeMatch?.user.name}, {activeMatch?.user.age}
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span>● Çevrimiçi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Options (Report / Block) */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-white/15 shadow-2xl z-50 py-1 text-xs">
                  <button
                    onClick={() => { setShowMenu(false); setShowReportModal(true); }}
                    className="w-full px-3 py-2 text-left text-amber-300 hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Kullanıcıyı Şikayet Et</span>
                  </button>
                  <button
                    onClick={() => { setShowMenu(false); confirmBlock(); }}
                    className="w-full px-3 py-2 text-left text-red-400 hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                  >
                    <UserX className="w-4 h-4" />
                    <span>Engelle & Eşleşmeyi Kaldır</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#070A18]/40">
            {/* Match info intro card */}
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 text-center max-w-xs mx-auto space-y-1">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-[#22D3EE] flex items-center justify-center mx-auto">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">Karşılıklı Vibe Yakalandı!</div>
              <p className="text-[11px] text-slate-400">
                {activeMatch?.user.university || 'Ortak ilgi alanlarınız var'}. İlk mesajı atarak tanışın.
              </p>
            </div>

            {activeMessages.map((msg) => {
              const isMine = msg.senderId === currentUser?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-md ${
                      isMine
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#22D3EE] text-slate-950 font-medium rounded-br-xs'
                        : 'bg-slate-800/90 text-white border border-white/10 rounded-bl-xs'
                    }`}
                  >
                    {msg.photoUrl && (
                      <img
                        src={msg.photoUrl}
                        alt="Paylaşılan Görsel"
                        className="rounded-xl mb-2 max-h-48 object-cover border border-black/10"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <p>{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 px-1 font-mono">
                    <span>{msg.timestamp}</span>
                    {isMine && (
                      <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Emoji Bar */}
          <div className="px-4 py-1.5 bg-slate-950/70 border-t border-white/5 flex items-center gap-3 overflow-x-auto no-scrollbar">
            {['✨', '☕️', '🎧', '🍕', '🙌', '🔥', '🎨'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleSendEmoji(emoji)}
                className="text-sm hover:scale-125 transition-transform cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <div className="p-3 bg-slate-900/90 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={handleSendPhotoMock}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              title="Fotoğraf Gönder"
            >
              <ImageIcon className="w-5 h-5 text-cyan-400" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Mesajını yaz..."
              className="flex-1 bg-slate-950/80 border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
            />

            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-slate-950 font-bold hover:opacity-95 disabled:opacity-30 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && activeMatch && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 max-w-sm w-full border border-white/15 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-bold text-base text-white">Kullanıcıyı Şikayet Et</h3>
            </div>

            <p className="text-xs text-slate-300">
              {activeMatch.user.name} kullanıcısını moderasyon ekibimize bildirmek üzeresiniz.
            </p>

            <div className="space-y-2">
              <label className="text-xs text-slate-400">Şikayet Nedeni:</label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value as any)}
                className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="inappropriate_photo">Uygunsuz / Müstehcen Fotoğraf</option>
                <option value="fake_profile">Sahte Profil / Başkasına Ait Fotoğraf</option>
                <option value="harassment">Taciz veya Rahatsız Edici Mesaj</option>
                <option value="underage_suspect">18 Yaş Altı Şüphesi</option>
                <option value="spam">Spam / Reklam</option>
                <option value="other">Diğer</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400">Detaylar:</label>
              <textarea
                rows={3}
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                placeholder="Lütfen durumu kısaca açıklayın..."
                className="w-full mt-1 bg-slate-900 border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                İptal
              </button>
              <button
                onClick={confirmReport}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
              >
                Raporla & Engelle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

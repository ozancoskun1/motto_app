import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CurrentUser, 
  UserProfile, 
  SwipeRecord, 
  MatchRecord, 
  ChatMessage, 
  ReportRecord, 
  VerificationLog, 
  FilterSettings, 
  SubscriptionTier,
  IntentType
} from '../types';
import { INITIAL_PROFILES, INITIAL_LIKES_YOU } from '../data/mockData';
import confetti from 'canvas-confetti';

interface AppContextType {
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  profiles: UserProfile[];
  swipes: SwipeRecord[];
  matches: MatchRecord[];
  messages: Record<string, ChatMessage[]>;
  likesYou: UserProfile[];
  filters: FilterSettings;
  setFilters: React.Dispatch<React.SetStateAction<FilterSettings>>;
  activeTab: 'discover' | 'likes' | 'matches' | 'profile' | 'safety' | 'admin';
  setActiveTab: (tab: 'discover' | 'likes' | 'matches' | 'profile' | 'safety' | 'admin') => void;
  selectedMatchId: string | null;
  setSelectedMatchId: (id: string | null) => void;
  selectedProfileDetail: UserProfile | null;
  setSelectedProfileDetail: (profile: UserProfile | null) => void;
  showProModal: boolean;
  setShowProModal: (show: boolean) => void;
  proModalReason: string;
  setProModalReason: (reason: string) => void;
  showFilterModal: boolean;
  setShowFilterModal: (show: boolean) => void;
  showSafetyModal: boolean;
  setShowSafetyModal: (show: boolean) => void;
  showAdminModal: boolean;
  setShowAdminModal: (show: boolean) => void;
  showSettingsModal: boolean;
  setShowSettingsModal: (show: boolean) => void;
  showWelcomeScreen: boolean;
  setShowWelcomeScreen: (show: boolean) => void;
  matchedUserProfile: UserProfile | null;
  setMatchedUserProfile: (user: UserProfile | null) => void;
  reports: ReportRecord[];
  verificationLogs: VerificationLog[];
  
  // Handlers
  handleSwipe: (profileId: string, type: 'like' | 'pass' | 'super') => boolean;
  handleUndo: () => boolean;
  handleSendMessage: (matchId: string, text: string, photoUrl?: string) => void;
  handleUpgradeTier: (tier: SubscriptionTier) => void;
  handleBuyExtraSwipes: () => void;
  handleReportUser: (targetUserId: string, reason: ReportRecord['reason'], details: string) => void;
  handleBlockUser: (targetUserId: string) => void;
  handleDeleteAccount: () => void;
  handleFreezeAccount: (frozen: boolean) => void;
  handleUpdateLanguage: (lang: 'tr' | 'en' | 'de') => void;
  handleResetDemoData: () => void;
  handleReloadProfiles: () => void;
  
  // Admin handlers
  adminBanUser: (userId: string) => void;
  adminSuspendUser: (userId: string) => void;
  adminToggleVerify: (userId: string) => void;
  adminResolveReport: (reportId: string, action: ReportRecord['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'vibematch_app_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try loading initial state from localStorage or use defaults
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default logged-in demo user for immediate pleasant discovery experience
    return {
      id: 'me_arzu_0',
      name: 'Arzu',
      age: 23,
      birthDate: '2003-04-15',
      phone: '+90 532 987 65 43',
      gender: 'woman',
      interestedIn: 'everyone',
      city: 'İstanbul',
      university: 'Boğaziçi Üniversitesi',
      major: 'Psikoloji & Sosyoloji',
      profession: 'Yüksek Lisans Öğrencisi',
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
      ],
      verifiedPhoto: true,
      intent: 'relationship',
      bio: 'Kahve ritüelleri, sergi açılışları ve hafta sonu bisiklet turları. İnsan doğasını anlamayı ve samimi sohbetleri seviyorum ✨',
      hobbies: ['Filtre Kahve', 'Modern Sanat', 'Yoga', 'Kitap Kulübü'],
      interests: ['Indie Rock', 'Şehir Keşfi', 'Podcast'],
      musicTaste: ['Lorde', 'Beach House', 'Jakuzi'],
      distanceKm: 0,
      lastActive: 'Şimdi aktif',
      tier: 'free',
      dailySwipesCount: 8,
      dailySwipeLimit: 50,
      superVibesRemaining: 1,
      boostsRemaining: 0,
    };
  });

  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_profiles`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PROFILES;
  });

  const [swipes, setSwipes] = useState<SwipeRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_swipes`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [matches, setMatches] = useState<MatchRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_matches`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'match_deniz',
        user: INITIAL_PROFILES[0],
        matchedAt: 'Dün 19:40',
        lastMessage: 'Karaköy’deki o sergiye gittin mi hiç? Çok merak ediyordum!',
        lastMessageTime: '12 dk önce',
        unreadCount: 1,
      },
      {
        id: 'match_kaan',
        user: INITIAL_PROFILES[1],
        matchedAt: '3 gün önce',
        lastMessage: 'Harika bir playlist hazırladım, dinleyince fikrini söyle 🎶',
        lastMessageTime: 'Dün',
        unreadCount: 0,
      }
    ];
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_messages`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      match_deniz: [
        {
          id: 'msg_1',
          matchId: 'match_deniz',
          senderId: 'user_deniz_1',
          text: 'Selam! Mimarlık ve kahve zevkin profilinde hemen dikkatimi çekti :)',
          timestamp: 'Dün 20:10',
          status: 'read',
        },
        {
          id: 'msg_2',
          matchId: 'match_deniz',
          senderId: 'me_arzu_0',
          text: 'Selam Deniz! Teşekkürler, Boğaziçi kampüsünü ve Karaköy rotalarını çok seviyorum ben de!',
          timestamp: 'Dün 20:25',
          status: 'read',
        },
        {
          id: 'msg_3',
          matchId: 'match_deniz',
          senderId: 'user_deniz_1',
          text: 'Karaköy’deki o sergiye gittin mi hiç? Çok merak ediyordum!',
          timestamp: '12 dk önce',
          status: 'delivered',
        }
      ],
      match_kaan: [
        {
          id: 'msg_k1',
          matchId: 'match_kaan',
          senderId: 'user_kaan_2',
          text: 'Selam! Techno & house dinlediğini görünce yazmak istedim 🎧',
          timestamp: '3 gün önce 22:04',
          status: 'read',
        },
        {
          id: 'msg_k2',
          matchId: 'match_kaan',
          senderId: 'me_arzu_0',
          text: 'Selam! Evet, hafta sonu setlerini kaçırmam :)',
          timestamp: '3 gün önce 22:15',
          status: 'read',
        },
        {
          id: 'msg_k3',
          matchId: 'match_kaan',
          senderId: 'user_kaan_2',
          text: 'Harika bir playlist hazırladım, dinleyince fikrini söyle 🎶',
          timestamp: 'Dün 14:10',
          status: 'read',
        }
      ]
    };
  });

  const [likesYou, setLikesYou] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_likes_you`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_LIKES_YOU;
  });

  const [filters, setFilters] = useState<FilterSettings>({
    gender: 'everyone',
    maxDistanceKm: 25,
    minAge: 18,
    maxAge: 28,
    intents: ['flirt', 'relationship', 'friendship', 'chat', 'event', 'hobby'],
    verifiedOnly: false,
    universityOnly: false,
  });

  const [reports, setReports] = useState<ReportRecord[]>([
    {
      id: 'rep_1',
      reporterId: 'user_deniz_1',
      targetUserId: 'user_spam_99',
      targetUserName: 'Bilinmeyen Kullanıcı',
      reason: 'fake_profile',
      details: 'Profilinde ünlü bir mankenin fotoğrafı kullanılmış, gerçek kişi değil.',
      status: 'pending',
      createdAt: 'Bugün 09:30',
    }
  ]);

  const [verificationLogs, setVerificationLogs] = useState<VerificationLog[]>([
    {
      id: 'vlog_1',
      userId: 'me_arzu_0',
      status: 'verified',
      faceConfidence: 99.4,
      livenessPassed: true,
      timestamp: '2026-10-09 10:12:00',
      note: 'Canlılık ve yüz simetrisi başarıyla doğrulandı. 18+ onaylı.',
    }
  ]);

  const [activeTab, setActiveTab] = useState<'discover' | 'likes' | 'matches' | 'profile' | 'safety' | 'admin'>('discover');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedProfileDetail, setSelectedProfileDetail] = useState<UserProfile | null>(null);
  const [showProModal, setShowProModal] = useState<boolean>(false);
  const [proModalReason, setProModalReason] = useState<string>('');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showSafetyModal, setShowSafetyModal] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('motto_onboarding_completed');
    }
    return true;
  });
  const [matchedUserProfile, setMatchedUserProfile] = useState<UserProfile | null>(null);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_profiles`, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_swipes`, JSON.stringify(swipes));
  }, [swipes]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_matches`, JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_messages`, JSON.stringify(messages));
  }, [messages]);

  // Swipe Action
  const handleSwipe = (profileId: string, type: 'like' | 'pass' | 'super'): boolean => {
    if (!currentUser) return false;

    // Check daily limit for free tier
    if (currentUser.tier === 'free' && currentUser.dailySwipesCount >= currentUser.dailySwipeLimit) {
      setProModalReason('Bugünkü 50 ücretsiz swipe hakkın bitti! Keşfe kesintisiz devam etmek için Pro veya Pro Max’e geç ya da 50 Ek Swipe al.');
      setShowProModal(true);
      return false;
    }

    const targetUser = profiles.find(p => p.id === profileId);
    if (!targetUser) return false;

    // Super Vibe check
    if (type === 'super' && currentUser.tier === 'free' && currentUser.superVibesRemaining <= 0) {
      setProModalReason('Super Vibe göndermek ve profilini 3 kat öne çıkarmak için Pro Max üyesi ol!');
      setShowProModal(true);
      return false;
    }

    // Decrement super vibes if applicable
    if (type === 'super' && currentUser.superVibesRemaining > 0) {
      setCurrentUser(prev => prev ? { ...prev, superVibesRemaining: Math.max(0, prev.superVibesRemaining - 1) } : null);
    }

    // Record swipe
    const newSwipe: SwipeRecord = {
      id: `swipe_${Date.now()}`,
      userId: currentUser.id,
      targetUserId: targetUser.id,
      type,
      createdAt: new Date().toISOString(),
    };

    setSwipes(prev => [newSwipe, ...prev]);

    // Update user swipe counter
    setCurrentUser(prev => prev ? {
      ...prev,
      dailySwipesCount: prev.dailySwipesCount + 1,
    } : null);

    // Remove from top of card queue
    setProfiles(prev => prev.filter(p => p.id !== profileId));

    // Reciprocal Match Logic
    // If user likes/super likes, and the target user was already in likesYou or has high match probability
    const isTargetInLikesYou = likesYou.some(l => l.id === targetUser.id);
    const isInstantMatch = type === 'super' || isTargetInLikesYou || Math.random() < 0.35;

    if ((type === 'like' || type === 'super') && isInstantMatch) {
      const matchId = `match_${targetUser.id}_${Date.now()}`;
      const newMatch: MatchRecord = {
        id: matchId,
        user: targetUser,
        matchedAt: 'Şimdi',
        lastMessage: type === 'super' ? '✨ Super Vibe gönderdin!' : 'Yeni bir Vibe yakaladınız! İlk mesajı sen at.',
        lastMessageTime: 'Şimdi',
        unreadCount: 0,
      };

      setMatches(prev => [newMatch, ...prev]);
      
      // Remove from likesYou list if present
      setLikesYou(prev => prev.filter(l => l.id !== targetUser.id));

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22D3EE', '#3B82F6', '#FB7185', '#FACC15']
        });
      } catch (e) {
        /* ignore */
      }

      // Show match modal
      setMatchedUserProfile(targetUser);
    }

    return true;
  };

  // Undo (Rewind) - Pro Feature
  const handleUndo = (): boolean => {
    if (!currentUser) return false;

    if (currentUser.tier === 'free') {
      setProModalReason('Son geçtiğin profili geri almak için Pro veya Pro Max abonesi ol!');
      setShowProModal(true);
      return false;
    }

    if (swipes.length === 0) return false;

    const lastSwipe = swipes[0];
    // Find the profile from INITIAL_PROFILES or fallback
    const restored = INITIAL_PROFILES.find(p => p.id === lastSwipe.targetUserId);
    if (restored) {
      setProfiles(prev => [restored, ...prev]);
      setSwipes(prev => prev.slice(1));
      setCurrentUser(prev => prev ? {
        ...prev,
        dailySwipesCount: Math.max(0, prev.dailySwipesCount - 1),
      } : null);
      return true;
    }
    return false;
  };

  // Send Message with persona reply simulation
  const handleSendMessage = (matchId: string, text: string, photoUrl?: string) => {
    if (!currentUser || !text.trim()) return;

    const targetMatch = matches.find(m => m.id === matchId);

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      matchId,
      senderId: currentUser.id,
      text: text.trim(),
      photoUrl,
      timestamp: 'Şimdi',
      status: 'sent',
    };

    setMessages(prev => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), userMsg],
    }));

    setMatches(prev => prev.map(m => m.id === matchId ? {
      ...m,
      lastMessage: text,
      lastMessageTime: 'Şimdi',
    } : m));

    // Simulated reply after 1.8 seconds if partner exists
    if (targetMatch) {
      setTimeout(() => {
        const replies = [
          'Harika bir tespit! Kesinlikle katılıyorum sana 🙌',
          'Süper enerjin var :) Hafta sonu bir kahve içip konuşalım mı?',
          'Bunu duyduğuma sevindim! Senin gibi zevkleri olan biriyle karşılaşmak çok hoş.',
          'Fotoğraf harika görünüyor! Hangi semt burası?',
          'Hafta sonu için planın ne peki? Ben de yeni mekanlar arıyordum ✨'
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const partnerMsg: ChatMessage = {
          id: `msg_reply_${Date.now()}`,
          matchId,
          senderId: targetMatch.user.id,
          text: randomReply,
          timestamp: 'Şimdi',
          status: 'read',
        };

        setMessages(prev => ({
          ...prev,
          [matchId]: [...(prev[matchId] || []).map(m => ({ ...m, status: 'read' as const })), partnerMsg],
        }));

        setMatches(prev => prev.map(m => m.id === matchId ? {
          ...m,
          lastMessage: randomReply,
          lastMessageTime: 'Şimdi',
          unreadCount: m.id === selectedMatchId ? 0 : m.unreadCount + 1,
        } : m));
      }, 1600);
    }
  };

  // Upgrade Tier
  const handleUpgradeTier = (tier: SubscriptionTier) => {
    if (!currentUser) return;
    const expires = tier === 'pro' 
      ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      : undefined; // Pro Max is lifetime

    setCurrentUser(prev => prev ? {
      ...prev,
      tier,
      tierExpiresAt: expires,
      dailySwipeLimit: tier === 'promax' ? 9999 : 250,
      superVibesRemaining: tier === 'promax' ? 10 : 3,
      boostsRemaining: tier === 'promax' ? 5 : 1,
    } : null);

    setShowProModal(false);

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FACC15', '#22D3EE', '#3B82F6']
      });
    } catch (e) {
      /* ignore */
    }
  };

  // Buy Extra Swipes (50 TL)
  const handleBuyExtraSwipes = () => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? {
      ...prev,
      dailySwipeLimit: prev.dailySwipeLimit + 50,
    } : null);
    setShowProModal(false);
  };

  // Report User
  const handleReportUser = (targetUserId: string, reason: ReportRecord['reason'], details: string) => {
    if (!currentUser) return;
    const target = INITIAL_PROFILES.find(p => p.id === targetUserId);
    const newReport: ReportRecord = {
      id: `rep_${Date.now()}`,
      reporterId: currentUser.id,
      targetUserId,
      targetUserName: target?.name || 'Kullanıcı',
      reason,
      details,
      status: 'pending',
      createdAt: 'Şimdi',
    };
    setReports(prev => [newReport, ...prev]);
    // Automatically block the reported user from feed and matches
    handleBlockUser(targetUserId);
  };

  // Block User
  const handleBlockUser = (targetUserId: string) => {
    setProfiles(prev => prev.filter(p => p.id !== targetUserId));
    setMatches(prev => prev.filter(m => m.user.id !== targetUserId));
    setLikesYou(prev => prev.filter(l => l.id !== targetUserId));
    if (selectedMatchId && matches.find(m => m.id === selectedMatchId)?.user.id === targetUserId) {
      setSelectedMatchId(null);
    }
  };

  // Delete Account (KVKK Compliance)
  const handleDeleteAccount = () => {
    localStorage.clear();
    setCurrentUser(null);
    setSwipes([]);
    setMatches([]);
    setMessages({});
    setActiveTab('discover');
    setShowWelcomeScreen(true);
  };

  // Freeze Account (pauses discovery)
  const handleFreezeAccount = (frozen: boolean) => {
    setCurrentUser(prev => prev ? { ...prev, isFrozen: frozen } : null);
  };

  // Update Language
  const handleUpdateLanguage = (lang: 'tr' | 'en' | 'de') => {
    setCurrentUser(prev => prev ? { ...prev, language: lang } : null);
  };

  // Reset demo data helper
  const handleResetDemoData = () => {
    localStorage.clear();
    setProfiles(INITIAL_PROFILES);
    setLikesYou(INITIAL_LIKES_YOU);
    setSwipes([]);
    setShowWelcomeScreen(true);
  };

  // Reload profiles helper
  const handleReloadProfiles = () => {
    setProfiles(INITIAL_PROFILES);
  };

  // Admin moderation actions
  const adminBanUser = (userId: string) => {
    setProfiles(prev => prev.filter(p => p.id !== userId));
    setMatches(prev => prev.filter(m => m.user.id !== userId));
    setLikesYou(prev => prev.filter(l => l.id !== userId));
  };

  const adminSuspendUser = (userId: string) => {
    setProfiles(prev => prev.filter(p => p.id !== userId));
  };

  const adminToggleVerify = (userId: string) => {
    setProfiles(prev => prev.map(p => p.id === userId ? { ...p, verifiedPhoto: !p.verifiedPhoto } : p));
  };

  const adminResolveReport = (reportId: string, action: ReportRecord['status']) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: action } : r));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        profiles,
        swipes,
        matches,
        messages,
        likesYou,
        filters,
        setFilters,
        activeTab,
        setActiveTab,
        selectedMatchId,
        setSelectedMatchId,
        selectedProfileDetail,
        setSelectedProfileDetail,
        showProModal,
        setShowProModal,
        proModalReason,
        setProModalReason,
        showFilterModal,
        setShowFilterModal,
        showSafetyModal,
        setShowSafetyModal,
        showAdminModal,
        setShowAdminModal,
        showSettingsModal,
        setShowSettingsModal,
        showWelcomeScreen,
        setShowWelcomeScreen,
        matchedUserProfile,
        setMatchedUserProfile,
        reports,
        verificationLogs,
        handleSwipe,
        handleUndo,
        handleSendMessage,
        handleUpgradeTier,
        handleBuyExtraSwipes,
        handleReportUser,
        handleBlockUser,
        handleDeleteAccount,
        handleFreezeAccount,
        handleUpdateLanguage,
        handleResetDemoData,
        handleReloadProfiles,
        adminBanUser,
        adminSuspendUser,
        adminToggleVerify,
        adminResolveReport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

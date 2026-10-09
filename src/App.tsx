/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuroraBackground } from './components/common/AuroraBackground';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { MottoSplashScreen } from './components/splash/MottoSplashScreen';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { NewUserWelcomeScreen } from './components/onboarding/NewUserWelcomeScreen';
import { DiscoverScreen } from './components/discover/DiscoverScreen';
import { LikesScreen } from './components/likes/LikesScreen';
import { MessagesScreen } from './components/messages/MessagesScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { ProfileDetailModal } from './components/profile/ProfileDetailModal';
import { PremiumModal } from './components/premium/PremiumModal';
import { FilterModal } from './components/filters/FilterModal';
import { SafetyCenterModal } from './components/safety/SafetyCenterModal';
import { AdminModal } from './components/admin/AdminModal';
import { MatchCelebrationModal } from './components/common/MatchCelebrationModal';

import { SettingsModal } from './components/settings/SettingsModal';

const MainLayout: React.FC = () => {
  const { currentUser, activeTab, showWelcomeScreen, setShowWelcomeScreen } = useApp();
  const [isOnboardingMode, setIsOnboardingMode] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Only show splash once per session
    if (typeof window !== 'undefined' && sessionStorage.getItem('motto_splash_seen')) {
      return false;
    }
    return true;
  });

  const handleEnterFromSplash = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('motto_splash_seen', 'true');
    }
    setShowSplash(false);
  };

  // If animated splash is active, show the Motto splash screen!
  if (showSplash) {
    return <MottoSplashScreen onEnter={handleEnterFromSplash} />;
  }

  // If user is actively in onboarding registration wizard
  if (isOnboardingMode) {
    return (
      <div className="relative min-h-screen bg-[#070A18] text-[#F8FAFC]">
        <AuroraBackground />
        <OnboardingWizard 
          onComplete={() => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('motto_onboarding_completed', 'true');
            }
            setShowWelcomeScreen(false);
            setIsOnboardingMode(false);
          }} 
          onCancel={() => {
            setIsOnboardingMode(false);
          }}
        />
      </div>
    );
  }

  // If user newly downloaded the app or is not yet onboarded or logged out
  if (showWelcomeScreen || !currentUser) {
    return (
      <div className="relative min-h-screen bg-[#070A18] text-[#F8FAFC]">
        <AuroraBackground />
        <NewUserWelcomeScreen
          onStartOnboarding={() => {
            setIsOnboardingMode(true);
          }}
          onQuickExplore={() => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('motto_onboarding_completed', 'true');
            }
            setShowWelcomeScreen(false);
          }}
          onLoginSuccess={() => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('motto_onboarding_completed', 'true');
            }
            setShowWelcomeScreen(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#070A18] text-[#F8FAFC] flex flex-col selection:bg-cyan-500/30">
      <AuroraBackground />

      {/* Top Bar with Motto Brand & Filter only */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 w-full flex flex-col items-center">
        {activeTab === 'discover' && <DiscoverScreen />}
        {activeTab === 'likes' && <LikesScreen />}
        {activeTab === 'matches' && <MessagesScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </main>

      {/* Mobile Bottom Navigation Dock */}
      <BottomNav />

      {/* Global Modals */}
      <ProfileDetailModal />
      <PremiumModal />
      <FilterModal />
      <SafetyCenterModal />
      <AdminModal />
      <MatchCelebrationModal />
      <SettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

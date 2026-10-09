export type IntentType = 
  | 'flirt' 
  | 'relationship' 
  | 'friendship' 
  | 'chat' 
  | 'event' 
  | 'hobby';

export type GenderType = 'woman' | 'man' | 'nonbinary';
export type InterestedInType = 'women' | 'men' | 'everyone';
export type SubscriptionTier = 'free' | 'pro' | 'promax';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  birthDate: string; // YYYY-MM-DD
  gender: GenderType;
  interestedIn: InterestedInType;
  city: string;
  university?: string;
  major?: string;
  profession?: string;
  photos: string[];
  verifiedPhoto: boolean;
  intent: IntentType;
  bio: string;
  hobbies: string[];
  interests: string[];
  musicTaste?: string[];
  distanceKm: number;
  lastActive: string;
  isSuperVibe?: boolean;
}

export interface CurrentUser extends UserProfile {
  phone: string;
  tier: SubscriptionTier;
  tierExpiresAt?: string;
  dailySwipesCount: number;
  dailySwipeLimit: number;
  superVibesRemaining: number;
  boostsRemaining: number;
  isBanned?: boolean;
  isSuspended?: boolean;
  isFrozen?: boolean;
  language?: 'tr' | 'en' | 'de';
}

export interface SwipeRecord {
  id: string;
  userId: string;
  targetUserId: string;
  type: 'like' | 'pass' | 'super';
  createdAt: string;
}

export interface MatchRecord {
  id: string;
  user: UserProfile;
  matchedAt: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  photoUrl?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ReportRecord {
  id: string;
  reporterId: string;
  targetUserId: string;
  targetUserName: string;
  reason: 'inappropriate_photo' | 'harassment' | 'fake_profile' | 'underage_suspect' | 'spam' | 'other';
  details: string;
  status: 'pending' | 'reviewed' | 'action_taken' | 'dismissed';
  createdAt: string;
}

export interface VerificationLog {
  id: string;
  userId: string;
  status: 'verified' | 'rejected';
  faceConfidence: number;
  livenessPassed: boolean;
  timestamp: string;
  note: string;
}

export interface FilterSettings {
  gender: InterestedInType;
  maxDistanceKm: number;
  minAge: number;
  maxAge: number;
  intents: IntentType[];
  verifiedOnly: boolean;
  universityOnly: boolean;
  city?: string;
}

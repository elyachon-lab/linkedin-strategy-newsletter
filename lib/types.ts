export type StrategyCategory =
  | 'Hook'
  | 'Algorithme'
  | 'Planning'
  | 'Format'
  | 'Engagement'
  | 'Copywriting';

export interface StrategyCard {
  id: string;
  title: string;
  category: StrategyCategory;
  tags: string[];
  summary: string;
  content: string;
  examples?: string[];
  is_pinned?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  url?: string;
  category: 'IA & Tech' | 'Fonctionnalité' | 'Étude & Dataviz' | 'Outillage';
  summary: string;
  takeaway: string;
}

export type NewsletterStatus = 'draft' | 'scheduled' | 'sent';

export interface NewsletterIssue {
  id: string;
  issue_number: number;
  title: string;
  subject_line: string;
  preview_text: string;
  status: NewsletterStatus;
  content_markdown: string;
  articles: NewsArticle[];
  sent_at?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
}

export interface AIAuditResult {
  score: number;
  industry: string;
  audienceTier: string;
  tailoredHooks: string[];
  formatStrategy: string;
  bestPostingWindows: string[];
  recommendedHashtags: string[];
  growthActionPlan: string[];
}

export interface UserSyncData {
  isConnected: boolean;
  connectedAt?: string;
  weeklyPostFrequency?: number;
  followerCount?: number;
  ssiScore?: number;
  engagementRate?: string;
  lastPostDate?: string;
  primaryFormat?: string;
  averageDwellSeconds?: number;
}

export interface LinkedInUserProfile {
  username: string;
  fullName: string;
  industry: string;
  role: string;
  accountType?: 'Personal Profile' | 'Company Page';
  followerCount?: number;
  email?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  userSyncData?: UserSyncData;
  auditResult?: AIAuditResult;
}

export const LINKEDIN_INDUSTRIES = [
  'Communication & Marketing',
  'Agence B2B & Conseil',
  'Freelance & Indépendant',
  'Création de Contenu & Média',
  'SaaS, Tech & IA',
  'RH, Recrutement & Coaching',
  'Finance, Banque & Gestion',
  'E-Commerce & Retail',
  'Immobilier & Foncier',
  'Santé & MedTech',
  'Autre / Général',
] as const;

export function formatCleanLinkedInName(input: string): string {
  if (!input || !input.trim()) return 'Membre LinkedIn';
  let raw = input.trim();

  // Extract handle if full URL is passed
  if (raw.includes('linkedin.com/in/')) {
    raw = raw.split('linkedin.com/in/')[1]?.split('/')[0]?.split('?')[0] || raw;
  } else if (raw.includes('linkedin.com/company/')) {
    raw = raw.split('linkedin.com/company/')[1]?.split('/')[0]?.split('?')[0] || raw;
  }

  // Remove leading @ or http/https
  raw = raw.replace(/^https?:\/\//i, '').replace(/^@/, '');

  const cleaned = raw.replace(/[-_.]+/g, ' ').trim();
  if (!cleaned) return 'Membre LinkedIn';

  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

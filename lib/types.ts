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
